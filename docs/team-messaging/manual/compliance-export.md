# Glip Compliance Exports

Compliance Exports is a special capability specifically built for companies and regulated industries, such as financial services, with compliance requirements for using electronic communication in the workplace. This feature is also a fail-safe way of preserving business communications for legal discovery or internal review.

## RingCentral Data Retention Policy

The Glip Compliance Export API allows any data retention practices to be automated and is essential for regulated industries because RingCentral does not retain customer data indefinitely. Our data retention policy is as follows, depending upon whether your account is "HIPAA enabled."

| Account | Glip Data Retention Rule |
|-|-|
| **Non-HIPAA** | The account admin can set the retention policy to any number of days, although there are preset options for 30, 60 and 90 days. Once a policy is set, on a nightly basis all content older than the specified number of days will be deleted. |
| **HIPAA enabled** | All data will be deleted after 30 days. |

!!! alert Important
    The Glip compliance exports APIs run at the account level. This means that only users with the admin role would be able to call these APIs to export the data of all users in the entire account.

    The Compliance Exports feature must be turned on from the Glip app in the Administration settings.

## Glip Data Export Process

Glip Exports can take some time to compile and make available for download. Therefore, the process is an asynchronous one that follows this simple 3-step flow:

1. Developer creates an "Export Report" task.
2. Developer polls to check the status of the created "Export Report" task.
3. When the task is complete, developer downloads the generated file.

What follows is a more detailed walk-through of this process.

### Creating an Export Report Task

To create an export task:

* Specify the period of time for the archive via the `timeFrom` and `timeTo` parameters.
* Specify a list of users whose data you would like to export via the `contacts` parameter. A `contact` is an object and can be specified by an id number or an email address.
* Specify a list of teams/conversations to export via the `chatIds` parameter.
* Finally, make a POST request to the `/restapi/v1.0/glip/data-export` endpoint.

