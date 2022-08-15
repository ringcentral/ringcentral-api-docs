#!/usr/bin/env python
from ringcentral import SDK
import os,sys,json
from dotenv import load_dotenv
load_dotenv()

FROM_DATE = '2022-04-12T07:00:00.000Z'
TO_DATE   = '2022-05-11T07:00:00.000Z'

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

try:
  platform.login(jwt=os.environ.get('RC_JWT'))
except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

def fetch_aggregate_report( from_time, to_time ):
  try:
    options = {
      "grouping":{
        "groupBy":"Users"
      },
      "timeSettings":{
        "timeZone": "US/Pacific",
        "timeRange":{
          "timeFrom": from_time,
          "timeTo": to_time
        }
      },
      "responseOptions":{
        "counters":{
          "allCalls":{
            "aggregationType":"Sum"
          }
        }
      }
    }
    resp = platform.post('/analytics/calls/v1/accounts/~/aggregation/fetch', options)
    jsonObj = resp.json_dict()
  except Exception as err:
    sys.exit("Unable to fetch analytics", err)

  print(json.dumps(jsonObj, indent=2, sort_keys=True))
    
fetch_aggregate_report( FROM_DATE, TO_DATE )
