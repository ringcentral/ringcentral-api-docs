#!/usr/bin/python

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

import os
import sys
import time
import requests

#from urllib.request import urlopen
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException
from dotenv import load_dotenv

load_dotenv()

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

#
# Create a task to export the Team Messaging store for a period of time.
#
def create_compliance_export_task():
    print("Create export task.")
    try:
        bodyParams = {
        'timeFrom': "2023-01-01T00:00:00.000Z",
        'timeTo': "2023-01-31T23:59:59.999Z"
        }
        endpoint = "/team-messaging/v1/data-export"
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        get_compliance_export_task(jsonObj.id)
    except ApiException as e:
        print (e)
#
# Check the status of the task using the taskId.
#
def get_compliance_export_task(taskId):
    print("Check export task status ...")
    try:
        endpoint = "/team-messaging/v1/data-export/" + taskId
        resp = platform.get(endpoint)
        jsonObj = resp.json()
        if jsonObj.status == "Completed":
            length = len(jsonObj.datasets)
            for i in range(length):
                fileName = "rc-export-reports_" + jsonObj.creationTime + "_" + str(i) + ".zip"
                get_report_archived_content(jsonObj.datasets[i].uri, fileName)
        elif jsonObj.status == "Accepted" or jsonObj.status == "InProgress":
            time.sleep(5)
            get_compliance_export_task(taskId)
        else:
            print (jsonObj.status)
    except ApiException as e:
        print (e)

#
# Download the task compressed file and save to a local storage.
#
def get_report_archived_content(contentUri, fileName):
    print("Save export zip file to the local machine.")
    uri = platform.create_url(contentUri, False, None, True);
    response = requests.get(uri, stream=True)
    file_size = int(response.headers.get("Content-Length", 0))
    with open(fileName,"wb") as output:
        output.write(response.content)
        print ("File has been downloaded successfully and saved in " + fileName)


try:
  platform.login( jwt=os.environ.get('RC_JWT') )
  create_compliance_export_task()
except ApiException as e:
  sys.exit("Unable to authenticate to platform: " + str(e))
