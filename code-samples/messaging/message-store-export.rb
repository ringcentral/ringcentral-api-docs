#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'open-uri'
require 'dotenv/load'

$rc = RingCentral.new( ENV['RC_CLIENT_ID'],
                       ENV['RC_CLIENRT_SECRET'],
                       ENV['RC_SERVER_URL'] )

$rc.authorize( jwt: ENV['RC_JWT'] )

def create_message_store_report()
    endpoint = "/restapi/v1.0/account/~/message-store-report"
    response = $rc.post(endpoint, payload: {
	      dateFrom: "2019-01-01T00:00:00.000Z",
	      dateTo: "2019-03-31T23:59:59.999Z"
      })
    puts response.body['id']
    puts response.body['status']
    get_message_store_report_task(response.body['id'])
end

def get_message_store_report_task(taskId)
    puts "check task creation status ..."
    endpoint = "/restapi/v1.0/account/~/message-store-report/" + taskId
    response = $rc.get(endpoint)
    if response.body['status'] == "Completed"
      get_message_store_report_archive(taskId)
    else
      sleep(2)
      get_message_store_report_task(taskId)
  end
end

def get_message_store_report_archive(taskId)
    puts "getting report uri ..."
    endpoint = "/restapi/v1.0/account/~/message-store-report/"+ taskId +"/archive"
    response = $rc.get(endpoint)
    length = response.body['records'].length
    dateLog = Time.now.strftime("%Y_%m_%d_%H_%M")
    for i in (0...length)
	    fileName = "message_store_content_" + dateLog + "_" + i.to_s + ".zip"
	    get_message_store_report_archive_content(response.body['records'][i]['uri'], fileName)
    end
end

def get_message_store_report_archive_content(contentUri, zipFile)
    puts "Save report zip file to the local machine."
    uri = contentUri + "?access_token=" + $rc.token['access_token']
    open(uri) do |data|
       File.open(zipFile, "wb") do |file|
	     file.write(data.read)
       end
    end
end

create_message_store_report()
