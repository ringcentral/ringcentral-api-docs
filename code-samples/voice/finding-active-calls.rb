require 'ringcentral'

rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

resp = rc.get('/restapi/v1.0/account/~/extension/~/active-calls', {
    view: 'Simple'
})

for record in resp.body['records'] do
    puts "Call result: " + record['result']
end
