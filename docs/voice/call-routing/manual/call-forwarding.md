# Call Forwarding and Call Flipping

Call Forwarding allows incoming phone calls to be directed to another phone number. This is handy when recipients have multiple phone numbers and/or a physical phone at which they can be reached. There are two primary ways calls are directed to other phones/numbers:

* **Call Forwarding** applies to incoming calls, and allows those calls to ring at one or more numbers sequentially or simultaneously.

* **Call Flipping** applies to active calls, and allows a speaker to instantly transfer an active call to another phone or device without having to terminate the call.

## Phone Types

| Type | Description |
|-|-|
| PhoneLine | This refers to a RingCentral device or hard-phone. When specifying this type when creating/registering a new call forwarding number, the developer must also specify the device id (see [API Reference](https://developers.ringcentral.com/api-reference/Call-Forwarding/createForwardingNumber)). |
| Home | Home phone number. |
| Mobile | Mobile phone number. |
| Work | Work phone number. |
| Other | A phone number of any other type. |

## Create a Forwarding Number

To create a forwarding number:

* Specify the `phoneNumber` parameter. This is a phone number for an incoming call to be forwarded to.
* Specify `type` parameter using one of the type's value from the table above. The default value is "Other"
* Specify the `label` (title of the forwarding number object) parameter if the `type` is omitted or specified as "Other".
* Specify the `id` for the `device` object if the `type` is specified as "PhoneLine".
* Make a POST request to `/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number` endpoint.

!!! Important
    The `label` will be ignored if the `type` value is different than "Other"!

    The `phoneNumber` cannot be any direct number of any extension under the same account!

    The `device` parameter cannot be specified together with the `phoneNumber`!

    A list of valid device ids can be retrieved by calling the [Get Extension Device List API](https://developers.ringcentral.com/api-reference/Devices/listExtensionDevices).


Required permission(s): EditExtensions

### Sample code to create a forwarding number object

The following code sample shows how to create a forwarding number object. The `id` value from the response can be used to specify a rule when [creating a custom answering rule](../user-answering-rules/).

```javascript tab="JavaScript"
var SDK = require('ringcentral')

var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
var platform = rcsdk.platform();

platform.login( {username: "username", password: "password", extension: "extension_number"} )
    .then(function(resp) {
        create_forwarding_number_by_number()
    });
}

function create_forwarding_number_by_number() {
  platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', {
        phoneNumber: "11235557890",
        type: "Other",
        label: "My ATT number"
      })
      .then(function(resp){
          console.log("Forwarding number created.")
          console.log("Forwarding number id: " + resp.json().id)
      })
      .catch(function(resp){
        console.log(resp)
      })
}
```

```python tab="Python"
from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

params = {
    'phoneNumber': '11235557890',
    'type': 'Other',
    'label': 'My ATT number'
  }
resp = platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', params)

print "Forwarding number created."
print resp.json().id
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$params = array (
    'phoneNumber' => '11235557890',
    'type' => 'Other',
    'label' => 'My ATT number'
);
$resp = $platform->post('/account/~/extension/~/forwarding-number', $params);

print_r ("Forwarding number created.");
print_r ($resp->json()->id);
```

```c# tab="C#"
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Create_ForwardingNumber
{
    class Program
    {
        static void Main(string[] args)
        {
            create_forwarding_number().Wait();
        }
        static private async Task create_forwarding_number()
        {
            RestClient rc = new RestClient("client_id", "client_secret", "server_url");
            await rc.Authorize("username", "extension_number", "password");

            var parameters = new CreateForwardingNumberRequest();
            parameters.phoneNumber = "11235557890";
            parameters.type = "Other";
            parameters.label = "My ATT number";

            var response = await rc.Restapi().Account().Extension().ForwardingNumber().Post(parameters);

            Console.WriteLine("Forwarding number created.");
            Console.WriteLine(response.id);
        }
    }
}
```

```java tab="Java"
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Create_ForwardingNumber {
	  public static void main(String[] args) {
    		try {
    			create_forwarding_number();
    		} catch (RestException | IOException e) {
    			e.printStackTrace();
    		}
  	}

    public static void create_forwarding_number() throws RestException, IOException {
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        var parameters = new CreateForwardingNumberRequest();
        parameters.phoneNumber = "11235557890";
        parameters.type = "Other";
        parameters.label = "My ATT number";

        var response =  rc.restapi().account().extension().forwardingnumber().post(parameters);

        System.out.println("Forwarding number created.");
        System.out.println(response.id);
        }
    }
}
```

```ruby tab="Ruby"
require 'ringcentral'

$rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
$rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

params = {
    phoneNumber: '11235557890',
    type: 'Other',
    label: 'My ATT number'
}
resp = rc.post('/restapi/v1.0/account/~/extension/~/forwarding-number', payload: params)

puts 'Forwarding number created.'
puts resp.body['id']
```

## Read all Forwarding Numbers

To read all forwarding numbers:

* Make a GET request to `/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number` endpoint.

Required permission(s): ReadExtensions

Upon successful API call completion, the response contains a list of predefined forwarding numbers
```json hl_lines="6 17 25", linenums="1"
{
  "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/forwarding-number?page=1&perPage=100",
  "records":[
    {
      "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/forwarding-number/592178004",
      "id":"592178004",
      "phoneNumber":"+14135554674",
      "label":"RingCentral for Desktop",
      "features":["CallFlip"],
      "flipNumber":"1",
      "type":"PhoneLine",
      "device":{
        "id":"801553370004"
        }
    },{
      "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/forwarding-number/711909004",
      "id":"711909004",
      "phoneNumber":"+16505550930",
      "label":"Mobile",
      "features":["CallForwarding","CallFlip"],
      "flipNumber":"2",
      "type":"Mobile"
    },{
      "uri":"https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/forwarding-number/711910004",
      "id":"711910004",
      "phoneNumber":"+16505555476",
      "label":"Work",
      "features":["CallForwarding","CallFlip"],
      "flipNumber":"3",
      "type":"Work"
    }
  ],
  ...
```

## Read a Forwarding Number

To read a forwarding number:

* Make a GET request to `/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/[forwardingNumberId]` endpoint, where the `forwardingNumberId` is the id of an existing forwarding number object.

!!! Hint
    A valid `forwardingNumberId` can be retrieved using the previous API to read all forwarding numbers.

Required permission(s): ReadExtensions

Upon successful API call completion, the response contains a detailed information of a forwarding number
```json
{
  "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/178003454/extension/178003454/forwarding-number/712613004",
  "id": "712613004",
  "phoneNumber": "+14085554388",
  "label": "RingCentral for Desktop",
  "features": [
    "CallFlip",
    "CallForwarding"
  ],
  "flipNumber": "6",
  "type": "PhoneLine",
  "device": {
    "id": "801553625004"
  }
}
```

## Update a Forwarding Number

To update an existing forwarding number:

* Specify the [parameters](https://developers.ringcentral.com/api-reference/Call-Forwarding/updateForwardingNumber) which need to be updated.
* Make a PUT request to `/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/[forwardingNumberId]` endpoint, where the `forwardingNumberId` is the id of an existing forwarding number object.

!!! Hint
    A valid `forwardingNumberId` can be retrieved using the previous API to read all forwarding numbers.

Required permission(s): EditExtensions

## Related API Endpoints

* [Get Forwarding Number List](https://developers.ringcentral.com/api-reference/Call-Forwarding/listForwardingNumbers)
* [Create Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/createForwardingNumber)
* [Get Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/readForwardingNumber)
* [Update Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/updateForwardingNumber)
* [Delete Forwarding Number](https://developers.ringcentral.com/api-reference/Call-Forwarding/deleteForwardingNumber)
