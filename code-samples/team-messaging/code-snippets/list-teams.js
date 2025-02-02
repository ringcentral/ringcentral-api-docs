var platform = require('./../quick-start.js').platform;
list_teams("")






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    list_teams("")
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* List teams under an account. Read 10 teams at a time.
*/
async function list_teams(pageToken) {
  try{
    var queryParams = {
      recordCount: 10,
      pageToken: pageToken
    }
    var endpoint = "/team-messaging/v1/teams"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    // List teams API returns a list of teams in the ascending order based on team creation date and time.
    // I.e. from older team to newer team
    for (var record of jsonObj.records) {
        console.log(`The team "${record.name}" was created on ${record.creationTime}.`)
    }

    // To read the next page, check and use the previous page token in the navigation object.
    if (jsonObj.navigation.hasOwnProperty('prevPageToken')) {
      var pageToken = jsonObj.navigation.prevPageToken
      // Make sure not to exceed the API rate limit of 40 API calls per minute
      sleep(1200)
      console.log("Read newer teams ...")
      list_teams(pageToken)
    }
  }catch (e){
    console.log("Unable to read teams.", e.message)
  }
}

const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}
