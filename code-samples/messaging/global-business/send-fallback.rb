require 'messente_api'

# setup authorization
MessenteApi.configure do |config|
    # Configure HTTP basic authorization: basicAuth
    config.username = '<MESSENTE_API_USERNAME>'
    config.password = '<MESSENTE_API_PASSWORD>'
end

api_instance = MessenteApi::OmnimessageApi.new
omnimessage = MessenteApi::Omnimessage.new
omnimessage.to = '<recipient_phone_number>'

sms = MessenteApi::SMS.new(
    sender: "<sender name (optional)>",
    text: "Hello SMS!"
)

omnimessage.messages = [sms]

begin
  result = api_instance.send_omnimessage(omnimessage)
  puts result
rescue MessenteApi::ApiError => e
  puts "Exception when calling send_omnimessage: #{e}"
  puts e.response_body
end
