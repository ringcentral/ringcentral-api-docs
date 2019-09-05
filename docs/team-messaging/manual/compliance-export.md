# Glip Compliance Exports

RingCentral Glip data retention rule is based on the account's setting:

| Account | Glip Data Retention Rule |
|-----|------|
| Non-HIPAA | The account admin can set the retention policy to any number of days, although there are preset options for 30, 60 and 90 days. Once a policy is set, on a nightly basis all content older than the specified number of days will be deleted. |
| HIPAA enabled | All data will be deleted after 30 days. |
|||

To retain Glip data according to your company data retention policy, you can use the compliance export APIs to archive full or part of the data periodically.

!!! Important
    The Glip compliance exports APIs run at the account level. This means that only users with the admin role would be able to call these APIs to export the data of all users in the entire account.

## Glip Compliance Export APIs set

| API | path |
|-----|------|
| Create Glip Compliance Export | `/restapi/v1.0/glip/data-export` |
| Get Glip Compliance Export Task | `/restapi/v1.0/glip/data-export/taskId` |
| Get Glip Compliance Export Archive Content | `/restapi/v1.0/glip/data-export/taskId/archive/archiveId` |
|||

## How to archive Glip data

There are 3 steps to archive your company Glip data using the Compliance Export APIs set:

#### 1. Create an export task

To create an export task:

* Specify the period of time for the archive. The period of time is specified by the `dateFrom` and `dateTo`. Maximum range is 30 days.
* Specify a list of users by `userIds`.
* Specify a list of channels by `chatIds`
* Make a POST request to the `/restapi/v1.0/glip/data-export` endpoint.

