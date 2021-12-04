require 'ringcentral'
require 'dotenv/load'

CLIENTID     = ENV['RC_CLIENT_ID']
CLIENTSECRET = ENV['RC_CLIENRT_SECRET']
SERVER       = ENV['RC_SERVER_URL']
USERNAME     = ENV['RC_USERNAME']
PASSWORD     = ENV['RC_PASSWORD']
EXTENSION    = ENV['RC_EXTENSION']

$rc = RingCentral.new(CLIENTID, CLIENTSECRET, SERVER)
$rc.authorize(username: USERNAME, extension: EXTENSION, password: PASSWORD)

params = {
    phoneNumber: '11235557890',
    type: 'Other',
    label: 'My ATT number'
}
resp = $rc.post('/restapi/v1.0/account/~/extension/~/forwarding-number',
                payload: params)

puts 'Forwarding number created.'
puts resp.body['id']
