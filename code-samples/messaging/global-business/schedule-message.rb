require 'messente_api'

MessenteApi.configure do |config|
  config.username = 'YOUR_MESSENTE_API_USERNAME'
  config.password = 'YOUR_MESSENTE_API_PASSWORD'
end

api_instance = MessenteApi::OmnimessageApi.new

sms = MessenteApi::SMS.new(
  sender: '<sender name (optional)>',
  text: 'hello sms'
)

omnimessage = MessenteApi::Omnimessage.new(
  to: '<recipient_phone_number>',
  time_to_send: '2019-06-22T09:05:07+04:00',
  messages: [sms]
)

begin
  result = api_instance.send_omnimessage(omnimessage)
  puts result
rescue MessenteApi::ApiError => e
  puts "Exception when scheduling an omnimessage: #{e}"
  puts e.response_body
end
