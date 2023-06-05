var platform = require('./../quick-start.js').platform;
read_analytics_timeline_grouped_by_users()






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    read_analytics_timeline_grouped_by_users()
});

/*
  Read timeline analytics data from a period of time, broken down by day time frames and grouped by users
*/
async function read_analytics_timeline_grouped_by_users(){
  try {
    let userIds = await read_users()
    let bodyParams = {
        grouping: {
            groupBy: "Users",
            keys: userIds,
        },
        timeSettings: {
          timeZone: "America/Los_Angeles",
          timeRange: {
            // Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current date and time
            // The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
            // your local time to UTC time!
            timeFrom: "2023-01-01T00:00:00.000Z",
            timeTo: "2023-02-15T23:59:59.999Z"
          },
          advancedTimeSettings: {
            includeDays: [ "Sunday" ],
            includeHours: [
              {
                from: "00:00",
                to: "23:59"
              }
            ]
          }
        },
        responseOptions: {
          counters: {
            allCalls: true
          }
        }
      }

    let queryParams = {
      interval: 'Day',
      perPage: 10
    }
    var endpoint = '/analytics/calls/v1/accounts/~/timeline/fetch'
    var resp = await platform.post(endpoint, bodyParams, queryParams)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  }catch(e){
    console.log(e.message)
  }
}

/*
  Read users and create a list of user id
*/
async function read_users()
{
  var userIds = []
  var queryParams = {
          type: ["User"]
        }
  let endpoint = "/restapi/v1.0/account/~/extension/"
  var resp = await platform.get(endpoint, queryParams)
  let jsonObj = await resp.json()
  for (var record of jsonObj.records) {
    // You can filter out any user you don't want to read analytics data!
    userIds.push(String(record.id))
  }
  return userIds;
}
