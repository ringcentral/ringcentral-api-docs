from ringcentral import SDK
import json

#
#  Read timeline analytics data from a period of time, broken down by day time frames and grouped by users
#
def read_analytics_timeline_grouped_by_users():
  userIds = read_users()
  try:
    bodyParams = {
      'grouping': {
        'groupBy': "Users",
        'keys': userIds
      },
      'timeSettings':{
        'timeZone': "America/Los_Angeles",
        'timeRange': {
          # Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current date and time
          # The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
          # your local time to UTC time!
          'timeFrom': "2023-01-01T00:00:00.000Z",
          'timeTo': "2023-02-15T23:59:59.999Z"
        },
        'advancedTimeSettings': {
          'includeDays': [ "Sunday" ],
          'includeHours': [
            {
              'from': "00:00",
              'to': "23:59"
            }
          ]
        }
      },
      'responseOptions': {
        'counters': {
          'allCalls': True
        }
      }
    }

    queryParams = {
      'interval': "Day",
      'perPage': 10
    }

    endpoint = '/analytics/calls/v1/accounts/~/timeline/fetch'
    resp = platform.post(endpoint, bodyParams, queryParams)
    jsonObj = resp.json_dict()
    print(json.dumps(jsonObj, indent=2, sort_keys=True))
  except Exception as e:
    print ("Unable to read analytics timeline. ", str(e))

#
#  Read users and create a list of user id
#
def read_users():
  userIds = []
  try:
    queryParams = {
          'type': ["User"]
    }
    endpoint = "/restapi/v1.0/account/~/extension/"
    resp = platform.get(endpoint, queryParams)
    jsonObj = resp.json()
    for record in jsonObj.records:
      # You can filter out any user you don't want to read analytics data!
      userIds.append(str(record.id))
  except Exception as e:
    print ("Unable to read users. ", str(e))
  return userIds


# Authenticate a user using a personal JWT token
def login():
  try:
    platform.login( jwt= "SANDBOX_JWT" )
    read_analytics_timeline_grouped_by_users()
  except Exception as e:
    print ("Unable to authenticate to platform. Check credentials." + str(e))
