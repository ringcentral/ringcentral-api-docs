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

async function createTeam() {
    try {
        const response = await platform.post('/restapi/v1.0/glip/teams', {
            public: true,
            name: 'The Jedis',
            members: [
                { email: 'qui.gon.jinn@ringcentral.lightside.com' },
                { email: 'Ahsoka.tano@ringcentral.lightside.com' }
            ],
            description: 'Group to talk about how to restore the balance in the galaxy'
          });
        const json = await response.json();
        console.log(json);
        console.log('Team created');
    } catch (e) {
        console.log(`Failed to create team: ${e.message}`);
        process.exit(1);
    }
}
