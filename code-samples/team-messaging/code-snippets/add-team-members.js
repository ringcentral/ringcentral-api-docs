var platform = require('./../quick-start.js').platform;
find_team("", "Node JS Team")






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    find_team("", "Node JS Team")
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Find the team id of the team to be added new members
*/
async function find_team(pageToken, teamName) {
  try{
    var queryParams = {
      recordCount: 10,
      pageToken: pageToken
    }
    var endpoint = "/team-messaging/v1/teams"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    // Search through the team list to find the team
    console.log(`Find the team id of the "${teamName}`)
    for (var record of jsonObj.records) {
      if (record.name == teamName){
        console.log(`Add new members to this team ${teamName}`)
        add_new_members(record.id)
        return
      }
    }

    if (jsonObj.navigation.hasOwnProperty('prevPageToken')) {
      var pageToken = jsonObj.navigation.prevPageToken
      // Make sure not to exceed the API rate limit of 40 API calls per minute
      sleep(1200)
      console.log("Read newer teams ...")
      find_team(pageToken, teamName)
    }else{
      console.log(`Cannot find team ${teamName}`)
    }
  }catch (e){
    console.log("Unable to read teams.", e.message)
  }
}

/*
* Add new members to a team identified by the team id
*/
async function add_new_members(teamId) {
  try {
    let bodyParams = {
      members: [
          // replace the email addresses below with valid internal or external new member email address
          { email: "member.name@abc.com" },
          { email: "guest.name@xyz.com" }
      ]
    }
    let endpoint = `/team-messaging/v1/teams/${teamId}/add`
    var resp = await platform.post(endpoint, bodyParams)
    console.log(`New member(s) added. Response status ${resp.status}`)
  }catch (e){
    console.log("Unable to add new members.", e.message)
  }
}

const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}
