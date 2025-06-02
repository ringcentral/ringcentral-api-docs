# User Call Handling APIs Migration Guidance

The enhancement of user call handling features in RingCentral RingEX has led to significant changes in the corresponding APIs. As part of this upgrade, we have introduced a new set of user extension call handling APIs (referred to as V2) to replace the legacy version (v1.0). This marks a major transition aimed at providing more robust and flexible call management capabilities.

## Who will get impacted and what will be broken?

Eventually, all RingEX customer accounts will be upgraded to support the new user call handling features. As a result, any RingCentral account which is upgraded to the new user call handling capabilities, will not be able to read, create or change their user call handling rules by using the v1.0 extension call handling API set.

Thus, if your company built applications which call the v1.0 extension call handling APIs, such applications will stop working if your RingCentral account is upgraded to support the new user call handling features.

To detect programmatically if an account is upgraded with the new user call handling features or not, you can call the following API to read the account features and parse the response to check the highlighted feature below:

```http
GET ‘/restapi/v1.0/account/~/extension/~/features?featureId=NewCallHandlingAndForwarding’
```

### Response from an old account

```json
{
  "id": "NewCallHandlingAndForwarding",
  "available": true,
  "params": [
    {
      "name": "isNewBackendAvailable",
      "value": "false"
    }
   ]
}
```

### Response from an upgraded account

```json
{
  "id": "NewCallHandlingAndForwarding",
  "available": true,
  "params": [
    {
      "name": "isNewBackendAvailable",
      "value": "true"
    }
   ]
}
```

## What are the new features and new APIs?

The new user call handling rules are grouped into 2 different sets of rules, the “state-based” rules, and the “interaction” rules which are also known as the custom rules.

There are 5 call handling states and they are explained below:

|State name|State Enum|Description|Existence|
|||||
|Forward all calls|`forward-all-calls`|Rules for forwarding all incoming calls|Default|
|Do not disturb|`dnd`|Rules for handling incoming calls during `DoNotDisturb` presence status|Default|
|Agent|`agent`|Rules for handling incoming calls via call queue(s)|If the user is a member of a call queue(s)|
|Work Hours|`work-hours`|Rules for handling incoming calls during business hours|Default|
|After Hours|`after-hours`|Rules for handling incoming calls during after hours|If the Work Hours schedule is defined different than 24/7|

## How to manage user call handling states via API?

The extension call handling states can be read by calling the new API

GET `/restapi/v2/accounts/~/extensions/[extensionId]/comm-handling/states`

The API returns a list of call handling states with detailed call handling settings of each state.

The extension call handling state-based rules can be updated by calling the new API

PATCH `/restapi/v2/accounts/~/extensions/[extensionId]/comm-handling/states`

There is no equivalent v1.0 API as there is no call handling state service in the old call handling service!

## How to manage user call handling state-based rules via API?

The user extension call handling state-based rules can be read by calling the new API

GET `/restapi/v2/accounts/~/extensions/[extensionId]/comm-handling/voice/state-rules`

The API returns a list of the user's call handling states with detailed call handling settings for each state rule.

It replaces the v1.0 API below

GET `/restapi/v1.0/account/~/extension/[extensionId]/answering-rule`

In comparison to the v1.0 endpoint, the v2 endpoint returns 3 new call handling rules, the “Do not disturb” rule, the “Agent” rule and the“Forward all calls” rule. But it does not return the custom rules (if any) in the response.

To read or update a particular state-based rule, call this API with the state Id in the API path

GET/PATCH `/restapi/v2/accounts/~/extensions/[extId]/comm-handling/voice/state-rules/[stateId]`

Note that there is no public v1.0 API to read and update the extension “forward-all-calls” rule. If you have access to the internal v1.0 /forward-all-calls API, replace it with the v2 API as shown in the table below:

|Version|V1.0 API|V2 API|
||||
|Base path|`/restapi/v1.0/account/~/extension/~`|`/restapi/v2/accounts/~/extensions/~/comm-handling/voice`|
|List rules|GET `/answering-rule`|GET `/state-rules`|
|Read ForwardAllCalls rule|GET `/forward-all-calls` _*_|GET `/state-rules/forward-all-calls`|
|Update ForwardAllCalls rule|PATCH `/forward-all-calls` _*_|PATCH `/state-rules/forward-all-calls`|
|Read DnD rule|N/A|GET `/state-rules/dnd`|
|Update DnD rule|N/A|PATCH `/state-rules/dnd`|
|Read Agent rule|N/A|GET `/state-rules/agent`|
|Update Agent rule|N/A|PATCH `/state-rules/agent`|
|Read Business Hours rule|GET `/answering-rule/business-hours-rule`|GET `/state-rules/work-hours`|
|Update Business Hours rule|PUT `/answering-rule/business-hours-rule`|PATCH `/state-rules/work-hours`|
|Read After Hours rule|GET `/answering-rule/after-hours-rule`|GET `/state-rules/after-hours`|
|Update After Hours rule|PUT `/answering-rule/after-hours-rule`|PATCH `/state-rules/after-hours`|

