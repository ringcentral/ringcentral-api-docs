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

platform.on(platform.events.loginSuccess, () => createForwardingNumberByNumber);

async function createForwardingNumberByNumber() {
  try {
    const response = await platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', {
      phoneNumber: '11235557890',
      type: 'Other',
      label: 'My ATT number'
    })
    var json = await response.json()
    console.log('Forwarding number created.')
    console.log('Forwarding number id: ' + json.id)
  } catch (e) {
    console.error(e);
    // Remove the below line if you are running this in the browser
    process.exit(1);
  }
}
