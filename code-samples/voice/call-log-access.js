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

platform.on(platform.events.loginSuccess, readCallLogs);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    // Remove the below line if you are running this in the browser
    process.exit(1);
});

async function readCallLogs(loginResponse) {
  const loginJson = await loginResponse.json();
  // Sanity check
  if (loginJson.hasOwnProperty('scope')) {
    const permissions = loginJson.scope.split(' ');
    if (permissions.includes('ReadCallLog')) {
      try {
        const response = await platform.get('/restapi/v1.0/account/~/call-log')
        const json = await response.json()
        console.log('Account level call log data');
        console.log(json);
      } catch (e) {
        console.error(`Failed to access call logs : ${e.message}`);
        // Remove the below line if you are running this in the browser
        process.exit(1);
      }
    }
  }
}