!!! hint "How to find IDs to filter by"
    Valid `chatIds` can be retrieved using the [Get Chats API](https://developers.ringcentral.com/api-reference/Chats/listGlipChats) to read all teams/chats/conversations.

Required permission(s):  Glip

If successful, the response will contain the task ID and the status of the newly created task as shown below.

```json hl_lines="3"
{
  "uri":"https://platform.ringcentral.com/restapi/v1.0/glip/data-export/809646016-xx-yy",
  "id":"809646016-xx-yy",
  "creationTime":"2020-01-16T22:12:55Z",
  "lastModifiedTime":"2020-01-16T22:12:55Z",
  "status":"Accepted",
  "creator": {
    "id":"62288329016",
    "firstName":"Paco",
    "lastName":"Vu"},
  "specific": {
    "timeFrom":"2020-01-14T00:00:00Z",
    "timeTo":"2020-01-16T22:12:55Z"
    }
}
```

### Polling the Status of the Export Task

To archive a large data export report (for a long period of time or for an account with a large number of extensions), the report creation process may take several minutes to complete. Therefore, you will need to periodically check the status of a task. When its status is marked as "Completed" you can proceed to get the report. The status of a task can be any of the following values:

* Accepted
* Pending
* InProgress
* AttemptFailed
* Failed
* Completed
* Cancelled

To check the status of a task, make a GET request to `/restapi/v1.0/glip/data-export/[taskId]` endpoint. Where the `taskId` is the value of the `id` returned in the previous step. If the report is ready, the task status is marked as "Completed."

When successful, the response will contain the id (taskId) and the status of the newly created task.

```json hl_lines="3 6"
{
  "uri":"https://platform.ringcentral.com/restapi/v1.0/glip/data-export/809646016-xx-yy",
  "id":"809646016-xx-yy",
  "creationTime":"2020-01-16T22:12:55Z",
  "lastModifiedTime":"2020-01-16T22:12:55Z",
  "status":"Completed",
  "creator": {
    "id":"62288329016",
    "firstName":"Paco",
    "lastName":"Vu"},
  "specific": {
    "timeFrom":"2020-01-14T00:00:00Z",
    "timeTo":"2020-01-16T22:12:55Z"
    },
  "datasets":[
    {
      "id":"1",
      "size":3434,
      "uri":"https://media.ringcentral.com/restapi/v1.0/glip/data-export/809646016-xx-yy/datasets/1"
    }]
}
```

### Authentication and file downloads

When an Export Task is successfully completed, make a GET request to the `uri` under the `datasets` of the object returned in the previous step.

The file reference is protected and cannot be downloaded without an authentication context. To download a compliance archive file, append your authentication token (the same one you would use in your HTTP Authorization header) in a `access_token` parameter as shown below:

```http
GET https://media.ringcentral.com/restapi/v1.0/glip/data-export/809646016-xx-yy/datasets/1?access_token=['access_token']
```

## Sample Code: Export Team Messaging Data

The following code sample shows how to call the Glip Compliance Export APIs to export the team messaging data and save it to a local machine.

=== "JavaScript"
	```javascript
	const RingCentral = require('@ringcentral/sdk').SDK
	var fs = require('fs')
	var https = require('https');

	var rcsdk = new RingCentral( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
	var platform = rcsdk.platform();

	platform.login( {username: "username", password: "password", extension: "extension_number"} )
	    .then(function(resp) {
		      create_glip_compliance_export_task()
	    });
	}

	async function create_glip_compliance_export_task(){
	    console.log("Create export task.")
	    var params = {
		      timeFrom: "2019-08-01T00:00:00.000Z",
		      timeTo: "2019-08-26T23:59:59.999Z"
	      }
      try {
  	    var resp = await platform.post("/restapi/v1.0/glip/data-export", params)
  		  var jsonObj = await resp.json()
  		  get_glip_compliance_export_task(jsonObj.id)
  	  }catch(e){
        console.log(e.message)
	    }
	}

	async function get_glip_compliance_export_task(taskId){
	    console.log("Check export task status ...")
	    try{
        var resp = await platform.get(`/restapi/v1.0/glip/data-export/${taskId}`)
        var jsonObj = await resp.json()
        if (jsonObj.status == "Completed"){
          for (var i=0; i<jsonObj.datasets.length; i++){
            var fileName = `glip-export-reports-${jsonObj.creationTime}_${i}.zip`
            get_glip_report_archived_content(jsonObj.datasets[i].uri, fileName)
          }
        }else if (jsonObj.status == "Accepted" || jsonObj.status == "InProgress") {
          setTimeout(function(){
            get_glip_compliance_export_task(taskId)
          }, 5000);
        }else{
          console.log(jsonObj.status)
	      }
      }catch(e){
        console.log(e)
      }
	}

	async function get_glip_report_archived_content(contentUri, fileName){
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

=== "Python"
	```python
	from ringcentral import SDK
	import time, urllib2

	sdk = SDK( "client_id", "client_secret", "server_url" )
	platform = sdk.platform()
	platform.login( "username", "extension", "password" )

	def create_glip_compliance_export_task():
	    print ("Create export task.")
	    endpoint = "/restapi/v1.0/glip/data-export"
	    params = {
		"timeFrom": "2019-07-01T00:00:00.000Z",
		"timeTo": "2019-07-29T23:59:59.999Z"
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
  		    length = len(jsonObj.datasets)
			    for i in range(length):
		          fileName = "glip-export-reports_" + jsonObj.creationTime + "_" + str(i) + ".zip"
		    	    get_glip_report_archived_content(jsonObj.datasets[i].uri, fileName)
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

=== "PHP"
	```php
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
			'timeFrom' => "2019-08-01T00:00:00.000Z",
			'timeTo' => "2019-08-26T23:59:59.999Z",
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
		    for ($i=0; $i<count($json->datasets); $i++){
		      $fileName = "glip-export-reports_" . $json->creationTime . "_" . $i . ".zip";
		      get_glip_report_archived_content($json->datasets[$i]->uri, $fileName);
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

=== "C#"
	```c#
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
		    parameters.timeFrom = "2019-08-01T00:00:00.000Z";
		    parameters.timeTo = "2019-08-26T23:59:59.999Z";

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
			for (var i = 0; i < resp.datasets.Length; i++)
			{
			    var fileName = "glip-export-reports_" + resp.creationTime + "_" + i + ".zip";
			    var contentUrl = resp.datasets[i].uri + "?access_token=" + rcsdk.token.access_token;
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

=== "Java"
	```java
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
		  parameters.timeFrom = "2019-08-01T00:00:00.000Z";
		  parameters.timeTo = "2019-08-26T23:59:59.999Z";

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
		    for (var i = 0; i < resp.datasets.length; i++)
		    {
    			var fileName = "./src/test/resources/glip-export-reports_" + resp.creationTime + "_" + i + ".zip";
    			var contentUrl = resp.datasets[i].uri + "?access_token=" + rcsdk.token.access_token;
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

=== "Ruby"
	```ruby
	require 'ringcentral'
	require "open-uri"

	$rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
	$rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

	def create_glip_compliance_export_task()
	    puts "Create export task."
	    endpoint = "/restapi/v1.0/glip/data-export"
	    response = $rc.post(endpoint, payload: {
		timeFrom: "2019-07-01T00:00:00.000Z",
		timeTo: "2019-07-29T23:59:59.999Z"
	      })
	    get_glip_compliance_export_task(response.body['id'])
	end

	def get_glip_compliance_export_task(taskId)
	    puts "Check export task status ..."
	    endpoint = "/restapi/v1.0/glip/data-export/" + taskId
	    response = $rc.get(endpoint)
	    body = response.body
	    if body['status'] == "Completed"
		length = body['datasets'].length
		for i in (0...length)
		    fileName = "glip-export-reports_" + body['creationTime'] + "_" + i.to_s + ".zip"
		    get_glip_report_archived_content(body['datasets'][i]['uri'], fileName)
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
