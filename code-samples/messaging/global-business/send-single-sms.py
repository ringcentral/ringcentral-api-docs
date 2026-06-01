# pip install messente-api
from pprint import pprint
from messente_api import (
    OmnimessageApi,
    SMS,
    Omnimessage,
    Configuration,
    ApiClient,
    OmnimessageMessagesInner,
)
from messente_api.rest import ApiException

configuration = Configuration()
configuration.username = "YOUR_MESSENTE_API_USERNAME"
configuration.password = "YOUR_MESSENTE_API_PASSWORD"

api_instance = OmnimessageApi(ApiClient(configuration))
sms = SMS(sender="<sender name (optional)>", text="hello sms")
sms_inner = OmnimessageMessagesInner(sms)
omnimessage = Omnimessage(messages=[sms_inner], to="<recipient_phone_number>")

try:
    response = api_instance.send_omnimessage(omnimessage)
    print(
        "Successfully sent Omnimessage with id: %s that consists of the following messages:"
        % response.omnimessage_id
    )
    for message in response.messages:
        pprint(message)
except ApiException as exception:
    print("Exception when sending an omnimessage: %s\n" % exception)
