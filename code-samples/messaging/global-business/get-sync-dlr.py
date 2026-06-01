from pprint import pprint
from messente_api import ApiClient, Configuration, DeliveryReportApi
from messente_api.rest import ApiException

configuration = Configuration()
configuration.username = "YOUR_MESSENTE_API_USERNAME"
configuration.password = "YOUR_MESSENTE_API_PASSWORD"

api_instance = DeliveryReportApi(ApiClient(configuration))

try:
    response = api_instance.retrieve_delivery_report("<omnimessage_id>")
    pprint(response)
except ApiException as exception:
    print("Exception when retrieving delivery report: %s\n" % exception)
