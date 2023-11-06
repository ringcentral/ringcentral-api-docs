require 'ringcentral'
require "down"
require "fileutils"

#
# Create a task to export the account messages within March 2023
#
def create_message_store_report()
  begin
    bodyParams = {
      dateFrom: "2023-03-01T00:00:00.000Z",
      dateTo: "2023-03-31T23:59:59.999Z"
    }
    endpoint = "/restapi/v1.0/account/~/message-store-report"
    response = $platform.post(endpoint, payload: bodyParams)
    puts (response.body['id'])
    get_message_store_report_task(response.body['id'])
  rescue StandardError => e
    puts (e)
  end
end

#
# Check the task completion status
#
def get_message_store_report_task(taskId)
  begin
    endpoint = "/restapi/v1.0/account/~/message-store-report/" + taskId
    resp = $platform.get(endpoint)
    taskStatus = resp.body['status']
    puts ("Task creation status: " + taskStatus)
    if taskStatus == "Completed"
      get_message_store_report_archive(taskId)
    elsif (taskStatus == "AttemptFailed" || taskStatus == "Failed" || taskStatus == "Cancelled")
      puts ("Export message store failed.")
    else
      sleep(10)
      get_message_store_report_task(taskId)
    end
  rescue StandardError => e
    puts (e)
  end
end

#
# When the task is completed, use the task id to get the uri of the report file
#
def get_message_store_report_archive(taskId)
  puts "Getting report uri ..."
  begin
    endpoint = "/restapi/v1.0/account/~/message-store-report/"+ taskId +"/archive"
    resp = $platform.get(endpoint)
    length = resp.body['records'].length
    dateLog = Time.now.strftime("%Y_%m_%d_%H_%M")
    for i in (0...length)
	    fileName = "message_store_" + dateLog + "_" + i.to_s + ".zip"
	    get_message_store_report_archive_content(resp.body['records'][i]['uri'], fileName)
    end
  rescue StandardError => e
    puts (e)
  end
end

def get_message_store_report_archive_content(contentUri, fileName)
  begin
    uri = contentUri + "?access_token=" + $platform.token['access_token']
    tempfile = Down.download(uri)
    FileUtils.mv(tempfile.path, fileName)
    puts (fileName + " file is saved to the local machine.")
  rescue StandardError => e
    puts (e)
  end
end


# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "SANDBOX_JWT" )
    create_message_store_report()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
