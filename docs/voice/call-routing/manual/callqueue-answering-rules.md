# Call Queue Call Handling

Call queue call handling is a set of configurations that determine how incoming calls to a call queue are routed and managed. These configurations can be tailored for different scenarios to ensure efficient call distribution and a consistent caller experience.

<img class="img-fluid" src="../../../../img/callqueue-callhandling.png">

Call queue call handling rules can be defined separately based on the following conditions:

- Business Hours rule – Defines how calls are managed during the preset operating hours.
- After Hours rule – Applies when the business is closed (if business hours are not set to 24/7).
- Custom Schedules and Conditions rule  – Allows for special rules based on specific criteria, such as caller ID, called number, or custom time schedules (e.g., holidays or special events).

If a call queue has a custom rule that is configured and enabled, any incoming call to the queue will first be evaluated against the conditions defined in that rule. If all the conditions are met, the call will be routed according to the dispatching settings specified in the rule.

When multiple custom rules are active, the system will evaluate each rule in order. The first rule whose conditions match will determine how the call is handled. If none of the active custom rules match the incoming call, the system will fall back to evaluating the call against the Business Hours or After Hours rule, depending on the current date and time.

Call queue call handling configurations are set differently for different types of rules.

## Business Hours rule

The Business Hours rule defines how incoming calls are handled during the organization's regular working hours. This rule ensures calls are routed to the available members (agents) when they are expected to be on duty. This rule typically aligns with the operating hours of the company or a specific branch office, helping to maintain a consistent and responsive customer experience.

A call queue business hours schedule can be read by using the following API:

