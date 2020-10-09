require 'ringcentral'

rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
rc.authorize( username:  'username', extension: 'extension_number', password:  'password')
response = rc.get('/account/~/extension/~/message-store',
    {
	messageType: 'SMS'
    })
puts response.body
