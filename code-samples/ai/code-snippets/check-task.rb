require 'ringcentral'

#
# Check speech to text job status
#
def check_task_status(jobId)
    begin
        endpoint = "/ai/status/v1/jobs/" + jobId
        resp = $platform.get(endpoint)
        jsonObj = resp.body
        puts (jsonObj)
    rescue StandardError => e
      puts ("Unable to get speech to text job status. " + e.to_s)
    end
end


# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "PRODUCTION-JWT" )
    check_task_status("jobId")
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
