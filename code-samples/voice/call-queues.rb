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

response = $rc.get('/restapi/v1.0/account/~/call-queues')
for group in response.body['records'] do
    if group['name'] == "Support Department"
	params = {
	  addedExtensionIds: ["888888888", "999999999"]
	}
	response = $rc.post('/restapi/v1.0/account/~/call-queues/'+group['id']+'/bulk-assign',
                            payload: params)
	puts response.status
	break
    end
end
