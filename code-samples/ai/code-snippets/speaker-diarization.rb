require 'ringcentral'

NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS"
WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI"

#
# Detect speakers from a conversation
#
def speakers_detection()
    bodyParams = {
      'contentUri': CONTENT_URI,
      'encoding': "Mpeg",
      'languageCode': "en-US",
      'source': "RingCentral",
      'audioType': "CallCenter"
    }
    queryParams = {
      'webhook': WEBHOOK_URL
    }
    endpoint = "/ai/audio/v1/async/speaker-diarize"
    begin
        resp = $platform.post(endpoint, payload: bodyParams, params: queryParams)
        body = resp.body
        if resp.status == 202
          puts('Job ID: ' + body['jobId']);
          puts ('Ready to receive response at: ' + WEBHOOK_URL);
        end
    rescue StandardError => e
        puts ("Unable to call speaker diarization API. " + e.to_s)
    end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    speakers_detection()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
