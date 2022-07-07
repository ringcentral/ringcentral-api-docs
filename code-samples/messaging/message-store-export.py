#!/usr/bin/env python
from ringcentral import SDK
from datetime import date
from urllib.request import urlopen
import os,sys,time
from dotenv import load_dotenv
load_dotenv()

CLIENTID     = os.environ.get('RC_CLIENT_ID')
CLIENTSECRET = os.environ.get('RC_CLIENT_SECRET')
SERVER       = os.environ.get('RC_SERVER_URL')
JWT          = os.environ.get('RC_JWT')

sdk = SDK( CLIENTID, CLIENTSECRET, SERVER )
platform = sdk.platform()
platform.login( jwt = JWT )

today = date.today()
dateLog = today.strftime("%Y_%m_%d_%H_%M")
ZIPFILE= "message_store_" + dateLog  + ".zip"

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
        return get_message_store_report_archive(taskId)
    else:
        time.sleep(2)
        return get_message_store_report_task(taskId)

def get_message_store_report_archive(taskId):
    print("getting report uri ...")
    endpoint = "/restapi/v1.0/account/~/message-store-report/"+ taskId +"/archive"
    jsonObj = platform.get(endpoint).json()
    for i in range( len(jsonObj.records) ):
        get_message_store_report_archive_content( jsonObj.records[i].uri, i )

def get_message_store_report_archive_content(contentUri, i):
    zipFileName = f'{i}-' + ZIPFILE
    print( f'Save report to: {zipFileName}')
    uri = platform.create_url(contentUri, False, None, True);
    fileHandler = urlopen(uri)
    with open(zipFileName, 'wb') as output:
        output.write(fileHandler.read())

create_message_store_report()
sys.exit(0)
