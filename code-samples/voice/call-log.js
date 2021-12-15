const RC = require('@ringcentral/sdk').SDK;

const CLIENTID     = process.env.RC_CLIENT_ID;
const CLIENTSECRET = process.env.RC_CLIENT_SECRET;
const SERVER       = process.env.RC_SERVER_URL;
const USERNAME     = process.env.RC_USERNAME;
const PASSWORD     = process.env.RC_PASSWORD;
const EXTENSION    = process.env.RC_EXTENSION;

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
});

platform.on(platform.events.loginSuccess, readUserCallLog);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    // Remove the below line if you are running this in the browser
    process.exit(1);
});

async function readUserCallLog() {
    try {
        const response = await platform.get('/restapi/v1.0/account/~/extension/~/call-log', {
            view: 'Detailed'
        });
        const json = await response.json();
        for (let record of json.records) {
            console.log("Call type: " + record.type);
        }
    } catch (e) {
        console.error(`Failed to read detailed call logs : ${e.message}`);
        // Remove the below line if you are running this in the browser
        process.exit(1);
    }
}
