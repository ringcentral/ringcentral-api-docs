from ringcentral import SDK

NGROK = "NGROK-TUNNEL-ADDRESS"
WEBHOOK_URL = NGROK + "/webhook";

#
# Punctuate text paragraph
#
def punctuation():
    try:
        bodyParams = {
            'texts': [
                  "so its more fluid than it is and you know its not the best kind of feedback right",
                  "and you know that the best way to ask for customer feedback is to reach out to each of your customer and interview them separately",
                  "however interviewing each individual customer to get their feedback is not scalable if you have thousands of customers to be interviewed"
              ]
          }
        endpoint = f'/ai/text/v1/async/punctuate?webhook={WEBHOOK_URL}'
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        if resp.response().status_code == 202:
            print(f'Job ID: {resp.json().jobId}');
            print(f'Ready to receive response at: {WEBHOOK_URL}');
    except Exception as e:
        print ("Unable to call the punctuation API. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "RC_USER_JWT" )
      punctuation()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
