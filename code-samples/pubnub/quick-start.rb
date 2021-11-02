require 'ringcentral'
require 'subscription'
require 'dotenv/load'

CLIENTID     = ENV['RC_CLIENT_ID']
CLIENTSECRET = ENV['RC_CLIENRT_SECRET']
SERVER       = ENV['RC_SERVER_URL']
USERNAME     = ENV['RC_USERNAME']
PASSWORD     = ENV['RC_PASSWORD']
EXTENSION    = ENV['RC_EXTENSION']

$rc = RingCentral.new(CLIENTID, CLIENTSECRET, SERVER)
$rc.authorize(username: USERNAME, extension: EXTENSION, password: PASSWORD)

def createSubscription(callback)
    events = [
        '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
    ]
    subscription = PubNub.new($rc, events, lambda { |message|
        callback.call(message)
    })
    subscription.subscribe()
    puts "Waiting for incoming SMS message ..."
    while 1
        sleep(5)
    end
end

createSubscription(lambda { |msg|
    puts msg
})

