from ringcentral import SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

params = {
    'topic': 'Test Meeting 1',
    'meetingType': 'Instant',
    'allowJoinBeforeHost': True,
    'startHostVideo': True,
    'startParticipantsVideo' : False
}
try:
    resp = platform.post('/restapi/v1.0/account/~/extension/~/meeting', params)
    print(f'Start Your Meeting: {resp.json().links.startUri}')
    print(f'Join the Meeting: {resp.json().links.joinUri}')
except Exception as err:
    print("Exception: " + err.message)
