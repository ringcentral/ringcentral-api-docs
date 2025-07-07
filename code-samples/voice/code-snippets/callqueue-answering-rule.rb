require 'ringcentral'

#
# Create a call queue custom answering rule
#
def create_callqueue_custom_answering_rule(callqueueExtId, supervisorExtId)
  begin
    vip_customer_contacts = [
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

    body_params = {
      enabled: true,
      type: "Custom",
      name: "VIP Support Rule",
      callers: vip_customer_contacts,
      schedule: {
        ref: "BusinessHours"
      },
      callHandlingAction: "AgentQueue",
      queue: {
        transferMode: "Simultaneous",
        maxCallers: 10,
        holdTime: 20,
        maxCallersAction: "TransferToExtension",
        holdTimeExpirationAction: "TransferToExtension",
        transfer: [
          {
            extension: {
              id: supervisorExtId
            },
            action: "MaxCallers"
          },
          {
            extension: {
              id: supervisorExtId
            },
            action: "HoldTimeExpiration"
          }
        ]
      }
    }
    endpoint = "/restapi/v1.0/account/~/extension/" + callqueueExtId + "/answering-rule"
    resp = $platform.post(endpoint, payload: body_params)
    puts(resp.body)
  rescue StandardError => e
    puts ("Unable to create a call queue custom answering rule. " + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    # Provide your call queue extension id and the supervisor extension id!
      create_callqueue_custom_answering_rule("Callqueue-ExtId", "Supervisor-ExtId")
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
