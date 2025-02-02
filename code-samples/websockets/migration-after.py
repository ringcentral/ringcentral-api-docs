from ringcentral import SDK
from dotenv import load_dotenv
import asyncio
import os
from ringcentral.websocket.events import WebSocketEvents

def on_notification(message):
    print(message)

def on_sub_created(sub):
    print(sub.get_subscription_info())

def on_ws_created(web_socket_client):
    print(web_socket_client.get_connection_info())

async def subscribe():
    load_dotenv(override=True)
    sdk = SDK(
        os.environ['RC_APP_CLIENT_ID'],
        os.environ["RC_APP_CLIENT_SECRET"],
        os.environ["RINGCENTRAL_SERVER_URL"],
    )
    platform = sdk.platform()
    platform.login(jwt=os.environ["RC_USER_JWT"])

    try:
        web_socket_client = sdk.create_web_socket_client()
        web_socket_client.on(WebSocketEvents.connectionCreated, on_ws_created)
        web_socket_client.on(WebSocketEvents.subscriptionCreated, on_sub_created)
        web_socket_client.on(WebSocketEvents.receiveSubscriptionNotification, on_notification)
        await asyncio.gather(
            web_socket_client.create_new_connection(),
            web_socket_client.create_subscription([{FILTERS}]) # replace {FILTERS} with filter urls
        )
    except KeyboardInterrupt:
        print("Stopped by User")
