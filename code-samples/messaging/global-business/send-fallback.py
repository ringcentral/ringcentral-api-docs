from pprint import pprint
from messente_api import (
    OmnimessageApi,
    Omnimessage,
    OmnimessageMessagesInner,
    Configuration,
    ApiClient,
    SMS,
)
from messente_api.rest import ApiException

# API information from https://dashboard.messente.com/api-settings
configuration = Configuration()
configuration.username = '<MESSENTE_API_USERNAME>'
configuration.password = '<MESSENTE_API_PASSWORD>'

# create an instance of the API class
api_instance = OmnimessageApi(ApiClient(configuration))

sms = SMS(
    sender='<sender name (optional)>',
    text='hello python',
)
sms_inner = OmnimessageMessagesInner(sms)

omnimessage = Omnimessage(
    messages=(sms_inner,),
    to='<recipient_phone_number>',
)  # Omnimessage | Omnimessage object that is to be sent

try:
    # Sends an Omnimessage
    response = api_instance.send_omnimessage(omnimessage)
    print(
        'Successfully sent Omnimessage with id: %s that consists of the following messages:' % response.omnimessage_id
    )
    for message in response.messages:
        pprint(message)
except ApiException as exception:
    print('Exception when sending an omnimessage: %s\n' % exception)
