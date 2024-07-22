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

resp = $rc.get('/restapi/v1.0/account/~/extension/~/answering-rule', {
    view: "Detailed",
    enabledOnly: false
})
for record in resp.body['records'] do
    rule = $rc.get('/restapi/v1.0/account/~/extension/~/answering-rule/' + record['id'])
    puts rule.body
end
