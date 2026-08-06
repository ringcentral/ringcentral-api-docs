from messente_api import ApiClient, Configuration, OmnimessageApi
from messente_api.rest import ApiException

configuration = Configuration()
configuration.username = "YOUR_MESSENTE_API_USERNAME"
configuration.password = "YOUR_MESSENTE_API_PASSWORD"

api_instance = OmnimessageApi(ApiClient(configuration))

try:
    api_instance.cancel_scheduled_message("<omnimessage_id>")
    print("Scheduled omnimessage cancelled")
except ApiException as exception:
    print("Exception when cancelling an omnimessage: %s\n" % exception)
