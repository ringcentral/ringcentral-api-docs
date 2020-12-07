# Sending High Volume SMS

The High Volume SMS API provides a very flexible way to send multiple SMS message in a single API request (a.k.a. a batch). In other words, one can send the same text message to different recipients and/or different text messages to different recipients in a single request.

!!! note "There is no limit of number of recipients in a batch. However, the maximum size of each batch is about 50MB."

## Simple Broadcast Request to send the same message to 2 recipients

=== "HTTP"

    ```http
    POST /restapi/v1.0/account/~/a2p-sms/batch
    Content-Type: application/json
    Accept: application/json

    {
      "from": "+16505550100",
      "text": "Hello Team",
      "messages": [
        { "to": ["+14155550100"] },
        { "to": ["+12125550100"] }
      ]
    }
    ```

=== "JavaScript"
    ```javascript
    const RingCentral = require('@ringcentral/sdk').SDK

    var rcsdk = new RingCentral({server: "server_url", clientId: "client_id", clientSecret: "client_secret"})

  	var platform = rcsdk.platform();

  	platform.login({username: "username", password: "password", extension: "extension_number"})

    platform.on(platform.events.loginSuccess, async function(response){
      try{
        var requestBody = {
          from: "+16505550100",
          text: "Hello Team",
          messages: [
            { to: ["+14155550100"] },
            { to: ["+12125550100"] }
          ]
        }
        var resp = await platform.post('/restapi/v1.0/account/~/a2p-sms/batch', requestBody)
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

  	requestBody = {
      "from": "+16505550100",
      "text": "Hello Team",
      "messages": [
        { "to": ["+14155550100"] },
        { "to": ["+12125550100"] }
      ]
    }
  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/batch', requestBody)
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

  	$platform = $rcsdk->platform();
  	$platform->login( "username", "extension_number", "password" );
    $requestBody = array(
      'from' => "+16505550100",
      "text" => "Hello Team",
      'messages' => array(
        array ("to" => array ("+14155550100")),
        array ("to" => array ("+12125550100"))
    )
  	$resp = $platform->post('/restapi/v1.0/account/~/a2p-sms/batch', $requestBody);
    print_r ($resp->json());
    ?>
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

  	resp = rc.post('/restapi/v1.0/account/~/extension/~/ring-out', payload: {
  	    from: "+16505550100",
        text: "Hello Team",
  	    messages: [
          { to: ["+14155550100"] },
          { to: ["+12125550100"] }
        ]
  	})

    puts resp.body
    ```

The code samples above would all produce a response that would appear similar to the one below.

```json
{
    "id": "3157ac7d-baab-4d0e-1453-deada6c735d2",
    "from": "+16505550100",
    "batchSize": 2,
    "processedCount": 0,
    "status": "Processing",
    "creationTime": "2020-10-12T16:59:55.053902Z",
    "lastModifiedTime": "2020-10-12T16:59:55.053902Z"
}
```

## Simple Request to send customized messages to 2 recipients

=== "HTTP"
    ```http
    POST /restapi/v1.0/account/~/a2p-sms/batch
    Content-Type: application/json
    Accept: application/json

    {
      "from": "+16505550100",
      "messages": [
        {
          "to": ["+14155550100"],
          "text": "Hello Alice"
        },
        {
          "to": ["+12125550100"],
          "text": "Hello Bob"
        }
      ]
    }
    ```

=== "HTTP2"
    ```http
    POST /restapi/v1.0/account/~/a2p-sms/batch
    Content-Type: application/json
    Accept: application/json

    {
      "from": "+16505550100",
      "text": "Hello Friend"
      "messages": [
        {
          "to": ["+14155550100"],
          "text": "Hello Alice"
        },
        {
          "to": ["+12125550100"],
          "text": "Hello Bob"
        },
        {
          "to": ["+16505550199"]
        }
      ]
    }
    ```

=== "JavaScript"
    ```javascript
    const RingCentral = require('@ringcentral/sdk').SDK

    var rcsdk = new RingCentral({server: "server_url", clientId: "client_id", clientSecret: "client_secret"})

  	var platform = rcsdk.platform();

  	platform.login({username: "username", password: "password", extension: "extension_number"})

    platform.on(platform.events.loginSuccess, async function(response){
      try{
        var requestBody = {
          from: "+16505550100",
          messages: [
            { to: ["+14155550100"], text: "Hello Alice" },
            { to: ["+12125550100"], text: "Hello Bob" }
          ]
        }
        var resp = await platform.post('/restapi/v1.0/account/~/a2p-sms/batch', requestBody)
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

  	requestBody = {
      "from": "+16505550100",
      "messages": [
        { "to": ["+14155550100"], "text": "Hello Alice" },
        { "to": ["+12125550100"], "text": "Hello Bob" }
      ]
    }
  	resp = platform.post('/restapi/v1.0/account/~/a2p-sms/batch', requestBody)
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

  	$platform = $rcsdk->platform();
  	$platform->login( "username", "extension_number", "password" );
    $requestBody = array(
      'from' => "+16505550100",
      'messages' => array(
        array ("text" => "Hello Alice", "to" => array ("+14155550100")),
        array ("text" => "Hello Bob", "to" => array ("+12125550100"))
    )
  	$resp = $platform->post('/restapi/v1.0/account/~/a2p-sms/batch', $requestBody);
    print_r ($resp->json());
    ?>
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

  	resp = rc.post('/restapi/v1.0/account/~/a2p-sms/batch', payload: {
  	    from: "+16505550100",
  	    messages: [
          { text: "Hello Alice", to: ["+14155550100"] },
          { text: "Hello Bob", to: ["+12125550100"] }
        ]
  	})

    puts resp.body
    ```

The code samples above would all produce a response that would appear similar to the one below.

```json
{
    "id": "2157ac7d-baab-4d0e-1262-deada6c757c8",
    "from": "+16505550100",
    "batchSize": 2,
    "processedCount": 0,
    "status": "Processing",
    "creationTime": "2020-10-12T16:50:35.033902Z",
    "lastModifiedTime": "2020-10-12T16:50:35.033902Z"
}
```

## Checking a Batch Request Status

Sending a large batch will take some time for the server to complete. You can read a batch status using a batch id returned in the response after sending a batch.

=== "JavaScript"
    ```javascript
    const RingCentral = require('@ringcentral/sdk').SDK

    var rcsdk = new RingCentral({server: "server_url", clientId: "client_id", clientSecret: "client_secret"})

  	var platform = rcsdk.platform();

  	platform.login({username: "username", password: "password", extension: "extension_number"})

    platform.on(platform.events.loginSuccess, async function(response){
      try{
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/batch/{batchId}')
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

  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/batch/{batchId}')
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

  	$platform = $rcsdk->platform();
  	$platform->login( "username", "extension_number", "password" );

  	$resp = $platform->post('/restapi/v1.0/account/~/a2p-sms/batch/{batchId}');
    print_r ($resp->json());
    ?>
    ```

=== "Ruby"
    ```ruby
    require 'ringcentral'

    rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
  	rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/batch/{batchId}')

    puts resp.body
    ```

The code samples above would all produce a response that would appear similar to the one below. The batch's status is highlighted for you.

```json hl_lines="6"
{
  "id": "2157ac7d-baab-4d0e-1262-deada6c757c8",
  "from": "+16505550100",
  "batchSize": 2,
  "processedCount": 0,
  "status": "Completed",
  "creationTime": "2020-10-12T16:50:35.033902Z",
  "lastModifiedTime": "2020-10-12T16:50:39.033902Z"
}
```
