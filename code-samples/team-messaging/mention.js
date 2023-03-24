const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, () => {
    try {
        var personId = "1234";
        var groupId = "5678";
        await platform.post(`/restapi/v1.0/glip/chats/${groupId}/posts`, {
            "text": `Here is a mention: ![:Person](${personId})`
        })
    } catch(e) {
        console.log(e)
    }
})

