require 'ringcentral'

rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
rc.authorize( username:  'username', extension: 'extension_number', password:  'password')
response = rc.get ('/restapi/v1.0/account/~/extension/~/phone-number')

for record in response.body['records'] do
  for feature in record['features'] do
    if feature == "A2PSmsSender"
      if record.paymentType == "TollFree"
      	puts "This phone number " + record['phoneNumber'] + " is a toll-free number and provisioned for using to send high volume SMS"
      else
      	puts "This phone number " + record['phoneNumber'] + " is a 10-DLC local number and provisioned for using to send high volume SMS"
      end
    end
  end
end
