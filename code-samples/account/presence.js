const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({username: "username", password: "password", extension: "extension_number"})

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
