#!/usr/bin/env python
from ringcentral import SDK
import logging,os,sys,urllib
from flask import Flask, render_template, request, session
from dotenv import load_dotenv
load_dotenv()

REDIRECT_URL = os.environ.get('RC_REDIRECT_URL')

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

app = Flask(__name__)
app.secret_key = 'somesecretstring'

@app.route('/')
@app.route('/index')
def login():
    base_url = SERVER + '/restapi/oauth/authorize'
    params = (
        ('response_type', 'code'),
        ('redirect_uri', REDIRECT_URL),
        ('client_id', os.environ.get('RC_CLIENT_ID')),
        ('state', 'initialState')
    )
    auth_url = base_url + '?' + urllib.parse.urlencode(params)
    return render_template('index.html', authorize_uri=auth_url)

@app.route('/oauth2callback', methods=['GET'])
def oauth2callback():
    platform = rcsdk.platform()
    auth_code = request.values.get('code')
    try:
        platform.login('', '', '', auth_code, REDIRECT_URL)
    except:
        sys.exit("Unable to authenticate to platform. Check credentials.")
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

def main():
    logging.info("Being run from the command line. Exiting safely.")
    sys.exit(0)
    
if __name__ == "__main__":
    main()
