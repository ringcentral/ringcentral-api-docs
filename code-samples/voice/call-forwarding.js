const RC = require('@ringcentral/sdk').SDK;

const CLIENTID          = process.env.RC_CLIENT_ID;
const CLIENTSECRET      = process.env.RC_CLIENT_SECRET;
const SERVER            = process.env.RC_SERVER_URL;
const USERNAME          = process.env.RC_USERNAME;
const PASSWORD          = process.env.RC_PASSWORD;
const EXTENSION         = process.env.RC_EXTENSION;
const FORWARDING_NUMBER = process.env.SECONDARY_NUMBER

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

platform.on(platform.events.loginSuccess, createForwardingNumberByNumber);

platform.on(platform.events.loginError, (e) => {
    console.error(`User login failed : ${e.message}`);
    // Remove the below line if you are running this in the browser
    process.exit(1);
});

async function createForwardingNumberByNumber() {
  try {
    const response = await platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', {
      phoneNumber: FORWARDING_NUMBER,
      type: 'Other',
      label: 'My Other number'
    });
    const json = await response.json();
    console.log('Forwarding number created.');
    console.log('Forwarding number id: ' + json.id);
  } catch (e) {
    console.error(`Failed to create call forwarding number : ${e.message}`);
    // Remove the below line if you are running this in the browser
    process.exit(1);
  }
}
