# Company Answering Rules

Company Answering Rules can be used to create and manage the logic for routing calls through IVR menus, as well as routing calls to extensions that not directly associated with an individual user. For example, the following are all extension types for which Company Answering Rules would be appropriate:

* Call Queues
* Department Groups
* IVR Menu Extensions

If you are unfamiliar with answering rules, we recommend you read our [Answering Rules Overview](../answering-rules/).

## Creating a Company Custom Answering Rule

Be mindful of the following when constructing a request to create a user custom answering rule:

* Provide a meaningful name for the rule using the `name` parameter.
* Set the `type` parameter as "Custom."
* Set the `enabled` parameter to True if the rule needs to be in effect immediately. Otherwise, set it to False.
* Specify one or more conditions (see below).
* Specify the action to take using the `callHandlingAction` field (see table below).
* Specify the `extension` and `greetings` parameters. [More details](https://developers.ringcentral.com/api-reference/Rule-Management/createCompanyAnsweringRule)

Finally, make a POST request to the following endpoint:

`/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule`

### Call Handling Actions

| Action | Description |
|-|-|
| `Operator` | Play company greeting and forward to an operator extension. |
| `Disconnect` | Play back company greeting then hangup. |
| `Bypass` | Skip company greeting and forward to a selected extension. |

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

## Sample code

### Create a Company Custom Answering Rule

The following code sample shows how to create a company custom answering rule that will re-route all incoming calls to a voice mailbox during a company business hours, and then disconnect.

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/company-answering-rules.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/company-answering-rules.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/company-answering-rules.php !}
    ```

=== "C#"

    ```c#
    {!> code-samples/voice/company-answering-rules.cs !}
    ```
    
=== "Java"

    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/CreateCompanyAnsweringRule.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/company-answering-rules.rb !}
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

### List Company Answering Rules

To list all company answering rules make a GET request to the following endpoint:

`/restapi/v1.0/account/{accountId}/answering-rule`

Required permission(s): ReadAccounts

Upon successful API call completion, the response contains a list of all existing answering rules (including the default rules).

```json hl_lines="6 13"
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

### Fetch a Single Company Answering Rule

To fetch the details associated with an individual company answering rule, make a GET request to the following endpoint, where `[ruleId]` is the ID of an existing rule:

`/restapi/v1.0/account/{accountId}/answering-rule/[ruleId]`

!!! info "Hints"
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

### Update a Company Answering Rule

To update a company answering rule specify only the parameter values which need to be updated. Then make a PUT request to the following endpoint, where `[ruleId]` is the ID of an existing rule:

`/restapi/v1.0/account/{accountId}/answering-rule/[ruleId]`

!!! note "Hints"
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

Required permission(s): EditAccounts

### Delete a Company Answering Rule

To delete a company answering rule, make a DELETE request to the following endpoint, where the `ruleId` is the id of an existing rule.

`/restapi/v1.0/account/{accountId}/answering-rule/[ruleId]`

!!! note "Hints"
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

Required permission(s): EditAccounts
