from ringcentral import SDK
import json

#
# Create a user interaction rule
#
def create_user_interaction_rule():
    try:
        vipCustomerContacts = [
        		{
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
        		}
        	]

        bodyParams = {
            "conditions": [
                {
                    "type": "Interaction",
                    "from": vipCustomerContacts,  # Assigned with the list of VIP customer contacts
                    "to": []
                },
                {
                    "type": "State",
                    "state": {
                        "id": "after-hours" # Match the after-hours schedule
                    }
                }
            ],
            "dispatching": {
                "actions": [
                    {
                        "type": "RingGroupAction",
                        "enabled": True,
                        "targets": [
                            {
                                "type": "AllMobileRingTarget",
                                "name": "My mobile apps"
                            }
                        ],
                        "duration": 40
                    },
                    {
                        "type": "RingGroupAction",
                        "enabled": True,
                        "targets": [
                            {
                                "type": "AllDesktopRingTarget",
                                "name": "My desktop"
                            }
                        ],
                        "duration": 50
                    },
                    {
                        "type": "TerminatingAction",
                        "targets": [
                            {
                                "type": "VoiceMailTerminatingTarget",
                                "name": "Voicemail",
                                "prompt": {
                                    "greeting": {
                                        "effectiveGreetingType": "Preset",
                                        "preset": {
                                            "id": "590080"
                                        }
                                    }
                                }
                            },
                            {
                                "type": "PlayAnnouncementTerminatingTarget",
                                "name": "PlayAnnouncement",
                                "prompt": {
                                    "greeting": {
                                        "effectiveGreetingType": "Preset",
                                        "preset": {
                                            "id": "66816"
                                        }
                                    }
                                },
                                "dispatchingType": "Ringing"
                            },
                            {
                                "type": "PhoneNumberTerminatingTarget",
                                "destination": {
                                    "phoneNumber": "+14082324343"   # Incoming calls are routed to Alex's personal phone number
                                },
                                "dispatchingType": "Terminating"
                            }
                        ],
                        "ringingTargetType": "PlayAnnouncementTerminatingTarget",
                        "terminatingTargetType": "PhoneNumberTerminatingTarget"
                    }
                ],
                "type": "Terminate"
            },
            "enabled": True,
            "displayName": "VIP Calls After-Hours"
        }
        endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/interaction-rules'
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
      print ("Unable to create a custom rule. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "RC_USER_JWT" )
      create_user_interaction_rule()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
