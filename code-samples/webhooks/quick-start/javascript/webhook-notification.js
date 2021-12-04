const RC = require('@ringcentral/sdk').SDK
var http = require('http');
require('dotenv').config();

PORT             = 5000
DELIVERY_ADDRESS = '<https://xxxxxxxx.ngrok.io/webhook>'

var server = http.createServer(function(req, res) {
  if (req.method == 'POST') {
    if (req.url == "/webhook") {
      if (req.headers.hasOwnProperty("validation-token")) {
        res.setHeader('Validation-Token', req.headers['validation-token']);
        res.statusCode = 200;
        res.end();
      } else {
        var body = []
        req.on('data', function(chunk) {
          body.push(chunk);
        }).on('end', function() {
          body = Buffer.concat(body).toString();
          var jsonObj = JSON.parse(body)
          console.log(jsonObj.body);
        });
      }
    }
  } else {
    console.log("IGNORE OTHER METHODS")
  }
});
server.listen(PORT);

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({
    'username':  process.env.RC_USERNAME,
    'password':  process.env.RC_PASSWORD,
    'extension': process.env.RC_EXTENSION
})

platform.on(platform.events.loginSuccess, function(e) {
  console.log("Login success")
  subscribe_for_notification()
});

async function subscribe_for_notification() {
  var params = {
    eventFilters: ['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'],
    deliveryMode: {
      transportType: "WebHook",
      address: DELIVERY_ADDRESS
    }
  }
  try {
    var resp = await platform.post('/restapi/v1.0/subscription', params)
    var jsonObj = await resp.json()
    console.log(jsonObj.id)
    console.log("Ready to receive incoming SMS via WebHook.")
  } catch (e) {
    console.error(e.message);
    throw e;
  }
}
