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

platform.on(platform.events.loginSuccess, getCallQueues);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    // Remove the below line if you are running this in the browser
    process.exit(1);
});

async function getCallQueues() {
    try {
        const response = await platform.get('/restapi/v1.0/account/~/call-queues');
        const json = await response.json();
        if (!json.records.length) { return; }
        readCallQueueMemberStatus(json.records[0].id);
    } catch (e) {
        console.error(`Failed to get call queues : ${e.message}`);
        // Remove the below line if you are running this in the browser
        process.exit(1);
    }
}

async function readCallQueueMemberStatus(id){
    try {
        const response = await platform.get(`/restapi/v1.0/account/~/call-queues/${id}/presence`);
        const json = await response.json();
        console.log(json);
    } catch(e) {
        console.error(`Failed to get call queues : ${e.message}`);
        // Remove the below line if you are running this in the browser
        process.exit(1);
    }
}
