# RingCentral Phone Number Features

RingCentral phone numbers have SMS and MMS capabilities depending on the account phone number configuration. Users can send and receive SMS from enabled phone numbers assigned to their extension. The operator extension can further send and receive SMS from the Main Company Number or company numbers. See more below on using the Main Company Number.

Phone numbers can have different capabilities determined by the presence of the following values in the `features` property of the Phone Number info object:

| Feature | Description |
|-|-|
| `SmsSender` | send and receive regular texts |
| `A2PSmsSender` | send and receive high volume SMS. To be used with the `a2p-sms` APIs |
| `MmsSender` | send and receive group texts and files |
| `InternationalSmsSender` | send and receive regular texts to international numbers |

## Listing Valid SMS Numbers

To determine which numbers a user can use to send and receive SMS, retrieve the user's list of phone numbers from the `extension/phone-number` endpoint and then filter by numbers with the `SmsSender` and/or `MmsSender` feature.

=== "JavaScript"

	```javascript
	{!> code-samples/messaging/code-snippets-headers/header.js [ln:1-9] !}
	{!> code-samples/messaging/code-snippets/number-features.js [ln:10-] !}
	```

=== "Python"

	```python
	{!> code-samples/messaging/code-snippets/number-features.py !}
	{!> code-samples/messaging/code-snippets-headers/footer.py [ln:1-7]!}
	```

=== "PHP"

	```php
	{!> code-samples/messaging/code-snippets-headers/header.php [ln:1-13] !}
	{!> code-samples/messaging/code-snippets/number-features.php [ln:2-] !}
	```

=== "Ruby"

	```ruby
	{!> code-samples/messaging/code-snippets/number-features.rb !}
	{!> code-samples/messaging/code-snippets-headers/footer.rb [ln:1-7]!}
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

You can send and receive SMS messages from the main company phone number when authorized as the Operator Extension. By default, the Operator Extension is set to extension 101. This can be edited and assigned to other extensions in the Online Account Portal under "Auto-Receptionist" > "General Settings"