_*_ internal API

## How to manage user call handling interaction rules via API?

Extension call handling interaction rules are the new terms of extension custom answering rules. To list user extension's custom call handling rules, call the new API below:

GET `/restapi/v2/accounts/~/extensions/[extId]/comm-handling/voice/interaction-rules`

This is equivalent to the v1.0 API GET `/answering-rule?type=Custom`

To read a particular custom rule, call the API below with the custom rule Id in the path

GET `/restapi/v2/accounts/~/extensions/[extId]/comm-handling/voice/interaction-rules/[ruleId]`

|Version|V1.0 API|V2 API|
||||
|Base path|`/restapi/v1.0/account/~/extension/~`|/restapi/v2/accounts/~/extensions/~/comm-handling/voice|
|List custom rules|GET `/answering-rule?type=Custom`|GET `/interaction-rules`|
|Read a custom rule|GET `/answering-rule/[ruleId]`|GET `/interaction-rules/[ruleId]`|
|Create a custom rule|POST `/answering-rule`|POST `/interaction-rules`|
|Update a custom rule|PUT `/answering-rule/[ruleId]`|PATCH `/interaction-rules/[ruleId]`|
|Delete a custom rule|DELETE `/answering-rule/[ruleId]`|DELETE `/interaction-rules/[ruleId]`|

### Forward All Calls Rule

Both old and new extension call handling supports the “ForwardAllCalls” rule and both has the same call handling actions:

- Send to voicemail
- Forward the call
  - Forward to a phone number/personal contact
  - Forward to an extension/call queue
- Play announcement

There is no public API to read and update the ForwardAllCalls rule for v1.0 API.

The call handling V2 API allows you to read and update the extension Forward-All-Calls rule. Below are the highlighted API response fields that define the selected call handling actions:

### Do Not Disturb Rule

Only new extension call handling supports the “DnD” rule. The DnD rule has the same call handling actions as the ForwardAllCalls actions:

- Send to voicemail
- Forward the call
    - Forward to a phone number/personal contact
    - Forward to an extension/call queue
- Play announcement

Note: The old call handling does not have a dedicated rule for DnD, the system uses the setting value of the user presence ‘dndStatus’.

The call handling V2 API allows you to read and update the extension DnD rule. Below are the highlighted API response fields that define the selected call handling actions:

### Work Hours Rule

Both old and new extension call handling supports the “WorkHours” rule and both have the same call handling actions.

Work Hours actions:

  - Ring in order
  - Ring all together
  - If no one answers
    - Send to voicemail
    - Forward the call
        - Forward to a phone number/personal contact
        - Forward to an extension/call queue
    - Play announcement

### After Hours Rule
Both old and new extension call handling supports the “AfterHours” rule and both have the same call handling actions.

After Hours actions:

  - Ring devices
    - Ring in order
    - Ring all together
    - If no one answers
        - Send to voicemail
        - Forward the call
            - Forward to a phone number/personal contact
            - Forward to an extension/call queue
        - Play announcement
  - Terminating action
    - Send to voicemail
    - Forward the call
        - Forward to a phone number/personal contact
        - Forward to an extension/call queue
    - Play announcement

#### Ringing actions V1.0 vs. V2:

