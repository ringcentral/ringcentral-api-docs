require 'ringcentral'
require 'dotenv'
require 'json'

# Remember to modify the path to where you saved your .env file!
Dotenv.load("./../.env")

#
#  Convert speech to text
#
def speech_to_text()
    bodyParams = {
      'contentUri':               ENV['CONTENT_URI'],
      'encoding':                 "Mpeg",
      'languageCode':             "en-US",
      'source':                   "RingCentral",
      'audioType':                "CallCenter",
      'enablePunctuation':        true,
      'enableSpeakerDiarization': true
    }
    callbackAddress = ENV['NGROK_URL'] + "/webhook"
    endpoint = "/ai/audio/v1/async/speech-to-text" #?webhook=" + callbackAddress #CGI.escape(callbackAddress)
    queryParams = {
      'webhook': callbackAddress
    }
    begin
      resp = $platform.post(endpoint, payload: bodyParams, params: queryParams)
      body = resp.body
      if resp.status == 202
          puts('Job ID: ' + body['jobId']);
          puts ('Ready to receive response at: ' + callbackAddress);
      else
          puts ('An error occurred posting the request.')
      end
    rescue StandardError => e
      puts ("Unable to call speech to text API. " + e.to_s)
    end
end

# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( ENV['RC_CLIENT_ID'], ENV['RC_CLIENT_SECRET'], ENV['RC_SERVER_URL'] )

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: ENV['RC_JWT'])
    speech_to_text()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end

login()
##############################
# End of quick start section
##############################


########
# Code snippet section for boostrap testing purpose
########
def boostrap_test_function()

    # sleep(2)
    # puts "Test analyze interaction"
    # require_relative './code-snippets/interactions'
    # analyze_interaction()

    # sleep(2)
    # puts "Test identify spekears"
    # require_relative './code-snippets/speaker-identification'
    # identify_speakers()

    # sleep(2)
    # puts "Test punctuation"
    # require_relative './code-snippets/punctuation'
    # punctuation()

    # sleep(2)
    # puts "Test punctuation"
    # require_relative './code-snippets/summarize'
    # conversation_summary()

    # sleep(2)
    # puts "Test check task status"
    # require_relative './code-snippets/check-task'
    # check_task_status("a781be1a-00cc-11ee-867a-0050568ce184")

    # sleep(2)
    # puts "Test enroll speaker identification"
    # require_relative './code-snippets/enrollment'
    # contentFile = ENV['ENROLLMENT_CONTENT_4']
    # enrollment(contentFile)

    sleep(2)
    puts "Test speaker diarization"
    require_relative './code-snippets/speaker-diarization'
    speakers_recognition()
end

boostrap_test_function()
