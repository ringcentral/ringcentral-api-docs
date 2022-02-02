require('dotenv').config();
const RC       = require('@ringcentral/sdk').SDK;
const FormData = require('form-data');
const fs       = require('fs');
const path     = require('path');

const CLIENTID     = process.env.RC_CLIENT_ID;
const CLIENTSECRET = process.env.RC_CLIENT_SECRET;
const SERVER       = process.env.RC_SERVER_URL;
const USERNAME     = process.env.RC_USERNAME;
const PASSWORD     = process.env.RC_PASSWORD;
const EXTENSION    = process.env.RC_EXTENSION;
const RECIPIENT    = process.env.RECIPIENT

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

platform.on(platform.events.loginSuccess, sendFax);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    process.exit(1);
});

async function sendFax() {
    const formData = new FormData();
    formData.append('to', JSON.stringify([RECIPIENT]));
    formData.append('faxResolution', 'High');
    formData.append('coverPageText', 'This is a demo Fax page from Node JS');
    const attachmentPath = path.resolve(__dirname, '../../data/attachment.jpeg');
    formData.append('attachment', fs.createReadStream(attachmentPath));

    try {
        const response = await platform.post('/restapi/v1.0/account/~/extension/~/fax', formData);
        const json = await response.json();
        console.log(`FAX sent. Message status: ${json.messageStatus}`)
    } catch(e) {
        console.log(`Failed to send fax: ${e.message}`);
        process.exit(1);
    }
}