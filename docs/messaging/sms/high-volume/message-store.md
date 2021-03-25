# High Volume SMS Message Store

The High Volume SMS message store is separate from the normal SMS (P2P) message store.

## Read High Volume Message Store

You can read the entire High Volume SMS message store then iterate through the `records` array in the response to parse each message's metadata. Use the `pageToken` to navigate through the entire message store if the numbers of records is greater than the maximum number of items per page.

| API Endpoint | Description |
|-|-|
| [`/restapi/v1.0/account/~/a2p-sms/messages`](https://developers.ringcentral.com/api-reference/High-Volume-SMS/listA2PSMS) | Read the entire High Volume message store. |
| [`/restapi/v1.0/account/~/a2p-sms/messages/{messageId}`](https://developers.ringcentral.com/api-reference/High-Volume-SMS/listA2PSMS) | Read a single message identified by a message id. |

### Query parameters

| Filter | Description |
|-|-|
| view | Read the A2P message store in "Simple" or "Detailed" mode. Detailed view will return the text message for each message item. Default value is "Simple". |
| batchId | Return only messages belong to a single batch identified by the batch id. |
| dateFrom | Return messages created after the start date and time, for example 2020-11-10T08:00:00.000Z. The default value is dateTo minus 24 hours. |
| dateTo | Return messages created before the end date time, for example 2020-11-11T08:00:00.000Z. The default value is current time. |
| phoneNumber | Return only messages which contains the specified phone numbers in either "from" or "to" field. |
| direction | Return messages with the specified direction. If not specified, both inbound and outbound messages are returned. Multiple values are accepted. |
| perPage | Indicate the page size (number of items). Default value is 1000. |
| pageToken | Return messages from a specified page. Note! Use a valid page token from the paging object. |


### Sample codes

=== "HTTP"
    ```http
    GET /restapi/v1.0/account/~/a2p-sms/messages?view=Simple&dateFrom=2021-01-01T00:00:00.000Z&dateTo=2021-01-31T23:59:59.999Z&phoneNumber=%2b16505550100
    ```

=== "JavaScript"
    ```javascript
    const RingCentral = require('@ringcentral/sdk').SDK

    var rcsdk = new RingCentral( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
  	var platform = rcsdk.platform();

  	platform.login( {username: "username", password: "password", extension: "extension_number"} )

    platform.on(platform.events.loginSuccess, async function(response){
      try{
        var params = {
          view: "Simple",
          dateFrom: "2021-01-01T00:00:00.000Z",
          dateTo: "2021-01-31T23:59:59.999Z",
          phoneNumber: ["+16505550100"]
          direction: ["Inbound"]
        }
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/messages', params)
        var jsonObj = await resp.json()
        console.log(JSON.stringify(jsonObj))
      }catch(e){
        console.log(e.message)
      }
    });
    ```

=== "Python"
    ```python
    from ringcentral import SDK

    sdk = SDK( "client_id", "client_secret", "server_url" )
  	platform = sdk.platform()
  	platform.login( "username", "extension", "password" )
    params = {
      'view': "Simple",
      'dateFrom': "2021-01-01T00:00:00.000Z",
      'dateTo': "2021-01-31T23:59:59.999Z",
      'phoneNumber': ["+16505550100"]
    }
  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/messages')
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );
  	$platform = $rcsdk->platform();
  	$platform->login( "username", "extension_number", "password" );

    $params = array(
      'view' => "Simple",
      'dateFrom' => "2021-01-01T00:00:00.000Z",
      'dateTo' => "2021-01-31T23:59:59.999Z",
      'phoneNumber' => array("+16505550100")
    );

  	$resp = $platform->get('/restapi/v1.0/account/~/a2p-sms/messages', $params);
    print_r ($resp->json());
    ?>
    ```

=== "C#"
    ```c#
    using System;
    using System.Threading.Tasks;
    using RingCentral;

    namespace HighVolume_SMS
    {
      class Program
      {
        static void Main(string[] args)
        {
          get_highvolume_sms_messages().Wait();
        }
        static private async Task get_highvolume_sms_messages()
        {
          RestClient rc = new RestClient("client_id", "client_secret", true);
          await rc.Authorize("username", "extension_number", "password");

          ListA2PsmsParameters parameters = new ListA2PsmsParameters();
          parameters.view = "Simple";
          parameters.dateFrom = "2021-01-01T00:00:00.000Z";
          parameters.dateTo = "2021-01-31T23:59:59.999Z";
          parameters.phoneNumber = new String[] { "+16505550100" };

        var resp = await rcsdk.Restapi().Account().A2pSms().Messages().List(parameters);
        Console.WriteLine(JsonConvert.SerializeObject(resp));
        }
      }
    }
    ```

=== "Java"
    ```java
    package HighVolume_SMS;

    import java.io.IOException;
    import com.ringcentral.*;
    import com.ringcentral.definitions.*;

    public class HighVolume_SMS {
      public static void main(String[] args) {
        try {
          get_highvolume_sms_messages();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
      }
      public static void get_highvolume_sms_messages() throws RestException, IOException{
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        ListA2PsmsParameters parameters = new ListA2PsmsParameters();
        parameters.view = "Simple";
        parameters.dateFrom = "2021-01-10T00:00:00.000Z";
        parameters.dateTo = "2021-01-15T23:59:59.999Z";
        parameters.phoneNumber = new String[] { "+16505550100" };

        var resp = restClient.restapi().account().a2psms().messages().list(parameters);
        String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
        System.out.println(jsonStr);
      }
    }
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

    params = {
       view: 'Simple',
       dateFrom: "2021-01-10T00:00:00.000Z",
       dateTo: "2021-01-15T23:59:59.999Z",
       phoneNumber: ["+16505550100"]
    }
  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/messages', params)

    puts resp.body
    ```

### Response

```json
{
  "records": [
    {
      "id": "52511",
      "from": "+16505550100",
      "to": [ "+16501112222" ],
      "creationTime": "2021-01-14T21:47:51.436491Z",
      "lastModifiedTime": "2021-01-14T21:47:53.032416Z",
      "messageStatus": "Delivered",
      "cost": 0.007,
      "segmentCount": 1
    },{
      "id": "52494",
      "from": "+16505550100",
      "to": [ "+16502223333" ],
      "creationTime": "2021-01-14T20:21:23.979729Z",
      "lastModifiedTime": "2021-01-14T20:21:25.254851Z",
      "messageStatus": "Delivered",
      "cost": 0.007,
      "segmentCount": 1
    },{
      "id": "52485",
      "from": "+16505550100",
      "to": [ "+16503334444" ],
      "creationTime": "20211-11-14T20:19:56.505461Z",
      "lastModifiedTime": "2021-01-14T22:20:01.728022Z",
      "messageStatus": "DeliveryFailed",
      "errorCode": "SMS-CAR-104",
      "cost": 0.007,
      "segmentCount": 1
    },{
      "id": "52484",
      "from": "+16505550100",
      "to": [ "+16504445555" ],
      "creationTime": "2021-01-14T20:19:18.415601Z",
      "lastModifiedTime": "2021-01-14T20:19:18.668841Z",
      "messageStatus": "SendingFailed"
    }
  ],
  "paging": {
    "pageToken": "pgt1",
    "perPage": 3,
    "firstPageToken": "fpgt1",
    "previousPageToken": "lpgt1",
    "nextPageToken": "npgt1"
  }
}
```

## Read High Volume Individual Message

You can read the individual message details from High Volume message store using a message id.

### Sample codes

=== "HTTP"
    ```http
    GET /restapi/v1.0/account/~/a2p-sms/messages/{messageId}
    ```

=== "JavaScript"
    ```javascript
    const RingCentral = require('@ringcentral/sdk').SDK

    var rcsdk = new RingCentral( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
  	var platform = rcsdk.platform();

  	platform.login( {username: "username", password: "password", extension: "extension_number"} )

    platform.on(platform.events.loginSuccess, async function(response){
      try{
        var messageId = "52511"
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/messages/' + messageId)
        var jsonObj = await resp.json()
        console.log(JSON.stringify(jsonObj))
      }catch(e){
        console.log(e.message)
      }
    });
    ```

=== "Python"
    ```python
    from ringcentral import SDK

    sdk = SDK( "client_id", "client_secret", "server_url" )
  	platform = sdk.platform()
  	platform.login( "username", "extension", "password" )
    messageId = "52511"
  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/messages/' + messageId)
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

  	$platform = $rcsdk->platform();
  	$platform->login( "username", "extension_number", "password" );
    $messageId = "52511";
  	$resp = $platform->get('/restapi/v1.0/account/~/a2p-sms/messages/'.$messageId);
    print_r ($resp->json());
    ?>
    ```

=== "C#"
    ```c#
    using System;
    using System.Threading.Tasks;
    using RingCentral;

    namespace HighVolume_SMS
    {
      class Program
      {
        static void Main(string[] args)
        {
          get_individual_message("52511").Wait();
        }
        static private async Task get_individual_message(string messageId)
        {
          RestClient rc = new RestClient("client_id", "client_secret", true);
          await rc.Authorize("username", "extension_number", "password");

          var resp = await rcsdk.Restapi().Account().A2pSms().Messages(messageId).Get();
          Console.WriteLine(JsonConvert.SerializeObject(resp));
        }
      }
    }
    ```

=== "Java"
    ```java
    package HighVolume_SMS;

    import java.io.IOException;
    import com.ringcentral.*;
    import com.ringcentral.definitions.*;

    public class HighVolume_SMS {
      public static void main(String[] args) {
        try {
          get_individual_message("52511");
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
      }
      public static void get_individual_message(String messageId) throws RestException, IOException{
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        var resp = restClient.restapi().account().a2psms().messages(messageId).get();
        String jsonStr = new Gson().toJson(resp, new TypeToken<Object>(){}.getType());
        System.out.println(jsonStr);
      }
    }
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')
    messageId = "52511"
  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/messages/' + messageId)

    puts resp.body
    ```

### Response

```json
{
  {
    "id": "52511",
    "from": "+16505550100",
    "to": [ "+14155550100" ],
    "text": "Hello Team",
    "createdAt": "2020-10-14T21:47:51.436491Z",
    "lastUpdatedAt": "2020-10-14T21:47:53.032416Z",
    "messageStatus": "Delivered",
    "cost": 0.007,
    "segmentCount": 1
  }
}
```
