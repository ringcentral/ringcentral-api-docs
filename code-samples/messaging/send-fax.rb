require 'ringcentral'

RECIPIENT = '<ENTER FAX NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

resp = rc.post('/restapi/v1.0/account/~/extension/~/fax', payload: {
                 to: [{ phoneNumber: RECIPIENT }],
                 faxResolution: "High",
                 coverPageText: "This is a demo Fax page from Ruby"
               },
               files: [
                 ['test.jpg', 'image/jpeg']
               ]
              )

puts 'Fax sent. Current status: ' + resp.body['messageStatus']
