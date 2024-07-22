# Need a .env file with following fields
# RC_SERVER_URL=
# RC_APP_CLIENT_ID=
# RC_APP_CLIENT_SECRET=
# RC_USER_JWT=

from ringcentral import SDK
from dotenv import load_dotenv
import asyncio
import os
from ringcentral.websocket.events import WebSocketEvents

def on_notification(message):
    print("\n Subscription notification:\n")
    print(message)

def on_sub_created(sub):
    print("\n Subscription created:\n")
    print(sub.get_subscription_info())
    print("\n Please go and change your user status \n")

def on_ws_created(web_socket_client):
    print("\n New WebSocket connection created:")
    print(web_socket_client.get_connection_info())

async def main():
    load_dotenv(override=True)
    sdk = SDK(
        os.environ['RC_APP_CLIENT_ID'],
        os.environ["RC_APP_CLIENT_SECRET"],
        os.environ["RC_SERVER_URL"],
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
            web_socket_client.create_subscription(["/restapi/v1.0/account/~/extension/~/presence"])
        )
    except KeyboardInterrupt:
        print("Stopped by User")


if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())
