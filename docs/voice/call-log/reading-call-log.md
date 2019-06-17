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

```javascript tab="Javascript"
const RC = require('ringcentral');

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RC({
      server: RINGCENTRAL_SERVER,
      appKey: RINGCENTRAL_CLIENTID,
      appSecret: RINGCENTRAL_CLIENTSECRET
  });
var platform = rcsdk.platform();
platform.login({
      username: RINGCENTRAL_USERNAME,
      password: RINGCENTRAL_PASSWORD,
      extension: RINGCENTRAL_EXTENSION
      })
      .then(function(resp) {
          read_user_calllog()
      });

function read_user_calllog(){
    platform.get('/account/~/extension/~/call-log', {
             view: 'Simple'
        })
        .then(function (resp) {
            for (var record of resp.json().records)
              console.log("Call type: " + record.type)
        });
}
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

$params = array(
   'view' => 'Simple'
    );
$resp = $platform->get('/account/~/extension/~/call-log', $params);
foreach ($resp->json()->records as $record) {
    print_r ("Call type: ".$record->type);
}
?>
```

```python tab="Python"
from ringcentral import SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

params = {
    'view' : 'Simple'
}
resp = platform.get('/restapi/v1.0/account/~/extension/~/call-log', params)
for record in resp.json().records:
    print "Call type: " + record.type
```

```ruby tab="Ruby"
require 'ringcentral'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

resp = rc.get('/restapi/v1.0/account/~/call-log', payload: {
    view: 'Simple'
})

for record in resp.body['records'] do
    puts "Call type: " + record['type']
end
```

```c# tab="C#"
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_CallLog
{
    class Program
    {
        const string RECIPIENT = "<ENTER PHONE NUMBER>";
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

        static void Main(string[] args)
        {
            read_user_calllog().Wait();
        }
        static private async Task read_user_calllog()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            if (rc.token.access_token.Length > 0)
            {
                var parameters = new LoadUserCallLogParameters();
                parameters.view = "Simple";
                var resp = await rc.Restapi().Account().Extension().CallLog().List(parameters);
                foreach (CallLogRecord record in resp.records)
                {
                    Console.WriteLine("Call type: " + record.type);
                }

            }
        }
    }
}
```

## Call Log API Permissions

There are various API Permissions your application will be required to use depending upon the type of call log data developers need to access from the RingCentral API.

* Active Calls, Account level Call Log Records, and Extension level Call Log Records require the `ReadCallLog` API permission.
* Call Recording Metadata and Call Recording Content require the `ReadCallRecording` API Permission

