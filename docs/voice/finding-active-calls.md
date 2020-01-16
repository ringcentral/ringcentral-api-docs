# Finding Active Calls on the Network

Active Calls provides developers with time-sensitive insights into what is (or has recently) occurred in your RingCentral Account. We can perform this lookup at the Account Level or at the Extension Level depending upon the role of the user who has authenticated and obtained an access_token.

Active Calls are not `real time`. There is some latency between the time when a call has terminated and when it shows up in the records returned, this latency differs but it is typically 3-10 seconds.

Active Calls are created to work as a tool for developers who need to lookup call log data to append notes, and sentiment for things such as CRM integrations. Active Calls are a handy tool for looking up this time-sensitive information, but this can also be confusing for developers expecting this Call Log data type to represent `real time` active calls. For `real-time` or `near real-time` call data developers will want to either use [Webhooks](http://ringcentral-quickstart.readthedocs.io/en/latest/webhooks/) or [Push Notification](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefNotifications.html).

Developers should consider Active Calls to be a time-sensitive cache, where the default period of time a call remains in this cache (after being ended) is approximately 120 seconds.

!!! info "See Also: Call Log"
    The Active Call API is a close cousin to the RingCentral [Call Log API](../call-log/reading-call-log/) using identical data constructs and responses. The key and only difference being the following:

    * Active Call API returns a list of live calls in an account. These are calls that have been connected to an extension. It does not return calls currently being routed to an extension.
    * Active Call API connects to a different URL/endpoint.

Query parameters are dropped if supplied and only `Simple` views of Call Log data are available using Active Call requests.

## Account Level Active Calls

Developers can access a list of active calls for an entire account. This requires an Admin account to authenticate and obtain the access_token used for this request.

```http
GET /restapi/v1.0/account/~/active-calls HTTP/1.1
```

!!! warning ReadCompanyCallLog Permission
    Attempting to access Account-Level Active Calls with an access_token that is not associated with an Admin account will result in the following "InsufficientPermissions" error: [ReadCompanyCallLog] permission required.

## Extension Level Active Calls

Developers can access a list of active calls associated with the currently authenticated access_token user account credentials.

```http
GET /restapi/v1.0/account/~/extension/~/active-calls HTTP/1.1
```

## Response Format

The response format for active calls mirrors that of Call Log responses exactly.

## Sample Code to Get Started with reading user active calls

```javascript tab="JavaScript"
const RC = require('ringcentral');

var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
var platform = rcsdk.platform();

platform.login( {username: "username", password: "password", extension: "extension_number"} )
      .then(function(resp) {
          read_active_calls()
      });

function read_active_calls(){
    platform.get('/account/~/extension/~/active-calls', {
             view: 'Simple'
        })
        .then(function (resp) {
            for (var record of resp.json().records)
              console.log("Call result: " + record.result)
        });
}
```

```python tab="Python"
from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

params = {
    'view' : 'Simple'
}
resp = platform.get('/restapi/v1.0/account/~/extension/~/active-calls', params)
for record in resp.json().records:
    print "Call result: " + record.result
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$params = array(
   'view' => 'Simple'
    );
$resp = $platform->get('/account/~/extension/~/active-calls', $params);
foreach ($resp->json()->records as $record) {
    print_r ("Call result: ".$record->result);
}
?>
```

```c# tab="C#"
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_User_ActiveCalls
{
    class Program
    {
        static void Main(string[] args)
        {
            read_user_active_calls().Wait();
        }
        static private async Task read_user_active_calls()
        {
            RestClient rc = new RestClient("client_id", "client_secret", false);
            await rc.Authorize("username", "extension_number", "password");
            var parameters = new ListExtensionActiveCallsParameters();
            parameters.view = "Simple";
            var resp = await rc.Restapi().Account().Extension().ActiveCalls().Get(parameters);
            foreach (CallLogRecord record in resp.records)
            {
                Console.WriteLine("Call result: " + record.result);
            }
        }
    }
}
```

```java tab="Java"
package Read_User_ActiveCalls;

import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Read_User_ActiveCalls {
    public static void main(String[] args) {
        try {
            read_user_activecals();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }

  	public static void read_user_activecals() throws RestException, IOException{
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        var getParameters = new ListExtensionActiveCallsParameters();
        parameters.view = "Simple"

        var response = rc.restapi().account().extension().activecalls().list(parameters);
  	    for (CallLogRecord record : response.records) {
  	    	  System.out.println("Call result: " + record.result);
  	    }
    }
}
```

```ruby tab="Ruby"
require 'ringcentral'

rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

resp = rc.get('/restapi/v1.0/account/~/extension/~/active-calls', {
    view: 'Simple'
})

for record in resp.body['records'] do
    puts "Call result: " + record['result']
end
```
