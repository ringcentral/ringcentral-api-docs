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

resp = $rc.get('/restapi/v1.0/account/~/extension/~/answering-rule', {
    view: "Detailed",
    enabledOnly: false
})
for record in resp.body['records'] do
    rule = $rc.get('/restapi/v1.0/account/~/extension/~/answering-rule/' + record['id'])
    puts rule.body
end
