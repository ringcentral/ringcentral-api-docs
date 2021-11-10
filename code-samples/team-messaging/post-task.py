from ringcentral import SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

CHAT_ID = '<GROUP ID>'

rcsdk = SDK( RINGCENTRAL_CLIENTID,
             RINGCENTRAL_CLIENTSECRET,
             RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME,
               RINGCENTRAL_EXTENSION,
               RINGCENTRAL_PASSWORD)

endpoint = "/restapi/v1.0/glip/chats/" + CHAT_ID + '/tasks'
note = {
    "title": "This is a note",
    "body": "<strong>heading</strong><br><br>Any HTML can be entered here."
}

resp = platform.post(endpoint, note)
print(resp.text())
