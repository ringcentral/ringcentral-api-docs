require 'ringcentral'
require 'subscription'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

$rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
$rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

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

