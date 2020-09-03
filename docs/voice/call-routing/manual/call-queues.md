# Call Queues

A call queue is a special extension that can hold a group of user extensions (members). It provides a convenient way to have multiple people (a department) respond to incoming calls.

As an extension, a call queue has a name, an extension number and can be assigned with a direct phone number as well. When a call is directed to the call queue's extension, the call is connected with the members of group in several ways depending on the settings of the call queue:

- **Rotating** - Regularly change the order that you ring available members to evenly distribute calls.
- **Simultaneous** - Ring all available members at the same time. You can do this for up to 10 extensions.
- **Sequential** - Ring available members one at a time in the order you set.

## Create a Call Queue

To create a call queue extension, login your RingCentral account at [Online Account Portal](https://service.ringcentral.com), choose the "Phone System" tab then go under the Group(s) option. Click the "New Call Queue" button to start creating a new one.

!!! Note
    There is no API to create a call queue extension!

## Read Call Queue List

To read all call queue extensions from an account:

* Make a GET request to the `/restapi/v1.0/account/{accountId}/extension?type=Department` endpoint.

Required permission(s): ReadAccounts

**Sample Response**
```json hl_lines="6"
{
  "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension?type=Department&page=1&perPage=100",
  "records" : [
    {
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/22223333",
      "id" : 22223333,
      "extensionNumber" : "201",
      "contact" : {
        "firstName" : "Sales Queue",
        "email" : "john.doe@example.com"
      },
      "name" : "Sales Queue",
      "type" : "Department",
      "status" : "Enabled",
      "permissions" : {
        "admin" : {
          "enabled" : false
        },
        "internationalCalling" : {
          "enabled" : false
        }
      },
      "profileImage" : {
        "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/22223333/profile-image"
      }
    }
  ],
  "paging" : {...}
}
```

## Read Call Queue members

To read all members (user extensions) of a call queue:

* Make a GET request to the `/restapi/v1.0/account/{accountId}/call-queues/[groupId]/members` endpoint, where `groupId` is the id of a call queue.

!!! Hint
    A valid `groupId` can be retrieved using the previous API to read all call queue extensions.

Required permission(s): ReadAccounts

**Sample Response**
```json
{
  "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/department/22223333/members?page=1&perPage=100",
  "records" : [
    {
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/11112222",
      "id" : 11112222,
      "extensionNumber" : "101"
    },
    {
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/11113333",
      "id" : 11113333,
      "extensionNumber" : "102"
    }
  ],
  ...
}
```

## Update Call Queue members

Members can be added to and removed from an existing call queue.

To add new member(s) to a call queue:

* Specify the `addedExtensionIds` array and add new member(s) with their extension id.

To remove existing member(s) from a call queue:

* Specify the `removedExtensionIds` array and add existing member(s) with their extension id.

* Make a POST request to the `/restapi/v1.0/account/{accountId}/call-queues/[groupId]/bulk-assign` endpoint, where the `groupId` is the id of the call queue extension to be updated.

!!! Notes
    You can specify both `addedExtensionIds` and `removedExtensionIds` parameters to add new members to and to remove old members from a call queue in a single post request.

Required permission(s): EditExtensions

### Sample code to update a call queue's members

The following code sample shows how to add 2 new members to a call queue named "Support Department". Presumed that the "Support Department" call queue exists and the new members' extension id is "888888888" and "999999999", respectively.

=== "JavaScript"
	```javascript
	var SDK = require('ringcentral')

	var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
	var platform = rcsdk.platform();

	platform.login( {username: "username", password: "password", extension: "extension_number"} )
	    .then(function(resp) {
		get_call_queues()
	    });
	}

	function get_call_queues() {
	    platform.get('/restapi/v1.0/account/~/call-queues')
		.then(function(resp){
		    var jsonObj = resp.json()
		    for (var group of jsonObj.records){
		      if (group.name == "Support Department"){
			 add_new_members(group.id)
			 break
		      }
		    }
		})
		.catch(function(ex){
		    console.log(ex)
		})
	}

	function add_new_members(groupId) {
	    var params = {
		addedExtensionIds: ["888888888", "999999999"]
	    }
	    platform.post('/restapi/v1.0/account/~/call-queues/'+groupId+'/bulk-assign', params)
	       .then(function(resp){
		  console.log(resp)
	       })
	       .catch(function(ex){
		  console.log(ex)
	       })
	}
	```

=== "Python"
	```python 
	from ringcentral import SDK

	sdk = SDK( "client_id", "client_secret", "server_url" )
	platform = sdk.platform()
	platform.login( "username", "extension", "password" )

	resp = platform.get('/restapi/v1.0/account/~/call-queues')
	for group in resp.json().records:
	   	 if group.name == 'Support Department':
			resp = platform.post('/restapi/v1.0/account/~/call-queues/'+group.id+"/bulk-assign",
			{
		    	'addedExtensionIds': ['888888888', '999999999']
			})
			print (resp.response())
			break
	```

=== "PHP"
	```php
	<?php
	require('vendor/autoload.php');

	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

	$platform = $rcsdk->platform();
	$platform->login( "username", "extension_number", "password" );

	$resp = $platform->get('/account/~/call-queues');
	foreach ($resp->json()->records as $group){
	    if ($group->name == "Support Department"){
		$params = array(
		  'addedExtensionIds' => array("888888888", "999999999")
		  );
		$resp = $platform->post('/account/~/call-queues/'.$group->id.'/bulk-assign', $params);
		print_r($resp->response());
		break;
	    }
	}
	```

=== "C#"
	```c# 
	using System;
	using System.Threading.Tasks;
	using RingCentral;

	namespace Update_CallQueue_Members
	{
	    class Program
	    {
		static RestClient rcsdk;
		static void Main(string[] args)
		{
		    rcsdk = new RestClient("client_id", "client_secret", "server_url");
		    await rcsdk.Authorize("username", "extension_number", "password");
		    add_callqueue_members().Wait();
		}
		static private async Task add_callqueue_members()
		{
		    var resp = await rcsdk.Restapi().Account().CallQueues().Get();
		    foreach (var group in resp.records)
		    {
			if (group.name == "Support Department")
			{
			    var parameters = new CallQueueBulkAssignResource();
			    parameters.addedExtensionIds = new string[] { "888888888", "999999999" };
			    await rcsdk.Restapi().Account().CallQueues(group.id).BulkAssign().Post(parameters);
			    Console.WriteLine("Members added");
			    break;
			}
		    }
		}
	    }
	}
	```

=== "Java"
	```java 
	import com.ringcentral.*;
	import com.ringcentral.definitions.*;

	public class Update_CallQueue_Members {
	  static RestClient rcsdk;
	  public static void main(String[] args) {
	    var obj = new Update_CallQueue_Members();
	    rcsdk = new RestClient("client_id", "client_secret", "server_url");
	    try {
	      rcsdk.authorize("username", "extension_number", "password");
	      obj.add_callqueue_members();
	    } catch (RestException | IOException e) {
	      e.printStackTrace();
	    }
	  }
	  public void add_callqueue_members() throws RestException, IOException{
	    var resp = restClient.restapi().account().callqueues().get();
	    for (var group : resp.records) {
	      if (group.name.equals("Sales team")){
		var parameters = new CallQueueBulkAssignResource();
		parameters.addedExtensionIds = new String[] {"888888888", "999999999"};
		restClient.restapi().account().callqueues(group.id).bulkassign().post(parameters);
		System.out.println("Members added.");
		break;
	      }
	    }
	  }
	}
	```

=== "Ruby"
	```ruby
	require 'ringcentral'

	rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

	response = rc.get('/restapi/v1.0/account/~/call-queues')
	for group in response.body['records'] do
	    if group['name'] == "Support Department"
		params = {
		  addedExtensionIds: ["888888888", "999999999"]
		}
		response = rc.post('/restapi/v1.0/account/~/call-queues/'+group['id']+'/bulk-assign', payload: params)
		puts response.status
		break
	    end
	end
	```
