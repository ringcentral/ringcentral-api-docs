#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'open-uri'
require 'dotenv/load'

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_JWT'])

def create_compliance_export_task()
    puts "Create export task."
    endpoint = "/team-messaging/v1/data-export"
    response = $rc.post(endpoint, payload: {
	timeFrom: "2019-07-01T00:00:00.000Z",
	timeTo: "2019-07-29T23:59:59.999Z"
      })
    get_compliance_export_task(response.body['id'])
end

def get_compliance_export_task(taskId)
    puts "Check export task status ..."
    endpoint = "/team-messaging/v1/data-export/" + taskId
    response = $rc.get(endpoint)
    body = response.body
    if body['status'] == "Completed"
	length = body['datasets'].length
	for i in (0...length)
	    fileName = "rc-export-reports_" + body['creationTime'] + "_" + i.to_s + ".zip"
	    get_report_archived_content(body['datasets'][i]['uri'], fileName)
	end
    elsif body['status'] == "Accepted" || body['status'] == "InProgress"
	sleep(5)
	get_compliance_export_task(taskId)
    else
	puts body['status']
    end
end

def get_report_archived_content(contentUri, fileName)
    puts "Save report zip file to the local machine."
    uri = contentUri + "?access_token=" + $rc.token['access_token']
    open(uri) do |data|
      File.open(fileName, "wb") do |file|
	       file.write(data.read)
      end
    end
end

create_compliance_export_task()
