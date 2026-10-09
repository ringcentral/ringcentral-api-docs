from pprint import pprint
from messente_api import (
    ApiClient,
    Configuration,
    Omnimessage,
    OmnimessageApi,
    OmnimessageMessagesInner,
    SMS,
)
from messente_api.rest import ApiException

configuration = Configuration()
configuration.username = "YOUR_MESSENTE_API_USERNAME"
configuration.password = "YOUR_MESSENTE_API_PASSWORD"

api_instance = OmnimessageApi(ApiClient(configuration))
sms = SMS(sender="<sender name (optional)>", text="hello sms")
sms_inner = OmnimessageMessagesInner(sms)
omnimessage = Omnimessage(
    messages=[sms_inner],
    to="<recipient_phone_number>",
    time_to_send="2019-06-22T09:05:07+04:00",
)

try:
    response = api_instance.send_omnimessage(omnimessage)
    pprint(response)
except ApiException as exception:
    print("Exception when scheduling an omnimessage: %s\n" % exception)
