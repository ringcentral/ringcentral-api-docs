const RC = require('@ringcentral/sdk').SDK;

const CLIENTID          = process.env.RC_CLIENT_ID;
const CLIENTSECRET      = process.env.RC_CLIENT_SECRET;
const SERVER            = process.env.RC_SERVER_URL;
const USERNAME          = process.env.RC_USERNAME;
const PASSWORD          = process.env.RC_PASSWORD;
const EXTENSION         = process.env.RC_EXTENSION;
const CALL_QUEUE_MEMBER = process.env.CALL_QUEUE_MEMBER;

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
    for (var group of jsonObj.records) {
      if (group.name == "Support Department") {
        add_new_members(group.id)
        break
      }
    }
  } catch (e) {
    console.log(e.message)
  }
}

async function add_new_members(groupId) {
  var params = {
    addedExtensionIds: ["888888888", "999999999"]
  }
  try {
    var resp = await platform.post('/restapi/v1.0/account/~/call-queues/' + groupId + '/bulk-assign', params)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  } catch (e) {
    console.log(e.message)
  }
}
