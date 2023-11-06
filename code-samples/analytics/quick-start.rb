require 'ringcentral'
require 'dotenv'
# Remember to modify the path of your .env file location!
Dotenv.load("./../.env")

#
#  Read aggregate analytics data for a period of time and grouped by users
#
def read_analytics_aggregate_data()
  begin
    bodyParams = {
        'grouping':{
          'groupBy':"Users"
        },
        'timeSettings':{
          'timeZone': "America/Los_Angeles",
          'timeRange': {
            # Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current date and time
            # The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
            # your local time to UTC time!
            'timeFrom': "2023-01-01T00:00:00.000Z",
            'timeTo': "2023-02-15T23:59:59.999Z"
          }
        },
        'responseOptions': {
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
    resp = $platform.post(endpoint, payload: bodyParams, params: queryParams)
    puts JSON.pretty_generate(resp.body)
  rescue StandardError => e
    puts (e)
  end
end

# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( ENV['RC_CLIENT_ID'], ENV['RC_CLIENT_SECRET'], ENV['RC_SERVER_URL'] )

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: ENV['RC_JWT'])
    read_analytics_aggregate_data()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end

login()
##############################
# End of quick start section
##############################


########
# Code snippet section for boostrap testing purpose
########
def boostrap_test_function()
    sleep(2)
    puts "Test timeline by users"
    require_relative './code-snippets/timeline-by-users'
    read_analytics_timeline_grouped_by_users()
    sleep(2)
    puts "Test timeline by queues"
    require_relative './code-snippets/timeline-by-queues'
    read_analytics_timeline_grouped_by_queues()
end

boostrap_test_function()
