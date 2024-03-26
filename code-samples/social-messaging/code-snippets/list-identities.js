var platform = require('./../quick-start.js').platform;
list_identities("")






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    list_identities("")
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read all identities.
*/
async function list_identities(pageToken){
  try {
    var queryParams = {
      perPage: 50
    }
    if (pageToken != ""){
      queryParams['pageToken'] = pageToken
    }
    let endpoint = "/cx/social-messaging/v1/identities"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    for (var record of jsonObj.records){
      console.log(record)
    }

    // To read the next page, check and use the nextPageToken in the paging object.
    if (jsonObj.paging.hasOwnProperty('nextPageToken') && jsonObj.paging.nextPageToken != "") {
      var pageToken = jsonObj.paging.nextPageToken
      // Make sure not to exceed the API rate limit of 40 API calls per minute
      sleep(1200)
      console.log("Read identities from the next page ...")
      list_identities(pageToken)
    }else{
      console.log("Done reading all pages")
    }
  } catch (e){
    console.log("Unable to read identities. Error message:", e.message)
  }
}

const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}
