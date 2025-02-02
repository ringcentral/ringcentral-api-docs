require 'ringcentral'

#
#  Read timeline analytics data from a period of time, broken down by day time frames and grouped by call queues
#
def read_analytics_timeline_grouped_by_queues()
  begin
    callQueueIds = read_call_queues()
    bodyParams = {
            "grouping":{
              "groupBy": "Queues",
              'keys': callQueueIds
            },
            "timeSettings":{
              "timeZone": "America/Los_Angeles",
              "timeRange":{
                # Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current date and time
                # The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
                # your local time to UTC time!
                "timeFrom": "2023-01-01T00:00:00.000Z",
                "timeTo": "2023-02-15T23:59:59.999Z"
              },
              "advancedTimeSettings": {
                "includeDays": [ "Sunday" ],
                "includeHours": [
                  {
                    "from": "00:00",
                    "to": "23:59"
                  }
                ]
              }
            },
            "responseOptions":{
              "counters":{
                "allCalls": true
              }
            }
          }

    queryParams = {
        'interval': "Day",
        'perPage': 10
      }

    endpoint = '/analytics/calls/v1/accounts/~/timeline/fetch'
    resp = $platform.post(endpoint, payload: bodyParams, params: queryParams)
    puts JSON.pretty_generate(resp.body)
  rescue StandardError => e
    puts (e)
  end
end

#
#  Read call queues and create a list of call queue id
#
def read_call_queues()
  callQueueIds = []
  queryParams = {
            'type': ["Department"]
          }
  endpoint = "/restapi/v1.0/account/~/extension/"
  resp = $platform.get(endpoint, queryParams)
  jsonObj = resp.body
  for record in jsonObj['records'] do
    # You can filter out any user you don't want to read analytics data!
    callQueueIds.append(record['id'].to_s)
  end
  return callQueueIds
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    read_analytics_timeline_grouped_by_queues()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
