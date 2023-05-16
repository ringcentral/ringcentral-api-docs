from ringcentral import SDK

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the SMS capability
def detect_sms_feature():
    try:
        endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
        resp = platform.get(endpoint)
        jsonObj = resp.json()
        for record in jsonObj.records:
            for feature in record.features:
                if feature == "SmsSender":
                    print ("This phone number " + record.phoneNumber + " has SMS feature")
        if jsonObj.records.count == 0:
            print ("This user does not own a phone number!")
    except Exception as e:
        print (e)

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "SANDBOX_JWT" )
      detect_sms_feature()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
