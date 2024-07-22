require 'ringcentral'

NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS"
WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI"

#
# Identify speakers from a conversation
#
def speakers_identification()
    enrolledSpeakerIds = read_enrolled_speakers()
    if enrolledSpeakerIds.length > 0
      bodyParams = {
          'contentUri': CONTENT_URI,
          'encoding': "Mpeg",
          'languageCode': "en-US",
          'source': "RingCentral",
          'audioType': "CallCenter",
          'speakerIds': enrolledSpeakerIds
      }
      queryParams = {
        'webhook': WEBHOOK_URL
      }
      endpoint = "/ai/audio/v1/async/speaker-identify"
      begin
        resp = $platform.post(endpoint, payload: bodyParams, params: queryParams)
        body = resp.body
        if resp.status == 202
            puts('Job ID: ' + body['jobId']);
            puts ('Ready to receive response at: ' + WEBHOOK_URL);
        end
      rescue StandardError => e
        puts ("Unable to call speaker identify API. " + e.to_s)
      end
    else
      puts ("No enrolled speakers. Please enroll a few speaker ids and try again.")
    end
end

#
# Read the account enrolled speakers
#
def read_enrolled_speakers()
    enrolledSpeakerIds = []
    begin
      queryParams = {
            'partial': false,
            'perPage': 100,
            'page': 1
      }
      endpoint = "/ai/audio/v1/enrollments"
      resp = $platform.get(endpoint, queryParams)
      jsonObj = resp.body
      for enrollment in jsonObj['records'] do
        enrolledSpeakerIds.append(enrollment['speakerId'])
      end
    rescue StandardError => e
      puts  ("Unable to find enrolled speakers. " + e.to_s)
    end
    return enrolledSpeakerIds
end


# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    speakers_identification()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
