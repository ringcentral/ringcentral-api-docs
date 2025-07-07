var platform = require('./../quick-start.js').platform;

create_callqueue_custom_answering_rule("62498880016", "62576913016")





// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    // Provide your call queue extension id and the supervisor extension id!
    create_callqueue_custom_answering_rule("Callqueue-ExtId", "Supervisor-ExtId")
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Create a call queue custom answering rule
*/
async function create_callqueue_custom_answering_rule(callqueueExtId, supervisorExtId) {
  try {
    let vipCustomerContacts = [
    		{
    			callerId: "+16501111111",
          name: "Kristina Grant"
    		},{
    			callerId: "+16502222222",
          name: "Sandra Bell"
    		},{
    			callerId: "+16503333333",
          name: "David Peterson"
    		},{
    			callerId: "+16504444444",
          name: "Lena Shanon"
    		},{
    			callerId: "+16505555555",
          name: "Christine Lee"
    		}
    	]
    let bodyParams = {
      enabled: true,
      type: "Custom",
      name: "VIP Support Rule",
      callers: vipCustomerContacts,
      schedule: { ref: "BusinessHours" },
      callHandlingAction: "AgentQueue",
      queue: {
        transferMode: "Simultaneous",
        maxCallers: 10,
        holdTime: 20,
        maxCallersAction: "TransferToExtension",
        holdTimeExpirationAction: "TransferToExtension",
        transfer: [
          {
            extension : { id : supervisorExtId },
            action : "MaxCallers"
          },{
            extension : { id : supervisorExtId },
            action : "HoldTimeExpiration"
          }
        ]
      }
    }

    let endpoint = `/restapi/v1.0/account/~/extension/${callqueueExtId}/answering-rule`
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.text()
    console.log(jsonObj)
  } catch (e) {
    console.log("Unable to create a call queue custom answering rule. ", e.message);
  }
}
