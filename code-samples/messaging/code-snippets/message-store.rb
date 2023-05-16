require 'ringcentral'

# Read the current authenticated user's message store.
def read_extension_message_store()
  begin
    queryParams = {
        'dateFrom': "2023-01-01T00:00:00.000Z",
        'dateTo': "2023-01-31T23:59:59.999Z",
        'messageType': ["SMS", "Fax"],
        'perPage': 1000
      }
    endpoint = "/restapi/v1.0/account/~/extension/~/message-store"
    resp = $platform.get(endpoint, queryParams)
    for record in resp.body['records'] do
      puts JSON.pretty_generate(JSON.parse(record.to_json))
    end
  rescue StandardError => e
    puts (e)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "SANDBOX_JWT" )
    read_extension_message_store()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
