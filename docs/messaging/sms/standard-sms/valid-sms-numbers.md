## Listing Valid SMS Numbers

To determine which numbers a user can use to send and receive SMS, retrieve the user's list of phone numbers from the `extension/phone-number` endpoint and then filter by numbers with the `SmsSender` and/or `MmsSender` feature. The `extension/phone-number` is as follows where `{accountId}` and `{extensionId}` can be replaced by actual values or `~` for the current user's account and extension values.

=== "HTTP"
	```http
	GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/phone-number
	```

=== "JavaScript"
	```javascript
	const RingCentral = require('@ringcentral/sdk').SDK

	var rcsdk = new RingCentral( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
	var platform = rcsdk.platform();

	platform.login( {username: "username", password: "password", extension: "extension_number"} )

	platform.on(platform.events.loginSuccess, function(e){
	    console.log("Login success")
	    detect_sms_feature()
	});

	async function detect_sms_feature(){
	  try{
	    var resp = await platform.get("/restapi/v1.0/account/~/extension/~/phone-number")
	    var jsonObj = await resp.json()
	    for (var record of jsonObj.records){
	      if (record.usageType == "DirectNumber"){
	        for (feature of record.features){
	          if (feature == "SmsSender"){
	            console.log(`This phone number ${record.phoneNumber} has SMS feature`)
	          }
	        }
	      }
	    }
	  }catch(e){
	    console.log(e.message)
	  }
	}
	```

=== "Python"
	```python
	from ringcentral import SDK

	sdk = SDK( "client_id", "client_secret", "server_url" )
	platform = sdk.platform()
	platform.login( "username", "extension", "password" )

	response = platform.get('/restapi/v1.0/account/~/extension/~/phone-number')
	for record in response.json().records:
		for feature in record.features:
			if feature == "SmsSender":
				print "This phone number " + record.phoneNumber + " has SMS feature"
	```

=== "PHP"
	```php
	<?php
	require('vendor/autoload.php');

	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );
	$platform = $rcsdk->platform();
	$platform->login( "username", "extension_number", "password" );

	$response = $platform->get('/account/~/extension/~/phone-number');
	foreach ($response->json()->records as $record)
		foreach ($record->features as $feature)
			if ($feature == "SmsSender")
				print_r ("This phone number" $record->phoneNumber ." has SMS feature\n");
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
					foreach (var feature in record.features) {
						if (feature == "SmsSender"){
							Console.WriteLine("This phone number " + record.phoneNumber + " has SMS feature");
						}
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

			var response = restClient.restapi().account().extension().phonenumber().get();
			for (var record : response.records) {
				for (var feature : record.features) {
					if (feature == "SmsSender"){
						System.out.println("This phone number " + record.phoneNumber + " has SMS feature");
					}
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
			for feature in record['features'] do
				if feature == "SmsSender"
					puts "This phone number " + record['phoneNumber'] + " has SMS feature"
				end
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
