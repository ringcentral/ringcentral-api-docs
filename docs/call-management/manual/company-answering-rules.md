# Company Answering Rules

Company Answering Rules APIs can be used to create and manage call routing logics for IVR menus. An incoming call can be automatically re-routed to another device or phone number based on a preset rule. A rule is a set of conditions which will be evaluated, when there is an incoming call, for making a decision to re-route the call.

The conditions can be any of the following criteria:

* Schedule: such as company business hours, after hours or specific times of the day.
* Caller's numbers: incoming calls from the specified caller(s)
* Callee's numbers: incoming calls to selected number(s)

The call handling can be any of the following actions:

* Operator: play company greeting and forward to an operator extension.
* Disconnect: play back company greeting then hangup.
* Bypass: bypass company greeting to forward to a selected extension.

An example of a simple use case is when there is an incoming call to the main company number after the business hours, you may want to play the company greeting message reminding the caller of your company business hours, asking the caller to call back again during business hours, then terminate the call.

An advanced answering rule can be created with multiple conditions based on time of day, date range, incoming caller ID and called number to offer powerful call management capabilities.

<img class="img-fluid" src="../../../img/answering_rule_flow.png">

There are 3 types of rules:

| Rule Type | Purpose |
|-----|------|
| Business Hours Rule | If active, incoming calls during defined business hours will be evaluated based on conditions defined in this rule. |
| After Hours Rule | If active, incoming calls after business hours will be evaluated based on conditions defined in this rule. |
| Custom Rule | Custom rules for special routing during holidays or specific times of the day (e.g. lunch break) or for special callers/callees. |
|||

!!! Important
    * Company Answering Rules can be accessed/managed only by admin users!

    * Each account has 2 default answering rules for business hours and after business hours. The default rules can be read and updated with new schedule. They cannot be used with callers' or callees' conditions.

    * The default After Hours rule exists only if the Company Business Hours is set different than 24 hours.

    * An answering rule can be turned on or off by changing the `enabled` parameter to True or False, respectively.

Answering rules are identified by internal rule Ids. The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively. Custom rules' ids are long numbers as a string e.g. `"33333333"`

## Create a Company Custom Answering Rule

To create a company custom answering rule:

* Specify the `type` parameter as "Custom" and the `name` parameter with a meaning full name.
* Specify the `enabled` parameter as True if the rule needs to be in effect immediately. Otherwise, set it to False.
* Specify one or more conditions:
    - `callers`: a list of callers' phone number or contact name
        - `callerId`:
        - `name`:
    - `calledNumbers`:  a list of callees' phone number
        - `phoneNumber`: a phone number belong to the extension
    - `schedule`: week day and time or time ranges or business hours and after hours parameters
        - `weeklyRanges`: week day and time ranges
        - `ranges`: date and time ranges
        - `ref`: "BusinessHours" or "AfterHours". Business hours can be set using the [Business Hours API Reference](https://developers.ringcentral.com/api-reference/Business-Hours/updateUserBusinessHours)
* Specify the `callHandlingAction` call handling action
    - Operator (default)
    - Disconnect
    - Bypass
* Specify the `extension` and `greetings` parameters. [More details](https://developers.ringcentral.com/api-reference/Rule-Management/createCompanyAnsweringRule)
* Make a POST request to `/restapi/v1.0/account/{accountId}/answering-rule` endpoint.

Required permission(s): EditAccounts

### Sample code to create a company custom answering rule

The following code sample shows how to create a company custom answering rule, which will re-route all incoming calls to a voice mailbox during a company business hours then disconnect.

```javascript tab="JavaScript"
var SDK = require('ringcentral')

var rcsdk = new RC( {server: "server_url", appKey: "client_id", appSecret: "client_secret"} );
var platform = rcsdk.platform();

platform.login( {username: "username", password: "password", extension: "extension_number"} )
    .then(function(resp) {
        create_company_custome_answering_rule()
    });
}

function create_company_custome_answering_rule() {
  var params = {
    enabled: true,
    type: "Custom",
    name: "Company off time",
    callHandlingAction: "Disconnect"
  }

  platform.post('/account/~/answering-rule', params)
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
    'type': 'AfterHours',
    'name': "Company off time",
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
  "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009114/extension/178009114/answering-rule/227207004",
  "id": "227207004",
  "type": "Custom",
  "name": "My weekly meetings",
  ...
}
```

## Read Company Answering Rules

To read all company answering rules:

* Make a GET request to the `/restapi/v1.0/account/{accountId}/answering-rule` endpoint.

Required permission(s): ReadAccounts

Upon successful API call completion, the response contains a list of all existing answering rules (including the default rules).

```json hl_lines="6 13", linenums="1"
{
  "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/answering-rule?page=1&perPage=100",
  "records": [
    {
      "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/answering-rule/33333333",
      "id": "33333333",
      "type": "Custom",
      "name": "Company Custom Rule 1",
      "enabled": true,
    },
    {
      "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/answering-rule/business-hours-rule",
      "id": "business-hours-rule",
      "type": "BusinessHours",
      "enabled": true
    }
  ],
  "paging": {...},
  "navigation": {...}
}
```

## Read a Company Answering Rule

To read a company answering rule:

* Make a GET request to the `/restapi/v1.0/account/{accountId}/answering-rule/[ruleId]` endpoint, where the `ruleId` is the id of an existing rule.

!!! Hints
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

Required permission(s): ReadAccounts

Upon successful API call completion, the response contain detailed information of a rule.
```json
{
    "uri": "http://platform.ringcentral.com/restapi/v1.0/account/11111111/answering-rule/business-hours-rule",
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

## Update a Company Answering Rule

To update a company answering rule:

* Specify parameters' values which need to be updated.
* Make a PUT request to the `/restapi/v1.0/account/{accountId}/answering-rule/[ruleId]` endpoint, where the `ruleId` is the id of an existing rule.

!!! Hints
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

Required permission(s): EditAccounts

## Delete a Company Answering Rule

To delete a company answering rule:

* Make a DELETE request to the `/restapi/v1.0/account/{accountId}/answering-rule/[ruleId]` endpoint, where the `ruleId` is the id of an existing rule.

!!! Hints
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

Required permission(s): EditAccounts
