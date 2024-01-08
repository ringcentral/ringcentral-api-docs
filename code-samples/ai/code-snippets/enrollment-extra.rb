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
