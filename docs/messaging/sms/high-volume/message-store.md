# High Volume SMS Message Store

The high volume SMS message store is separate from the standard SMS(Enhanced Business SMS) message store. Use the APIs in the table below to access your high volume SMS message store.

| API Endpoint | Description |
|-|-|
| [`/restapi/v1.0/account/~/a2p-sms/messages`](#read-high-volume-message-store) | Read the entire high volume message store. |
| [`/restapi/v1.0/account/~/a2p-sms/batches`](#list-batches) | List all batches basic info from the entire high volume message store. |
| [`/restapi/v1.0/account/~/a2p-sms/batches/{batchId}`](#read-individual-batch) | Read a single batch basic info identified by the batch id. |
| [`/restapi/v1.0/account/~/a2p-sms/statuses`](#read-message-statuses) | Read aggregated message statuses from the message store. |
| [`/restapi/v1.0/account/~/a2p-sms/messages/{messageId}`](#read-individual-message) | Read a single message identified by the message id. |


## Read High Volume Message Store

You can read the entire high volume SMS message store then iterate through the `records` array in the response to parse each message's metadata. Use the `nextPageToken` to read the next page if the total number of records is greater than the maximum number of items per page.

To avoid loading the entire message store, which could be extremely large, you can use the following query parameters to control and limit the number of messages in a response. To read messages per batch, you can use the [List Batches](#list-batches) API to retrieve a list of batch Ids, then use a batch id as a filter to read messages from that batch.

### Query parameters

| Filter | Description |
|-|-|
| `view` | Read the A2P message store in "Simple" or "Detailed" mode. Detailed view will return the text message for each message item. Default value is "Simple". |
| `batchId`| Return only messages belong to a single batch identified by the batch id. |
| `dateFrom `| Return messages created after the start date and time, for example 2020-11-10T08:00:00.000Z. The default value is dateTo minus 24 hours. |
| `dateTo`| Return messages created before the end date time, for example 2020-11-11T08:00:00.000Z. The default value is current time. |
| `phoneNumber`| Return only messages which contains the specified phone numbers in either the "from" or the "to" field. Multiple phone numbers (up to 15) are accepted.|
| `direction` | Return messages with the specified direction. If not specified, both inbound and outbound messages are returned. Multiple values are accepted. |
| `perPage` | Indicate the page size (number of items). Default value is 1000. |
| `pageToken` | Return messages from a specified page. Note! Use a valid page token from the paging object. |


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
  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/messages', params)
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
    package com.ringcentral;

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

## List Batches

You can read batches and parse the response to get a batch id and other basic info such as the status, the number of recipients, the creation date and time etcetera. You can use the following query parameters to control and limit the number of batches in a response.

### Query parameters

| Filter | Description |
|-|-|
| `dateFrom` | Return batches created after the start date and time, for example 2020-11-10T08:00:00.000Z. The default value is dateTo minus 24 hours. |
| `dateTo` | Return batches created before the end date time, for example 2020-11-11T08:00:00.000Z. The default value is current time. |
| `from` | Return only batches sent from the specified phone number. |
| `status` | The status of a batch. Can be _Processing_ or _Completed_. |
| `perPage` | Indicate the page size (number of items). Default value is 1000. |
| `pageToken` | Return batches from a specified page. Note! Use a valid page token from the paging object. |


### Sample codes

=== "HTTP"
    ```http
    GET /restapi/v1.0/account/~/a2p-sms/batches?dateFrom=2021-06-20T00:00:00.000Z&dateTo=2021-06-21T23:59:59.999Z
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
          dateFrom: '2021-06-20T00:00:00.000Z',
          dateTo: '2021-06-21T23:59:59.999Z'
        }
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/batches', params)
        var jsonObj = await resp.json()
        console.log(jsonObj)
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
      'dateFrom': '2021-06-20T00:00:00.000Z',
      'dateTo': '2021-06-21T23:59:59.999Z'
    }
  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/batches', params)
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
      'dateFrom' => "2021-06-20T00:00:00.000Z",
      'dateTo' => "2021-06-21T23:59:59.999Z"
    );
  	$resp = $platform->get('/restapi/v1.0/account/~/a2p-sms/batches', $params);
    print_r ($resp->json());
    ?>
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

    params = {
       dateFrom: "2021-06-20T00:00:00.000Z",
       dateTo: "2021-06-21T23:59:59.999Z"
    }
  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/batches', params)

    puts resp.body
    ```

### Response

```json
{
  "records": [
    {
      "id": 'b4e00b67-969f-4db4-a22d-e3ef3cec7c11',
      "from": '+16505550100',
      "batchSize": 100,
      "processedCount": 100,
      "status": 'Completed',
      "creationTime": '2021-06-21T10:31:59.818028Z',
      "lastModifiedTime": '2021-06-21T10:32:00.870634Z',
      "rejected": [],
      "cost": 0.700
    },
    {
      "id": '95bc9e86-e93a-48a0-a8c0-2e6fff6d52b8',
      "from": '+16505550100',
      "batchSize": 50,
      "processedCount": 50,
      "status": 'Completed',
      "creationTime": '2021-06-21T09:31:59.775224Z',
      "lastModifiedTime": '2021-06-21T09:32:00.810797Z',
      "rejected": [],
      "cost": 0.350
    }
  ]
}
```

## Read Individual Batch

You can read a single batch basic info such as the status, the number of recipients, the number of processed messages etcetera. This is helpful for reading and updating a batch progress in real-time if you send a large batch which would take several hours to be completed.

### Sample codes

=== "HTTP"
    ```http
    GET /restapi/v1.0/account/~/a2p-sms/batches/b4e00b67-969f-4db4-a22d-e3ef3cecxxxx
    ```

=== "JavaScript"
    ```javascript
    const RingCentral = require('@ringcentral/sdk').SDK

    var rcsdk = new RingCentral( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
  	var platform = rcsdk.platform();

  	platform.login( {username: "username", password: "password", extension: "extension_number"} )

    platform.on(platform.events.loginSuccess, async function(response){
      try{
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/batches/b4e00b67-969f-4db4-a22d-e3ef3cecxxxx')
        var jsonObj = await resp.json()
        console.log(jsonObj)
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

  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/batches/b4e00b67-969f-4db4-a22d-e3ef3cecxxxx')
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

  	$platform = $rcsdk->platform();
  	$platform->login( "username", "extension_number", "password" );

  	$resp = $platform->get('/restapi/v1.0/account/~/a2p-sms/batches/b4e00b67-969f-4db4-a22d-e3ef3cecxxxx');
    print_r ($resp->json());
    ?>
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/batches/b4e00b67-969f-4db4-a22d-e3ef3cecxxxx')

    puts resp.body
    ```

### Response

```json
{
  "id": 'b4e00b67-969f-4db4-a22d-e3ef3cecxxxx',
  "from": '+16505550100',
  "batchSize": 100,
  "processedCount": 100,
  "status": 'Completed',
  "creationTime": '2021-06-21T10:31:59.818028Z',
  "lastModifiedTime": '2021-06-21T10:32:00.870634Z',
  "rejected": [],
  "cost": 0.700
}
```

## Read Message Statuses

To get a quick report on message statuses in a batch or within a period of time, you can call this endpoint to get the aggregated message statuses and error codes (if any). If you need to detect each individual message status, use this [endpoint](#read-high-volume-message-store) instead.

### Query parameters

| Filter | Description |
|-|-|
| `batchId`| Return aggregated message statuses of messages belong to a single batch identified by the batch id. |
| `dateFrom `| Return aggregated message statuses of messages created after the start date and time, for example 2020-11-10T08:00:00.000Z. The default value is dateTo minus 24 hours. |
| `dateTo`| Return aggregated message statues of messages created before the end date time, for example 2020-11-11T08:00:00.000Z. The default value is current time. |
| `phoneNumber`| Return aggregated message statuses of messages which contain the specified phone numbers in either the "from" or the "to" field. Multiple phone numbers are accepted. E.g. phoneNumber: ['16501112222','16502223333']|
| `direction` | Return aggregated message statuses of messages with the specified direction. If not specified, both inbound and outbound messages are returned. Multiple values are accepted.|

### Sample codes

=== "HTTP"
    ```http
    GET /restapi/v1.0/account/~/a2p-sms/statuses?batchId=8ba42748-0e48-4459-8262-342a7483xxxx
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
          batchId: '8ba42748-0e48-4459-8262-342a7483xxxx'
        }
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/statuses', params)
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
      'batchId': '8ba42748-0e48-4459-8262-342a7483xxxx'
    }
  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/statuses', params)
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

  	$platform = $rcsdk->platform();
    $params = array(
      'batchId' => "8ba42748-0e48-4459-8262-342a7483xxxx"
    );
  	$platform->login( "username", "extension_number", "password" );
  	$resp = $platform->get('/restapi/v1.0/account/~/a2p-sms/statuses', $params);
    print_r ($resp->json());
    ?>
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')
    params = {
       batchId: "8ba42748-0e48-4459-8262-342a7483xxxx"
    }
  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/statuses')

    puts resp.body
    ```

### Response

```json
{
  "queued": {
    "count": 0,
    "cost": 0
  },
  "delivered": {
    "count": 2,
    "cost": 0.014
  },
  "deliveryFailed": {
    "count": 0,
    "cost": 0,
    "errorCodeCounts": {}
  },
  "sent": {
    "count": 0,
    "cost": 0
  },
  "sendingFailed": {
    "count": 0,
    "cost": 0,
    "errorCodeCounts": {}
  }
}
```

## Read Individual Message

You can read an individual message details from the high volume message store using a message id. Message ids can be retrieved from the response of this [endpoint](#read-high-volume-message-store)

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
