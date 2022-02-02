require('dotenv').config();
const RC  = require('@ringcentral/sdk').SDK;

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

platform.on(platform.events.loginSuccess, readSMS);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    process.exit(1);
});

async function readSMS() {
    try {
        const response = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
            messageType: ['SMS']
        });
        const json = await response.json();
        console.log(json);
    } catch (e) {
        console.error(`Failed to read sms from message store : ${e.message}`);
        process.exit(1);
    }
}
