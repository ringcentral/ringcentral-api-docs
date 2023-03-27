#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

RECIPIENT = ENV['FAX_RECIPIENT']

$rc = RingCentral.new( ENV['RC_CLIENT_ID'],
                       ENV['RC_CLIENRT_SECRET'],
                       ENV['RC_SERVER_URL'] )

$rc.authorize( jwt: ENV['RC_JWT'] )

endpoint = '/restapi/v1.0/account/~/extension/~/fax'
payload = {
  to: [{ phoneNumber: RECIPIENT }],
  faxResolution: "High",
  coverPageText: "This is a demo Fax page from Ruby"
}
files = [
  ['test.jpg', 'image/jpeg']
]
resp = rc.post( endpoint, payload: payload, files: files )

puts 'Fax sent. Current status: ' + resp.body['messageStatus']
