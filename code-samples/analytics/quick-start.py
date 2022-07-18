#!/usr/bin/env python
from ringcentral import SDK
import os,sys
from dotenv import load_dotenv
load_dotenv()

FROM_DATE = '2022-04-12T07:00:00.000Z'
TO_DATE   = '2022-05-11T07:00:00.000Z'

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

try:
  platform.login(os.environ.get('RC_USERNAME'),
                 os.environ.get('RC_EXTENSION'),
                 os.environ.get('RC_PASSWORD') )
except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

def fetch_aggregate_report( from_time, to_time ):
  try:
    options = {
      "grouping":{
        "groupBy":"Users"
      },
      "timeSettings":{
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
    resp = platform.post('/analytics/phone/performance/v1/accounts/~/calls/aggregate', options)
    jsonObj = resp.json()
  except Exception as err:
    sys.exit("Unable to fetch analytics", err)

  print(jsonObj)
    
fetch_aggregate_report( FROM_DATE, TO_DATE )
