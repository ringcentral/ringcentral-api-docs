require 'messente_api'

MessenteApi.configure do |config|
  config.username = 'YOUR_MESSENTE_API_USERNAME'
  config.password = 'YOUR_MESSENTE_API_PASSWORD'
end

api_instance = MessenteApi::DeliveryReportApi.new

begin
  result = api_instance.retrieve_delivery_report('<omnimessage_id>')
  puts result
rescue MessenteApi::ApiError => e
  puts "Exception when retrieving delivery report: #{e}"
  puts e.response_body
end
