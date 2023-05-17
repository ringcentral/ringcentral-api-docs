require 'ringcentral'
require 'dotenv'
# Remember to modify the path to where you saved your .env file!
Dotenv.load("./../.env")

# For the purpose of testing the code, we put the deliver address in the environment variable.
# Feel free to set the delivery address directly.
DELIVERY_ADDRESS = ENV['WEBHOOK_DELIVERY_ADDRESS'] + "/webhook"

#
# Create a Webhok notification and subscribe for instant SMS message notification
#
def subscribe_for_notification()
  begin
    eventFilters = ['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS']
    bodyParams = {
      eventFilters: eventFilters,
      deliveryMode: {
        transportType: 'WebHook',
        address: DELIVERY_ADDRESS
      },
      expiresIn: 3600
    }
    endpoint = "/restapi/v1.0/subscription"
    resp = $platform.post(endpoint, payload: bodyParams)
    if (resp.status == 200)
      puts (resp.body)
      puts ("Subscription id: " + resp.body['id'])
      puts ("Ready to receive incoming SMS via WebHook.")
    else
      puts ("Webhook creation failed.")
      puts (resp.body)
    end
  rescue StandardError => e
    puts e
  end
end

#
# Read all created subscriptions
#
def read_subscriptions()
  begin
    endpoint = "/restapi/v1.0/subscription"
    resp = $platform.get(endpoint)
    if (resp.body['records'].length == 0)
      puts ("No subscription.")
    else
      for record in resp.body['records'] do
        puts JSON.pretty_generate(JSON.parse(record.to_json))
        delete_subscription(record['id'])
      end
    end
  rescue StandardError => e
    puts e
  end
end

#
# Delete a subscription identified by the subscription id
#
def delete_subscription(subscriptionId)
  begin
    endpoint = "/restapi/v1.0/subscription/" + subscriptionId
    resp = $platform.delete(endpoint)
    puts ("Subscription " + subscriptionId + " deleted.")
  rescue StandardError => e
    puts e
  end
end

# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( ENV['RC_CLIENT_ID'], ENV['RC_CLIENT_SECRET'], ENV['RC_SERVER_URL'] )

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: ENV['RC_JWT'])
    subscribe_for_notification()
    #read_subscriptions()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end

login()
