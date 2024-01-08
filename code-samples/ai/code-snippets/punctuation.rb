require 'ringcentral'

NGROK = "NGROK-TUNNEL-ADDRESS"
WEBHOOK_URL = NGROK + "/webhook";

#
# Add punctuation to text paragraphs
#
def punctuation()
    begin
        bodyParams = {
            'texts': [
                  "so its more fluid than it is and you know its not the best kind of feedback right",
                  "and you know that the best way to ask for customer feedback is to reach out to each of your customer and interview them separately",
                  "however interviewing each individual customer to get their feedback is not scalable if you have thousands of customers to be interviewed"
              ]
          }
        endpoint = "/ai/text/v1/async/punctuate?webhook=" + WEBHOOK_URL
        resp = $platform.post(endpoint, payload: bodyParams)
        body = resp.body
        if resp.status == 202
            puts('Job ID: ' + body['jobId']);
            puts ('Ready to receive response at: ' + WEBHOOK_URL);
        end
    rescue StandardError => e
        puts ("Unable to call the punctuation API. " + e.to_s)
    end
end


# Authenticate a user using a personal JWT token
def login()
  begin
      $platform.login( jwt= "PRODUCTION-JWT" )
      punctuation()
  rescue StandardError => e
      puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
