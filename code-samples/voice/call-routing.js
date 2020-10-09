const RingCentral = require('@ringcentral/sdk').SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RingCentral({ server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET })

var platform = rcsdk.platform();

platform.login({ username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION })

platform.on(platform.events.loginSuccess, function(response) {
  get_user_call_answering_rules()
})

async function get_user_call_answering_rules() {
  try {
    var resp = await platform.get('/restapi/v1.0/account/~/extension/~/answering-rule', {
      'view': "Detailed",
      'enabledOnly': false
    })
    var jsonObj = await resp.json()
    for (var record of jsonObj.records) {
      get_user_call_answering_rule(record.id)
    }
  } catch (e) {
    console.log(e.message)
  }
}

async function get_user_call_answering_rule(id) {
  try {
    var resp = await platform.get('/restapi/v1.0/account/~/extension/~/answering-rule/' + id)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  } catch (e) {
    console.log(e.message)
  }
}