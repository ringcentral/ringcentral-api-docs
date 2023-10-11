require 'ringcentral'

NGROK = "http://4bb8-69-181-201-33.ngrok-free.app"
WEBHOOK_URL = NGROK + "/webhook";
CONTENT_URI = 'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Sample%20Call%20Tech%20Support.mp3'

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
          fileName = "transcript-db.json"
          transcriptionObj = []
          begin
            if File.exist?(fileName) == true
              #File.open(fileName, 'r') { |file| file.read("your text") }
              transcriptDB = File.open(fileName, "r");
              transcriptionObj = JSON.parse(transcriptDB.read())
              transcriptDB.close()
            else
              transcriptDB = File.new(fileName, "w+");
            end

            newTranscription = {
                 'jobId': body['jobId'],
                 'response': {}
            }
            transcriptionObj.append(newTranscription)
            transcriptDB = File.open(fileName, "w");
            transcriptDB.write(JSON.generate(transcriptionObj))
            transcriptDB.close()
            puts ("Done")
          rescue StandardError => e
            puts (e)
          end
      else
          puts ('An error occurred posting the request.')
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
