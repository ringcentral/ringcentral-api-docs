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

platform.on(platform.events.loginSuccess, createTeam);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    process.exit(1);
});

async function getCurrentUserId() {
    const response = await platform.get('/restapi/v1.0/account/~/extension/~');
    const json = await response.json();
    return json.id;
}

async function createTeam() {
    const randomNumber = Math.floor(Math.random() * (1 - 10000 + 1) + 1)
    const currentUserId = await getCurrentUserId()
    try {
        const response = await platform.post('/restapi/v1.0/glip/teams', {
            name: `Sith Lords Version ${randomNumber}`,
            description: 'A team to discuss all Dark Side matters',
            public: true,
            members: [
                { id: `${currentUserId}` },
                { email: 'darth.sidious@ringcentral.darkside.com' },
                { email: 'darth.plagueis@ringcentral.darkside.com' }
            ]
        });
        const json = await response.json();
        console.log(`Team created with id: ${json.id}`);
    } catch (e) {
        console.log(`Failed to create team: ${e.message}`);
        process.exit(1);
    }
}
