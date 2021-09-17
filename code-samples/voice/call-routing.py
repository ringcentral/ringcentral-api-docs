from ringcentral import SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

params = {
    'view': "Detailed",
    'enabledOnly': False
}

try:
    resp = platform.get('/account/~/extension/~/answering-rule', params)
    for record in resp.json().records:
        rule = platform.get('/account/~/extension/~/answering-rule/' + record.id)
        print (rule.text())
except Exception as e:
    print(e)
