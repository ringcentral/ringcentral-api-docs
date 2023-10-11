require 'ringcentral'

#
# Read speakers identification
#
def read_enrollments()
    begin
        queryParams = {
              'partial': true,
              'perPage': 100,
              'page': 1
            }
        endpoint = "/ai/audio/v1/enrollments"
        resp = $platform.get(endpoint, queryParams)
        jsonObj = resp.body
        puts (jsonObj)
        for record in jsonObj['records'] do
            if record['enrollmentId'] == "123456789"
                delete_enrollment(record['enrollmentId'])
            end
        end
    rescue StandardError => e
      puts ("Unable to read speakers identification. " + e.to_s)
    end
end

#
# Enroll speaker identification
#
def delete_enrollment(speakerId)
    begin
        endpoint = "/ai/audio/v1/enrollments/" + speakerId
        resp = $platform.delete(endpoint)
        puts ("Deleted")
    rescue StandardError => e
      puts ("Unable to delete a speaker identification. " + e.to_s)
    end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "PRODUCTION-JWT" )
    read_enrollments()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
