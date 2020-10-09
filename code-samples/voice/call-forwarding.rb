require 'ringcentral'

$rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
$rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

params = {
    phoneNumber: '11235557890',
    type: 'Other',
    label: 'My ATT number'
}
resp = rc.post('/restapi/v1.0/account/~/extension/~/forwarding-number', payload: params)

puts 'Forwarding number created.'
puts resp.body['id']
