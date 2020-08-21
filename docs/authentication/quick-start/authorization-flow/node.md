no_breadcrumb:true

# Authorization Flow Authentication - JavaScript Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you authorize a user to login with username and password to get an access token and a refresh token. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create User Login App" button below. Enter a name and description if you want to change them, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Authorization+Flow+Quick+Start+App&desc=A+simple+app+to+demo+authorizing+user+on+RingCentral&public=false&type=ServerWeb&carriers=7710,7310,3420&permissions=ReadAccounts,ReadCallLog&redirectUri=http://localhost:5000/oauth2callback&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create User Login App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "API App for RingCentral Office" under "What type of app are you creating?"</li>
<li>Select "Web server" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>ReadAccounts</li>
    <li>ReadCallLog</li>
  </ul>
  </li>
<li>Specify the redirect Uri as http://localhost:5000/oauth2callback.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Authorization Flow

### Install RingCentral JavaScript SDK and some dependencies

```bash
$ npm install @ringcentral/sdk --save
$ npm install express --save
$ npm install express-session --save
$ npm install ejs --save
```

### Create and Edit index.js

Create a file called <tt>index.js</tt>. Be sure to edit the variables in &lt;ALL CAPS> with your app credentials. In this file, we'll implement code to start a Web server and a few functions to handle express routing.

```javascript
var app = require('express')();
var session = require('express-session');
var RingCentral = require('@ringcentral/sdk').SDK;
var path = require('path')

app.use(session({ secret: 'somesecretstring', tokens: ''}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const RINGCENTRAL_CLIENT_ID= '<ENTER CLIENT ID>'
const RINGCENTRAL_CLIENT_SECRET= '<ENTER CLIENT SECRET>'
const RINGCENTRAL_SERVER_URL= 'https://platform.devtest.ringcentral.com'
const RINGCENTRAL_REDIRECT_URL= 'http://localhost:5000/oauth2callback'

var rcsdk = new RingCentral({
  server: RINGCENTRAL_SERVER_URL,
  clientId: RINGCENTRAL_CLIENT_ID,
  clientSecret: RINGCENTRAL_CLIENT_SECRET,
  redirectUri: RINGCENTRAL_REDIRECT_URL
});

var server = require('http').createServer(app);
server.listen(5000);
console.log("listen to port 5000")

app.get('/index', function (req, res) {
  res.redirect("/")
})
app.get('/', function (req, res) {
    var platform = rcsdk.platform()
    if (req.session.tokens != undefined){
        var tokensObj = req.session.tokens
        platform.auth().setData(tokensObj);
        platform.loggedIn().then(function(isLoggedIn) {
          if (isLoggedIn) {
            return res.render('test')
          }
          res.render('index', {
              authorize_uri: platform.loginUrl({
                brandId: ''
              })
          });
        })
        return;
    }
    res.render('index', {
        authorize_uri: platform.loginUrl({
          brandId: ''
        })
    });
})

app.get('/logout', function(req, res) {
  if (req.session.tokens != undefined){
      var tokensObj = req.session.tokens
      var platform = rcsdk.platform()
      platform.auth().setData(tokensObj)
      platform.loggedIn().then(function(isLoggedIn) {
        if (isLoggedIn) {
          platform.logout()
            .then(function(resp){
                console.log("logged out")
            })
            .catch(function(e){
                console.log(e)
            });
        }
        req.session.tokens = null
        res.redirect("/")
      });
      return
  }
  res.redirect("/")
})

app.get('/oauth2callback', function(req, res) {
  if (req.query.code) {
      var platform = rcsdk.platform()
      platform.login({
          code: req.query.code,
      })
      .then(function(response) {
        return response.json()
      })
      .then(function (token) {
          req.session.tokens = token
          res.redirect("/test")
      })
      .catch(function (e) {
          res.send('Login error ' + e)
      });
  }else {
      res.send('No Auth code');
  }
});

app.get('/test', function(req, res) {
  if (req.session.tokens != undefined){
      var tokensObj = req.session.tokens
      var platform = rcsdk.platform()
      platform.auth().setData(tokensObj)
      platform.loggedIn().then(function(isLoggedIn) {
        if (isLoggedIn) {
          if (req.query.api == "extension"){
            var endpoint = "/restapi/v1.0/account/~/extension"
            return callGetEndpoint(platform, endpoint, res)
          } else if (req.query.api == "extension-call-log"){
            var endpoint = "/restapi/v1.0/account/~/extension/~/call-log"
            return callGetEndpoint(platform, endpoint, res)
          } if (req.query.api == "account-call-log"){
            var endpoint = "/restapi/v1.0/account/~/call-log"
            return callGetEndpoint(platform, endpoint, res)
          }
        }
        res.redirect("/")
      })
      return;
  }
  res.redirect("/")
});

function callGetEndpoint(platform, endpoint, res){
    platform.get(endpoint)
    .then(function(resp){
      return resp.json()
    })
    .then(function(json) {
      res.send(JSON.stringify(json))
    })
    .catch(function(e){
        res.send("Error")
    })
}
```

### Create a __views__ folder and create an index.ejs and a test.ejs files under the views folder

Create a file called <tt>index.ejs</tt>. In this file, we'll implement the login page.

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>RingCentral Authorization Code Flow Authentication</title>
  </head>
  <body>
    <h2>
        RingCentral Authorization Code Flow Authentication
    </h2>
    <a href="<%- authorize_uri %>">Login RingCentral Account</a>
  </body>
</html>
```

Create a file called <tt>test.ejs</tt>. In this file, we'll add a few API call test cases and a logout button.

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
  <b><a href="/logout">Logout</a></b>
  <h2>Call APIs</h2>
  <ul>
      <li><a href="/test?api=extension">Read Extension Info</a></li>
      <li><a href="/test?api=extension-call-log">Read Extension Call Log</a></li>
      <li><a href="/test?api=account-call-log">Read Account Call Log</a></li>
  </ul>
</body>
</html>
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ node index.js
```

Open a Web browser and load localhost:5000

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
