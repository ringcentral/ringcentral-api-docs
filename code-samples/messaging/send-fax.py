from ringcentral import SDK

RECIPIENT = '<ENTER FAX NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

builder = rcsdk.create_multipart_builder()
builder.set_body({
    'to': [{'phoneNumber': RECIPIENT}],
    'faxResolution': "High",
    'coverPageText': "This is a demo Fax page from Python"
})

attachment = ('test.jpg', open('test.jpg','r').read(), 'image/jpeg')
builder.add(attachment)
    
request = builder.request('/account/~/extension/~/fax')

resp = platform.send_request(request)
print 'Fax sent. Message status: ' + resp.json().messageStatus
