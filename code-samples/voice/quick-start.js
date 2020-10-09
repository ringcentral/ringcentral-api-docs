const RingCentral = require('@ringcentral/sdk').SDK

RECIPIENT = '<ENTER PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RingCentral({ server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET });
var platform = rcsdk.platform();
platform.login({ username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION })

platform.on(platform.events.loginSuccess, function(response) {
  call_ringout()
})

async function call_ringout() {
  try {
    var resp = await platform.post('/restapi/v1.0/account/~/extension/~/ring-out', {
      'from': { 'phoneNumber': RINGCENTRAL_USERNAME },
      'to': { 'phoneNumber': RECIPIENT },
      'playPrompt': false
    })
    var jsonObj = await resp.json()
    console.log("Call placed. Call status: " + jsonObj.status.callStatus)
  } catch (e) {
    console.log(e.message)
  }
}