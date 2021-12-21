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
    enabled: true,
    type: 'Custom',
    name: 'My weekly meetings',
    schedule: {
      weeklyRanges: {
	monday: [{ from: "09:00", to: "10:00" }],
	friday: [{ from: "10:00", to: "15:00" }]
      }
    },
    callHandlingAction: "TakeMessagesOnly",
}
resp = $rc.post('/restapi/v1.0/account/~/extension/~/answering-rule',
                payload: params)

puts resp.body
