events = [
  '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
]
s = PubNub.new($rc, events, lambda { |message|
                 callback.call(message)
               })
s.subscribe()