!!! Hint
    Valid `userIds` can be retrieved using the [Get Chat API](https://developers.ringcentral.com/api-reference/Chats/readGlipChat) to get a list of members from a chat room.

    Valid `chatIds` can be retrieved using the [Get Chats API](https://developers.ringcentral.com/api-reference/Chats/listGlipChats) to read all call queue extensions.

Required permission(s):  Glip

Upon successful API call completion, the response contains the id (taskId) and the status of the newly created task.

```json hl_lines="3", linenums="1"
{
  "uri":"https://platform.ringcentral.com/restapi/v1.0/glip/data-export/178009004-178009004-9bf6d9b751ab40d39e6bfa1XXXXXXXXX",
  "id":"178009004-178009004-9bf6d9b751ab40d39e6bfa1XXXXXXXXX",
  "creationTime":"2019-08-30T19:32:11Z",
  "lastModifiedTime":"2019-08-30T19:32:11Z",
  "status":"Accepted"
}
```

#### 2. Check the status of a task identified by the taskId

To export a large data report (for a long period of time or for an account with a large number of members), the report creation process may take several minutes to complete. Therefore, you should check the status of a task to ensure it is marked as “Completed” before you can proceed to get the report.
The status of a task can be any of the following values:

_Accepted - Pending - InProgress - AttemptFailed - Failed - Completed - Cancelled_

To check the status of a task, make a GET request to `/restapi/v1.0/glip/data-export/[taskId]` endpoint. Where the `taskId` is the value of the `id` returned in the previous step.

If the report is ready, the task status is marked as “Completed”.

Upon successful API call completion, the response contains the id (taskId) and the status of the newly created task.
```json hl_lines="3 6", linenums="1"
{
  "uri":"https://platform.ringcentral.com/restapi/v1.0/glip/data-export/178009004-178009004-9bf6d9b751ab40d39e6bfa1XXXXXXXXX",
  "id":"178009004-178009004-9bf6d9b751ab40d39e6bfa1XXXXXXXXX",
  "creationTime":"2019-08-30T19:32:11Z",
  "lastModifiedTime":"2019-08-30T19:32:12Z",
  "status":"Completed",
  "result":[
  {
    "size":3095,
    "uri":"https://media.ringcentral.com/restapi/v1.0/glip/data-export/178009004-178009004-9bf6d9b751ab40d39e6bfa1XXXXXXXXX/archive/1"
  }]
}
```

#### 3. Get the archive files.

When a task is created successfully and completed, make a GET request to the `uri` under the `result` of the object returned in the previous step.

```http
GET https://media.ringcentral.com/restapi/v1.0/glip/data-export/178009004-178009004-9bf6d9b751ab40d39e6bfa1XXXXXXXXX/archive/1?access_token=['access_token']
```

## Sample code to export team messaging data

The following code sample shows how to call the Glip Compliance Export APIs to export the team messaging data and save it to a local machine.

```javascript tab="JavaScript"
var SDK = require('ringcentral')
var fs = require('fs')
var https = require('https');

var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
var platform = rcsdk.platform();

platform.login( {username: "username", password: "password", extension: "extension_number"} )
    .then(function(resp) {
        create_glip_compliance_export_task()
    });
}

function create_glip_compliance_export_task(){
    console.log("Create export task.")
    var endpoint = "/restapi/v1.0/glip/data-export"
    var params = {
        dateFrom: "2019-08-01T00:00:00.000Z",
        dateTo: "2019-08-26T23:59:59.999Z"
      }
    platform.post(endpoint, params)
      .then(function(resp){
          var json = resp.json()
          get_glip_compliance_export_task(json.id)
      })
      .catch(function(e){
          console.log(e)
      })
}

function get_glip_compliance_export_task(taskId){
    console.log("Check export task status ...")
    var endpoint = "/restapi/v1.0/glip/data-export/" + taskId
    platform.get(endpoint)
      .then(function(resp){
          var json = resp.json()
          if (json.status == "Completed"){
              for (var i=0; i<json.result.length; i++){
                var fileName = "glip-export-reports/" + json.creationTime + "_" + i + ".zip"
                get_glip_report_archived_content(json.result[i].uri, fileName)
              }
          }else if (json.status == "Accepted" || json.status == "InProgress") {
              setTimeout(function(){
                get_glip_compliance_export_task(taskId)
              }, 5000);
          }else
              console.log(json.status)
      })
      .catch(function(e){
          console.log(e)
      })
}

function get_glip_report_archived_content(contentUri, fileName){
    var uri = platform.createUrl(contentUri, {addToken: true});
    download(uri, fileName, function(){
        console.log("Save report zip file to the local machine.")
    })
}

const download = function(uri, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = https.get(uri, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);
        });
    });
}
```

```python tab="Python"
from ringcentral import SDK
import time, urllib2

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

def create_glip_compliance_export_task():
    print ("Create export task.")
    endpoint = "/restapi/v1.0/glip/data-export"
    params = {
        "dateFrom": "2019-07-01T00:00:00.000Z",
        "dateTo": "2019-07-29T23:59:59.999Z"
      }
    resp = platform.post(endpoint, params)
    json = resp.json()
    get_glip_compliance_export_task(json.id)

def get_glip_compliance_export_task(taskId):
    print("Check export task status ...")
    endpoint = "/restapi/v1.0/glip/data-export/" + taskId
    response = platform.get(endpoint)
    jsonObj = response.json()
    if jsonObj.status == "Completed":
        length = len(jsonObj.result)
        for i in range(length):
            fileName = "glip-export-reports_" + jsonObj.creationTime + "_" + str(i) + ".zip"
            get_glip_report_archived_content(jsonObj.result[i].uri, fileName)
    elif jsonObj.status == "Accepted" || jsonObj.status == "InProgress":
        time.sleep(5)
        get_glip_compliance_export_task(taskId)
    else:
        print (jsonObj.status)

def get_glip_report_archived_content(contentUri, zipFile):
    print("Save export zip file to the local machine.")
    uri = platform.create_url(contentUri, False, None, True);
    fileHandler = urllib2.urlopen(uri)
    with open(zipFile, 'wb') as output:
        output.write(fileHandler.read())

create_glip_compliance_export_task()
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

create_glip_compliance_export_task();

function create_glip_compliance_export_task(){
    global $platform;
    echo ("Create export task.\n");
    $endpoint = "/restapi/v1.0/glip/data-export";
    try {
        $response = $platform->post($endpoint,
            array(
                'dateFrom' => "2019-08-01T00:00:00.000Z",
                'dateTo' => "2019-08-26T23:59:59.999Z",
            ));
        $json = $response->json();
        get_glip_compliance_export_task($json->id);
    }catch(\RingCentral\SDK\Http\ApiException $e) {
        echo($e);
    }
}

function get_glip_compliance_export_task($taskId){
    global $platform;
    echo ("Check export task status ...\n");
    $endpoint = "/restapi/v1.0/glip/data-export/" . $taskId;
    try {
        $response = $platform->get($endpoint);
        $json = $response->json();
        if ($json->status == "Completed"){
            for ($i=0; $i<count($json->result); $i++){
              $fileName = "glip-export-reports_" . $json->creationTime . "_" . $i . ".zip";
              get_glip_report_archived_content($json->result[$i]->uri, $fileName);
            }
        }else if ($json->status == "Accepted" || $json->status == "InProgress"){
            sleep(5);
            get_glip_compliance_export_task($taskId);
        }else
          echo ($json->status);
    }catch(\RingCentral\SDK\Http\ApiException $e) {
        echo($e);
    }
}

function get_glip_report_archived_content($contentUri, $fileName){
    global $platform;
    echo ("Save export zip file to the local machine.\n");
    $uri = $platform->createUrl($contentUri, array(
        'addServer' => false,
        'addMethod' => 'GET',
        'addToken'  => true
    ));
    file_put_contents($fileName, fopen($uri, 'r'));
}
```

```c# tab="C#"
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Export_Glip_Data
{
    class Program
    {
        static RestClient rcsdk;
        static void Main(string[] args)
        {
            rcsdk = new RestClient("client_id", "client_secret", "server_url");
            await rcsdk.Authorize("username", "extension_number", "password");
            create_glip_compliance_export_task().Wait();
        }
        static private async Task create_glip_compliance_export_task()
        {
            var parameters = new CreateDataExportTaskRequest();
            parameters.dateFrom = "2019-08-01T00:00:00.000Z";
            parameters.dateTo = "2019-08-26T23:59:59.999Z";

            var resp = await rcsdk.Restapi().Glip().DataExport().Post(parameters);
            Console.WriteLine("Create export task");
            var taskId = resp.id;
            Boolean polling = true;
            while (polling)
            {
                Console.WriteLine("Check export task status ...");
                Thread.Sleep(5000);
                resp = await rcsdk.Restapi().Glip().DataExport(taskId).Get();
                if (resp.status != "InProgress")
                {
                    polling = false;
                }
            }
            if (resp.status == "Completed")
            {
                for (var i = 0; i < resp.result.Length; i++)
                {
                    var fileName = "glip-export-reports_" + resp.creationTime + "_" + i + ".zip";
                    var contentUrl = resp.result[i].uri + "?access_token=" + rcsdk.token.access_token;
                    WebClient webClient = new WebClient();
                    webClient.DownloadFile(contentUrl, fileName);
                    Console.WriteLine("Save report zip file to the local machine.");
                }
            }
            else
            {
                Console.WriteLine("Error!");
            }
        }
    }
}
```

```java tab="Java"
import com.ringcentral.*;
import com.ringcentral.definitions.*;
import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

public class Export_Glip_Data {
    static RestClient rcsdk;
    public static void main(String[] args) {
        var obj = new Export_Glip_Data();
        rcsdk = new RestClient("client_id", "client_secret", "server_url");
        try {
            rcsdk.authorize("username", "extension_number", "password");
            obj.create_glip_compliance_export_task();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }
    public void create_glip_compliance_export_task() throws RestException, IOException {
        var parameters = new CreateDataExportTaskRequest();
        parameters.dateFrom = "2019-08-01T00:00:00.000Z";
        parameters.dateTo = "2019-08-26T23:59:59.999Z";

        var resp = rcsdk.restapi().glip().dataexport().post(parameters);
        System.out.println("Create export task.");
        var taskId = resp.id;
        boolean polling = true;
        while (polling)
        {
            System.out.println("Check export task status ...");
            try {
                Thread.sleep(5000);
                resp = rcsdk.restapi().glip().dataexport(taskId).get();
                if (!resp.status.equals("InProgress"))
                  polling = false;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        if (resp.status.equals("Completed")) {
            for (var i = 0; i < resp.result.length; i++)
            {
                var fileName = "./src/test/resources/glip-export-reports_" + resp.creationTime + "_" + i + ".zip";
                var contentUrl = resp.result[i].uri + "?access_token=" + rcsdk.token.access_token;
                try (BufferedInputStream inputStream = new BufferedInputStream(new URL(contentUrl).openStream());
                	FileOutputStream fileOS = new FileOutputStream(fileName)) {
                	byte data[] = new byte[1024];
                	int byteContent;
                	while ((byteContent = inputStream.read(data, 0, 1024)) != -1) {
                		fileOS.write(data, 0, byteContent);
                	}
                	System.out.println("Save report zip file to the local machine.");
                } catch (IOException e) {
                   // handles IO exceptions
                	System.out.println("Error!");
                }
            }
        }
    }
}
```

```ruby tab="Ruby"
require 'ringcentral'
require "open-uri"

$rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
$rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

def create_glip_compliance_export_task()
    puts "Create export task."
    endpoint = "/restapi/v1.0/glip/data-export"
    response = $rc.post(endpoint, payload: {
        dateFrom: "2019-07-01T00:00:00.000Z",
        dateTo: "2019-07-29T23:59:59.999Z"
      })
    get_glip_compliance_export_task(response.body['id'])
end

def get_glip_compliance_export_task(taskId)
    puts "Check export task status ..."
    endpoint = "/restapi/v1.0/glip/data-export/" + taskId
    response = $rc.get(endpoint)
    body = response.body
    if body['status'] == "Completed"
        length = body['result'].length
        for i in (0...length)
            fileName = "glip-export-reports_" + body['creationTime'] + "_" + i.to_s + ".zip"
            get_glip_report_archived_content(body['result'][i]['uri'], fileName)
        end
    elsif body['status'] == "Accepted" || body['status'] == "InProgress"
        sleep(5)
        get_glip_compliance_export_task(taskId)
    else
        puts body['status']
    end
end

def get_glip_report_archived_content(contentUri, zipFile)
    puts "Save report zip file to the local machine."
    uri = contentUri + "?access_token=" + $rc.token['access_token']
    open(uri) do |data|
      File.open(zipFile, "wb") do |file|
        file.write(data.read)
      end
    end
end

create_glip_compliance_export_task()
```
