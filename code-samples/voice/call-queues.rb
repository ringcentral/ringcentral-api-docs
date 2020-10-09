require 'ringcentral'

rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

response = rc.get('/restapi/v1.0/account/~/call-queues')
for group in response.body['records'] do
    if group['name'] == "Support Department"
	params = {
	  addedExtensionIds: ["888888888", "999999999"]
	}
	response = rc.post('/restapi/v1.0/account/~/call-queues/'+group['id']+'/bulk-assign', payload: params)
	puts response.status
	break
    end
end
