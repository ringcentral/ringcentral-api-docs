const RC = require('@ringcentral/sdk').SDK
const path = require('path')
// Remember to modify the path of your .env file location!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Initialize the RingCentral SDK and Platform
const rcsdk = new RC({
    'server':       "https://platform.ringcentral.com",
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, function(e){
    list_contents("")
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* List contents from all connected channels
*/
async function list_contents(pageToken) {
  try {
    var queryParams = {
      perPage: 50
    }
    if (pageToken != ""){
      queryParams['pageToken'] = pageToken
    }
    let endpoint = "/cx/social-messaging/v1/contents"
    let resp = await platform.get(endpoint, queryParams);
  	let jsonObj = await resp.json();

    for (var record of jsonObj.records){
      console.log(record)
    }

    // To read the next page, check and use the nextPageToken in the paging object.
    if (jsonObj.paging.hasOwnProperty('nextPageToken') && jsonObj.paging.nextPageToken != "") {
      var pageToken = jsonObj.paging.nextPageToken
      // Make sure not to exceed the API rate limit of 40 API calls per minute
      sleep(1200)
      console.log("Read content from the next page ...")
      list_contents(pageToken)
    }else{
      console.log("Done reading all pages")
    }
  } catch (e) {
    console.log("CUnable to call list contents API. Error: " + e.message);
  }
}

const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}
// End of Quick Start Code Section

/**********************************************************
***********************************************************
 TEST SECTION - THESE FUNTIONS ARE NOT SHOWN IN DEV GUIDE
***********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/


exports.platform = platform;

boostrap_test_function()
async function boostrap_test_function(){
  console.log("boostrap_test_function")

  // await sleep(2000)
  // console.log("Test reply message")
  // require ('./code-snippets/reply-message.js')

  await sleep(2000)
  console.log("Test list identities")
  require ('./code-snippets/list-identities.js')
  return
}
