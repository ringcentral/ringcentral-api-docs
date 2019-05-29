# Reading Active Calls

Active Calls provides developers with time-sensitive insights into what is (or has recently) occurred in your RingCentral Account. We can perform this lookup at the Account Level or at the Extension Level depending upon the role of the user who has authenticated and obtained an access_token.

Active Calls are not `real time`. There is some latency between the time when a call has terminated and when it shows up in the records returned, this latency differs but it is typically 3-10 seconds.

Active Calls are created to work as a tool for integration developers who need to lookup call log data to append notes, and sentiment for things such as CRM integrations. Active Calls are a handy tool for looking up this time-sensitive information, but this can also be confusing for developers expecting this Call Log data type to represent `real time` active calls. For `real-time` or `near real-time` call data developers will want to either use [Webhooks](http://ringcentral-quickstart.readthedocs.io/en/latest/webhooks/) or [Push Notification](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefNotifications.html).

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

## Sample Code

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
          read_active_calls()
      });

function read_active_calls(){
    platform.get('/account/~/extension/~/active-calls', {
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
$resp = $platform->get('/account/~/extension/~/active-calls', $params);
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
resp = platform.get('/restapi/v1.0/account/~/extension/~/active-calls', params)
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

resp = rc.get('/restapi/v1.0/account/~/active-calls', payload: {
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

namespace Read_ActiveCalls
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
            read_active_calls().Wait();
        }
        static private async Task read_active_calls()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            if (rc.token.access_token.Length > 0)
            {
                var parameters = new LoadUserCallLogParameters();
                parameters.view = "Simple";
                var resp = await rc.Restapi().Account().Extension().ActiveCalls().List(parameters);
                foreach (CallLogRecord record in resp.records)
                {
                    Console.WriteLine("Call type: " + record.type);
                }

            }
        }
    }
}
```


