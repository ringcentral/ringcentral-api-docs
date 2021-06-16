var app = require('express')();
var session = require('express-session');
var RingCentral = require('@ringcentral/sdk').SDK;
var path = require('path')

var usePKCE = false; // change to true for enabling authorization code with PKCE flow

app.use(session({ secret: 'somesecretstring', tokens: '' }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const RINGCENTRAL_CLIENT_ID = '<ENTER CLIENT ID>'
const RINGCENTRAL_CLIENT_SECRET = '<ENTER CLIENT SECRET>'
const RINGCENTRAL_SERVER_URL = 'https://platform.devtest.ringcentral.com'
const RINGCENTRAL_REDIRECT_URL = 'http://localhost:5000/oauth2callback'

var rcsdk = new RingCentral({
  server: RINGCENTRAL_SERVER_URL,
  clientId: RINGCENTRAL_CLIENT_ID,
  clientSecret: RINGCENTRAL_CLIENT_SECRET,
  redirectUri: RINGCENTRAL_REDIRECT_URL
});

var server = require('http').createServer(app);
server.listen(5000);
console.log("listen to port 5000")

app.get('/index', function(req, res) {
  res.redirect("/")
})

app.get('/', async function(req, res) {
  var platform = rcsdk.platform()
  if (req.session.tokens != undefined) {
    platform.auth().setData(req.session.tokens)
    if (await platform.loggedIn()) {
      return res.render('test')
    }
  } else {
    res.render('index', {
      authorize_uri: platform.loginUrl({
        redirectUri: RINGCENTRAL_REDIRECT_URL,
        usePKCE,
      })
    });
  }
})

app.get('/logout', async function(req, res) {
  if (req.session.tokens != undefined) {
    var platform = rcsdk.platform()
    platform.auth().setData(req.session.tokens)
    if (platform.loggedIn()) {
      try {
        var resp = await platform.logout()
        console.log("logged out")
      } catch (e) {
        console.log(e)
      }
    }
    req.session.tokens = null
  }
  res.redirect("/")
});

app.get('/oauth2callback', async function(req, res) {
  if (req.query.code) {
    try {
      var platform = rcsdk.platform()
      var resp = await platform.login({
        code: req.query.code,
        redirectUri: RINGCENTRAL_REDIRECT_URL
      })
      req.session.tokens = await resp.json()
      console.log(req.session.tokens)
      res.redirect("/test")
    } catch (e) {
      res.send('Login error ' + e);
    }
  } else {
    res.send('No Auth code');
  }
});

app.get('/test', function(req, res) {
  if (req.session.tokens != undefined) {
    var platform = rcsdk.platform()
    platform.auth().setData(req.session.tokens)
    if (platform.loggedIn()) {
      if (req.query.api == "extension") {
        var endpoint = "/restapi/v1.0/account/~/extension"
        var params = {}
        return callGetMethod(platform, endpoint, params, res)
      } else if (req.query.api == "extension-call-log") {
        var endpoint = "/restapi/v1.0/account/~/extension/~/call-log"
        var params = {}
        return callGetMethod(platform, endpoint, params, res)
      } else if (req.query.api == "account-call-log") {
        var endpoint = "/restapi/v1.0/account/~/call-log"
        var params = {}
        return callGetMethod(platform, endpoint, params, res)
      }
    }
  }
  res.redirect("/")
});

async function callGetMethod(platform, endpoint, params, res) {
  try {
    var resp = await platform.get(endpoint, params)
    var jsonObj = await resp.json()
    res.send(JSON.stringify(jsonObj))
  } catch (e) {
    res.send("Error: " + e.message)
  }
}
