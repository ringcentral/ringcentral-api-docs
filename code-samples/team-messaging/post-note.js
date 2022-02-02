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

platform.on(platform.events.loginSuccess, postNote);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    process.exit(1);
});

async function postNote() {
    try {
        const response = await platform.post(`/restapi/v1.0/glip/chats/${CHATID}/notes`, {
            title: 'This is a note',
            body: '<strong>heading</strong><br><br>Any HTML can be entered here.'
        });
        const json = await response.json();
        console.log('Note posted to chat')
        console.log(json)
    } catch (e) {
        console.log(`Failed to post note: ${e.message}`);
        process.exit(1);
    }
}
