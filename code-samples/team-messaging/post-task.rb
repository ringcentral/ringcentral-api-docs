require 'ringcentral'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

CHAT_ID = '<GROUP ID>'

rc = RingCentral.new(RINGCENTRAL_CLIENTID,
                     RINGCENTRAL_CLIENTSECRET,
                     RINGCENTRAL_SERVER)
rc.authorize(username: RINGCENTRAL_USERNAME,
             extension: RINGCENTRAL_EXTENSION,
             password: RINGCENTRAL_PASSWORD)

resp = rc.post('/restapi/v1.0/glip/chats/'+CHAT_ID+'/tasks', payload: {
    "subject": "You need to do X",
    "assignees": {
       "id": "<ID>"
    },
    "description": "In this task assignees will need to do x, y and z."
})

puts resp.body
