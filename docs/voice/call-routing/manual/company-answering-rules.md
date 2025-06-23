# Company Call Handling

Company call handling is a set of configurations that determine how incoming calls to a company phone number are routed and managed. These configurations can be tailored for different scenarios to ensure efficient call distribution and a consistent caller experience.

<img class="img-fluid" src="../../../../img/company-callhandling.png" style="max-width:1000px;">

Company call handling rules can be defined separately based on the following conditions:

- Business Hours rule – Defines how calls are managed during the company’s regular operating hours.
- After Hours rule – Applies when the business is closed (if business hours are not set to 24/7).
- Custom Schedules and Conditions rule  – Allows for special rules based on specific criteria, such as caller ID, called number, or custom time schedules (e.g., holidays or special events).

If a company custom rule is configured and enabled, any incoming call directly to a company phone number will first be evaluated against the conditions defined in that rule. If all the conditions are met, the call will be routed according to the dispatching settings specified in the rule.

When multiple custom rules are active, the system will evaluate each rule in order. The first rule whose conditions match will determine how the call is handled. If none of the active custom rules match the incoming call, the system will fall back to evaluating the call against the Business Hours or After Hours rule, depending on the current date and time.

Company call handling rule can be set to route incoming calls to the following destinations:

- Company greeting
- IVR menu
- A specific user extension
- A call queue extension
- Voicemail - Must be a Message-only extension
- Announcement - Must be an Announcement-only extension
- Shared line - Must be a share line extension
- Limited extension - Must be a limited extension
- Site

## Update Company Business Hour and After Hour Call Handling Rules

By default, the system automatically creates a Business Hours rule and, if business hours are not set to 24/7, an After Hours rule. These rules are assigned the IDs `business-hours-rule` and `after-hours-rule`, respectively.

Developers can only update these rules configurations by making a PUT request to the following API endpoint, replacing [ruleId] with the appropriate rule identifier:

`/restapi/v1.0/account/~/answering-rule/[ruleId]`

## Creating a Company Custom Call Handling Rule

Developers can create a custom company call handling rule and set the following triggers:

* `callers`: a list of callers' phone numbers or contact names
    * `callerId`:
    * `name`:
* `calledNumbers`:  a list of recipients' phone numbers
    * `phoneNumber`: a phone number belonging to the user/extension
* `schedule`: week day and time or time ranges or business hours and after hours parameters
    * `weeklyRanges`: week day and time ranges
    * `ranges`: date and time ranges
    * `ref`: "BusinessHours" or "AfterHours". Business hours can be set using the [Business Hours API Reference](https://developers.ringcentral.com/api-reference/Business-Hours/updateUserBusinessHours)

Be mindful of the following when creating a company custom answering rule:

* Provide a meaningful name for the rule using the `name` parameter.
* Set the `type` parameter as "Custom."
* Set the `enabled` parameter to True if the rule needs to be in effect immediately. Otherwise, set it to False.
* Specify one or more conditions (see below).
* Specify the action to take using the `callHandlingAction` field (see table below).
* Specify the `extension` and `greetings` parameters. [More details](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/createCompanyAnsweringRule)

Finally, make a POST request to the following endpoint:

`/restapi/v1.0/account/~/answering-rule`

### Call Handling Actions

| Action | Description |
|-|-|
| `Operator` | Play company greeting and forward to an operator extension. |
| `Disconnect` | Play back company greeting then hangup. |
| `Bypass` | Skip company greeting and forward to a selected extension. |


## Sample code

### Create a Company Custom Answering Rule

The following code sample shows how to create a company custom answering rule that will route all incoming calls to the company phone numbers to an announcement-only extension during the New Year 2026 holiday.

You can retrieve an announcement-only extension Id by calling [this API](https://developers.ringcentral.com/api-reference/Extensions/listExtensions) with the query parameter `type=Announcement` and choose the Id of the extension that incoming calls needs to be routed to.

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/code-snippets-headers/header.js !}
    {!> code-samples/voice/code-snippets/create-company-answering-rule.js [ln:10-]!}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/code-snippets/create-company-answering-rule.py !}
    {!> code-samples/voice/code-snippets-headers/footer.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/voice/code-snippets/create-company-answering-rule.php [ln:2-]!}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/code-snippets/create-company-answering-rule.rb !}
    {!> code-samples/voice/code-snippets-headers/footer.rb !}
    ```

Upon successful API call completion, the response contains the id (`ruleId`) and other information of the newly created rule.

```json hl_lines="3", linenums="1"
{
  "uri": "https://platform.ringcentral.com/restapi/v1.0/account/178009114/answering-rule/227207004",
  "id": "227207004",
  "type": "Custom",
  "name": "New Year Holiday",
  ...
}
```

### List Company Answering Rules

To list all company answering rules make a GET request to the following endpoint:

`/restapi/v1.0/account/~/answering-rule`

Required permission(s): ReadAccounts

Upon successful API call completion, the response contains a list of all existing answering rules (including the default rules).

```json hl_lines="6 13"
{
  "uri": "https://platform.ringcentral.com/restapi/v1.0/account/11111111/answering-rule?page=1&perPage=100",
  "records": [
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/11111111/answering-rule/33333333",
      "id": "33333333",
      "type": "Custom",
      "name": "Company Custom Rule 1",
      "enabled": true,
    },
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/11111111/answering-rule/business-hours-rule",
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

`/restapi/v1.0/account/~/answering-rule/[ruleId]`

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

`/restapi/v1.0/account/~/answering-rule/[ruleId]`

!!! note "Hints"
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The `ruleId` of the default Business Hours and After Hours rule is `business-hours-rule` and `after-hours-rule`, respectively.

### Delete a Company Answering Rule

To delete a company answering rule, make a DELETE request to the following endpoint, where the `ruleId` is the id of an existing rule.

`/restapi/v1.0/account/~/answering-rule/[ruleId]`

!!! note
    A valid `ruleId` can be retrieved using the previous API to read all user answering rules.

    The default Business Hours and After Hours rule cannot be deleted!
