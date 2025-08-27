from ringcentral import SDK
import asyncio
import os
from ringcentral.websocket.events import WebSocketEvents

# Send a reply message to a client number
def send_reply(body):
    try:
        textMessage = "Hi"
        if 'name' in body['from']:
            textMessage += " " + body['from']['name']
        textMessage += "\nThank you for your message. I’m currently on vacation and will be available after August 15th."
        bodyParams = {
             'from' : { 'phoneNumber': body['to'][0]['phoneNumber'] },
             'to'   : [ {'phoneNumber': body['from']['phoneNumber']} ],
             'text' : textMessage
        }
        endpoint = "/restapi/v1.0/account/~/extension/~/sms"
        refresh_token()
        resp = platform.post(endpoint, bodyParams)
        print("Replied.")
    except Exception as e:
        print (e)

def refresh_token():
    if platform.logged_in() == False:
        print("Both tokens expired => Relogin.")
        platform.login(jwt= "RC_USER_JWT")
    else:
        print("Token valid.")

#
# Receive inbound messages from WebSocket subscription event notification
#
def on_notification(message):
    send_reply(message[1]['body'])

def on_sub_created(sub):
    print("\n Subscription created:\n")
    print(sub.get_subscription_info())
    print("\n Please go and change your user status \n")

def on_ws_created(web_socket_client):
    print("\nNew WebSocket connection created:")

# Subscribe for the user instant message event notification
async def subscribe_for_instant_messages_notification():
    try:
        web_socket_client = rcsdk.create_web_socket_client()
        web_socket_client.on(WebSocketEvents.connectionCreated, on_ws_created)
        web_socket_client.on(WebSocketEvents.subscriptionCreated, on_sub_created)
        web_socket_client.on(WebSocketEvents.receiveSubscriptionNotification, on_notification)
        await asyncio.gather(
            web_socket_client.create_new_connection(),
            web_socket_client.create_subscription(["/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS"])
        )
    except KeyboardInterrupt:
        print("Stopped by User")

# Authenticate a user using a personal JWT token
def login():
    print ("running in a loop")
    platform.login(jwt= "RC_USER_JWT")
    asyncio.run(subscribe_for_instant_messages_notification())
