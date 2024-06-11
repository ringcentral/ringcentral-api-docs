require 'ringcentral'

#
# Create a personal reusable SMS template
#
def create_user_sms_template()
  begin
    bodyParams = {
        'displayName': "Weekly meeting reminder",
        'body': { 'text': "Please update your slides before the meeting." }
    }
    endpoint = "/restapi/v1.0/account/~/extension/~/message-store-templates"
    resp = $platform.post(endpoint, payload: bodyParams)
    puts JSON.pretty_generate(JSON.parse(resp.body.to_json))
  rescue StandardError => e
    puts ("Unable to create a user SMS template." + e.to_s)
  end
end

#
# List personal reusable SMS templates
#
def list_user_sms_template()
  begin
    endpoint =  "/restapi/v1.0/account/~/extension/~/message-store-templates"
    resp = $platform.get(endpoint)
    puts JSON.pretty_generate(JSON.parse(resp.body.to_json))
  rescue StandardError => e
    puts ("Unable to list user SMS templates." + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "PRODUCTION_JWT" )
    create_user_sms_template()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
