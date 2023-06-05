const RC_SDK = require('@ringcentral/sdk').SDK
const path = require('path')
// Remember to modify the path of your .env file location!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Instantiate the SDK and get the platform instance
var rcsdk = new RC_SDK({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, function(e){
    create_team()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Create a new public team in Team Messaging with 3 internal members including the team owner
*/
async function create_team() {
  try {
    let bodyParams = {
      public: true,
      name: "Node JS Team ",
      // Add internal members using their extension ids
      // Get your user extension id by calling the /restapi/v1.0/account/~/extension endpoint!
      members: [{id: "590490017"}, {id: "595861017"}],
      // You can also add members using their email address, especially for guest members who are not under your account company.
      // members: [{email: "member.1@gmail.com"}, { email: "member.2@gmail.com"}, {id: "[extensionId]"}],
      description: "Let's talk about Node JS"
    }
    var endpoint = "/team-messaging/v1/teams"
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj))
  } catch (e) {
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

boostrap_test_function()
async function boostrap_test_function(){
  console.log("boostrap_test_function")
  // Option 1: Test snippet code from different files. This requires a separate header file and a function file
/*
  await sleep(2000)
  require ('./code-snippets/timeline-by-queues.js')
*/

}
