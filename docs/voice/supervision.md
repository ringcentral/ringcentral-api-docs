# Call supervision, monitoring and streaming

[RingCentral Call Monitoring](https://www.ringcentral.com/office/features/call-monitoring/overview) allows a person to receive a real-time audio stream so they can listen in on a call. The primary use case is a supervisor wishing to monitor and provide feedback on an agent's performance.

The Call Supervise API allows a developer to connect to an active phone call and subscribe to an audio stream programatically. Some use cases for this API include:

* To provide a real-time transcription of a call.
* To use NLP and AI to assist agents in helping resolve cases faster.

Partners today have used this API to provide RingCentral customers with call assistants that provide their agents with real-time suggestions to help provide customers with rapid and accurate recommendations. This scenario is visualized below.

<img class="img-fluid" src="../../img/supervisionapi_v3.png" style="max-width:600px;">

## Current Call Supervise API Capabilities

* One supervisor can supervise multiple active calls at the same time.
* An active call can be supervised only by one supervisor at a time.
* A supervisor can only supervise an active call on one device.
* A supervisor can supervise:
	- All call parties on one audio stream.
	- Each call party on a separate audio stream.

## Setup and Manage Call Monitoring Groups

Due to the sensitive nature of call monitoring, permissions to be monitored and to monitor others must be specifically given to extensions within an account. To manage these permissions, you must first create a Call Monitoring Group, and then add users/extensions to that group designating:

* What extensions/agents can be monitored
* What extensions/supervisors can monitor others

There are 2 options to create and manage call monitoring groups:

1. Use the [Admin Console](https://service.ringcentral.com). Follow the [creating call monitoring groups steps](https://support.ringcentral.com/article-v2/Creating-Call-Monitoring-Groups.html?brand=RC_US&product=RingCentral_MVP&language=en_US)
2. Use the [Call Monitoring API](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/createCallMonitoringGroup).

### Create and manage call monitoring groups

This set of APIs allows you to programmatically create, modify or delete a call monitoring group.

| API Endpoint | Description |
|-|-|
| [`/restapi/v1.0/account/~/call-monitoring-groups`](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/createCallMonitoringGroup) | Create an empty call monitoring group. This endpoint will return a unique `groupId`, which can be used in other endpoints that required the group Id. |
| [`/restapi/v1.0/account/~/call-monitoring-groups/{groupId}/bulk-assign`](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/updateCallMonitoringGroupList) | Add, update and remove group members from a call monitoring group identified by the `groupId`. |
| [`/restapi/v1.0/account/~/call-monitoring-groups/{groupId}`](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/updateCallMonitoringGroup) | Update a call monitoring group name. |
| [`/restapi/v1.0/account/~/call-monitoring-groups/{groupId}`](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/deleteCallMonitoringGroup) | Delete a call monitoring group identified by the `groupId`. |

The process of a call monitoring group creation using APIs consists of 2 steps.

1. Create a call monitoring group, where you specify the group name and get back the newly created group id.
2. Add group members with permissions to the group identified by the `groupId` returned by the creation API in step 1.

To create a list of group members to be added to a call monitoring group, you need to specify the extension id and the permissions of each member as a supervisor `Monitoring` or as an agent `Monitored` (remember that a member can be both as a supervisor and as an agent).

You can call the [company extensions API](https://developers.ringcentral.com/api-reference/Extensions/listExtensions) to read the extensions and grab the extension id of an extension that you want to be a member of the call monitoring group.

The example below shows you how to create a new call monitoring group and add a list of members to the group. It creates a list of members by reading the company user extensions and add all admin users as supervisors and other users as agents. In reality, you can decide the size of your call monitoring groups and define supervisors and agents based on your own logic.

#### Sample codes

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use the app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/code-snippets-headers/header.js !}
    {!> code-samples/voice/code-snippets/create-update-call-monitoring-group.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/voice/code-snippets/create-update-call-monitoring-group.py !}
    {!> code-samples/voice/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/voice/code-snippets/create-update-call-monitoring-group.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/code-snippets/create-update-call-monitoring-group.rb !}
    {!> code-samples/voice/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/voice/code-snippets/create-update-call-monitoring-group.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/voice/code-snippets/create-update-call-monitoring-group.java !}
    ```

### Read call monitoring groups and group members

These APIs allows you to query all call monitoring groups under your RingCentral account and read the members of a particular call monitoring group. You can identify the agents and the supervisors by checking the permissions of each member as `Monitored` or `Monitoring` permission, respectively.

| API Endpoint | Description |
|-|-|
| [`/restapi/v1.0/account/~/call-monitoring-groups`](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/listCallMonitoringGroups) | List all created call monitoring groups. This endpoint returns just the group names and group ids. |
| [`/restapi/v1.0/account/~/call-monitoring-groups/{groupId}/members`](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/listCallMonitoringGroupMembers) | List members of a call monitoring group identified by the `groupId`. |

A call supervision application should use these APIs to detect the supervisors (monitoring extensions) and the agents (monitored extensions) and use the id of a supervisor to detect a supervisor device and use the id of the agents to fetch agents' active calls.

The example blow shows you how to read all call monitoring groups under an account and list all the members of each group.

#### Sample codes

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use the app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/code-snippets-headers/header.js !}
    {!> code-samples/voice/code-snippets/call-monitoring-group.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/voice/code-snippets/call-monitoring-group.py !}
    {!> code-samples/voice/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/voice/code-snippets/call-monitoring-group.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/code-snippets/call-monitoring-group.rb !}
    {!> code-samples/voice/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/voice/code-snippets/call-monitoring-group.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/voice/code-snippets/call-monitoring-group.java !}
    ```

## Using the Supervision API
Once a Call Monitoring group has been configured, you can use one of the Call Supervision APIs below to supervise phone calls:

* [Supervise Call Session](https://developers.ringcentral.com/api-reference/Call-Control/superviseCallSession): This method allows a supervisor to listen to both caller and callee parties from a single audio stream. Thus, if you feed the audio data to a real-time transcription you will not be able to identify the speakers. But if you want to save the audio to a file, this will be simple as you can just write the audio data to a file.
* [Supervise Call Party](https://developers.ringcentral.com/api-reference/Call-Control/superviseCallParty): This method allows a supervisor to decide which call party to supervise. If you want to listen to both call parties from different audio streams, you will need to call the API twice with a correct party Id. Eventually, you will get 2 separate audio streams. Thus, you can feed the audio data to a real-time transcription per audio channel and this will help you to identify the speakers precisely. However, if you want to save both audio streams to a single file, you must implement extra code to merge two audio channels into one channel, or combine separate audio streams into a single multichannel before writing the audio data to a file.

#### Path Parameters

| Parameter | Description |
|-|-|
| `telephonySessionId` | The unique telephony session id of an active call. |
| `partyId` | The unique id of a call party. This path parameter is required for the Supervise Call Party API. |

Jump to this [section](#how-to-get-a-call-telephony-session-id-and-party-ids) for how to detect the `telephonySessionId` and the `partyId` of an active call.

#### Required Body Parameters
| Parameter | Description |
|-|-|
| `mode` | Currently, the only supported mode is `Listen`. |
| `supervisorDeviceId` | The device Id of the supervisor's phone device. |
| `agentExtensionId` | The extension id of the agent whose call you can monitor. Jump to this [section](#read-call-monitoring-groups-and-group-members). |

#### How to find a supervisor device Id

Provided that you have setup a phone device for a supervisor extension using the [account admin portal](https://service.devtest.ringcentral.com). You can learn how to [setup a third-party device for the RingCentral account](https://support.ringcentral.com/s/article/4966?language=en_US).

To retrieve the supervisor's devices, authorize your app with the supervisor login credentials and call the [List Extension Devices](https://developers.ringcentral.com/api-reference/Devices/listExtensionDevices) API. Parse the device info object under the `records` list and grab the device id of a device you want to use for the call supervision.

!!! Notes
	* The device status must be "Online" in order to use it!
	* Currently, the device Ids of the RC (Desktop and Web based) app and a WebRTC phone are dynamic and thus, they can not be detected by the API above!

```json hl_lines="5"
{
"records": [
		{
		   "uri":"https://platform.ringcentral.com/restapi/v1.0/account/80964xxxx/device/60727004",
		   "id":"60727004",
		   "type":"SoftPhone",
		   "sku":"DV-1",
		   "name":"Softphone - Digital Line",
		   "serial":"LMRC8531",
		   "computerName":"LMRC8531",
		   "status":"Online",
		   "extension":{
		      "uri":"https://platform.ringcentral.com/restapi/v1.0/account/80964xxxx/extension/80964xxxx",
		      "id":80964xxxx,
		      "extensionNumber":"102"
		   }
		},
		{ ... }
	]
}
```

If you want to build your own soft phone using the RingCentral soft phone SDK, jump to this [section](#create-a-soft-phone-and-obtain-its-device-id).

#### How to get a call telephony session Id and party Ids

You will need the `telephonySessionId` and the `partyId` (in case of supervising a call party) of an active call. There are several methods to detect user extensions' active calls.

* Call the [List User Active Calls](https://developers.ringcentral.com/api-reference/Call-Log/listExtensionActiveCalls) API.
* Call the [List Company Active Calls](https://developers.ringcentral.com/api-reference/Call-Log/listCompanyActiveCalls) API.
* Subscribe for the [Presence Events Notifications](https://developers.ringcentral.com/api-reference/Presence-Events) with the filter `detailedTelephonyState=true`.
* Subscribe for the [Telephony Session Events Notifications](https://developers.ringcentral.com/api-reference/Telephony-Events).

Out of all the methods mentioned above, the most effective way to detect active calls in real-time is to use the Telephony Session Events Notifications method. This method not only helps you effectively detect active calls of all monitored extensions specified in the call monitoring groups, but it also gives the call status that tells you when you can start to supervise an active call.

To avoid receiving redundant telephony events for user extensions that are not under the "Can be monitored" list of a call monitoring group, you should subscribe for telephony session events for just the user extensions specified in the call monitoring group configurations. Attempting to make supervision calls for users you do not have the permission to supervise will result in errors.

The APIs listed above may not give you the other call party `partyId`. Thus, if you intend to supervise all call parties using the [Supervise Call Party API](https://developers.ringcentral.com/api-reference/Call-Control/superviseCallParty), you will need both caller's and callee's `partyId`. In that case, you can call the [Get Call Session Status API](https://developers.ringcentral.com/api-reference/Call-Control/readCallSessionStatus) to get each call party status and the `partyId`.

### Call the Supervise Call Session API

Assume that an agent has an active call and the `supervisorDeviceId` (e.g. the device id of the RingCentral soft-phone or a desk phone) and the `agentExtensionId` have been detected, the following example shows how to grab the call's `telephonySessionId` and call the supervise API to supervise a call session.

#### Sample codes

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use the app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/code-snippets-headers/header.js !}
    {!> code-samples/voice/code-snippets/call-supervision.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/voice/code-snippets/call-supervision.py !}
    {!> code-samples/voice/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/voice/code-snippets/call-supervision.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/code-snippets/call-supervision.rb !}
    {!> code-samples/voice/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/voice/code-snippets/call-supervision.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/voice/code-snippets/call-supervision.java !}
    ```

### Build you own soft-phone device

You can build your own supervisor SIP phone, which will receive the call streaming audio data. Currently, we provide three soft-phone SDKs that help you to build your own SIP phone.

- [RingCentral Softphone SDK for TypeScript](https://github.com/ringcentral/ringcentral-softphone-ts)
- [RingCentral Softphone SDK for .NET](https://github.com/ringcentral/RingCentral.Softphone.Net)
- [RingCentral Softphone SDK for JavaScript](https://github.com/ringcentral/ringcentral-softphone-js)

Follow the instructions on each project to install the SDK and copy the sample code to implement your app.

!!! note "FCC Compliance"
    If you intend to save the audio stream, please make sure you comply with the FCC guidelines by letting the customer know that the calls will be monitored. The following [video](https://vimeo.com/326948521) demonstrates a working example of the Supervision API using the concepts described here.

### Additional Resources

* Consult the [Call Supervision Demo/Sample App](https://github.com/tylerlong/ringcentral-call-supervise-demo) for an end-to-end example app that also allows you to listen to the live audio stream, as well as saving the audio to a local file.
* Read the [Automatically Supervise Your Call Agents](https://medium.com/ringcentral-developers/automatically-supervise-your-call-agents-78c0cd7caf7f) article.
* Read the [Build Real-Time Phone Conversation Analytics](https://medium.com/ringcentral-developers/build-a-real-time-phone-conversation-analytics-455f1d7f0e23) article.
