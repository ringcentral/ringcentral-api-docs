#!/usr/bin/env python
# meetings/quick-start.py - This script helps developers create a meeting
#
# Variables:
# RC_CLIENT_ID, RC_CLIENT_SECRET, RC_SERVER_URL: Connection info
# RC_USERNAME, RC_PASSWORD, RC_EXTENSION: Auth credentials
# 
#
# License: MIT
# Copyright: 2021 RingCentral, Inc. 
from ringcentral import SDK
import os,sys,time
from urllib.request import urlopen

CLIENTID     = os.environ.get('RC_CLIENT_ID')
CLIENTSECRET = os.environ.get('RC_CLIENT_SECRET')
SERVER       = os.environ.get('RC_SERVER_URL')
USERNAME     = os.environ.get('RC_USERNAME')
PASSWORD     = os.environ.get('RC_PASSWORD')
EXTENSION    = os.environ.get('RC_EXTENSION')

def create_compliance_export_task():
    print("Create export task.")
    endpoint = "/restapi/v1.0/glip/data-export"
    params = {
	"timeFrom": "2021-01-01T00:00:00.000Z",
	"timeTo": "2021-01-31T23:59:59.999Z"
      }
    resp = platform.post(endpoint, params)
    json = resp.json()
    get_compliance_export_task(json.id)

def get_compliance_export_task(taskId):
    print("Check export task status ...")
    endpoint = "/restapi/v1.0/glip/data-export/" + taskId
    response = platform.get(endpoint)
    jsonObj = response.json()
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

def get_report_archived_content(contentUri, zipFile):
    print("Save export zip file to the local machine.")
    uri = platform.create_url(contentUri, False, None, True);
    fileHandler = urlopen(uri)
    with open(zipFile, 'wb') as output:
        output.write(fileHandler.read())

try:
    rcsdk = SDK( CLIENTID, CLIENTSECRET, SERVER )
    platform = rcsdk.platform()
    platform.login(USERNAME, EXTENSION, PASSWORD)
    create_compliance_export_task()
except Exception as e:
    sys.exit( f'Could not generate export: {e}' )
else:
    sys.exit(0)
