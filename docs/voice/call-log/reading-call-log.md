# Reading Call Log Data

RingCentral's Call Log is one of the platform's most utilized resources as it enables so many different use cases important to enterprises and businesses. Developers use RingCentral's Call Log for the following use cases:

* **Downloading Call Log Data to an External Database** - Since RingCentral does not store Call Log data indefinitely, developers use the Call Log API to download Call Log data into customer-owned, long-term, persistent storage.

* **Reporting and Analytics** - Developers use the Call Log API to analyze call histories, agent performance, answer rates, and more - with a desire and intent to improve company operations and performance.

* **CRM Integration** - Developers can use Call Log data to help augment 3rd party systems with customer interaction histories and more.

* **Billing Systems** - Service industries often need to bill customers based on the time spent serving them over the phone. Call Log data catalogs all time spent with customers to make time tracking easier.

!!! warning Call Log Anti-Patterns
    Here are ways developers should **not** use the Call Log API:

    * **Real-time reporting** - The Call Log API resource is labeled as a "Heavy" usage plan. RingCentral offers better solutions for event-driven, real-time reporting for RingCentral Extensions, primarily Webhooks and/or Push Notifications.
    * **Long-Polling** - While this is highly related to the above, it is important to clearly note that long-polling Call Log (executing multiple HTTP requests to simulate real-time, socket-based data) is not a supported use case.

## Sample Code to Get Started with Call Log

```javascript tab="JavaScript"
const RC = require('ringcentral');

var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
var platform = rcsdk.platform();

platform.login( {username: "username", password: "password", extension: "extension_number"} )
      .then(function(resp) {
          read_user_calllog()
      });

function read_user_calllog(){
    platform.get('/account/~/extension/~/call-log', {
             view: 'Detailed'
        })
        .then(function (resp) {
            for (var record of resp.json().records)
              console.log("Call type: " + record.type)
        });
}
```

```python tab="Python"
from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

params = {
    'view': 'Detailed'
}
resp = platform.get('/restapi/v1.0/account/~/extension/~/call-log', params)
for record in resp.json().records:
    print "Call type: " + record.type
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$params = array(
   'view' => 'Detailed'
    );
$resp = $platform->get('/account/~/extension/~/call-log', $params);
foreach ($resp->json()->records as $record) {
    print_r ("Call type: ".$record->type);
}
?>
```

```c# tab="C#"
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_CallLog
{
    class Program
    {
        static void Main(string[] args)
        {
            read_user_calllog().Wait();
        }
        static private async Task read_user_calllog()
        {
            RestClient rc = new RestClient("client_id", "client_secret", false);
            await rc.Authorize("username", "extension_number", "password");
            var parameters = new ReadUserCallLogParameters();
            parameters.view = "Detailed";

            var resp = await rc.Restapi().Account().Extension().CallLog().List(parameters);
            foreach (CallLogRecord record in resp.records)
            {
                Console.WriteLine("Call type: " + record.type);
            }
        }
    }
}
```

```java tab="Java"
package Read_CallLog;

import java.io.IOException;
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Read_CallLog {
    public static void main(String[] args) {
        try {
            readUserCallLog();
        } catch (RestException | IOException e) {
            e.printStackTrace();
        }
    }

  	public static void readUserCallLog() throws RestException, IOException{
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        ReadUserCallLogParameters getParameters = new ReadUserCallLogParameters();
        parameters.view = "Detailed"

        var response = rc.restapi().account().extension().calllog().list(parameters);
  	    for (CallLogRecord record : response.records) {
  	    	System.out.println("Call type: " + record.type);
  	    }
    }
}
```

```ruby tab="Ruby"
require 'ringcentral'

rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

resp = rc.get('/restapi/v1.0/account/~/extension/~/call-log', {
    view: 'Detailed'
})

for record in resp.body['records'] do
    puts "Call type: " + record['type']
end
```

## Call Log API Permissions

There are various API Permissions your application will be required to use depending upon the type of call log data developers need to access from the RingCentral API.

* Active Calls, Account level Call Log Records, and Extension level Call Log Records require the `ReadCallLog` API permission.
* Call Recording Metadata and Call Recording Content require the `ReadCallRecording` API Permission
