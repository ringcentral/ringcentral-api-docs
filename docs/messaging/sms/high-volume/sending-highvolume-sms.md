# Sending High Volume SMS

The High Volume SMS API provides a very flexible way to send multiple SMS message in a single API request (a.k.a. a batch). In other words, one can send the same text message to different recipients and/or different text messages to different recipients in a single request.

!!! note "There is no limit of number of recipients in a batch. However, the maximum size of each batch is about 50MB."

### Sample codes

Simple request to broadcast the same message to multiple recipients

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

  	requestBody = {
      "from": "+16505550100",
      "text": "Hello Team",
      "messages": [
        { "to": ["+14155550100"] },
        { "to": ["+12125550100"] }
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
      "text" => "Hello Team",
      'messages' => array(
        array ("to" => array ("+14155550100")),
        array ("to" => array ("+12125550100"))
    ));
  	$resp = $platform->post('/restapi/v1.0/account/~/a2p-sms/batch', $requestBody);
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
          send_highvolume_sms().Wait();
        }
        static private async Task send_highvolume_sms()
        {
          RestClient rc = new RestClient("client_id", "client_secret", true);
          await rc.Authorize("username", "extension_number", "password");
          var parameters = new CreateSMSMessageBatchRequest();
          parameters.from = "+16505550100";
          parameters.text = "Hello Team";

          String[] numbers = new String[] { "+14155550100", "+12125550100" };
          parameters.messages = new MessageCreateRequest[numbers.Length];
          for (var i=0; i<numbers.Length; i++)
          {
            var recipient = new MessageCreateRequest();
            recipient.to = new string[] { numbers[i] };
            parameters.messages[i] = recipient;
          }

          var resp = await rc.Restapi().Account().A2pSms().Batch().Post(parameters);
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
          send_highvolume_sms();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
      }
      public static void send_highvolume_sms() throws RestException, IOException{
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        CreateSMSMessageBatchRequest parameters = new CreateSMSMessageBatchRequest();
        parameters.from = "+16505550100";
        parameters.text = "Hello Team";

        String[] numbers = new String[] {"+14155550100", "+12125550100"};
        parameters.messages = new MessageCreateRequest[numbers.length];
        for (int i=0; i<numbers.length; i++) {
          MessageCreateRequest m = new MessageCreateRequest();
          m.to = new String[] {numbers[i]};
          parameters.messages[i] = m;
        }     
        var resp = rc.restapi().account().a2pSms().batch().post(parameters);
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

### Response

The code samples above would all produce a response that would appear similar to the one below.

```json
{
    "id": "3157ac7d-baab-4d0e-1453-deada6c735d2",
    "from": "+16505550100",
    "batchSize": 2,
    "processedCount": 0,
    "status": "Processing",
    "creationTime": "2020-10-12T16:59:55.053902Z",
    "lastModifiedTime": "2020-10-12T16:59:55.053902Z",
    "rejected": []
}
```

!!!Note
    The `rejected` field is a list of invalid numbers (if any). Each item in the `rejected` array is an object contained the index position (starting from 1) of the recipient's phone number in the "messages" array, an error code and a short description of the rejected reason. E.g.:
    ```
    [{"index":2,"to":["+4088070206"],"errorCode":"SMS-RC-410","description":"The recipient number is invalid"}]
    ```
    If your batch contains invalid phone numbers, you will receive the `rejected` list with content only from the response returned by sending a batch. Reading the batch status will always return an empty `rejected` array.

### Sample codes

Simple request to send customized messages to multiple recipients

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

=== "HTTP (example 2)"
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
    ));
  	$resp = $platform->post('/restapi/v1.0/account/~/a2p-sms/batch', $requestBody);
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
          send_highvolume_sms().Wait();
        }
        static private async Task send_highvolume_sms()
        {
          RestClient rc = new RestClient("client_id", "client_secret", true);
          await rc.Authorize("username", "extension_number", "password");
          var parameters = new CreateSMSMessageBatchRequest();
          parameters.from = "+16505550100";
          parameters.text = "Hello Team";

          String[] numbers = new String[] { "+14155550100", "+12125550100" };
          String[] names = new String[] { "Alice", "Bob" };
          parameters.messages = new MessageCreateRequest[numbers.Length];
          for (var i=0; i<numbers.Length; i++)
          {
            var m = new MessageCreateRequest();
            m.text = "Hello " + names[i]
            m.to = new string[] { numbers[i] };
            parameters.messages[i] = m;
          }

          var resp = await rc.Restapi().Account().A2pSms().Batch().Post(parameters);
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
          send_highvolume_sms();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
      }
      public static void send_highvolume_sms() throws RestException, IOException{
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        CreateSMSMessageBatchRequest parameters = new CreateSMSMessageBatchRequest();
        parameters.from = "+16505550100";
        parameters.text = "";

        String[] numbers = new String[] {"+14155550100", "+12125550100"};
        String[] names = new String[] {"Alice", "Bob"};
        parameters.messages = new MessageCreateRequest[numbers.length];
        for (int i=0; i<numbers.length; i++) {
          MessageCreateRequest m = new MessageCreateRequest();
          m.text = "Hello " + names[i];
          m.to = new String[] {numbers[i]};
          parameters.messages[i] = m;
        }     
        var resp = rc.restapi().account().a2pSms().batch().post(parameters);
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

  	resp = rc.post('/restapi/v1.0/account/~/a2p-sms/batch', payload: {
  	    from: "+16505550100",
  	    messages: [
          { text: "Hello Alice", to: ["+14155550100"] },
          { text: "Hello Bob", to: ["+12125550100"] }
        ]
  	})

    puts resp.body
    ```

### Response

The code samples above would all produce a response that would appear similar to the one below.

```json
{
    "id": "2157ac7d-baab-4d0e-1262-deada6c7xxxx",
    "from": "+16505550100",
    "batchSize": 2,
    "processedCount": 0,
    "status": "Processing",
    "creationTime": "2020-10-12T16:50:35.033902Z",
    "lastModifiedTime": "2020-10-12T16:50:35.033902Z",
    "rejected": []
}
```

## Checking a Batch Request Status

Sending a large batch will take some time for the server to complete. You can read a batch status using the batch id returned in the response after sending a batch.

### Sample codes

=== "HTTP"
    ```http
    GET /restapi/v1.0/account/~/a2p-sms/batches/2157ac7d-baab-4d0e-1262-deada6c7xxxx
    ```

=== "JavaScript"
    ```javascript
    const RingCentral = require('@ringcentral/sdk').SDK

    var rcsdk = new RingCentral({server: "server_url", clientId: "client_id", clientSecret: "client_secret"})

  	var platform = rcsdk.platform();

  	platform.login({username: "username", password: "password", extension: "extension_number"})

    platform.on(platform.events.loginSuccess, async function(response){
      try{
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/batches/2157ac7d-baab-4d0e-1262-deada6c7xxxx')
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

  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/batches/2157ac7d-baab-4d0e-1262-deada6c7xxxx')
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

  	$platform = $rcsdk->platform();
  	$platform->login( "username", "extension_number", "password" );

  	$resp = $platform->get('/restapi/v1.0/account/~/a2p-sms/batches/2157ac7d-baab-4d0e-1262-deada6c7xxxx');
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
          get_batch_result("Batch-ID").Wait();
        }
        static private async Task get_batch_result(string batchId)
        {
          RestClient rc = new RestClient("client_id", "client_secret", true);
          await rc.Authorize("username", "extension_number", "password");
          string batchId = "2157ac7d-baab-4d0e-1262-deada6c7xxxx";
          var resp = await rc.Restapi().Account().A2pSms().Batch(batchId).Get();
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
          get_batch_result("Batch-ID");
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
      }
      public static void get_batch_result(String batchId) throws RestException, IOException{
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");
        String batchId = "2157ac7d-baab-4d0e-1262-deada6c7xxxx";
        var resp = rc.restapi().account().a2pSms().batch(batchId).get();
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

  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/batches/2157ac7d-baab-4d0e-1262-deada6c7xxxx')

    puts resp.body
    ```

### Response

The code samples above would all produce a response that would appear similar to the one below. The batch's status is highlighted.

```json hl_lines="6"
{
  "id": "2157ac7d-baab-4d0e-1262-deada6c7xxxx",
  "from": "+16505550100",
  "batchSize": 2,
  "processedCount": 2,
  "status": "Completed",
  "creationTime": "2020-10-12T16:50:35.033902Z",
  "lastModifiedTime": "2020-10-12T16:50:39.033902Z",
  "rejected": [],
  "cost": 0.014
}
```
