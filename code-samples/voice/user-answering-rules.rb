require 'ringcentral'

$rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
$rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

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
resp = rc.post('/restapi/v1.0/account/~/extension/~/answering-rule', payload: params)

puts resp.body
