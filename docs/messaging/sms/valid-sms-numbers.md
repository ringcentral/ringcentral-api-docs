# SMS Sending Numbers

RingCentral numbers have SMS and MMS capabilities depending on the account plan. Users can send and receive SMS from enabled phone numbers assigned to their extension. The operator extension can further send and recieve SMS from the Main Company Number. See more below on using the Main Company Number.

Phone numbers can have different capabilties determined by the presence of the following values in the `features` property of the Phone Number info object:

| Feature | Description |
|-|-|
| `SmsSender` | send and receive regular texts |
| `MmsSender` | send and receive group texts and files |
| `InternationalSmsSender` | send and receive regular texts to international numbers |

## Listing Valid SMS Numbers

To determine which numbers a user can use to send and receive SMS, retrieve the user's list of phone numbers from the `extension/phone-number` endpoint and then filter by numbers with the `SmsSender` and/or `MmsSender` feature. The `extension/phone-number` is as follows where `{accountId}` and `{extensionId}` can be replaced by actual values or `~` for the current user's account and extension values.

=== "HTTP"
	```http
	GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/phone-number
	```

=== "JavaScript"
	```javascript
	const RC = require('ringcentral')

	var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
	var platform = rcsdk.platform();

	platform.login( {username: "username", password: "password", extension: "extension_number"
	    })
	    .then(function(resp) {
		platform.get('/account/~/extension/~/phone-number')
		  .then(function (response) {
		      var jsonObj = response.json()
		      for (var record of jsonObj.records)
		      {
			  console.log("This phone number " + record.phoneNumber + " has the following features: " );
				for (var feature of record.features) {
					console.log("=> " + feature);
				}
		      }
		  })
	    });
	```

=== "Python"
	```python
	from ringcentral import SDK

	sdk = SDK( "client_id", "client_secret", "server_url" )
	platform = sdk.platform()
	platform.login( "username", "extension", "password" )

	response = platform.get('/restapi/v1.0/account/~/extension/~/phone-number')
	for record in response.json().records:
	    print "This phone number " + record.phoneNumber + " has the following features: "
	    for feature in record.features:
			print " => " + feature
	```

=== "PHP"
	```php
	<?php
	require('vendor/autoload.php');

	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );
	$platform = $rcsdk->platform();
	$platform->login( "username", "extension_number", "password" );

	$response = $platform->get('/account/~/extension/~/phone-number');
	foreach ($response->json()->records as $record){
	    print_r ("This phone number ".$record->phoneNumber." has the following features: "."\n");
	    foreach ($record->features as $feature)
		print_r (" => ".$feature."\n");
	```

=== "C#"
	```c#
	using System;
	using System.Threading.Tasks;
	using RingCentral;

	namespace Read_Phone_Number
	{
	    class Program
	    {
		static void Main(string[] args)
		{
		    detect_phone_number_feature().Wait();
		}
		static private async Task detect_phone_number_feature()
		{
		    RestClient rc = new RestClient("client_id", "client_secret", "server_url");
		    await rc.Authorize("username", "extension_number", "password");

		    var response = await rc.Restapi().Account().Extension().PhoneNumber().Get();

		    foreach (var record in response.records)
		    {
			Console.WriteLine("This phone number " + record.phoneNumber + " has the following features: " );
			foreach (var feature in record.features) {
				Console.WriteLine("=> " + feature);
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

	public class Read_Phone_Number {
		  public static void main(String[] args) {
			try {
				detect_phone_number_feature();
			} catch (RestException | IOException e) {
				e.printStackTrace();
			}
		}

	    public static void detect_phone_number_feature() throws RestException, IOException{
		RestClient restClient = new RestClient("client_id", "client_secret", "server_url");
		restClient.authorize("username", "extension_number", "password");

		restClient = new RestClient("client_id", "client_secret", "server_url");
		restClient.authorize("username", "extension_number", "password");

		var response = restClient.restapi().account().extension().phonenumber().get();
		for (var record : response.records) {
			System.out.println("This phone number " + record.phoneNumber + " has the following features: " );
			for (var feature : record.features) {
				System.out.println("=> " + feature);
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
	response = rc.get ('/restapi/v1.0/account/~/extension/~/phone-number')

	for record in response.body['records'] do
	    puts "This phone number " + record['phoneNumber'] + " has the following features: "
	    for feature in record['features'] do
		puts " => " + feature
	    end
	end
	```

This example response shows the `SmsSender`, `MmsSender` and `InternationalSmsSender` features:

```json hl_lines="12 13 14"
{
  "uri":"https://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/phone-number?page=1&perPage=100",
  "records":[
    {
      "id":33333333,
      "phoneNumber":"+16505550100",
      "paymentType":"Local",
      "type":"VoiceFax",
      "usageType":"DirectNumber",
      "features":[
        "CallerId",
        "SmsSender",
        "MmsSender",
        "InternationalSmsSender"
      ],
      "status":"Normal",
      "country":{
        "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/dictionary/country/1",
        "id":"1",
        "name":"United States"
      }
    }
  ]
}
```

## SMS and the Main Company Number

You can send and receive SMS messages from the main company phone number when authorized as the Operator Extension. By default, the Operator Extension is set to extension 101. This can be edited and assigned to other extensions in the Online Account Portal under "Auto-Receptionist" > "Operator Extension.""
