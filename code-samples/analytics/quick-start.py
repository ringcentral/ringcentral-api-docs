from ringcentral import SDK
import os,sys,json
from dotenv import load_dotenv
load_dotenv()

#
#  Read aggregate analytics data for a period of time and grouped by users
#
def read_analytics_aggregate_data():
  try:
    bodyParams = {
      'grouping': {
        'groupBy': "Users"
      },
      'timeSettings': {
        'timeZone': "America/Los_Angeles",
        'timeRange': {
          # Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current datetime
          # The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
          # your local time to UTC time!
          'timeFrom': "2023-01-01T00:00:00.000Z",
          'timeTo': "2023-02-15T23:59:59.999Z"
        }
      },
      'responseOptions':{
        'counters': {
          'allCalls': {
            'aggregationType': "Sum"
          }
        }
      }
    }

    queryParams = {
      'perPage': 100
    }

    endpoint = '/analytics/calls/v1/accounts/~/aggregation/fetch'
    resp = platform.post(endpoint, bodyParams, queryParams)
    jsonObj = resp.json_dict()
    print(json.dumps(jsonObj, indent=2, sort_keys=True))
  except Exception as err:
    sys.exit("Unable to read analytics aggregation ", err)

# Instantiate the SDK and get the platform instance
rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_USER_JWT') )
      read_analytics_aggregate_data()
    except Exception as e:
      sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

login()
##############################
# End of quick start section
##############################


########
# Code snippet section for boostrap testing purpose
########
import time
def boostrap_test_function():
    #read_analytics_timeline_data(1)
    time.sleep (2)
    import importlib
    print ("Test reading timeline data grouped by queues")
    ms = importlib.import_module("code-snippets.timeline-by-queues")
    ms.platform = platform
    ms.json = json
    ms.read_analytics_timeline_grouped_by_queues()

    time.sleep (2)
    print ("Test reading timeline data grouped by users")
    ms = importlib.import_module("code-snippets.timeline-by-users")
    ms.platform = platform
    ms.json = json
    ms.read_analytics_timeline_grouped_by_users()

# End of Quick Start Code Section

# must be on the last line!
#boostrap_test_function()
