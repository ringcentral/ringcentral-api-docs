const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

const rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

const platform = rcsdk.platform();

platform.login({
    'jwt':  process.env.RC_JWT 
}).then(() => {
    let userObject = {
        "contact": {
            "firstName": "Test",
            "lastName": "SJ-3",
            "email": "dummyemail@dummydomain.com"
        },
        "password": "Passw0rd123!",
        "status": "Enabled",
        "type": "User"
    }
    
    platform.post("/restapi/v1.0/account/~/extension", userObject)
}).then((resp) => {
    return resp.json();
}).then((json)=> {
    console.log(json);
});
