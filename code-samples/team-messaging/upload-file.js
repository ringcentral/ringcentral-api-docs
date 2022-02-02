require('dotenv').config();
const RC       = require('@ringcentral/sdk').SDK;
const path     = require('path');
const fs       = require('fs');
const FormData = require('form-data');

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

platform.on(platform.events.loginSuccess, uploadFile);

async function uploadFile() {
    try {
        const formData = new FormData();
        const attachmentPath = path.resolve(__dirname, '../data/attachment.jpeg');
        formData.append('body', fs.createReadStream(attachmentPath));
        const response = await platform.post('/restapi/v1.0/glip/files', formData, {
            name: 'kitten.jpeg', groupId: CHATID
        });
        const json = response.json();
        console.log(json);
        console.log('File uploaded to chat');
    } catch (e) {
        console.log(`Failed to upoad file: ${e.message}`);
        process.exit(1);
    }
}


