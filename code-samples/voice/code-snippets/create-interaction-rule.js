var platform = require('./../quick-start.js').platform;

create_user_interaction_rule()





// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    create_user_interaction_rule()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Create a user interaction rule
*/
async function create_user_interaction_rule() {
  try {
      let vipCustomerContacts = [{
    	  "phoneNumber": "+16501111111",
          "name": "Kristina Grant"
      },{
    	  "phoneNumber": "+16502222222",
          "name": "Sandra Bell"
      },{
    	  "phoneNumber": "+16503333333",
          "name": "David Peterson"
      },{
    	  "phoneNumber": "+16504444444",
          "name": "Lena Shanon"
      },{
    	  "phoneNumber": "+16505555555",
          "name": "Christine Lee"
      }]

    let bodyParams = {
          conditions: [
            {
              type: "Interaction",
              from: vipCustomerContacts, // Assigned with the list of VIP customer contacts
              to: []
            },
            {
              type: "State",
              state: { id: "after-hours" } // Match the after-hours schedule
            }
          ],
          dispatching: {
            actions: [
              {
                type: "RingGroupAction",
                enabled: true,
                targets: [
                  {
                    type: "AllMobileRingTarget",
                    name: "My mobile apps"
                  }
                ],
                duration: 40
              },
              {
                type: "RingGroupAction",
                enabled: true,
                targets: [
                  {
                    type: "AllDesktopRingTarget",
                    name: "My desktop"
                  }
                ],
                duration: 50
              },
              {
                type: "TerminatingAction",
                targets: [
                  {
                    type: "VoiceMailTerminatingTarget",
                    name: "Voicemail",
                    prompt: {
                      greeting: {
                        effectiveGreetingType: "Preset",
                        preset: {
                          id: "590080"
                        }
                      }
                    }
                  },
                  {
                    type: "PlayAnnouncementTerminatingTarget",
                    name: "PlayAnnouncement",
                    prompt: {
                      greeting: {
                        effectiveGreetingType: "Preset",
                        preset: {
                          id: "66816"
                        }
                      }
                    },
                    dispatchingType: "Ringing"
                  },
                  {
                    type: "PhoneNumberTerminatingTarget",
                    destination: {
                      phoneNumber: "+14082324343" // Incoming calls are routed to Alex's personal phone number
                    },
                    dispatchingType: "Terminating"
                  }
                ],
                ringingTargetType: "PlayAnnouncementTerminatingTarget",
                terminatingTargetType: "PhoneNumberTerminatingTarget"
              }
            ],
            type: "Terminate"
          },
          enabled: true,
          displayName: "VIP Calls After-Hours"
    }
    let endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/interaction-rules'
    let resp = await platform.post(endpoint, bodyParams)
    let jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj, null, 4))
  } catch (e) {
    console.log("Unable to create a custom rule. ", e.message);
  }
}
