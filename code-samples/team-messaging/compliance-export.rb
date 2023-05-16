#!usr/bin/ruby

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

require 'ringcentral'
require 'open-uri'
require 'dotenv'
# Remember to modify the path to where you installed the RingCentral SDK and saved your .env file!
Dotenv.load("./../.env")

$platform = RingCentral.new( ENV['RC_CLIENT_ID'], ENV['RC_CLIENT_SECRET'], ENV['RC_SERVER_URL'] )


def create_compliance_export_task()
    puts "Create export task."
    bodyParams = {
        'timeFrom': "2023-01-01T00:00:00.000Z",
        'timeTo': "2023-01-31T23:59:59.999Z"
      }
    endpoint = "/team-messaging/v1/data-export"
    response = $platform.post(endpoint, payload: bodyParams)
    get_compliance_export_task(response.body['id'])
end

def get_compliance_export_task(taskId)
    puts "Check export task status ..."
    endpoint = "/team-messaging/v1/data-export/" + taskId
    response = $platform.get(endpoint)
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
    uri = contentUri + "?access_token=" + $platform.token['access_token']
    IO.copy_stream(URI.open(uri), fileName)
end

begin
  $platform.authorize(jwt: ENV['RC_JWT'])
  create_compliance_export_task()
rescue StandardError => e
  puts e
end
