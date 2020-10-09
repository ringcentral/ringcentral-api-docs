require 'ringcentral'

rc = RingCentral.new(
  'client_id',
  'client_secret',
  'https://platform.ringcentral.com')

rc.authorize(
  username: '+16505550100',
  extension: '',
  password:  'my_password')

res = rc.post '/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/supervise', payload: {  
   "mode": "Listen",
   "extensionNumber": "108",
   "deviceId": "60727004"
}
