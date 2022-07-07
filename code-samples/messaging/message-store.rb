require 'ringcentral'
require 'dotenv/load'

CLIENTID     = ENV['RC_CLIENT_ID']
CLIENTSECRET = ENV['RC_CLIENRT_SECRET']
SERVER       = ENV['RC_SERVER_URL']
JWT          = ENV['RC_JWT']

$rc = RingCentral.new(CLIENTID, CLIENTSECRET, SERVER)
$rc.authorize(jwt: JWT)

response = $rc.get('/account/~/extension/~/message-store',
    {
	     messageType: 'SMS'
    })
puts response.body
