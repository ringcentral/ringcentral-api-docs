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

platform.on(platform.events.loginSuccess, getChats);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    process.exit(1);
});

async function getChats() {
    try {
        const response = await platform.get('/restapi/v1.0/glip/chats', { 
            recordCount: 20 
        });
        const json = await response.json();
        json.records.forEach((record) => {
            let message = `You have ${record.type} type of chat`
            if (record.name) { message += ` with name ${record.name}`; }
            if (record.members) { message += ` with ${record.members.length} members`; }
            console.log(message);
        });
    } catch (e) {
        console.log(`Failed to get chats: ${e.message}`);
        process.exit(1);
    }
}
