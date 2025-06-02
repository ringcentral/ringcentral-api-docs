require 'ringcentral'

#
# Create a user interaction rule
#
def create_user_interaction_rule()
  begin
    vipCustomerContacts = [
      		{
      			phoneNumber: "+16501111111",
            name: "Kristina Grant"
      		},{
      			phoneNumber: "+16502222222",
            name: "Sandra Bell"
      		},{
      			phoneNumber: "+16503333333",
            name: "David Peterson"
      		},{
      			phoneNumber: "+16504444444",
            name: "Lena Shanon"
      		},{
      			phoneNumber: "+16505555555",
            name: "Christine Lee"
      		}
      	]

    bodyParams = {
          conditions: [
            {
              type: "Interaction",
              from: vipCustomerContacts,  # Assigned with the list of VIP customer contacts
              to: []
            },
            {
              type: "State",
              state: {
                id: "after-hours" # Match the after-hours schedule
              }
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
                      phoneNumber: "+14082324343" # Incoming calls are routed to Alex's personal phone number
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
    endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/interaction-rules'
    resp = $platform.post(endpoint, payload: bodyParams)
    puts(resp.body)
  rescue StandardError => e
    puts ("Unable to create a custom rule. " + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    create_user_interaction_rule()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
