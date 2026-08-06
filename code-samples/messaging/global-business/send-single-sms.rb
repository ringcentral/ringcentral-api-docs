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
  messages: [sms]
)

begin
  result = api_instance.send_omnimessage(omnimessage)
  puts result
rescue MessenteApi::ApiError => e
  puts "Exception when calling send_omnimessage: #{e}"
  puts e.response_body
end
