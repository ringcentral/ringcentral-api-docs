# Handling Opt-in / Opt-out requests for High Volume SMS

RingCentral will automatically handle opt-in and opt-out for users on High Volume SMS using industry standard terms `start` and `stop`, respectively. This is handled per pair of sender and recipient numbers.

While RingCentral automatically handles this and will prevent sending to numbers that have opted out, it is recommended that developers make note of the numbers that have opted out, and prevent sending messages to them in the future.

## Network auto-replies to opt-in/out-out requests

### Opt-out requests

When a recipient replies to an SMS message with the word "stop," RingCentral will automatically reply to the recipient with the following message:

> NETWORK MSG: You replied with the word "stop" which blocks all texts from this number.
> Text back "unstop" to receive messages again.

If you have subscribed to [opt-out event notifications](../events/#opt-out-events), you will receive an event of this incident.

### "Opt-in" requests

When a recipient replies to an SMS message with the word "start," RingCentral will automatically reply to the recipient with the following message:

> NETWORK MSG: You have replied "unstop" and will begin receiving messages again from this number.

!!! note "There will be no event notification for opt-in incident."

## Read opted-out phone numbers

In addition to real-time events, you can read opted out phone numbers by calling the `opt-outs` API. The API's response contains a list of phone numbers which have been opted out for receiving text messages from your service phone number (the phone number you send text message from).

=== "HTTP"
    ```
    GET /restapi/v1.0/account/{accountId}/a2p-sms/opt-outs?from=+16505550100
    ```

=== "JavaScript"
    ```javascript
    const RC = require('@ringcentral/sdk').SDK

    var rcsdk = new RingCentral( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} );
  	var platform = rcsdk.platform();

  	platform.login( {username: "username", password: "password", extension: "extension_number"} )

    platform.on(platform.events.loginSuccess, async function(response){
      try{
        var params = { from: "+16505550100" }
        var resp = await platform.get('/restapi/v1.0/account/~/a2p-sms/opt-outs', params)
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

  	params = { "from": "+16505550100" }
  	resp = platform.get('/restapi/v1.0/account/~/a2p-sms/opt-outs', params)
    print resp.text()
    ```

=== "PHP"
    ```php
    <?php
    require('vendor/autoload.php');

  	$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

  	$platform = $rcsdk->platform();
  	$platform->login( "username", "extension_number", "password" );
    $params = array( 'from' => "+16505550100" );
  	$resp = $platform->get('/restapi/v1.0/account/~/a2p-sms/opt-outs', $params);
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
          get_opted_out_numbers().Wait();
        }
        static private async Task get_opted_out_numbers()
        {
          RestClient rc = new RestClient("client_id", "client_secret", true);
          await rc.Authorize("username", "extension_number", "password");
          ReadA2PsmsOptOutsParameters parameters = new ReadA2PsmsOptOutsParameters();
          parameters.from = "+16505550100";

          var resp = await rcsdk.Restapi().Account().A2pSms().OptOuts().Get(parameters);
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
          get_opted_out_numbers();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
      }
      public static void get_opted_out_numbers() throws RestException, IOException{
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        ReadA2PsmsOptOutsParameters parameters = new ReadA2PsmsOptOutsParameters();
    		parameters.from = "+16505550100";

        var resp = restClient.restapi().account().a2psms().optouts().get(parameters);
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

  	resp = rc.get('/restapi/v1.0/account/~/a2p-sms/opt-outs', payload: {
  	    from: "+16505550100"
  	})

    puts resp.body
    ```

### Response

```json
{
  "records": [
    { "from": "+16505550100", "to": "+12125550100" } ],
  "paging":
   {
     "pageToken": "Rji2MjMwNw==",
     "perPage": 100,
     "firstPageToken": "Rji2MjMwNw=="
  }
}
```
