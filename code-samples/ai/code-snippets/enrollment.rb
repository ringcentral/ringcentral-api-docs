require 'ringcentral'
require 'base64'

#
# Read a speaker id
#
def read_enrollment(enrollmentId)
    begin
        endpoint = "/ai/audio/v1/enrollments/" + enrollmentId
        resp = $platform.get(endpoint)
        jsonObj = resp.body
        return jsonObj
    rescue StandardError => e
        puts ("Unable to find this speaker identification. " + e.to_s)
        return nil
    end
end

#
# Enroll speaker identification
#
def enrollment(contentFile)
    begin
        # use own extension id as a unique enrollment id
        tokens = $platform.token
        enrollmentId = tokens['owner_id'].to_s

        file = File.open(contentFile, "rb")
        contents = file.read
        base64_string = Base64.encode64(contents)

        endpoint = "/ai/audio/v1/enrollments"

        # check if this speaker id exists
        enrollmentObj = read_enrollment(enrollmentId)
        if enrollmentObj != nil
            # speaker id exists => update it
            puts ("Existing enrollment")
            puts (enrollmentObj)
            bodyParams = {
                  'encoding': "Mpeg",
                  'languageCode': "en-US",
                  'content': base64_string
                }
            resp = $platform.patch(endpoint + "/" + enrollmentId, payload: bodyParams)
        else
            # speaker id does not exist => enroll a new one
            bodyParams = {
                  'encoding': "Mpeg",
                  'languageCode': "en-US",
                  'content': base64_string,
                  'enrollmentId': enrollmentId
                }
            resp = $platform.post(endpoint, payload: bodyParams)
        end

        jsonObj = resp.body
        puts ("New enrollment")
        puts (jsonObj)
    rescue StandardError => e
      puts ("Unable to enroll speaker identification. " + e.to_s)
    end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "PRODUCTION-JWT" )
    # set your valid audio content file name and path
    contentFile = "VALID_AUDIO_CONTENT_FILE"
    enrollment(contentFile)
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
