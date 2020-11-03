# Toll-Free SMS vs. Local Numbers

Local and toll-free numbers can be used to send and receive SMS under RingCentral's High Volume SMS program.

| Number Type | Description |
|-|-|
| Local | Local Numbers have geographically assigned area codes, e.g. `650-555-0100`. These numbers may be desirable when your firm has a local presence, e.g. texting for a physical local presence to a recipient in the same geographic area. |
| Toll-Free | Toll-Free Numbers have nation-wide area codes, e.g. `800-555-0100`. These are useful for sending nation-wide when there is no need to associate the message with a specific geographic region. Toll-free numbers have one of the following area codes: 800, 888, 877, 866, 855, 844 or 833. |

Both types of numbers can be purchased in the RingCentral [Account Portal](https://service.ringcentral.com) under "Phone Numbers".

### Carrier Approval

Both local and toll-free numbers enrolled in High Volume SMS can be used to send "Non-Consumer (A2P)" SMS as described in the [CTIA Messaging Principles and Best Practices guide](https://www.ctia.org/the-wireless-industry/industry-commitments/messaging-interoperability-sms-mms).

Local numbers are enrolled in a Commercial Long Code / 10DLC program with wireless carriers that allows these number send at high volume.

### Supported Countries

Currently, High Volume SMS is supported for numbers in the United States and Canada.

## Ordering and Provisioning High Volume SMS Numbers

To use High Volume SMS, you must have one or more phone numbers configured for it. RingCentral SMS-enabled phone numbers can be configured for either Low Volume (P2P) or High Volume (A2P) SMS, and can be switched back and forth, but a number cannot be both at the same time.

If you don't have a number already, log into the [Account Portal](https://service.ringcentral.com) and navigate to the following location to purchase a new number.

["Phone System" > "All Numbers" > "+ Add Number"](https://service.ringcentral.com/application/company/phoneNumbers/allNumbers)

Once you have a number, it will be initially provisioned for standard P2P SMS. To configure a number for High Volume (A2P) use, enroll in the [High Volume SMS beta program](https://ringcentral.github.io/releases/high-volume-sms-beta-signup.html)</a> and indicate which numbers you want to convert. After your number has been provisioned for High Volume SMS, you can verify the configuration with the steps in the next section on listing valid High Volume SMS numbers.

## Listing Valid High Volume SMS Numbers

Send and receive SMS messages using the High Volume SMS API (`a2p-sms`) requires a phone number with the `A2PSmsSender` feature.

To determine which numbers a user can use to send and receive High Volume SMS, retrieve the user's list of phone numbers from the [`extension/phone-number` endpoint](https://developers.ringcentral.com/api-reference/Phone-Numbers/listExtensionPhoneNumbers) and then filter by numbers with the `A2PSmsSender` feature. The `extension/phone-number` is as follows where `{accountId}` and `{extensionId}` can be replaced by actual values or `~` for the current user's account and extension values.

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
			detect_high_volume_sms_feature()
	});

	async function detect_high_volume_sms_feature(){
		try{
			var resp = await platform.get("/restapi/v1.0/account/~/extension/~/phone-number")
			var jsonObj = await resp.json()
			for (var record of jsonObj.records){
				for (var feature of record.features){
					if (feature == "A2PSmsSender"){
						if (record.paymentType == "TollFree")
							console.log(`This phone number ${record.phoneNumber} is a toll-free number and provisioned for using to send high volume SMS`)
						else
							console.log(`This phone number ${record.phoneNumber} is a local 10-DLC number and provisioned for using to send high volume SMS`)
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
		print "This phone number " + record.phoneNumber + " has the following features: "
		for feature in record.features:
			if feature == "A2PSmsSender":
				if record.paymentType == "TollFree":
					print (" This phone number " + record['phoneNumber'] + " is a toll-free number and provisioned for using to send high volume SMS")
				else:
					print (" This phone number " + record['phoneNumber'] + " is a 10-DCL local number and provisioned for using to send high volume SMS")
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
		foreach ($record->features as $feature){
			if ($feature == "A2PSmsSender"){
				if ($record->paymentType == "TollFree")
					print_r ("This phone number ".$record->phoneNumber." is a toll-free number and provisioned for using to send high volume SMS\n");
				else
					print_r ("This phone number ".$record->phoneNumber." is a 10-DLC local number and provisioned for using to send high volume SMS\n");
			}
		}
	}
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
						if (feature == "A2PSmsSender")
						{
							if (record.paymentType == "TollFree")
							{
								Console.WriteLine("This phone number " + record.phoneNumber + " is a toll-free number and provisioned for using to send high volume SMS" );
							}
							else
							{
								Console.WriteLine("This phone number " + record.phoneNumber + " is a 10-DLC local number and provisioned for using to send high volume SMS" );
							}
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
					if (feature == "A2PSmsSender"){
						if (record.paymentType == "TollFree") {
							System.out.println("This phone number " + record.phoneNumber + " is a toll-free number and provisioned for using to send high volume SMS" );
						}else{
							System.out.println("This phone number " + record.phoneNumber + " is a 10-DLC local number and provisioned for using to send high volume SMS" );
						}
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
					if feature == "A2PSmsSender"
							if record.paymentType == "TollFree"
									puts "This phone number " + record['phoneNumber'] + " is a toll-free number and provisioned for using to send high volume SMS"
							else
									puts "This phone number " + record['phoneNumber'] + " is a 10-DLC local number and provisioned for using to send high volume SMS"
							end
					end
	    end
	end
	```

### Response

This example response shows the `A2PSmsSender` feature:

```json hl_lines="12"
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
        "A2PSmsSender",
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
