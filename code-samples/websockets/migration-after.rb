events = [
  '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
]
s = rcsdk.create_subscription()
s.add_events( events )
s.on( Events.notification, lambda { |message| 
        callback.call(message) })
s.subscribe()
