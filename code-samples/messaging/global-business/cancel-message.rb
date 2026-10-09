require 'messente_api'

MessenteApi.configure do |config|
  config.username = 'YOUR_MESSENTE_API_USERNAME'
  config.password = 'YOUR_MESSENTE_API_PASSWORD'
end

api_instance = MessenteApi::OmnimessageApi.new

begin
  api_instance.cancel_scheduled_message('<omnimessage_id>')
  puts 'Scheduled omnimessage cancelled'
rescue MessenteApi::ApiError => e
  puts "Exception when cancelling an omnimessage: #{e}"
  puts e.response_body
end
