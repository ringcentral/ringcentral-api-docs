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

platform.on(platform.events.loginSuccess, postTextMessage);

async function getPersonalMessageChatId() {
    const response = await platform.get('/restapi/v1.0/glip/chats', {
        type: 'Personal'
    });
    const json = await response.json();
    if (!json.records.length) {
        return null;
    }
    const chatId = json.records[0].id;
    console.log(`Personal chat id: ${chatId}`);
    return chatId;
}

async function postTextMessage() {
    try {
        const personalMessageChatId = await getPersonalMessageChatId();
        if (!personalMessageChatId) {
            console.log('No personal chats available to post to');
            return;
        }
        const response = await platform.post(`/restapi/v1.0/glip/chats/${personalMessageChatId}/posts`, {
            text: 'Hello World'
        });
        const json = await response.json();
        console.log(json);
        console.log('Personal message posted to chat')
    } catch (e) {
        console.log(`Failed to post personal message: ${e.message}`);
        process.exit(1);
    }
}