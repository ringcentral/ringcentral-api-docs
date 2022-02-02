require('dotenv').config();
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

platform.on(platform.events.loginSuccess, getPersonalChats);

async function getPersonalChats() {
    try {
        const response = await platform.get('/restapi/v1.0/glip/chats', {
            type: 'Personal'
        });
        const json = await response.json()
        json.records.forEach((record) => {
            console.log(`Personal chat with chatId: ${record.id} found`)
        });
    } catch (e) {
        console.log(`Failed to get personal chats: ${e.message}`);
        process.exit(1);
    }
}