# Working with the Message Store

The RingCentral Message Store is a centralized repository of all the messages sent and received within the system. There are many types of messages that can be stored here, including:

* SMS and MMS messages
* Faxes
* Voicemail

Messages within the Message Store can be managed in a variety of ways. One can:

* Delete messages
* Modify the read/unread status
* View the delivery status

[Learn more about modifying the Message Store &raquo;](../message-histories)

## Message Data Structure

Below is an example JSON representation of a message that would be returned by the API when fetching a list or single message. This particular message is a voicemail:

```json
{
    "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/4xxx8/extension/4xxx8/message-store/4xxx8",
    "id" : 402406984008,
    "type" : "VoiceMail",
    "to" : [ {
        "name" : "Jane Smith"
    } ],
    "from" : {
        "phoneNumber" : "+18445558517",
        "name" : "RingCentral"
    },
    "creationTime" : "2018-09-18T09:24:03.000Z",
    "readStatus" : "Unread",
    "priority" : "Normal",
    "attachments" : [ {
        "id" : 402406984008,
        "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/4xxx8/extension/4xxx8/message-store/4xxx8/content/4xxx8",
        "type" : "AudioRecording",
        "contentType" : "audio/x-wav",
        "vmDuration" : 25
    } ],
    "direction" : "Inbound",
    "availability" : "Alive",
    "messageStatus" : "Received",
    "lastModifiedTime" : "2018-09-18T09:24:03.531Z",
    "vmTranscriptionStatus" : "NotAvailable"
  }
```

The API Reference contains a [more detailed breakdown of the structure of a message](https://developers.ringcentral.com/api-reference#SMS-and-MMS-listMessages) within the Message Store.

## Getting a list of messages

The following code sample shows how to call the Message Store to display a list of messages within it. To read messages from the Message Store, apps will need the "Read Messages" permission.

=== "JavaScript"
	```javascript
	const RC = require('@ringcentral/sdk').SDK

	var rcsdk = new RC( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
	var platform = rcsdk.platform();

	platform.login( {username: "username", password: "password", extension: "extension_number"} )

  platform.on(platform.events.loginSuccess, async function(e){
    var resp = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
		     messageType: ['SMS']
		})
    var jsonObj = await resp.json()
    console.log(jsonObj)
  });
	```

=== "Python"
	```python
	from ringcentral import SDK

	sdk = SDK( "client_id", "client_secret", "server_url" )
	platform = sdk.platform()
	platform.login( "username", "extension", "password" )

	response = platform.get('/restapi/v1.0/account/~/extension/~/message-store',
		{
		    'messageType': ['SMS']
		})
	print (response.text())
	```

=== "PHP"
	```php
	<?php
	require('vendor/autoload.php');

	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

	$platform = $rcsdk->platform();
	$platform->login( "username", "extension_number", "password" );

	$response = $platform->get('/account/~/extension/~/message-store',
	    array(
	      'messageType' => array('SMS')
	    ));
	print_r ($response->text());
	```

=== "C#"
	```c#
	using System;
	using Newtonsoft.Json;
	using System.Threading.Tasks;
	using RingCentral;

	namespace Read_MessageStore
	{
	    class Program
	    {
		static void Main(string[] args)
		{
		    read_user_message_store().Wait();
		}
		static private async Task read_user_message_store()
		{
		    RestClient rc = new RestClient("client_id", "client_secret", "server_url");
		    await rc.Authorize("username", "extension_number", "password");

		    var parameters = new ListMessagesParameters();
		    parameters.messageType = string[] ("SMS");
		    var response = await rc.Restapi().Account().Extension().MessageStore().List(parameters);

		    var jsonStr = JsonConvert.SerializeObject(response);
		    Console.WriteLine(jsonStr);
		}
	    }
	}
	```

=== "Java"
	```java
	import com.ringcentral.*;
	import com.ringcentral.definitions.*;

	public class Read_MessageStore {
		  public static void main(String[] args) {
			try {
				read_user_message_store();
			} catch (RestException | IOException e) {
				e.printStackTrace();
			}
		}

	    public static void read_user_message_store() throws RestException, IOException{
		RestClient rc = new RestClient("client_id", "client_secret", "server_url");
		rc.authorize("username", "extension_number", "password");

		ListMessagesParameters parameters = new ListMessagesParameters();
		parameters.messageType = new String[] {"SMS"};

		var response = rc.restapi().account().extension().messagestore().list(parameters);

		String jsonStr = JSON.toJSONString(response);
		System.out.println(jsonStr);
	    }
	}
	```

=== "Ruby"
	```ruby
	require 'ringcentral'

	rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')
	response = rc.get('/account/~/extension/~/message-store',
	    {
		messageType: 'SMS'
	    })
	puts response.body
	```

This example response shows the `to`, `from`, `type`, `readStatus`, `direction` and `subject` amongst other properties of an SMS message record from the message store:

```json hl_lines="6 7 8 9 10 11 12 13 15 23 25"
{
  "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store?messageType=SMS&availability=Alive&dateFrom=2019-05-21T17:54:00.000Z&page=1&perPage=100",
  "records" : [ {
    "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store/6424569004",
    "id" : 6424569004,
    "to" : [ {
      "phoneNumber" : "+13125559821"
    } ],
    "from" : {
      "phoneNumber" : "+16505558379",
      "location" : "San Mateo, CA"
    },
    "type" : "SMS",
    "creationTime" : "2019-05-22T17:07:28.000Z",
    "readStatus" : "Unread",
    "priority" : "Normal",
    "attachments" : [ {
      "id" : 6424569004,
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store/6424569004/content/6424569004",
      "type" : "Text",
      "contentType" : "text/plain"
    } ],
    "direction" : "Inbound",
    "availability" : "Alive",
    "subject" : "Test SMS using a RingCentral Developer account - Hello World",
    "messageStatus" : "Received",
    "conversationId" : 8031152018338945839,
    "conversation" : {
      "id" : "8031152018338945839",
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/conversation/8031152018338945839"
    },
    "lastModifiedTime" : "2019-05-22T17:07:28.091Z"
  } ],
  "paging" : {
    "page" : 1,
    "totalPages" : 1,
    "perPage" : 100,
    "totalElements" : 1,
    "pageStart" : 0,
    "pageEnd" : 0
  },
  "navigation" : {
    "firstPage" : {
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store?readStatus=Unread&availability=Alive&dateFrom=2019-05-21T17:54:00.000Z&page=1&perPage=100"
    },
    "lastPage" : {
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/message-store?readStatus=Unread&availability=Alive&dateFrom=2019-05-21T17:54:00.000Z&page=1&perPage=100"
    }
  }
}
```

## Relevant APIs for Further Reading

* [Get Message List](https://developers.ringcentral.com/api-reference/Message-Store/listMessages)
* [Get Message Attachment](https://developers.ringcentral.com/api-reference/Message-Store/readMessageContent)
* [Delete Message(s)](https://developers.ringcentral.com/api-reference/Message-Store/deleteMessage)
* [Sync Messages](https://developers.ringcentral.com/api-reference/Message-Store/syncMessages)
