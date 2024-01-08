require 'ringcentral'

NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS"
WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
CONTENT_URI = 'PUBLICLY-ACCESSIBLE-CONTENT-URI'

#
# Transcribe a call recording and analyze interaction
#
def analyze_interaction()
    bodyParams = {
        'contentUri': CONTENT_URI,
        'encoding': "Mpeg",
        'languageCode': "en-US",
        'source': "RingCentral",
        'audioType': "CallCenter",
        'insights': [ "All" ],
        'enableVoiceActivityDetection': true,
        'separateSpeakerPerChannel': false
    }
    queryParams = {
      'webhook': WEBHOOK_URL
    }
    endpoint = "/ai/insights/v1/async/analyze-interaction"
    begin
      resp = $platform.post(endpoint, payload: bodyParams, params: queryParams)
      body = resp.body
      if resp.status == 202
          puts('Job ID: ' + body['jobId']);
          puts ('Ready to receive response at: ' + WEBHOOK_URL);
      end
    rescue StandardError => e
      puts ("Unable to analyze interaction. " + e.to_s)
    end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "PRODUCTION-JWT" )
    analyze_interaction()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
