from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

def create_message_store_report() :
    endpoint = "/restapi/v1.0/account/~/message-store-report"
    params = {
	"dateFrom": "2019-01-01T00:00:00.000Z",
	"dateTo": "2019-03-31T23:59:59.999Z"
    }
    response = platform.post(endpoint, params)
    json = response.json()
    get_message_store_report_task(json.id)

def get_message_store_report_task(taskId):
    print("check task creation status ...")
    endpoint = "/restapi/v1.0/account/~/message-store-report/" + taskId
    response = platform.get(endpoint)
    json = response.json()
    if json.status == "Completed":
        get_message_store_report_archive(taskId)
    else:
        time.sleep(2)
        get_message_store_report_task(taskId)

def get_message_store_report_archive(taskId):
    print("getting report uri ...")
    endpoint = "/restapi/v1.0/account/~/message-store-report/"+ taskId +"/archive"
    response = platform.get(endpoint)
    jsonObj = response.json()
    length = len(jsonObj.records)
    dateLog = datetime.datetime.today().strftime("%Y_%m_%d_%H_%M")
    for i in range(length):
        fileName = "message_store_content_" + dateLog + "_" + str(i) + ".zip"
        get_message_store_report_archive_content(jsonObj.records[i].uri, fileName)

def get_message_store_report_archive_content(contentUri, zipFile):
    print("Save report zip file to the local machine.")
    uri = platform.create_url(contentUri, False, None, True);
    print (uri)
    fileHandler = urllib2.urlopen(uri)
    with open(zipFile, 'wb') as output:
        output.write(fileHandler.read())

create_message_store_report()
