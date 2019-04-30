# Detecting User Presence

Understanding a user's availability is an essential component when considering who to forward calls to, who can attend an ad-hoc meeting, or even where people are (depending upon their status message). As an all-in-one communication platform, the Presence API gives apps visibility into a user's availability across the entire platform: are they on the phone? are they in a meeting? are they available, but their status is set to "Do Not Disturb" etc.

Apps can determine one's availability by looking at an aggregated status the platform computes automatically, or can look at each presence state independently and make other informed decisions.

## Presence Response

Below is a sample response from the Presence API to illustrate the visibility it can provide. The aggregated/computed status is highlighted below.

```json linenums="1" hl_lines="8"
{
  "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/248xxx004/extension/248xxx004/presence",
  "extension": {
    "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/248xxx004/extension/248xxx004",
    "id": 248xxx004,
    "extensionNumber": "101"
  },
  "presenceStatus": "Available",
  "telephonyStatus": "NoCall",
  "userStatus": "Available",
  "dndStatus": "TakeAllCalls",
  "allowSeeMyPresence": true,
  "ringOnMonitoredCall": false,
  "pickUpCallsOnHold": false
}
```

## Example Presence Apps

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

$resp = $platform->get('/account/~/presence',
    array(
        'detailedTelephonyState' => true
    ));
foreach ($resp->json()->records as $record)
    print_r (json_encode($record, JSON_PRETTY_PRINT) . "\n");
```

```javascript tab="Javascript"
const RC = require('ringcentral')

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
        read_user_presence()
    });

function get_user_presence(){
    platform.get('/account/~/presence', {
            detailedTelephonyState: true
        })
        .then(function (resp) {
            var jsonObj = resp.json()
            for (var record of jsonObj.records){
              console.log(JSON.stringify(record))
            }
        })
        .catch(function(e){
            console.log(e.message)
        });
}
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

resp = platform.get('/restapi/v1.0/account/~/presence',
    {
        'detailedTelephonyState' : True
    })
for record in resp.json().records:
    print record.presenceStatus
```

```c# tab="C#"
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Read_Presence
{
    class Program
    {
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

        static void Main(string[] args)
        {
            read_users_presence().Wait();
        }
        static private async Task read_users_presence()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            if (rc.token.access_token.Length > 0)
            {
                var parameters = new AccountPresenceParameters();
                parameters.detailedTelephonyState = true;
                var resp = await rc.Restapi().Account().Presence().Get(parameters);
                foreach (var record in resp.records)
                {
                    dynamic jsonStr = JsonConvert.SerializeObject(record);
                    Console.WriteLine(jsonStr);
                }

            }
        }
    }
}
```

## Required Permissions

Apps requesting to read presence information require the `ReadPresence` permssion. 

## Presence APIs

The following APIs are often used in reading and updating user presence information:

* [Get User Status](https://developers.ringcentral.com/api-reference#Presence-getPresenceStatus)
* [Update User Status](https://developers.ringcentral.com/api-reference#Presence-updatePresenceStatus)
* [Get Users Presence Statuses](https://developers.ringcentral.com/api-reference#Presence-accountPresence)
