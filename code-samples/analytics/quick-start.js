const RC_SDK = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC_SDK({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({
	  'jwt':  process.env.RC_JWT
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
		let result = await platform.post("/analytics/calls/v1/accounts/~/aggregation/fetch", options);
		let response = await result.json();
		console.dir(response, {depth: null});
	} catch (e) {
			console.log(e.message);
	}
}