|Ringing Action|V1.0 API|V2 API|
||||
|Ring in order|"callHandlingAction":"ForwardCalls",<br>"forwarding": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"ringingMode":"Sequentially",<br>&nbsp;&nbsp;&nbsp;&nbsp;...|"dispatching": {<br> &nbsp;&nbsp;&nbsp;&nbsp;"type":"RingInOrder",<br>&nbsp;&nbsp;&nbsp;&nbsp;...|
|Ring all together|"callHandlingAction":"ForwardCalls",<br>"forwarding": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"ringingMode":"Simultaneously",<br>&nbsp;&nbsp;&nbsp;&nbsp;...|"dispatching" : {<br> &nbsp;&nbsp;&nbsp;&nbsp;"type":"RingAtOnce",<br>&nbsp;&nbsp;&nbsp;&nbsp;...|
|If no one answers||"dispatching":{<br>&nbsp;&nbsp;&nbsp;&nbsp;"type" : " TerminatingAction",<br>}|
|Send to voicemail|"voicemail":{<br>&nbsp;&nbsp;&nbsp;&nbsp;"enabled": true,<br>&nbsp;&nbsp;&nbsp;&nbsp;"recipient": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"uri": "https://…",<br>&nbsp;&nbsp;&nbsp;&nbsp;"id": 59586xx<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}|"actions" : [ {<br>&nbsp;&nbsp;&nbsp;&nbsp;"type" : "TerminatingAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;"effectiveTargetType" : "VoiceMailTerminatingTarget",|
|Forward the call<br>(to extension/call queue)|"missedCall":{<br>&nbsp;&nbsp;&nbsp;&nbsp;"actionType": "ConnectToExtension",<br>&nbsp;&nbsp;&nbsp;&nbsp;"extension": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"uri": "https://..",<br>&nbsp;&nbsp;&nbsp;&nbsp;"id": 59586xxxx<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}|"actions" : [ {<br>&nbsp;&nbsp;&nbsp;&nbsp;"type" : "TerminatingAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;"effectiveTargetType" : "ExtensionTerminatingTarget",|
|Forward the call<br>(to number/personal contact)|"missedCall":{<br>&nbsp;&nbsp;&nbsp;&nbsp;"actionType" : "ConnectToExternalNumber",<br>&nbsp;&nbsp;&nbsp;&nbsp;"externalNumber": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"phoneNumber" : "+1..."<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}|"actions" : [ {<br>&nbsp;&nbsp;&nbsp;&nbsp;"type" : "TerminatingAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;"effectiveTargetType" : "PhoneNumberTerminatingTarget",|
|Play announcement|"missedCall":{ <br>&nbsp;&nbsp;&nbsp;&nbsp;"actionType": "PlayGreetingAndDisconnect"<br>}|"actions" :[ {<br>&nbsp;&nbsp;&nbsp;&nbsp; "type" : "TerminatingAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;"effectiveTargetType" : "PlayAnnouncementTerminatingTarget",|

#### Terminating action V1.0 vs. V2

|Terminating Action|V1.0 API|V2 API|
||||
|Send to voicemail|"callHandlingAction" : "TakeMessagesOnly",|"dispatching": {<br>&nbsp;&nbsp;&nbsp;&nbsp; "type": "Terminate",<br>&nbsp;&nbsp;&nbsp;&nbsp;  "actions": [ {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "type": "TerminatingAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  "effectiveTargetType": "VoiceMailTerminatingTarget",|
|Forward the call<br>(to extension/call queue)|"callHandlingAction" : "TransferToExtension"|"dispatching": {<br>&nbsp;&nbsp;&nbsp;&nbsp;  "type": "Terminate",<br>&nbsp;&nbsp;&nbsp;&nbsp;  "actions": [ {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  "type": "TerminatingAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "effectiveTargetType": "ExtensionTerminatingTarget",|
|Forward the call<br>(to number/personal contact)|"callHandlingAction" : "UnconditionalForwarding"|"dispatching": {<br>&nbsp;&nbsp;&nbsp;&nbsp;  "type": "Terminate",<br>&nbsp;&nbsp;&nbsp;&nbsp;  "actions": [ {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  "type":"TerminatingAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "effectiveTargetType": "PhoneNumberTerminatingTarget",|
|Play announcement|"callHandlingAction" : "PlayAnnouncementOnly"|"dispatching": {<br>&nbsp;&nbsp;&nbsp;&nbsp;  "type": "Terminate",<br>&nbsp;&nbsp;&nbsp;&nbsp;  "actions": [ {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  "type": "TerminatingAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "effectiveTargetType": "PlayAnnouncementTerminatingTarget",|

#### Welcome greetings V1.0 vs. V2

|Greeting Type|V1.0 API Business Hours Rule response|V2 API Work Hours Rule response|
||||
|Response data object|"greetings" : [ … ]|"actions" : [ … ]|
|Greet caller with a message|{<br>&nbsp;&nbsp;&nbsp;&nbsp;"type" : "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp;"preset" : {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"uri" : "https://...",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id" : "66048",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name" :"Default"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp;  "type":"PlayWelcomePromptAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;  "greeting": {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    "effectiveGreetingType":"Custom",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"preset" : {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id" : "66048"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"custom" : {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id" : "1500358020"<br>&nbsp;&nbsp;&nbsp;&nbsp;    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;   "enabled" : true<br>&nbsp;&nbsp;&nbsp;&nbsp;}|
|Tell caller they're being connected|{<br>&nbsp;&nbsp;&nbsp;&nbsp;  "type": "ConnectingMessage",<br>&nbsp;&nbsp;&nbsp;&nbsp;  "preset" : {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"uri" : "https://...",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id" : "68867",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name" : "Default"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp; "type":"PlayConnectingMessageAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;  "greeting": {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"effectiveGreetingType":"Preset",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"preset" : {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id" : "68867"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    }<br>&nbsp;&nbsp;&nbsp;&nbsp;  },<br>&nbsp;&nbsp;&nbsp;&nbsp;  "enabled" : true<br>}|
|Play music while connecting|{<br>&nbsp;&nbsp;&nbsp;&nbsp;  "type":"ConnectingAudio",<br>&nbsp;&nbsp;&nbsp;&nbsp;  "preset": {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"uri": "https://...",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "66310",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name" : "Acoustic"<br>&nbsp;&nbsp;&nbsp;&nbsp;  }<br>}|{<br>&nbsp;&nbsp;&nbsp;&nbsp;  "type":"PlayConnectingPromptAction",<br>&nbsp;&nbsp;&nbsp;&nbsp;  "greeting" : {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"effectiveGreetingType" : "Preset",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"preset" : {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id" : "66310"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;  "enabled" : true<br>}|

## Create custom user greetings

There is no V2 API for managing custom greetings for extensions. However, to create a custom greeting in migrated accounts, the V1.0 greeting API can be used with slightly different body params. The “type” value and the “binary” field are unchanged.

|Rule|For old accounts|For migrated accounts|
||||
|API|POST  /restapi/v1.0/account/~/extension/~/greeting|POST  /restapi/v1.0/account/~/extension/~/greeting|
|Work Hours|bodyParams = {<br>&nbsp;&nbsp;&nbsp;&nbsp;  type: "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp;  answeringRule: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; id: "business-hours-rule"<br>&nbsp;&nbsp;&nbsp;&nbsp; }<br>}| bodyParams = {<br>&nbsp;&nbsp;&nbsp;&nbsp;  type: "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp; stateId: "5"<br>}<br>// Final change (not yet committed)<br>bodyParams = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stateId: "work-hours"<br>}|
|After Hours|bodyParams = {<br>&nbsp;&nbsp;&nbsp;&nbsp;  type: "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp;  answeringRule: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; id: "after-hours-rule"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}|bodyParams = {<br>&nbsp;&nbsp;&nbsp;&nbsp;  type: "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp;  stateId: "6"<br>}<br>// Final change (not yet committed)<br>bodyParams = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stateId: "after-hours"<br>}|
|Custom|bodyParams = {<br>&nbsp;&nbsp;&nbsp;&nbsp;  type: "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp;  answeringRule: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; id: "customRuleId"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}|bodyParams = {<br>&nbsp;&nbsp;&nbsp;&nbsp;  type: "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp;  peopleNumberRuleId: "customRuleId"<br>}<br>// Final change (not yet committed)<br>bodyParams = {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type: "Introductory",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;interactionRuleId: "ruleId"<br>}|

!!! important
    - The final change to the custom user greeting will be deployed around Q3 25!
    - The call queue and site’s greeting creation remains unchanged. This means that even after the account is migrated to CH&F V2, creating custom greetings for a CQ or a site still requires the v1.0 API!

You can create a user custom greeting without the associated answering rule and set the apply=false in the API path, then keep the greeting ID and update the state rule or the interaction rule using the new update state rule or the new update interaction rule API.

!!! note
    Note: This is not recommended as if you lose the greeting ID, there is no API to retrieve it later.

|Create Greeting Type|Update State Action Type/Target|
|||
|Introductory|PlayWelcomePromptAction|
|ConnectingMessage|PlayConnectingMessageAction|
|ConnectingAudio|PlayConnectingPromptAction|
|Voicemail|VoiceMailTerminatingTarget|
|Announcement|PlayAnnouncementTerminatingTarget|

## Examples

Create and assign a custom greeting directly using the `/greeting` endpoint

```Javascript
async function createExtensionCustomGreeting(){
    /* One of these types
        "Introductory"
        "Announcement"
        "ConnectingMessage"
        "ConnectingAudio"
        "Voicemail"
        "Unavailable"
        "HoldMusic"
        "TemplateGreeting"
    */
    let bodyParams = {
            type: "Announcement"
            stateId: 5 // OR
            //"peopleNumberRuleId": "12345"
     }

    var FormData = require('form-data');
    formData = new FormData();

    formData.append('json', new Buffer.from(JSON.stringify(bodyParams)),
       {
         filename: 'request.json',
         contentType: 'application/json'
        });
    formData.append('binary', require('fs').createReadStream('greeting.mp3'));
    var endpoint = '/restapi/v1.0/account/~/extension/~/greeting?apply=true'
    var resp = await platform.post(endpoint, formData)
    var jsonObj = await resp.json()
}
```

Create an unassociated custom greeting using the `/greeting` endpoint, and call the update state rule endpoint to set the greeting to the 'work-hours' rule

```Javascript
async function createExtensionCustomGreeting(){
    /* One of these types
        "Introductory"
        "Announcement"
        "ConnectingMessage"
        "ConnectingAudio"
        "Voicemail"
        "Unavailable"
        "HoldMusic"
        "TemplateGreeting"
    */
    let bodyParams = {
            type: "Announcement"
          }

    var FormData = require('form-data');
    formData = new FormData();

    formData.append('json', new Buffer.from(JSON.stringify(bodyParams)),
       {
         filename: 'request.json',
         contentType: 'application/json'
        });

    formData.append('binary', require('fs').createReadStream('greeting.mp3'));
     var endpoint = '/restapi/v1.0/account/~/extension/~/greeting?apply=false'
    var resp = await platform.post(endpoint, formData)
    var jsonObj = await resp.json()
    updateWorkHourStateRule(jsonObj.id)
}

async function updateWorkHourStateRule(greetingId){
  // The best way is to read the ‘work-hours’ state rule, then change (or add if it does not exist) the ‘PlayWelcomePromptAction’ ‘custom’ value!!!
  let bodyParams = {
      dispatching: {
        actions: [
          {
            type: "PlayWelcomePromptAction",
            greeting: {
                effectiveGreetingType: "Custom",
                preset: {
                  id: "66048"
                },
                custom: {
                  id: greetingId
                }
            },
            enabled: true
          },
    	    …
        ]
      }
    var endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours'

    const resp = await platform.patch(endpoint, bodyParams)
    var jsonObj = await resp.json()
    …
}
```

## How to manage user flipping numbers and forwarding numbers settings

In the new call handling and forwarding environment, flipping numbers and forwarding numbers are handled by separated new APIs. The old forwarding number handling API will be deprecated.

### Flipping numbers

There are 2 new APIs to read and update user flipping numbers. To list all user flipping numbers, call the following API:

GET `/restapi/v2/accounts/~/extensions/~/call-flip-numbers`

To add, update or delete a flipping number, call the following API with appropriate body params:

PUT `/restapi/v2/accounts/~/extensions/~/call-flip-numbers`

|API call|V1.0 API|V2 API|
||||
|Base Path|`/restapi/v1.0/account/~/extension/~`|`/restapi/v2/accounts/~/extensions/~`|
|Read|GET `/forwarding-number`|GET `/call-flip-numbers`|
|Create|POST `/forwarding-number`<br>|PUT `/call-flip-numbers`<br>// Add a new record to the `records` array|
|Update|PUT `/forwarding-number/[forwardingNumberId]`|PUT `/call-flip-numbers`<br>// Modify the updating record object(s) in the `records` array|
|Delete|DELETE `/forwarding-number/[forwardingNumberId]`|PUT `/call-flip-numbers`<br>// Remove a deleting record from the `records` array|

### Forwarding numbers

Forwarding numbers can be read or removed by using the following APIs:

|API call|V1.0 API|V2 API|
||||
|Base Path|`/restapi/v1.0/account/~/extension/~`|`/restapi/v2/accounts/~/extensions/~`|
|Read|GET `/forwarding-number`|GET `/comm-handling/voice/forwarding-targets`|
|Delete|DELETE `/forwarding-number/[forwardingNumberId]`|DELETE `/comm-handling/voice/forwarding-targets`|

!!! note
    Adding forwarding numbers or devices must be done via the user call handling API.
