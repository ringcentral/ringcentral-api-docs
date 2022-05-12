const RC_SDK = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({
    'username':  process.env.RC_USERNAME,
    'password':  process.env.RC_PASSWORD,
    'extension': process.env.RC_EXTENSION
})

let FROM_DATE = '2022-04-12T07:00:00.000Z'
let TO_DATE   = '2022-05-11T07:00:00.000Z'

platform.on(platform.events.loginSuccess, function(e){
    run_report( FROM_DATE, TO_DATE )
});

async function run_report( from_time, to_time ) {
    try {
	let options = {
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
	let result = await platform.post("/analytics/phone/performance/v1/accounts/~/calls/aggregate",
					 options);
	let response = await result.json();
	console.log(response.data[0]);
    } catch (e) {
	console.log(e.message);
    }
}
