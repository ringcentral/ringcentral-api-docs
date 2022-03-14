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

const  platform = rcsdk.platform();

platform.login({
    username:  USERNAME,
    password:  PASSWORD,
    extension: EXTENSION
});

platform.on(platform.events.loginSuccess, changeMessageReadStatus);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    process.exit(1);
});

async function changeMessageReadStatus() {
    try {
        let response = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
            dateFrom: '2020-12-01T00:00:00.000Z'
        });
        let json = await response.json();
        const messages = json.records;
        console.log(`We got a list of ${messages.length} messages`);
        if (!messages.length) {
            console.log('No messages available to read');
            return;    
        }
        const message = messages[0];
        response = await platform.put(`/restapi/v1.0/account/~/extension/~/message-store/${message.id}`, {
            readStatus: 'Read'
        });
        json = await response.json();
        console.log(`Message readStatus has been changed to ${json.readStatus}`);
    } catch (e) {
        console.error(`Failed to change message read status : ${e.message}`);
        process.exit(1);
    }
}
