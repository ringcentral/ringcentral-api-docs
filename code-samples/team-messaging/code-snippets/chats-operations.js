var platform = require('./../quick-start.js').platform;
list_chats()






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    create_chats()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Create a chats group
*/
async function create_chats(){
  try {
    let bodyParams = {
      // Add internal members using their extension ids
      // Get your user extension id by calling the /restapi/v1.0/account/~/extension endpoint!
      members: [{id: "590490017"}],
      // You can also add members using their email address, especially for guest members who are not under your account company.
      // members: [{email: "member.1@gmail.com"}, { email: "member.2@gmail.com"}, {id: "[extensionId]"}],
    }
    var endpoint = "/team-messaging/v1/conversations"
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj))
  } catch (e) {
    console.log(e.message)
  }
}


/*
* List a chats
*/
async function list_chats(){
  try {
    var endpoint = "/team-messaging/v1/chats"
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    for (var record of jsonObj.records)
      console.log(record)
    //console.log(JSON.stringify(jsonObj))
  } catch (e) {
    console.log(e.message)
  }
}
