# High Volume SMS Store

The High Volume SMS message store is separate from the normal SMS (P2P) message store to enable high volume sending.

## Read High Volume Message Store

You can read the entire High Volume SMS message store then iterate through the `records` array in the response to parse each message's metadata. Use the `pageToken` to navigate through the entire message store if the numbers of records is greater than the maximum number of items per page.

| API Endpoint | Description |
|-|-|
| [`/restapi/v1.0/account/~/a2p-sms/messages`](https://developers.ringcentral.com/api-reference/High-Volume-SMS/listA2PSMS) | Read the entire High Volume message store. |
| [`/restapi/v1.0/account/~/a2p-sms/messages?pageToken={nextPageToken}`](https://developers.ringcentral.com/api-reference/High-Volume-SMS/listA2PSMS) | Read messages from the next page. |
| [`/restapi/v1.0/account/~/a2p-sms/messages/{messageId}`](https://developers.ringcentral.com/api-reference/High-Volume-SMS/listA2PSMS) | Read a message's details using a message id. |
| [`/restapi/v1.0/account/~/a2p-sms/messages?batchId={batchId}`](https://developers.ringcentral.com/api-reference/High-Volume-SMS/listA2PSMS) | Read all messages in a batch identified by a batch id. |


=== "HTTP"
    ```http
    GET /restapi/v1.0/account/~/a2p-sms/messages
    ```

=== "JSON"
    ```json
    [
      {
        "id":"53095",
        "from":"+16505550100",
        "to":[
          "+14155550100"
        ],
        "createdAt":"2020-10-21T17:26:01.072479Z",
        "lastUpdatedAt":"2020-10-21T17:26:02.192848Z",
        "messageStatus":"DeliveryFailed",
        "errorCode":"SMS-UP-410",
        "cost":0,
        "segmentCount":1
      }
    ]
    ```

=== "JavaScript"
    ```javascript
    const RingCentral = require('@ringcentral/sdk').SDK

    var rcsdk = new RingCentral( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
  	var platform = rcsdk.platform();

  	platform.login( {username: "username", password: "password", extension: "extension_number"} )

    platform.on(platform.events.loginSuccess, async function(response){
      try{
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/messages')
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

  	$resp = $platform->get('/restapi/v1.0/account/~/a2p-sms/messages');
    print_r ($resp->json());
    ?>
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/messages')

    puts resp.body
    ```

### Response

```json
[
  {
    "id":"53095",
    "from":"+16505550100",
    "to":[
      "+14155550100"
    ],
    "createdAt":"2020-10-21T17:26:01.072479Z",
    "lastUpdatedAt":"2020-10-21T17:26:02.192848Z",
    "messageStatus":"DeliveryFailed",
    "errorCode":"SMS-UP-410",
    "cost":0,
    "segmentCount":1
  }
]
```

```json
{
  "records": [
    {
      "id": "52511",
      "from": "+16505550100",
      "to": [ "+16501112222" ],
      "createdAt": "2020-10-14T21:47:51.436491Z",
      "lastUpdatedAt": "2020-10-14T21:47:53.032416Z",
      "messageStatus": "Delivered",
      "cost": 0.007,
      "segmentCount": 1
    },{
      "id": "52494",
      "from": "+16505550100",
      "to": [ "+16502223333" ],
      "createdAt": "2020-10-14T20:21:23.979729Z",
      "lastUpdatedAt": "2020-10-14T20:21:25.254851Z",
      "messageStatus": "Delivered",
      "cost": 0.007,
      "segmentCount": 1
    },{
      "id": "52485",
      "from": "+16505550100",
      "to": [ "+16503334444" ],
      "createdAt": "2020-10-14T20:19:56.505461Z",
      "lastUpdatedAt": "2020-10-14T22:20:01.728022Z",
      "messageStatus": "DeliveryFailed",
      "errorCode": "SMS-CAR-104",
      "cost": 0.007,
      "segmentCount": 1
    },{
      "id": "52484",
      "from": "+16505550100",
      "to": [ "+16504445555" ],
      "createdAt": "2020-10-14T20:19:18.415601Z",
      "lastUpdatedAt": "2020-10-14T20:19:18.668841Z",
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
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/messages/{messageId}')
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

  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/messages/{messageId}')
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

  	$platform = $rcsdk->platform();
  	$platform->login( "username", "extension_number", "password" );

  	$resp = $platform->get('/restapi/v1.0/account/~/a2p-sms/messages/{messageId}');
    print_r ($resp->json());
    ?>
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/messages/{messageId}')

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
