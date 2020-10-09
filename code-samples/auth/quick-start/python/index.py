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
    auth_url = base_url + '?' + urllib.parse.urlencode(params)
    return render_template('index.html', authorize_uri=auth_url)

@app.route('/oauth2callback', methods=['GET'])
def oauth2callback():
    platform = rcsdk.platform()
    auth_code = request.values.get('code')
    platform.login('', '', '', auth_code, RINGCENTRAL_REDIRECT_URL)
    tokens = platform.auth().data()
    session['sessionAccessToken'] = tokens
    return render_template('test.html')

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
