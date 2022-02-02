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

platform.on(platform.events.loginSuccess, postCard);

async function postCard() {
    try {
        const response = await platform.post(`/restapi/v1.0/glip/chats/${CHATID}/adaptive-cards`, {
            type: 'AdaptiveCard',
            body: [
            {
                type: 'TextBlock',
                size: 'Medium',
                weight: 'Bolder',
                text: 'Adaptive Card example'
            },
            {
                type: 'Image',
                url: 'https://bit.ly/3nwZbRM'
            }
            ],
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            version: '1.3'
        });
        const json = await response.json();
        console.log('Card posted to chat');
        console.log(json);
    } catch (e) {
	    console.log(`Failed to post card: ${e.message}`);
        process.exit(1);
    }
}
