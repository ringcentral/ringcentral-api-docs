#!/usr/bin/env python
# auth/quick-start/python/index.py - This script renders an HTML page
#
# Variables:
# RC_CLIENT_ID, RC_CLIENT_SECRET, RC_SERVER_URL: Connection info
# RC_USERNAME, RC_PASSWORD, RC_EXTENSION: Auth credentials
#
#
# License: MIT
# Copyright: 2021 RingCentral, Inc. 
from ringcentral import SDK
import logging,os,sys,urllib
from flask import Flask, render_template, request, session

app = Flask(__name__)
app.secret_key = 'somesecretstring'

CLIENTID     = os.environ.get('RC_CLIENT_ID')
CLIENTSECRET = os.environ.get('RC_CLIENT_SECRET')
SERVER       = os.environ.get('RC_SERVER_URL')
USERNAME     = os.environ.get('RC_USERNAME')
PASSWORD     = os.environ.get('RC_PASSWORD')
EXTENSION    = os.environ.get('RC_EXTENSION')
REDIRECT_URL = os.environ.get('RC_REDIRECT_URL')

rcsdk = SDK(CLIENTID, CLIENTSECRET, SERVER)

@app.route('/')
@app.route('/index')
def login():
    base_url = SERVER + '/restapi/oauth/authorize'
    params = (
        ('response_type', 'code'),
        ('redirect_uri', REDIRECT_URL),
        ('client_id', CLIENTID),
        ('state', 'initialState')
    )
    auth_url = base_url + '?' + urllib.parse.urlencode(params)
    return render_template('index.html', authorize_uri=auth_url)

@app.route('/oauth2callback', methods=['GET'])
def oauth2callback():
    platform = rcsdk.platform()
    auth_code = request.values.get('code')
    platform.login('', '', '', auth_code, REDIRECT_URL)
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
