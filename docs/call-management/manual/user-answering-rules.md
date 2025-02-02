# User Answering Rules

User Answering Rules can be used to create and manage the logic for routing incoming calls to a particular user/extension. If you are unfamiliar with answering rules, we recommend you read our [Answering Rules Overview](../../voice/call-routing/manual/answering-rules.md).

## Create a User Custom Answering Rule

Be mindful of the following when constructing a request to create a user custom answering rule:

* Provide a meaningful name for the rule using the `name` parameter.
* Set the `type` parameter as "Custom."
* Set the `enabled` parameter to True if the rule needs to be in effect immediately. Otherwise, set it to False.
* Specify one or more conditions (see below).
* Specify the action to take using the `callHandlingAction` field (see table below).
* Specify required parameters for `callHandlingAction` option accordingly. [More details](https://developers.ringcentral.com/api-reference/Rule-Management/createAnsweringRule)

Finally, make a POST request to the following endpoint:

```
/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule
```

### Call Handling Conditions

The following parameters are used for specifying call handling conditions.

* `callers`: a list of callers' phone numbers or contact names
    * `callerId`:
    * `name`:
* `calledNumbers`:  a list of recipients' phone numbers
    * `phoneNumber`: a phone number belonging to the user/extension
* `schedule`: week day and time or time ranges or business hours and after hours parameters
    * `weeklyRanges`: week day and time ranges
    * `ranges`: date and time ranges
    * `ref`: "BusinessHours" or "AfterHours". Business hours can be set using the [Business Hours API Reference](https://developers.ringcentral.com/api-reference/Business-Hours/updateUserBusinessHours)

### Call Handling Actions

| Action | Description |
|-|-|
| `ForwardCalls` | Re-route an incoming call to multiple phone numbers in a specific order with greeting settings apply. |
| `UnconditionalForwarding` | Forward an incoming call immediately to a specified number. |
| `TakeMessagesOnly` | Play back a voicemail greeting then forward an incoming call to a voice mailbox. |
| `PlayAnnouncementOnly` | Play back a pre-recorded announcement then hang up. |
| `TransferToExtension` | Forward an incoming call (dialed to a [Call Queue](../../voice/call-routing/manual/call-queues.md) extension) to a specific extension. |
| `AgentQueue` | Forward an incoming call (dialed to a [Call Queue](../../voice/call-routing/manual/call-queues.md) extension) to one or more specified agents. |

!!! info "Required Fields"
    If `ForwardCalls` is specified for `callHandlingAction`, the `forwarding` parameter object is required. You can use the [call forwarding APIs](../../voice/call-routing/manual/call-forwarding.md) to create or retrieve call forwarding information then use the the `uri`, `id` to specify the `forwardingNumbers` parameter under the `rules` object.

    If "TransferToExtension" is specified for `callHandlingAction`, the `transfer` parameter object is required.

    If "AgentQueue" is specified for `callHandlingAction`, the `queue` parameter object is required.

Required permission(s): EditExtensions

## Sample Code

### Create Answering Rule

The following code sample shows how to create a user custom answering rule that will re-route all incoming calls to a voice mailbox during a user's weekly meeting times on Monday and Friday.

```javascript tab="JavaScript"
var SDK = require('ringcentral')

var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
var platform = rcsdk.platform();

platform.login( {username: "username", password: "password", extension: "extension_number"} )
    .then(function(resp) {
        create_user_custom_rule()
    });
}

function create_user_custom_rule() {
  var params = {
    enabled: true,
    type: "Custom",
    name: "My weekly meetings",
    schedule : {
      weeklyRanges: {
        monday: [ { from: "09:00", to: "10:00" } ],
        friday: [ { from: "10:00", to: "15:00" } ]
      }
    },
    callHandlingAction: "TakeMessagesOnly"
  }

  platform.post('/account/~/extension/~/answering-rule', params)
  .then(function(resp){
      console.log(resp.json())
  })
  .catch(function(e){
      console.log(e)
  })
}
```

```python tab="Python"
from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

params = {
    'enabled': True,
    'type': 'Custom',
    'name': "My weekly meetings",
    'schedule' : {
      'weeklyRanges': {
        'monday': [{ 'from': "09:00",'to': "10:00" }],
        'friday': [{ 'from': "10:00", 'to': "15:00" }]
      }
    },
    'callHandlingAction': "TakeMessagesOnly"
  }
resp = platform.post('/restapi/v1.0/account/~/extension/~/answering-rule', params)

print resp.text()
```

```php tab="PHP"
<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$params = array (
    'enabled' => true,
    'type' => "Custom",
    'name' => "My weekly meetings",
    'schedule' => array (
      'weeklyRanges' => array (
        'monday' => array ( array ('from' => "09:00", 'to' => "10:00")),
        'friday' => array ( array ('from' => "10:00", 'to' => "15:00"))
      )
    ),
    'callHandlingAction' => "TakeMessagesOnly"
);
$resp = $platform->post('/account/~/extension/~/answering-rule', $params);

print_r ($resp->text());
```

```c# tab="C#"
using System;
using System.Threading.Tasks;
using RingCentral;

namespace Create_Custom_Answering_Rule
{
    class Program
    {
        static void Main(string[] args)
        {
            create_custom_answering_rule().Wait();
        }
        static private async Task create_custom_answering_rule()
        {
            RestClient rc = new RestClient("client_id", "client_secret", "server_url");
            await rc.Authorize("username", "extension_number", "password");

            var parameters = new CreateAnsweringRuleRequest();
            parameters.enabled = true;
            parameters.type = "Custom";
            parameters.name = "My weekly meetings";
            var schedule = new ScheduleInfo();
            var weeklyRanges = new WeeklyScheduleInfo();
            TimeInterval meetingTime = new TimeInterval();
            meetingTime.from = "09:00";
            meetingTime.to = "10:00";
            weeklyRanges.monday = new TimeInterval[] { meetingTime };

            meetingTime = new TimeInterval();
            meetingTime.from = "10:00";
            meetingTime.to = "15:00";
            weeklyRanges.friday = new TimeInterval[] { meetingTime };

            schedule.weeklyRanges = weeklyRanges;
            parameters.schedule = schedule;
            parameters.callHandlingAction = "TakeMessagesOnly";

            var response = await rc.Restapi().Account().Extension().AnsweringRule().Post(parameters);
            var jsonStr = JsonConvert.SerializeObject(response);
            Console.WriteLine(jsonStr);
        }
    }
}
```

```java tab="Java"
import com.ringcentral.*;
import com.ringcentral.definitions.*;

public class Export_MessageStore {
	  public static void main(String[] args) {
    		try {
    			create_custom_answering_rule();
    		} catch (RestException | IOException e) {
    			e.printStackTrace();
    		}
  	}

    public static void create_custom_answering_rule() throws RestException, IOException {
        RestClient rc = new RestClient("client_id", "client_secret", "server_url");
        rc.authorize("username", "extension_number", "password");

        var parameters = new CreateAnsweringRuleRequest();
        parameters.enabled = true;
        parameters.type = "Custom";
        parameters.name = "My weekly meetings";
        var schedule = new ScheduleInfo();
        var weeklyRanges = new WeeklyScheduleInfo();
        TimeInterval meetingTime = new TimeInterval();
        meetingTime.from = "09:00";
        meetingTime.to = "10:00";
        weeklyRanges.monday = new TimeInterval[] { meetingTime };

        meetingTime = new TimeInterval();
        meetingTime.from = "10:00";
        meetingTime.to = "15:00";
        weeklyRanges.friday = new TimeInterval[] { meetingTime };

        schedule.weeklyRanges = weeklyRanges;
        parameters.schedule = schedule;
        parameters.callHandlingAction = "TakeMessagesOnly";

        var response =  rc.restapi().account().extension().answeringrule().post(parameters);
        System.out.println(JSON.toJSONString(response));
        }
    }
}
```

```ruby tab="Ruby"
require 'ringcentral'

$rc = RingCentral.new( 'client_id', 'client_secret', 'server_url')
$rc.authorize( username:  'username', extension: 'extension_number', password:  'password')

params = {
    enabled: true,
    type: 'Custom',
    name: 'My weekly meetings',
    schedule: {
      weeklyRanges: {
        monday: [{ from: "09:00", to: "10:00" }],
        friday: [{ from: "10:00", to: "15:00" }]
      }
    },
    callHandlingAction: "TakeMessagesOnly",
}
resp = rc.post('/restapi/v1.0/account/~/extension/~/answering-rule', payload: params)

puts resp.body
```

Upon successful API call completion, the response contains the id (`ruleId`) and other information of the newly created rule.

```json hl_lines="3", linenums="1"
{
  "uri": "https://platform.ringcentral.com/restapi/v1.0/account/178002314/extension/178009114/answering-rule/227207004",
  "id": "227207004",
  "type": "Custom",
  "name": "My weekly meetings",
  ...
}
```

### List User Answering Rules

To get a list of all user answering rules for an extension, make a GET request to the following endpoint:

`/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule`

Required permission(s): ReadExtensions

Upon successful API call completion, the response contains a list of all existing user answering rules (including the default rules).
```json hl_lines="6 13", linenums="1"
{
  "uri": "https://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/answering-rule?page=1&perPage=100",
  "records": [
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/answering-rule/33333333",
      "id": "33333333",
      "type": "Custom",
      "name": "My Custom Rule 1",
      "enabled": true
    },
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/answering-rule/business-hours-rule",
      "id": "business-hours-rule",
      "type": "BusinessHours",
      "enabled": true
    }
  ],
  "paging": {...},
  "navigation": {...}
}
```

### Fetch a Single User Answering Rule

To fetch the details associated with an individual user answering rule, make a GET request to the following endpoint, where `[ruleId]` is the ID of an existing rule:

`/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule/[ruleId]`

!!! note "Notes"
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

Required permission(s): ReadExtensions

Upon successful API call completion, the response contains detailed information of a rule.

```json
{
    "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/answering-rule/business-hours-rule",
    "id": "business-hours-rule",
    "type": "BusinessHours",
    "enabled": true,
    "schedule": {
        "ref": "BusinessHours"
    },
    "callHandlingAction": "ForwardCalls",
    "forwarding": {
        "notifyMySoftPhones": true,
        "notifyAdminSoftPhones": false,
        "softPhonesRingCount": 1,
        "ringingMode": "Sequentially",
        "rules": [
            {
                "index": 1,
                "ringCount": 4,
                "forwardingNumbers": [
                    {
                        "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/forwarding-number/33333333",
                        "id": "33333333",
                        "phoneNumber": "+16505551212",
                        "label": "My Cisco SPA-303 Desk Phone"
                    }
                ]
            },
            {
                "index": 2,
                "ringCount": 8,
                "forwardingNumbers": [
                    {
                        "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/forwarding-number/44444444",
                        "id": "44444444",
                        "phoneNumber": "+4155551212",
                        "label": "Home"
                    }
                ]
            },
            {
                "index": 3,
                "ringCount": 12,
                "forwardingNumbers": [
                    {
                        "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222/forwarding-number/55555555",
                        "id": "55555555",
                        "phoneNumber": "+12125551212",
                        "label": "Mobile"
                    }
                ]
            }
        ]
    },
    "greetings": [
        {
            "type": "Voicemail",
            "prompt": {
                "id": "0",
                "type": "message",
                "name": "No One Available"
            }
        },
        {
            "type": "Introductory"
        },
        {
            "type": "AudioWhileConnecting",
            "prompt": {
                "id": "6",
                "type": "music",
                "name": "Acoustic"
            }
        },
        {
            "type": "ConnectingMessage",
            "prompt": {
                "id": "3",
                "type": "message",
                "name": "Forward hold 1"
            }
        }
    ],
    "screening": "Never",
    "voicemail": {
        "enabled": true,
        "recipient": {
            "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/extension/22222222",
            "id": 22222222
        }
    }
}
```

### Update a User Answering Rule

To update a user answering rule specify only the parameter values which need to be updated. Then make a PUT request to the following endpoint, where `[ruleId]` is the ID of an existing rule:

`/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule/[ruleId]`

!!! note "Notes"
    A valid `ruleId` can be retrieved using the API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

Required permission(s): EditExtensions

### Delete a User Answering Rule

To delete a user answering rule, make a DELETE request to the following endpoint, where the `ruleId` is the id of an existing rule.

`/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule/[ruleId]`

Required permission(s): EditExtensions

**Sample Response**

```json
{
  "callHandlingAction":"TakeMessagesOnly",
  "enabled":true,
  "forwarding":{
    "mobileTimeout":false,
    "notifyAdminSoftPhones":false,
    "notifyMySoftPhones":true,
    "ringingMode":"Sequentially",
    "softPhonesRingCount":1
    },
  "greetings":[
    {
      "preset":
      {
        "id":"65792",
        "name":"Default",
        "uri":"https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting/65792"
      },
      "type":"Voicemail"
    },{
      "preset":
      {
        "id":"66301",
        "name":"None",
        "uri":"https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting/66301"
      },
      "type":"Introductory"
    },{
      "preset":
      {
        "id":"66310",
        "name":"Acoustic",
        "uri":"https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting/66310"
      },
      "type":"ConnectingAudio"
    },{
      "preset":
      {
        "id":"66560",
        "name":"Default",
        "uri":"https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting/66560"
      },
      "type":"Announcement"
    },{
      "preset":
      {
        "id":"66816",
        "name":"Default",
        "uri":"https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting/66816"
      },
      "type":"Unavailable"
    },{
      "preset":
      {
        "id":"68867",
        "name":"Default",
        "uri":"https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting/68867"
      },
      "type":"ConnectingMessage"
    }],
  "id":"227258004",
  "name":"My weekly meetings",
  "schedule":
  {
    "weeklyRanges":
    {
      "friday":[{"from":"10:00","to":"15:00"}],
      "monday":[{"from":"09:00","to":"10:00"}]
    }
  },
  "screening":"Off",
  "type":"Custom",
  "uri":"https://platform.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004/answering-rule/227258004",
  "voicemail":
  {
    "enabled":true,
    "recipient":
    {
      "id":"178009004",
      "uri":"https://platform.ringcentral.com/restapi/v1.0/account/178009004/extension/178009004"
    }
  }
}
```
