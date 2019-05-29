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

```http tab="HTTP"
GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/phone-number
```

```javascript tab="Node JS"
const RC = require('ringcentral')

var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
var platform = rcsdk.platform();
platform.login( {username: "username", password: "password", extension: "extension_number"} )
    .then(function(resp) {
        platform.get('/account/~/extension/~/phone-number')
          .then(function (response) {
              console.log(response)
          })
    });
```

```python tab="Python"
from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )
response = platform.get('/restapi/v1.0/account/~/extension/~/phone-number')
print (response)
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );
$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );
$response = $platform->get('/account/~/extension/~/phone-number');
print_r ($response . "\n");
```

```c# tab="C#"
using System;
using RingCentral;

RestClient rc = new RestClient( "client_id", "client_secret", false);
await rc.Authorize( "username", "extension_number", "password");
var response = await rc.Restapi().Account().Extension().PhoneNumber().List(parameters);
Console.WriteLine(response);
```

```ruby tab="Ruby"
require 'ringcentral'

rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
rc.authorize( username:  'username', extension: 'extension_number', password:  'password')
response = rc.get '/restapi/v1.0/account/~/extension/~/phone-number'
puts response
```

This example response shows the `SmsSender`, `MmsSender` and `InternationalSmsSender` features:

```json hl_lines="12 13 14",linenums="1"
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
