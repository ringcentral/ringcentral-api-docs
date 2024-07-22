/* You get the environment parameters from your
   application dashbord in your developer account
   https://developers.ringcentral.com */

const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

const RECIPIENT    = process.env.SMS_RECIPIENT

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});

var platform = rcsdk.platform();

platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, function(e){
    get_users_presence()
});

async function get_users_presence(){
    try {
        var resp = await platform.get('/restapi/v1.0/account/~/presence', {
            detailedTelephonyState: true
        })
        var jsonObj = await resp.json()
        for (var record of jsonObj.records){
            console.log(record.userStatus)
        }
    }catch(e){
        console.log(e.message)
    }
}
