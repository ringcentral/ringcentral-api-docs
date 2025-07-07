from ringcentral import SDK
import json

#
# Create a call queue custom answering rule
#
def create_callqueue_custom_answering_rule(callqueueExtId, supervisorExtId):
    try:
        vip_customer_contacts = [
        	{
        		"callerId": "+16501111111",
                "name": "Kristina Grant"
        	},{
        		"callerId": "+16502222222",
                "name": "Sandra Bell"
        	},{
        		"callerId": "+16503333333",
                "name": "David Peterson"
        	},{
        		"callerId": "+16504444444",
                "name": "Lena Shanon"
        	},{
        		"callerId": "+16505555555",
                "name": "Christine Lee"
        	}
        ]

        body_params = {
            "enabled": True,
            "type": "Custom",
            "name": "VIP Support Rule",
            "callers": vip_customer_contacts,
            "schedule": {
                "ref": "BusinessHours"
            },
            "callHandlingAction": "AgentQueue",
            "queue": {
                "transferMode": "Simultaneous",
                "maxCallers": 10,
                "holdTime": 20,
                "maxCallersAction": "TransferToExtension",
                "holdTimeExpirationAction": "TransferToExtension",
                "transfer": [
                    {
                        "extension": {
                            "id": supervisorExtId
                        },
                        "action": "MaxCallers"
                    },
                    {
                        "extension": {
                            "id": supervisorExtId
                        },
                        "action": "HoldTimeExpiration"
                    }
                ]
            }
        }
        endpoint = f'/restapi/v1.0/account/~/extension/{callqueueExtId}/answering-rule'
        resp = platform.post(endpoint, body_params)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
      print ("Unable to create a call queue custom answering rule. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "RC_USER_JWT" )
      # Provide your call queue extension id and the supervisor extension id!
      create_callqueue_custom_answering_rule("Callqueue-ExtId", "Supervisor-ExtId")
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
