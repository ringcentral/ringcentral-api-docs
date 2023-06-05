from ringcentral import SDK
from datetime import date
import requests
import time

#
# Create a task to export the account messages within March 2023
#
def create_message_store_report() :
    try:
        endpoint = "/restapi/v1.0/account/~/message-store-report"
        bodyParams = {
    	   'dateFrom': "2023-03-01T00:00:00.000Z",
    	   'dateTo': "2023-03-31T23:59:59.999Z"
        }
        response = platform.post(endpoint, bodyParams)
        json = response.json()
        get_message_store_report_task(json.id)
    except Exception as e:
        print (str(e))

#
# Check the task completion status
#
def get_message_store_report_task(taskId):
    try:
        endpoint = "/restapi/v1.0/account/~/message-store-report/" + taskId
        response = platform.get(endpoint)
        jsonObj = response.json()
        print(f'Task creation status: {jsonObj.status}')
        if jsonObj.status == "Completed":
            return get_message_store_report_archive(taskId)
        elif (jsonObj.status == "AttemptFailed" or jsonObj.status == "Failed" or jsonObj.status == "Cancelled"):
            print ("Export message store failed.")
        else:
            time.sleep(10)
            get_message_store_report_task(taskId)
    except Exception as e:
        print (str(e))

#
# When the task is completed, use the task id to get the uri of the report file
#
def get_message_store_report_archive(taskId):
    print("Getting report uri ...")
    try:
        endpoint = "/restapi/v1.0/account/~/message-store-report/"+ taskId +"/archive"
        response = platform.get(endpoint)
        jsonObj = response.json()
        today = date.today()
        dateLog = today.strftime("%Y_%m_%d_%H_%M")
        for i in range( len(jsonObj.records) ):
            fileName = f'message_store_{dateLog}_{i}.zip'
            get_message_store_report_archive_content(jsonObj.records[i].uri, fileName)
    except Exception as e:
        print (str(e))


def get_message_store_report_archive_content(contentUri, fileName):
    uri = platform.create_url(contentUri, False, None, True);
    response = requests.get(uri, stream=True)
    with open(fileName,"wb") as output:
        output.write(response.content)

    print (f'{fileName} file is saved to the local machine.')


# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "SANDBOX_JWT" )
      create_message_store_report()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