GET [/restapi/v1.0/account/~/extension/[CallQueueExtensionId]/business-hours](https://developers.ringcentral.com/api-reference/Business-Hours/readUserBusinessHours)

By default, the business hours schedule is set to 24/7. To change the business hours schedule, call the following API with appropriate `schedule` params.

PUT [/restapi/v1.0/account/~/extension/[CallQueueExtensionId]/business-hours](https://developers.ringcentral.com/api-reference/Business-Hours/updateUserBusinessHours)

The Business Hours call handling configurations are complex. They include a set of configurations for greeting a caller, ringing its members and other call queue features such as the waiting time, agent time out and the forwarding actions when the incoming call is not answered.

To read the call queue business hours rule, call the following API:

GET [/restapi/v1.0/account/~/extension/[CallQueueExtensionId]/answering-rule/business-hours-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/readAnsweringRule)

To set the call queue business hours rule, call the following API with appropriate parameters:

PUT [/restapi/v1.0/account/~/extension/[CallQueueExtensionId]/answering-rule/business-hours-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/updateAnsweringRule)

#### Greeting configurations

Greeting configurations define how a caller is greeted and informed while they are calling and waiting in a queue.

You can set a [standard greeting](https://developers.ringcentral.com/api-reference/Greetings/listStandardGreetings) or a custom greeting message for the following types:

|API params|Description|
|||
|"Introductory"|Welcome greeting - Callers will hear a recorded greeting before being connected to a group member.|
|"HoldMusic"|Hold music - Callers will hear music whenever you put a call on hold.|
|"ConnectingAudio"|Waiting in queue music - Callers will hear the selected music whenever the connection takes more than a moment to complete. |
|"InterruptPrompt"|Wait messages - Callers will hear this message before any updates on wait time or queue position are provided.|
|"Unavailable"|When the queue is full - Callers will hear this message to advice callers of heavy call volume and disconnect.|
|"Voicemail"|Voicemail greeting - Callers will hear this message if the forwarding setting is set to forward the call to the voicemail.|

For example if you want to set a custom welcome greeting, specify the body params as shown below (assumed that you have created a [custom greeting](https://developers.ringcentral.com/api-reference/Greetings/createCustomUserGreeting) and have the greeting id "XXXXXXXXX"):

```javascript
  let bodyParam = {
    "greetings":[
        {
          "type": "Introductory",
          "custom": {
            "id": "XXXXXXXXX"
          }
        }
      ]
  }
```

#### Ringing configurations

<img class="img-fluid" src="../../../../img/cq-ringing-config.png">

Ringing configurations define how a call queue distributes incoming calls to its members. There are three available call distribution modes:

  - Simultaneous
  - Fixed Order
  - Longest Idle

These settings can be set via the following API parameters:

|API params|Description|
|||
|`queue.transferMode`="Rotating" |Longest Idle – The call is directed to the member who has been idle (i.e., available without taking a call) for the longest period.|
|`queue.transferMode`="FixedOrder" |Fixed Order – Calls are routed to members one at a time in a predefined sequence. If the first member doesn’t answer within the set timeout, the system tries the next member in the list, and so on.|
|`queue.transferMode`="Simultaneous" |Simultaneous – All available members' phones ring at the same time. The first member to answer handles the call.|

If the transfer mode is set to "FixedOrder", the following parameters must be specified

|API params|Value|Description|
||||
|`queue.fixedOrderAgents`|[<br>{"extension" : {"id" : "xxxxx"},"index" : 1}<br>{"extension" : {"id" : "yyyyy"},"index" : 2}<br>...<br>]|List of call queue members with their extension id and the order index|

#### Waiting configurations

Waiting configurations refer to the settings that define how a call queue handles incoming calls while callers are waiting. These parameters help manage call flow and ensure a smooth caller experience. Key settings include:

  - Maximum number of callers allowed in the queue - Limits how many callers can wait in the queue at the same time.
  - Maximum wait time in queue - Specifies how long a caller can remain in the queue before being redirected (e.g., to voicemail or another extension).
  - Number of rings before trying the next member - Determines how many rings occur before the system attempts to connect the call to another available member, each ring equals to 5 seconds and maximum is 60 rings.
  - Wrap-up time - Sets a brief period after each call during which the agent is unavailable, allowing time for post-call tasks before taking another call.

|API params|Description|
|||
|`queue.maxCallers`|Maximum number of callers allowed in the queue.|
|`queue.holdTime`|Maximum wait time (in seconds) in queue.|
|`queue.agentTimeout`|Number of rings before trying the next member. This param is ignored if the ringing configuration is set to "Simultaneous" |
|`queue.wrapUpTime`|After-call wrap-up time (in seconds)|

#### Business Hours Forwarding configurations

Forwarding configurations define the actions after a call was ringing but cannot be answered. There are 3 conditions where a call queue can be set to forward an unanswered call.

1. When the queue is full
    - Send to Voicemail - Can be the call queue's own voicemail or another extension's voicemail
    - Play Announcement - Play a prerecorded message
    - Forward to extension - Any type of extension (IVR menu, call queue, user etc.)
    - Forward to external number (Unconditional Forwarding) - Any phone number

2. When the maximum wait time is reached
    - Send to Voicemail - Can be the call queue's own voicemail or another extension's voicemail
    - Forward to extension - Any type of extension (IVR menu, call queue, user etc.)
    - Forward to external number (Unconditional Forwarding) - Any phone number

3. When no one answers
    - WaitPrimaryMembers - Keep waiting for the queue's members to answer the incoming call.
    - WaitPrimaryAndOverflowMembers - Rings members from the overflow group (other call queue) if overflow group was selected.
    - Send to Voicemail - Can be the call queue's own voicemail or another extension's voicemail.
    - Forward to extension - Any type of extension (IVR menu, call queue, user etc.).
    - Forward to external number (Unconditional Forwarding) - Any phone number.

Each of the actions above is set separately to forward the call to a designated destination if one of the conditions is met.

|API params|Description|Possible Value for Forward Destination|
||||
|`queue.maxCallersAction`|When the queue is full|"Announcement"<br>"Voicemail"<br>"TransferToExtension"<br>"UnconditionalForwarding"|
|`queue.holdTimeExpirationAction`|When the maximum wait time is reached|"Voicemail"<br>"TransferToExtension"<br>"UnconditionalForwarding"|
|`queue.noAnswerAction`|When no one answers|"WaitPrimaryMembers"<br>"WaitPrimaryAndOverflowMembers"<br>"Voicemail"<br>"TransferToExtension"<br>"UnconditionalForwarding"|

To set the target for the "TransferToExtension" destination, specify the parameters of the `queue.transfer` object as show in the example below:

```javascript
  let bodyParams = {
      "queue": {
        "transfer" : [
          {
            "extension" : { "id" : "EXTENSION-ID" },
            "action" : "MaxCallers"
          },{
            "extension" : { "id" : "EXTENSION-ID" },
            "action" : "HoldTimeExpiration"
          }
        ]
      }
  }
```

To set the target for the "UnconditionalForwarding" destination, specify the parameters of the `queue.unconditionalForwarding` object as shown in the example below:

```javascript
  let bodyParams = {
      "queue": {
        "unconditionalForwarding": [
          {
            "phoneNumber" : "PHONE-NUMBER",
            "action" : "MaxCallers"
          }, {
            "phoneNumber" : "PHONE-NUMBER",
            "action" : "HoldTimeExpiration"
          }
        ]
      }
  }
```

To set the target for the "Voicemail" destination, specify the parameters of the `voicemail` object as shown in the example below:

```javascript
  let bodyParams = {
        "voicemail" : {
          "enabled" : true,
          "recipient" : {
            "id" : "EXTENSION-ID" // Identifier of the extension that receive the voicemail. Defaulted to the call queue extension!
          }
        }
  }
```

To set the target for the "PlayAnnouncement" destination for the `maxCallersAction` action, specify the parameters of the `greetings` object as shown in the example below:

```javascript
let bodyParam = {
  "greetings":[
      {
        "type": "Unavailable",
        "custom": {
          "id": "XXXXXXXXX"
        }
      }
    ]
}
```

<br>The `callHandlingAction` parameter of the Business Hours rule is always set to "AgentQueue"

## After Hours rule

<img class="img-fluid" src="../../../../img/cq-after-hours-rule.png">

If business hours are set for a call queue, the system will automatically create an after-hours schedule, which is the inverse of the defined business hours.

The After Hours rule manages call behavior outside of regular business hours. When the office is closed, this rule reroutes calls to voicemail, plays a recorded message, or forwards them to an alternate destination such as another call queue, an extension or a mobile number. It ensures that callers are still acknowledged and provided with relevant information or next steps.

To read the call queue after hours rule, call the following API:

GET [/restapi/v1.0/account/~/extension/[CallQueueExtensionId]/answering-rule/after-hours-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/readAnsweringRule)

To set the call queue after hours rule, call the following API with appropriate parameters:

PUT [/restapi/v1.0/account/~/extension/[CallQueueExtensionId]/answering-rule/after-hours-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/updateAnsweringRule)

#### After Hours Greeting configurations

After hours greeting configurations define how a caller is informed while they are sent to a voicemail or to be terminated.

You can set a [standard greeting](https://developers.ringcentral.com/api-reference/Greetings/listStandardGreetings) or a [custom greeting](https://developers.ringcentral.com/api-reference/Greetings/createCustomUserGreeting) message for the following types:

|API params|Description|
|||
|"Voicemail"|Voicemail greeting - Callers will hear this message when their call is forwarded to voicemail.|
|"Announcement"|Announcement message - Callers will hear this message when their call is about to be disconnected or terminated.|

To set the voicemail greeting message, set the the parameters of the `greetings` object as shown in the example below (assumed that you have created a [custom greeting](https://developers.ringcentral.com/api-reference/Greetings/createCustomUserGreeting) and have the greeting id "XXXXXXXXX"):

```javascript
  let bodyParams = {
        "greetings" : [ {
            "type" : "Voicemail",
            "custom" : {
              "id" : "XXXXXXXXX"
            }
        }
  }
```  

To set the announcement message, set the the parameters of the `greetings` object as shown in the example below (assumed that you have created a [custom greeting](https://developers.ringcentral.com/api-reference/Greetings/createCustomUserGreeting) and have the greeting id "XXXXXXXXX"):

```javascript
  let bodyParams = {
        "greetings" : [ {
            "type" : "Announcement",
            "custom" : {
              "id" : "XXXXXXXXX"
            }
        }
  }
```

#### After Hours Forwarding Configurations

The After Hours rule can be configured to forward incoming calls to the following destinations:

- Send to Voicemail - Can be the call queue's own voicemail or another extension's voicemail
- Play Announcement - Play a prerecorded message
- Forward to extension - Any type of extension (IVR menu, call queue, user)
- Forward to external number (Unconditional Forwarding) - Any phone number


The `callHandlingAction` parameter of the after hours rule can be set to one of the following values:

|Param Value|Description|
|||
|"TakeMessageOnly"|Sent to Voicemail|
|"PlayAnnouncementOnly"|Play Announcement|
|"TransferToExtension"|Forward to an extension|
|"UnconditionalForwarding"|Forward to external number|

To set the target for the "Voicemail" destination, specify the parameters of the `voicemail` object as shown in the example below:

```javascript
let bodyParams = {
      callHandlingAction: "TakeMessageOnly",
      voicemail : {
        enabled: true,
        recipient: {
          id : "EXTENSION-ID" // Identifier of the extension that receive the voicemail. Defaulted to the call queue extension!
        }
      }
    }
```

To customize the announcement message for the "PlayAnnouncementOnly" destination, set the the parameters of the `greetings` object as shown in the example below (assumed that you have created a [custom greeting](https://developers.ringcentral.com/api-reference/Greetings/createCustomUserGreeting) and have the greeting id "XXXXXXXXX"):

```javascript
let bodyParam = {
  "greetings":[
      {
        "type": "Unavailable",
        "custom": {
          "id": "XXXXXXXXX"
        }
      }
    ]
}
```

To set the target for the "TransferToExtension" destination, specify the parameters of the `transfer` object as show in the example below:

```javascript
let bodyParams = {
      callHandlingAction: "TransferToExtension",
      transfer : {
          extension : { id : "EXTENSION-ID" }
      }
    }
```

To set the target for the "UnconditionalForwarding" destination, specify the parameters of the `unconditionalForwarding` object as shown in the example below:

```javascript
let bodyParams = {
      callHandlingAction: "UnconditionalForwarding",
      unconditionalForwarding: { phoneNumber : "PHONE-NUMBER" }
    }
```

## Custom rule

<img class="img-fluid" src="../../../../img/cq-custom-rule.png">

Custom rules allow for flexible and tailored call handling based on specific criteria, such as caller ID, called number, or custom time schedules (e.g., holidays or special events). These rules can override both business and after-hours rules to support unique scheduling or routing needs.

Each custom rule can have its own configurations to manage incoming calls. This includes the trigger conditions, greeting messages, ringing and forwarding configurations.

To create a call queue custom rule, call the following API with appropriate parameters:

POST [/restapi/v1.0/account/~/extension/[CallQueueExtensionId]/answering-rule](https://developers.ringcentral.com/api-reference/Call-Handling-Rules/createAnsweringRule)

```javascript
let bodyParam = {
  name: "Custom rule 1",
  type: "Custom",
  ...
}
```

#### Trigger configurations

A custom rule can be set with one or more trigger conditions below:

* `callers`: A list of callers' phone numbers or contact names.
    * `callerId`: Caller's phone number
    * `name`: Caller's contact names
* `calledNumbers`:  A list of recipients' phone numbers. It is not typically applied to call queues unless the queue has multiple direct numbers.
    * `phoneNumber`: A phone number belonging to the call queue.
* `schedule`: Specified time based schedules.
    * `weeklyRanges`: Repeatedly for certain week day and time ranges. For example every weekdays during lunch time.
    * `ranges`: A period of time specified by date and time range. For example a public holiday.
    * `ref`: Match the "BusinessHours" or "AfterHours".

The following example sets a custom rule to be triggered by the caller numbers "14132223333" and "15093334444" during business hours:

```javascript
let bodyParams = {
      callers: [
        { callerId: "14132223333" }, { callerId: "15093334444" }, { name: "John Smith" }
      ],
      schedule: { ref: "BusinessHours" }
  }
```
<br>
A custom rule is executed only in case all its conditions match the incoming call. This means that the condition evaluation is an AND operator.

A custom rule can have one of the following actions. The action is specified by the `callHandlingAction` parameter:

|Param value|Action & Description|
|||
|"AgentQueue"|Ring call queue members - Ring the call queue's members.|
|"TakeMessageOnly"|Send to Voicemail - Play a voicemail greeting and send the caller to voicemail.|
|"PlayAnnouncementOnly"|Play Announcement - Play a prerecorded message and terminate the call.|
|"TransferToExtension"|Forward to extension - Forward the caller to an extension (IVR menu, site, call queue, user etc.).|
|"UnconditionalForwarding"|Forward to external number (Unconditional Forwarding) - Forward the caller to an external phone number.|

If the `callHandlingAction` is set to "AgentQueue", the following configurations can be specified to define how a call queue distributes incoming calls to its members.

**Ringing configurations** [See ringing setting instructions for Business Hours](#ringing-configurations)

**Waiting configurations** [See waiting setting instructions for Business Hours](#waiting-configurations)

!!! note
    For a custom rule, if the incoming call is ringing and no one answers, the call handling action of the Business Hours rule will be used!

**Forwarding configurations** [See forwarding setting instructions for Business Hours](#business-hours-forwarding-configurations)

If the `callHandlingAction` is set to other actions, the configurations can be specified the same way as for the After Hours rule.

**Greeting configurations** [See greeting setting instructions for After Hours](#after-hours-greeting-configurations)

**Forwarding configurations** [See forwarding setting instructions for After Hours](#after-hours-forwarding-configurations)

## Creating a Call queue Custom Call Handling Rule

Be mindful of the following when constructing a request to create a custom call handling rule:

* Provide a meaningful name for the rule using the `name` parameter.
* Set the `type` parameter as "Custom."
* Set the `enabled` parameter to True if the rule needs to be in effect immediately. Otherwise, set it to False.
* Specify one or more trigger conditions.
* Specify the action to take using the `callHandlingAction` parameter.
* Customize the `greetings` messages with appropriate context.

Finally, make a POST request to the following endpoint:

`/restapi/v1.0/account/~/extension/[CallQueueExtensionId]/answering-rule`

## Example use case of a call queue call handling custom rule

**Use Case:** Prioritized Call Handling for VIP Customers

Let’s assume the call queue Business Hours rule is configured with the following settings:

- Ring members in a fixed order.
- The maximum caller wait time is set to 2 minutes.
- If the queue is full or the wait time limit is reached, calls are routed to voicemail.

This setup works well for general callers. However, we require enhanced call handling for VIP customers who contact us through this call queue number. Specifically, we want VIP calls to receive faster attention and avoid being sent to voicemail.

To address this, we aim to implement a custom rule that identifies VIP callers (e.g., based on their phone numbers) and modifies the default behavior as follows:

- Route their calls to available members immediately, possibly using simultaneous ringing instead of fixed order or the longest idle member.
- The maximum caller wait time is set to 20 seconds.
- If the queue is full or the wait time limit is reached, forward the VIP call to a supervisor rather than sending it to voicemail.

This ensures that VIP customers receive prioritized service, reduced wait times, and a more personalized support experience.

The following example demonstrates how to implement a call queue's custom rule for the above use case.

Assume that we have exported a list of 5 VIP customers from our company’s CRM into the following contact list:

```javascript
let vipCustomerContacts = [
		{
      phoneNumber: "+16501111111",
      name: "Kristina Grant"
		},{
      phoneNumber: "+16502222222",
      name: "Sandra Bell"
		},{
      phoneNumber: "+16503333333",
      name: "David Peterson"
		},{
      phoneNumber: "+16504444444",
      name: "Lena Shanon"
		},{
      phoneNumber: "+16505555555",
      name: "Christine Lee"
		}
	]
```

<br>Assume that the call queue extension id and the supervisor extension id are known so we don't need to implement extra code to get the required values. Otherwise, you can call these APIs to get a call queue's extension id and the supervisor's extension id.

* [List call queues](https://developers.ringcentral.com/api-reference/Call-Queues/listCallQueues)
* [List extensions](https://developers.ringcentral.com/api-reference/Extensions/listExtensions)

!!! note "Running the code"
    If you have tried the RingOut quick start, you can just copy the function `create_callqueue_custom_answering_rule(callqueueExtId, supervisorExtId)` and add them to the quick start project then call it from the quick start project. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/code-snippets-headers/header.js !}
    {!> code-samples/voice/code-snippets/callqueue-answering-rule.js [ln:10-]!}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/code-snippets/callqueue-answering-rule.py !}
    {!> code-samples/voice/code-snippets-headers/footer.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/voice/code-snippets/callqueue-answering-rule.php [ln:2-]!}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/code-snippets/callqueue-answering-rule.rb !}
    {!> code-samples/voice/code-snippets-headers/footer.rb !}
    ```
<br>Upon successful API call completion, the response contains the id (`ruleId`) and other information of the newly created rule.

```json hl_lines="3", linenums="1"
{
  "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/...",
  "id" : "9421686016",
  "type" : "Custom",
  "name" : "VIP Support Rule",
  "enabled" : true,
  "schedule" : {
    "ref" : "BusinessHours"
  },
  "callers" : [ {
    "callerId" : "16501111111",
    "name" : "Kristina Grant"
  }, {
    "callerId" : "16502222222",
    "name" : "Sandra Bell"
  }, {
    "callerId" : "16503333333",
    "name" : "David Peterson"
  }, {
    "callerId" : "16504444444",
    "name" : "Lena Shanon"
  }, {
    "callerId" : "16505555555",
    "name" : "Christine Lee"
  } ],
  ...
  "callHandlingAction" : "AgentQueue",
  "queue" : {
    "transferMode" : "Simultaneous",
    ...
    "holdAudioInterruptionMode" : "Never",
    "agentTimeout" : 20,
    "wrapUpTime" : 15,
    "holdTime" : 20,
    "maxCallers" : 10,
    "maxCallersAction" : "TransferToExtension",
    "holdTimeExpirationAction" : "TransferToExtension",
    "transfer" : [ {
      "extension" : {
        "id" : "62576913016",
        "extensionNumber" : "22907",
        "name" : "Tom Brown"
      },
      "action" : "HoldTimeExpiration"
    }, {
      "extension" : {
        "id" : "62576913016",
        "extensionNumber" : "22907",
        "name" : "Tom Brown"
      },
      "action" : "MaxCallers"
    } ]
  },
  ...
}
```
