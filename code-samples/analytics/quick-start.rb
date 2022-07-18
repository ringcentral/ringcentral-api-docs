require 'ringcentral'
require 'dotenv/load'

FROM_DATE = '2022-04-12T07:00:00.000Z'
TO_DATE   = '2022-05-11T07:00:00.000Z'

$rc = RingCentral.new( ENV['RC_CLIENT_ID'],
                       ENV['RC_CLIENRT_SECRET'],
                       ENV['RC_SERVER_URL'] )

$rc.authorize( username: ENV['RC_USERNAME'],
               extension: ENV['RC_EXTENSION'],
               password: ENV['RC_PASSWORD'] )

def run_report(from_date, to_date)
  resp = $rc.post('/analytics/phone/performance/v1/accounts/~/calls/aggregate', payload: {
    "grouping":{ "groupBy":"Users" },
    "timeSettings":{
	"timeRange":{
	    "timeFrom": from_time,
	    "timeTo": to_time
	}
    },
    "responseOptions":{
	"counters":{ "allCalls":{ "aggregationType":"Sum" } }
    }
  })
  puts "Response: " + resp
end

run_report( FROM_DATE, TO_DATE )
