no_breadcrumb:true

# Authorization Flow Authentication Python Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you authorize a user to login with username and password to get an access token and a refresh token. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create User Login App" button below. Enter a name and description if you want to change them, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Authorization+Flow+Quick+Start+App&desc=A+simple+app+to+demo+authorizing+user+on+RingCentral&public=false&type=ServerWeb&carriers=7710,7310,3420&permissions=ReadAccounts,ReadCallLog&redirectUri=http://localhost:5000/oauth2callback" class="btn btn-primary">Create User Login App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Give your app a name and description, then click Next.</li>
<li>On the second page of the create app wizard enter the following:
  <ul>
  <li>Select 'Private' for Application Type.</li>
  <li>Select 'Server/Web' for Platform Type.</li>
  </ul>
  </li>
<li>On the third page of the create app wizard, select the following permissions:
  <ul>
    <li>ReadAccounts,ReadCallLog</li>
  </ul>
  </li>
<li>Specify the redirect Uri as http://localhost:5000/oauth2callback.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Authorization Flow

### Install RingCentral Python SDK and Flask framework

```bash
$ pip install ringcentral
$ pip install flask
```

### Create an index.py

Create a file called <tt>index.py</tt>. Be sure to edit the variables in &lt;ALL CAPS> with your app credentials.

```python
from ringcentral import SDK
import urllib
from flask import Flask, render_template, request, session

app = Flask(__name__)
app.secret_key = 'somesecretstring'

RINGCENTRAL_CLIENT_ID= '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENT_SECRET= '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER_URL= 'https://platform.devtest.ringcentral.com'
RINGCENTRAL_REDIRECT_URL= 'http://localhost:5000/oauth2callback'

rcsdk = SDK(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_SERVER_URL)

@app.route('/')
@app.route('/index')
def login():
    base_url = RINGCENTRAL_SERVER_URL + '/restapi/oauth/authorize'
    params = (
        ('response_type', 'code'),
        ('redirect_uri', RINGCENTRAL_REDIRECT_URL),
        ('client_id', RINGCENTRAL_CLIENT_ID),
        ('state', 'initialState')
    )
    auth_url = base_url + '?' + urllib.urlencode(params)
    redirect_uri = RINGCENTRAL_REDIRECT_URL
    return render_template('index.html', authorize_uri=auth_url, redirect_uri=RINGCENTRAL_REDIRECT_URL)

@app.route('/oauth2callback', methods=['GET'])
def oauth2callback():
    platform = rcsdk.platform()
    auth_code = request.values.get('code')
    platform.login('', '', '', auth_code, RINGCENTRAL_REDIRECT_URL)
    tokens = platform.auth().data()
    session['sessionAccessToken'] = tokens
    return "Login successfully"

@app.route('/test', methods=['GET'])
def callapi():
    platform = rcsdk.platform()
    platform.auth().set_data(session['sessionAccessToken'])
    if platform.logged_in() == False:
        return login()
    api = request.values.get('api')
    if api == "extension":
        resp = platform.get("/restapi/v1.0/account/~/extension")
        return resp.response()._content
    elif api == "extension-call-log":
        resp = platform.get("/restapi/v1.0/account/~/extension/~/call-log")
        return resp.response()._content
    elif api == "account-call-log":
        resp = platform.get("/restapi/v1.0/account/~/call-log")
        return resp.response()._content
    else:
        return render_template('test.html')

@app.route('/logout', methods=['GET'])
def logout():
    platform = rcsdk.platform()
    platform.auth().set_data(session['sessionAccessToken'])
    if platform.logged_in():
        platform.logout()
    session.pop('sessionAccessToken', None)
    return login()
```

### Create a templates folder and create an index.html and a test.html file under the templates folder

Create a file called <tt>index.html</tt>. In this file, we'll implement the login page.

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>RingCentral Authorization Code Flow Authentication</title>
    <script>
        var url = '{{ authorize_uri }}';
        url = url.replace(/&amp;/g, '&');
        var config = {
            authUri: url,
            redirectUri: '{{ redirect_uri }}',
          }

        var OAuthCode = function(config) {
            this.config = config;
            this.loginPopup  = function() {
                this.loginPopupUri(this.config['authUri'], this.config['redirectUri']);
            }
            this.loginPopupUri  = function(authUri, redirectUri) {
                var win         = window.open(authUri, 'windowname1', 'width=800, height=600');
                var pollOAuth   = window.setInterval(function() {
                    try {
                        console.log(win.document.URL);
                        if (win.document.URL.indexOf(redirectUri) != -1) {
                            window.clearInterval(pollOAuth);
                            win.close();
                            window.location.href = "/callapis?api"
                        }
                    } catch(e) {
                        console.log(e)
                    }
                }, 100);
            }
        }
        var oauth = new OAuthCode(config);
    </script>
</head>
<body>
  <div align="justify">
    <div style="width:500px">
      <p>
        <b>Important!</b> You need to enable pop-up for this web site in order to login your RingCentral via this Web app.
      </p>
    </div>
    <button onclick="oauth.loginPopup()">Login RingCentral Account</button>
  </div>
</body>
</html>
```
Create a file called <tt>test.html</tt>. In this file, we'll add a few API call test cases and a logout button.

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
$ FLASK_APP=index.py flask run
```

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
