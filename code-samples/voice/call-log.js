const RC = require('@ringcentral/sdk').SDK

CLIENTID     = process.env.RC_CLIENT_ID
CLIENTSECRET = process.env.RC_CLIENT_SECRET
SERVER       = process.env.RC_SERVER_URL
USERNAME     = process.env.RC_USERNAME
PASSWORD     = process.env.RC_PASSWORD
EXTENSION    = process.env.RC_EXTENSION

const rcsdk = new RC({
    server:       SERVER,
    clientId:     CLIENTID,
    clientSecret: CLIENTSECRET
});

const platform = rcsdk.platform();

platform.login({
    username:  USERNAME,
    password:  PASSWORD,
    extension: EXTENSION
})

platform.on(platform.events.loginSuccess, read_user_calllog);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`)
    process.exit(1)
});

async function read_user_calllog() {
    try {
        const response = await platform.get('/restapi/v1.0/account/~/extension/~/call-log', {
        view: 'Detailed'
        })
        const json = await response.json()
        for (let record of json.records)
        console.log("Call type: " + record.type)
    } catch (e) {
        console.error(`Failed to read detailed call logs : ${e.message}`)
        process.exit(1)
    }
}
