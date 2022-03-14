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

platform.on(platform.events.loginSuccess, startMeeting);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    process.exit(1);
});

async function startMeeting() {
    try {
        const endpoint = '/restapi/v1.0/account/~/extension/~/meeting'
        const response = await platform.post(endpoint, {
            topic: 'Test Meeting',
            meetingType: 'Instant',
            allowJoinBeforeHost: true,
            startHostVideo: true,
            startParticipantsVideo: false  
        });
        const json = await response.json();
        console.log(`Start Your Meeting: ${json.links.startUri}`);
        console.log(`Meeting id: ${json.id}`);
    } catch(e) {
        console.error(`Failed to start meeting : ${e.message}`);
        process.exit(1);
    }
}
