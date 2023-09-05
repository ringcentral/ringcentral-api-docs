from ringcentral import SDK
import os, sys, json
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

rcsdk = SDK(os.environ.get('RC_CLIENT_ID'),
            os.environ.get('RC_CLIENT_SECRET'),
            os.environ.get('RC_SERVER_URL') )

try:
    platform = rcsdk.platform()
    platform.login(jwt=os.environ.get('RC_JWT'))
except Exception as e:
    print (e)

try:
    # Set the time window below
    eventTimeFrom = datetime.strptime("2023-08-01T00:00:00.52Z", "%Y-%m-%dT%H:%M:%S.%fZ")
    eventTimeTo = datetime.strptime("2023-08-29T13:00:00.52Z", "%Y-%m-%dT%H:%M:%S.%fZ")

    # Let's make sure the event time window is within 180 days
    if (datetime.utcnow() - eventTimeFrom).days > 180 or (datetime.utcnow() - eventTimeTo).days > 180:
        raise Exception("The Audit Trail API only supports 180 days from the current date.")

    endpoint = "/restapi/v1.0/account/~/audit-trail/search"
    data = {}
    data['eventTimeFrom'] = eventTimeFrom.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    data['eventTimeTo'] = eventTimeTo.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    data['page'] = 2
    data['perPage'] = 10
    data['includeAdmins'] = True
    data['includeHidden'] = True
    data['searchParameters'] = []

    res = platform.post(endpoint, data)
    print( json.dumps(res.json_dict(), indent=2, sort_keys=True) )
    print('search results')
except Exception as e:
    print (e)
