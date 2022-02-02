require('dotenv').config();
const RC = require('@ringcentral/sdk').SDK;

const CLIENTID     = process.env.RC_CLIENT_ID;
const CLIENTSECRET = process.env.RC_CLIENT_SECRET;
const SERVER       = process.env.RC_SERVER_URL;
const USERNAME     = process.env.RC_USERNAME;
const PASSWORD     = process.env.RC_PASSWORD;
const EXTENSION    = process.env.RC_EXTENSION;
const CHATID       = process.env.CHAT_ID;

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

platform.on(platform.events.loginSuccess, postTask);

async function getCurrentUserId() {
    const response = await platform.get('/restapi/v1.0/account/~/extension/~');
    const json = await response.json();
    return json.id;
}

async function postTask() {
    try {
        const currentUserId = await getCurrentUserId();
        const response = await platform.post(`/restapi/v1.0/glip/chats/${CHATID}/tasks`, {
            subject: 'Destroy the Rebel Alliance',
            assignees: [{
                id: `${currentUserId}`
            }],
            description: 'In this task assignees the Sith Lord needs to come up with a plan to crush the Rebel Alliance'
        });
        const json = await response.json();
        console.log('Task posted to chat');
        console.log(json)
    } catch (e) {
        console.log(`Failed to post task: ${e.message}`);
        process.exit(1);
    }
}
