require 'ringcentral'
require 'dotenv/load'

FROM_DATE = '2022-04-12T07:00:00.000Z'
TO_DATE   = '2022-05-11T07:00:00.000Z'

$rc = RingCentral.new( ENV['RC_CLIENT_ID'],
                       ENV['RC_CLIENT_SECRET'],
                       ENV['RC_SERVER_URL'] )

$rc.authorize(jwt: ENV['RC_JWT'])       

def run_report(from_date, to_date)
  resp = $rc.post('/analytics/calls/v1/accounts/~/aggregation/fetch', payload: {
    "grouping":{ 
      "groupBy": "Users" 
    },
    "timeSettings":{
      "timeZone": "US/Pacific",
	    "timeRange":{
	      "timeFrom": from_date,
	      "timeTo": to_date
	    }
    },
    "responseOptions":{
	    "counters":{ 
        "allCalls":{ 
          "aggregationType": "Sum" 
        } 
      }
    }
  })
  puts "Response: " + JSON.pretty_generate(resp.body)
end

run_report( FROM_DATE, TO_DATE )
