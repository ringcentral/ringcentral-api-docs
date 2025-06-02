require 'ringcentral'

#
# Create a company custom answering rule
#
def create_company_custom_answering_rule()
  begin
    bodyParams = {
      enabled: true,
      type: "Custom",
      name: "New Year Holiday",
      schedule: {
        ranges: [
          {
            from: "2025-12-31T17:00:00.00Z",
            to: "2026-01-02T08:00:00.00Z"
          }
        ]
      },
      callHandlingAction: "Bypass",
      extension: {
        id: "62952481016" # ID of an announcement-only extension
      }
    }
    endpoint = '/restapi/v1.0/account/~/answering-rule'
    resp = $platform.post(endpoint, payload: bodyParams)
    puts(resp.body)
  rescue StandardError => e
    puts ("Unable to create a company custom answering rule. " + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    create_company_custom_answering_rule()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
