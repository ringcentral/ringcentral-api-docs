require('dotenv').config();
const RC = require('@ringcentral/sdk').SDK;

const CLIENTID     = process.env.RC_CLIENT_ID;
const CLIENTSECRET = process.env.RC_CLIENT_SECRET;
const SERVER       = process.env.RC_SERVER_URL;
const USERNAME     = process.env.RC_USERNAME;
const PASSWORD     = process.env.RC_PASSWORD;
const EXTENSION    = process.env.RC_EXTENSION;
const CHAT_ID      = process.env.CHAT_ID;

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

platform.on(platform.events.loginSuccess, addTeamMember);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    process.exit(1);
});

async function getCurrentUserId() {
    const response = await platform.get('/restapi/v1.0/account/~/extension/~');
    const json = await response.json();
    return json.id;
}

async function addTeamMember () {
    const currentUserId = await getCurrentUserId();
    try {
        await platform.post(`/restapi/v1.0/glip/teams/${CHAT_ID}/add`, {
            members: [
                { id: `${currentUserId}` },
                { email: 'darth.vadar@ringcentral.darkside.com' }
            ]
        });
        console.log('Team members added');
    } catch (e) {
        console.log(`Failed to add team member: ${e.message}`);
        process.exit(1);
    }
}