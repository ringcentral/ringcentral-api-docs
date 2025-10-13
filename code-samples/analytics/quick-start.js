const RC_SDK = require('@ringcentral/sdk').SDK
const path = require('path')
// Remember to modify the path of your .env file location!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Instantiate the SDK and get the platform instance
var rcsdk = new RC_SDK({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, function(e){
    read_analytics_aggregate_data()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read aggregate analytics data for a period of time and grouped by users
*/
async function read_analytics_aggregate_data(){
  try {
    let bodyParams = {
        grouping:{
          groupBy:"Users"
        },
        timeSettings:{
          timeZone: "America/Los_Angeles",
          timeRange:{
            // Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current datetime
            // The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
            // your local time to UTC time!
            timeFrom: "2025-05-01T00:00:00.000Z",
            timeTo: "2025-09-15T23:59:59.999Z"
          }
        },
        responseOptions:{
          counters:{
            allCalls:{
              aggregationType:"Sum"
            }
          }
        }
      }

    let queryParams = {
      perPage: 100
    }
    let endpoint = '/analytics/calls/v1/accounts/~/aggregation/fetch'
    var resp = await platform.post(endpoint, bodyParams, queryParams)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  }catch(e){
    console.log(e.message)
  }
}
// End of Quick Start Code Section

/**********************************************************
***********************************************************
 TEST SECTION - THESE FUNTIONS ARE NOT SHOWN IN DEV GUIDE
***********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}


exports.platform = platform;

// boostrap_test_function()
async function boostrap_test_function(){
  console.log("boostrap_test_function")
  // Option 1: Test snippet code from different files. This requires a separate header file and a function file

  await sleep(2000)
  require ('./code-snippets/timeline-by-queues.js')
  await sleep(2000)
  require ('./code-snippets/timeline-by-users.js')

}
