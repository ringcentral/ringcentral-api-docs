events = [
  '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
]
subscription = PubNub.new($rc, events, lambda { |message|
                            callback.call(message)
                          })
subscription.subscribe()
