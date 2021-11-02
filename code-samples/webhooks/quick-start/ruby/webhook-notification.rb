require 'ringcentral'
require 'dotenv/load'

CLIENTID         = ENV['RC_CLIENT_ID']
CLIENTSECRET     = ENV['RC_CLIENRT_SECRET']
SERVER           = ENV['RC_SERVER_URL']
USERNAME         = ENV['RC_USERNAME']
PASSWORD         = ENV['RC_PASSWORD']
EXTENSION        = ENV['RC_EXTENSION']
DELIVERY_ADDRESS = '<https://xxxxxxxx.ngrok.io>'

$rc = RingCentral.new(CLIENTID, CLIENTSECRET, SERVER)
$rc.authorize(username: USERNAME, extension: EXTENSION, password: PASSWORD)

r = $rc.post('/restapi/v1.0/subscription', payload: {
    eventFilters: ['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'],
    deliveryMode: { transportType: 'WebHook', address: DELIVERY_ADDRESS }
})

puts r.body['id']
puts "WebHook Ready"

$rc.revoke()
