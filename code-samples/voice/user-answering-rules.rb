#!usr/bin/ruby

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new(ENV['RC_APP_CLIENT_ID'],
                      ENV['RC_APP_CLIENT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_USER_JWT'])

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
resp = $rc.post('/restapi/v1.0/account/~/extension/~/answering-rule', payload: params)

puts resp.body
