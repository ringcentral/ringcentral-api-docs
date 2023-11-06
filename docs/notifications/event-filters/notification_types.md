# Notification Types
Notifications which the client wants to receive can be specified by the **event filters** which are set in the subscription request. The supported filters are described in detail below.



## Presence Events

#### Account Presence Event

*Since 1.0.26 (Release 8.2)*

Event filter `/restapi/v1.0/account/{accountId}/presence` enables notifications in case of change of presence information for any extension assigned to the current account.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

**Notification Payload Structure**

The client receives non-detailed presence notification payload as a JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | datetime | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Presence Event	 | Notification payload body |

**Presence Event**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `extensionId	` | string | Internal identifier of an extension |
| `telephonyStatus` | 'NoCall' or 'CallConnected' or 'Ringing' or 'OnHold' or 'ParkedCall' | Telephony presence status. Returned if telephony status is changed. See Telephony Status Values |
| `sequence` | integer | Order number of a notification to state the chronology |
| `presenceStatus` | 'Offline' or 'Busy' or 'Available' | Aggregated presence status, calculated from a number of sources |
| `userStatus` | 'Offline' or 'Busy' or 'Available' | User-defined presence status (as previously published by the user) |
| `meetingStatus` | 'Connected' or 'Disconnected' | Meetings presence status |
| `dndStatus` | 'TakeAllCalls' or 'DoNotAcceptAnyCalls' or 'DoNotAcceptDepartmentCalls' | Extended DnD (Do not Disturb) status |
| `allowSeeMyPresence` | boolean | If 'True' enables other extensions to see the extension presence status |
| `ringOnMonitoredCall` | boolean | If 'True' enables to ring extension phone, if any user monitored by this extension is ringing |
| `pickUpCallsOnHold` | boolean | If 'True' enables the extension user to pick up a monitored line on hold |

**Example**

```json
{
    "uuid": "045b81dc-9f73-4864-84de-08aa6324a7f5",
    "event": "/restapi/v1.0/account/~/extension/6610372004/presence",
    "timestamp": "2016-02-18T09:37:24.597Z",
    "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
    "ownerId": "6610372004",
    "body": {
      "extensionId": "6610372004",
      "telephonyStatus": "CallConnected",
      "sequence": 2698,
      "presenceStatus": "Busy",
      "userStatus": "Available",
      "meetingStatus": "Disconnected",
      "dndStatus": "TakeAllCalls",
      "allowSeeMyPresence": true,
      "ringOnMonitoredCall": false,
      "pickUpCallsOnHold": false
    }
  }
 ```

### Detailed Extension Presence Event

*Since 1.0.6 (Release 5.15)*

1. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence?detailedTelephonyState=true` enables detailed notifications in case of any change of extension presence information:

2. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line/presence?detailedTelephonyState=true` enables detailed notifications in case of changes of presence information for extensions monitored by the current extension.

3. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite/presence?detailedTelephonyState=true` enables detailed notifications if presence status of any extension included in favorites list of the current extension is changed.

Please note: If both simple presence and detailed presence event types are specified in getting subscription request, then the detailed presence notifications will be received.


**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

**Notification Payload Structure**

The client receives non-detailed presence notification payload as a JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Presence Event	 | Notification payload body |

**Detailed Presence Event**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |
| `telephonyStatus` | 'NoCall' or 'CallConnected' or 'Ringing' or 'OnHold' or 'ParkedCall' | Telephony presence status. Returned if telephony status is changed. See Telephony Status Values |
| `activeCalls` | Collection of Active Call Info | List of the latest 7 active calls on extension |
| `sequence` | integer | Order number of a notification to state the chronology |
| `presenceStatus` | 'Offline' or 'Busy' or 'Available' | Aggregated presence status, calculated from a number of sources |
| `userStatus` | 'Offline' or 'Busy' or 'Available' | User-defined presence status (as previously published by the user) |
| `meetingStatus` | 'Connected' or 'Disconnected' | Meetings presence status |
| `dndStatus` | 'TakeAllCalls' or 'DoNotAcceptAnyCalls' or 'DoNotAcceptDepartmentCalls' | Extended DnD (Do not Disturb) status |
| `allowSeeMyPresence` | boolean | If 'True' enables other extensions to see the extension presence status |
| `ringOnMonitoredCall` | boolean | If 'True' enables to ring extension phone, if any user monitored by this extension is ringing |
| `pickUpCallsOnHold` | boolean | If 'True' enables the extension user to pick up a monitored line on hold |
| `totalActiveCalls`| integer | Total number of active calls on extension at the present moment |

**Active Call Info**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a call  |
| `direction` | 'Inbound' or 'Outbound' |Call direction|
| `queueCall` | boolean | Identifies if a call belongs to the call queue |
| `from` | string | Phone number or extension number of a caller |
| `fromName` | string | Optional. Caller Name |
| `to` | string | Optional. Phone number or extension number of a callee |
| `toName` | string | Callee name |
| `startTime` | dateTime | Datetime of actual start of the call in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `telephonyStatus` | 'NoCall' or 'CallConnected' or 'Ringing' or 'OnHold' or 'ParkedCall' | Telephony call status. See Telephony Status Values for detailed status description |
| `terminationType` | 'final' | Type of call termination. Supported for calls in 'NoCall' status. Termination type 'intermediate', meaning the connection exists on one of the devices, is deprecated|
| `sessionId` | string | Internal identifier of a call session |
| `telephonySessionId` | string | Telephony identifier of call session  |
| `partyId` | string | Internal identifier of a call party |
| `onBehalfOf` | string | Extension ID of the call owner on whose behalf a call is performed |

**Example**

```json
 {
    "uuid": "045b81dc-9f73-4864-84de-08aa6324a7f5",
    "event": "/restapi/v1.0/account/~/extension/6610372004/presence?detailedTelephonyState=true",
    "timestamp": "2016-02-18T09:37:24.597Z",
    "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
    "ownerId": "6610372004",
    "body": {
      "extensionId": "6610372004",
      "telephonyStatus": "CallConnected",
      "activeCalls": [
        {
          "id": "39247ebfdc324e3b96d7519672aec3e4",
          "direction": "Inbound",
          "queueCall": true,
          "from": "+18775380038",
          "fromName": "John Wang",
          "to": "+18445810019",
          "telephonyStatus": "CallConnected",
          "startTime" : "2016-02-18T09:37:24.322Z",
          "sessionId": "17133704004",
          "partyId":"cs171843418296416309-2",
          "telephonySessionId":"Y3MxNjk4ODA5MTYxMzUyOTU5OUAxMC4zMi40NS44NA"
        },
         {
          "id": "39247ebfdc324e3b96d7519672aec3e5",
          "direction": "Outbound",
          "queueCall": false,
          "from": "+18776480025",
          "to": "+18445654321",
          "startTime" : "2016-02-18T09:37:24.322Z",
          "telephonyStatus": "NoCall",
          "sessionId": "17133804005",
          "partyId": "cs671843418296416309-2",
          "telephonySessionId": "Y3MxNjytruODA5MTYxMzUyOTU5OUAxMC4zMi40NS44NA"
        }
      ],
      "sequence": 2698,
      "presenceStatus": "Busy",
      "userStatus": "Available",
      "meetingStatus": "Disconnected",
      "dndStatus": "TakeAllCalls",
      "allowSeeMyPresence": true,
      "ringOnMonitoredCall": false,
      "pickUpCallsOnHold": false,
      "totalActiveCalls": 2
    }
  }
 ```

### Detailed Extension Presence with SIP Event

*Since 1.0.6 (Release 5.15)*

1. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence?detailedTelephonyState=true&sipData=true` enables detailed notifications with SIP information in case of any change of extension presence information:

2. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line/presence?detailedTelephonyState=true&sipData=true` enables detailed notifications with SIP information in case of changes of presence information for extensions monitored by the current extension.

3. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite/presence?detailedTelephonyState=true&sipData=true` enables detailed notifications with SIP information if presence status of any extension included in favorites list of the current extension is changed.

Please note: If you specify that `sipData=true` then `presence?detailedTelephonyState=true` also, as SIP data is a part of active calls section. If both detailed presence and detailed presence with SIP event types are specified in getting subscription request, then the detailed presence with SIP notifications will be returned.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

**Notification Payload Structure**

The client receives detailed presence with SIP notifications payload as a JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Detailed Presence with SIP Event | Notification payload body |

**Detailed Presence with SIP Event**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |
| `telephonyStatus` | 'NoCall' or 'CallConnected' or 'Ringing' or 'OnHold' or 'ParkedCall' | Telephony presence status. Returned if telephony status is changed. See Telephony Status Values |
| `activeCalls` | Collection of Active Call Info | Telephony presence status. Returned if telephony status is changed. See Telephony Status Values |
| `sequence` | integer | Order number of a notification to state the chronology |
| `presenceStatus` | 'Offline' or 'Busy' or 'Available' | Aggregated presence status, calculated from a number of sources |
| `userStatus` | 'Offline' or 'Busy' or 'Available' | User-defined presence status (as previously published by the user) |
| `meetingStatus` | 'Connected' or 'Disconnected' | Meetings presence status |
| `dndStatus` | 'TakeAllCalls' or 'DoNotAcceptAnyCalls' or 'DoNotAcceptDepartmentCalls' | Extended DnD (Do not Disturb) status |
| `allowSeeMyPresence` | boolean | If 'True' enables other extensions to see the extension presence status |
| `ringOnMonitoredCall` | boolean | If 'True' enables to ring extension phone, if any user monitored by this extension is ringing |
| `pickUpCallsOnHold` | boolean | If 'True' enables the extension user to pick up a monitored line on hold |
| `totalActiveCalls`| integer | Total number of active calls on extension at the present moment |

**Active Call Info**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a call  |
| `direction` | 'Inbound' or 'Outbound' |Call direction|
| `queueCall` | boolean | Identifies if a call belongs to the call queue |
| `from` | string | Phone number or extension number of a caller |
| `fromName` | string | Optional. Caller Name |
| `to` | string | Optional. Phone number or extension number of a callee |
| `toName` | string | Calee Name |
| `startTime` | dateTime | Datetime of actual start of the call in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `telephonyStatus` | 'NoCall' or 'CallConnected' or 'Ringing' or 'OnHold' or 'ParkedCall' | Telephony call status. See Telephony Status Values for detailed status description |
| `terminationType` | 'final' | Type of call termination. Supported for calls in 'NoCall' status. Termination type 'intermediate', meaning the connection exists on one of the devices, is deprecated|
| `sessionId` | string | Internal identifier of a call session |
| `sipData` | SIP Data | SIP connection settings |
| `telephonySessionId` | string | Telephony identifier of call session  |
| `partyId` | string | Internal identifier of a call party |
| `onBehalfOf` | string | Extension ID of the call owner on whose behalf a call is performed |

**SIP Data**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `toTag` | string | Recipient data |
| `fromTag` | string | Sender data |
| `remoteUri` | string | Remote address URL |
| `localUri` | string | Local address URL |

**Example**

```json
  {
    "uuid": "4956997212540532738",
    "event": "/restapi/v1.0/account/37439510/extension/297277020/presence?detailedTelephonyState=true&sipData=true",
    "timestamp": "2019-07-09T16:17:38.286Z",
    "subscriptionId": "dfbca25e-4e2b-4c60-aa8d-47a83716fe23",
    "ownerId": "297277020",
    "body": {
      "extensionId": "297277020",
      "telephonyStatus": "OnHold",
      "activeCalls": [
        {
          "id": "1nf2mhj51dp3asb3l0r5",
          "direction": "Outbound",
          "queueCall": true,
          "fromName": "Charlie Williams",
          "from": "+16508370072",
          "toName": "Alice Smith",
          "to": "4591",
          "telephonyStatus": "OnHold",
          "sipData": {
            "toTag": "7lcee2ho88",
            "fromTag": "10.14.20.199-5070-63fbd8da20314c",
            "remoteUri": "do-not-use-me-I-am-example",
            "localUri": "do-not-use-me-I-am-example"
          },
          "sessionId": "118139132021",
          "startTime": "2019-07-09T16:17:27.975Z",
          "partyId": "p-9cdb248614c94aa7ba68135f6c07b808-1",
          "telephonySessionId": "s-9cdb248614c94aa7ba68135f6c07b808"
        },
        {
          "id": "s-e1e9696d863742758a18654dcc22a2fd",
          "direction": "Inbound",
          "queueCall": false,
          "fromName": "Charlie Williams",
          "from": "66666",
          "toName": "Bob Brown",
          "to": "66666",
          "telephonyStatus": "Ringing",
          "sipData": {
            "toTag": "blf",
            "fromTag": "p-e1e9696d863742758a18654dcc22a2fd-2",
            "remoteUri": "do-not-use-me-I-am-example",
            "localUri": "do-not-use-me-I-am-example"
          },
          "sessionId": "118139217021",
          "startTime": "2019-07-09T16:17:37.705Z",
          "partyId": "p-e1e9696d863742758a18654dcc22a2fd-2",
          "telephonySessionId": "s-e1e9696d863742758a18654dcc22a2fd"
        }
      ],
      "sequence": 2013,
      "presenceStatus": "Busy",
      "userStatus": "Available",
      "dndStatus": "TakeAllCalls",
      "meetingStatus": "Disconnected",
      "allowSeeMyPresence": true,
      "ringOnMonitoredCall": true,
      "pickUpCallsOnHold": true,
      "totalActiveCalls": 2
    }
  }
```

### Extension Presence Event

*Since 1.0.6 (Release 5.15)*

1. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence` enables notifications in case of any change of non-detailed presence information:

2. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line/presence` enables notifications in case of changes of presence information for extensions monitored by the current extension.

3. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite/presence` enables notifications if presence status of any extension included in favorites list of the current extension is changed.


**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

**Notification Payload Structure**

The client receives non-detailed presence notification payload as a JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Presence Event	 | Notification payload body |

**Presence Event**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `extensionId	` | string | Internal identifier of an extension |
| `telephonyStatus` | 'NoCall' or 'CallConnected' or 'Ringing' or 'OnHold' or 'ParkedCall' | Telephony presence status. Returned if telephony status is changed. See Telephony Status Values |
| `sequence` | integer | Order number of a notification to state the chronology |
| `presenceStatus` | 'Offline' or 'Busy' or 'Available' | Aggregated presence status, calculated from a number of sources |
| `userStatus` | 'Offline' or 'Busy' or 'Available' | User-defined presence status (as previously published by the user) |
| `meetingStatus` | 'Connected' or 'Disconnected' | Meetings presence status |
| `dndStatus` | 'TakeAllCalls' or 'DoNotAcceptAnyCalls' or 'DoNotAcceptDepartmentCalls' | Extended DnD (Do not Disturb) status |
| `allowSeeMyPresence` | boolean | If 'True' enables other extensions to see the extension presence status |
| `sequence`| integer | Order number of a notification to state the chronology |
| `ringOnMonitoredCall` | boolean | If 'True' enables to ring extension phone, if any user monitored by this extension is ringing |
| `pickUpCallsOnHold` | boolean | If 'True' enables the extension user to pick up a monitored line on hold |


**Example**

```json
{
    "uuid": "045b81dc-9f73-4864-84de-08aa6324a7f5",
    "event": "/restapi/v1.0/account/~/extension/6610372004/presence",
    "timestamp": "2016-02-18T09:37:24.597Z",
    "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
    "ownerId": "6610372004",
    "body": {
      "extensionId": "6610372004",
      "telephonyStatus": "CallConnected",
      "sequence": 2698,
      "presenceStatus": "Busy",
      "userStatus": "Available",
      "meetingStatus": "Disconnected",
      "dndStatus": "TakeAllCalls",
      "allowSeeMyPresence": true,
      "ringOnMonitoredCall": false,
      "pickUpCallsOnHold": false
    }
  }
 ```

### Extension Presence Line Event

*Since 1.0.16 (Release 7.1)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line` enables notifications in case of change of presence of extension(s) monitored by the current extension.


**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

**Notification Payload Structure**

The client receives presence line notifications payload as a JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Presence Line Event | Notification payload body |

**Presence Line Event**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `extension` | Extension Info | Extension information |
| `sequence` | integer | Order number of a notification to state the chronology |

**Extension Info**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of an extension  |
| `id` | string | Internal identifier of a returned line  |

**Example**

```json
{
     "timestamp": "2014-04-29T13:23:12.468+0000",
     "uuid": "a295fa1f-af6a-4518-b333-acf091bdd7ea",
     "event": "/restapi/v1.0/account/~/extension/406149828004/presence/line",
     "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
     "ownerId": "406149828004",
     "body": {
        "extension":
            [{
            "id": "677628004765"
              },
             {
            "id": "3"
           }],

         "sequence": 2698
           }
  }
```

### Call Queue Member Presence Event

*Since 1.0.55 (Release 23.2)*

Event filter `/restapi/v1.0/account/{accountId}/call-queues/{groupId}/presence` enables notifications in case of any change of a presence status of a call queue member.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |


**Notification Payload Structure**

The client receives a call queue member presence notification payload as a JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Call Queue Member Presence Event  | Notification payload body |

**Call Queue Member Presence Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `member` | Call Queue Member Info | Information about a call queue member |
| `acceptCurrentQueueCalls` | boolean | Call queue member presence status |

**Call Queue Member Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a call queue member|


**Example**

```json

{ 
    "uuid":"ed1cf00c-0420-4bf5-a0ae-e659cc9f77e0",
    "event":"/restapi/v1.0/account/{accountId}/call-queues/{groupId}/presence",
    "timestamp": "2019-06-14T12:00:00.000Z",
    "subscriptionId":"3rtt23ryy-56665-t7r7-a0ae-748895yhhf94ujrr",
    "ownerId": "1500723004",
    "body":{
        "records": [
            {
                "member": {
                    "id": "411753183004"
                },
                "acceptCurrentQueueCalls": true
            },
            {
                "member": {
                    "id": "411753646416541"
                },
                "acceptCurrentQueueCalls": false
            }
        ]
    }
}
```

### Extension DND Status Event

*Since 1.0.46 (Release 21.1)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/dnd` enables notifications in case of `dndStatus` change of the current extension.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |


**Notification Payload Structure**

The client receives DND status change notification payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | DND Status Event  | Notification payload body |

**DND Status Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |
| `dndStatus` | 'TakeAllCalls' or 'DoNotAcceptAnyCalls' or 'DoNotAcceptDepartmentCalls' | Extended DnD (Do not Disturb) status |

**Example**

```json
{
    "uuid": "045b81dc-9f73-4864-84de-08aa6324a7f5",
    "event": "/restapi/v1.0/account/6610372004/extension/6610372004/presence/dnd",
    "timestamp": "2021-02-18T09:37:24.597Z",
    "ownerId": "6610372004",
    "body": {
      "extensionId": "6610372004",
      "dndStatus": "TakeAllCalls"
    }
  }

```

## Telephony Events

### Account Telephony Sessions Event

*Since 1.0.36 (Release 10.2)*

Event filter `/restapi/v1.0/account/{accountId}/telephony/sessions` enables notifications in case of change of session information for any extension assigned to the current account.

The client receives the detailed call notification payload as a JSON object.

**Required Permissions**

| Permission     | Description          |
|----------------|-----------------------|
| `CallControl` | Creating and managing telephony sessions |


**Query Parameters**

| Parameter     | Type | Description |
|---------------|------|-------------|
| `direction`   | 'Outbound' or 'Inbound' | Allows to send notifications only on call(s) with a specified direction |
| `missedCall`  | boolean | Allows to send notifications only on missed call(s) event |
| `phoneNumber` | string | Allows to send notifications only on call(s) to/from a certain phone number; e.164 format with '+' sign is supported |
| `sipData`     | boolean | Enables detailed notifications with SIP information |
| `statusCode`  | 'Setup' or  'Proceeding' or 'Answered' or 'Disconnected' or 'Gone' or 'Parked' or 'Hold' or 'VoiceMail' or 'FaxReceive' or 'VoiceMailScreening' | Enables notifications on call sessions with a particular status. It is possible to subscribe to multiple statuses via different event filters |
| `withRecordings` | boolean | Allows to filter and return telephony sessions with recordings only |

**Notification Payload Structure**

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string  | Universally unique identifier of a notification |
| `event` | string  | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string  | Internal identifier of a subscription |
| `timestamp` | date-time  | Datetime of a call action in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Account Telephony Sessions Event | Session changes of the party |


**Account Telephony Sessions Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `sequence` | integer  | Order number of a notification to state the chronology |
| `sessionId` | string  | Legacy identifier of a call session |
| `telephonySessionId` | string  | Call session identifier, required for Telephony API |
| `serverId` | string  | Identifier of a server |
| `eventTime` | string  | The call start datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `origin` | Session Origin Details  | Session Origin Details |
| `parties` | Session Parties Details | Call participants details |

**Session Origin Details**

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | The reason of Session creation. Could be 'Call' or 'RingOut' or 'RingMe' or 'Conference' or 'GreetingsRecording' or 'VerificationCall' or 'TestCall' |

**Session Parties Details**

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountId` | string  | Internal identifier of an account |
| `extensionId` | string  | Internal identifier of an extension |
| `id` | string  | Internal identifier of a party, globaly unique |
| `direction` | 'Inbound' or 'Outbound' | Technical call direction. 'Inbound' direction often means the call in the party context is initiated from RC to Customer endpoint. 'Outbound' is vice versa, e.g. User make outbound call from any of RC application.    |
| `to` | Callee Info  | Callee Info |
| `from` | Caller Info  | Caller Info |
| `status` | Session Status Info | Session Status Info |
| `missedCall` | boolean  | If 'True' means the call was missed by the party |
| `standAlone` | boolean  | Indicates whether the call party is standalone or not |
| `muted` | boolean  | If 'True' means the party is muted |
| `conferenceRole` | 'Host' or 'Participant'| Defines party role in Server Side Conference |
| `sipData` | SIP Info | SIP (Session Initiation Protocol) information. Returned if query parameter `sipData` is set to 'True' |

**Callee Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string  | Callee Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `name` | string  | Callee Name |
| `extensionId` | string  | Internal identifier of a Callee extension |
| `deviceId` | string  | Internal identifier of a device |

**Caller Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string  | Caller Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `name` | string  | Caller Name |
| `extensionId` | string  | Internal identifier of a Caller extension |
| `deviceId` | string  | Internal identifier of a device |

**Session Status Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | string  | State Code for the party |
| `reason` | 'Pickup' or 'Supervising' or 'TakeOver' or 'Timeout' or 'BlindTransfer' or 'RccTransfer' or 'AttendedTransfer' or 'CallerInputRedirect' or 'CallFlip' or 'ParkLocation' or 'DtmfTransfer' or 'AgentAnswered' or 'AgentDropped' or 'Rejected' or 'Cancelled' or 'InternalError' or 'NoAnswer' or 'TargetBusy' or 'InvalidNumber' or 'InternationalDisabled' or 'DestinationBlocked' or 'NotEnoughFunds' or 'NoSuchUser' or 'CallRedirected' or 'CallReplied' or 'CallFinished' or 'CallDropped' or 'Voicemail'| Reason for a call status, might be specified for some codes |
| `parkData` | string  | Appears in 'Parked' state. |
| `peerId` | Linked Session Details | Contains details of the 'linked' session. Appears in 'Gone' state code  |
| `mobilePickupData` | Mobile Pickup Data | Appears if the user configured to answer the call via Desktop/Mobile application |

**SIP Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `toTag` | string  | Recipient data |
| `fromTag` | string  | Sender data|
| `callId` | string  | SIP call identifier |


**Linked Session Details**

| Parameter | Type | Description |
|-----------|------|-------------|
| `sessionId` | string  | Legacy identifier of a linked call session |
| `telephonySessionId` | string  | Call session identifier, required for Telephony API|
| `partyId` | string  | Party identifier of a linked call session |


**Mobile Pickup Data**

| Parameter | Type | Description |
|-----------|------|-------------|
| `ccMailboxes` | string  | List of extension IDs, configured to pick a call from Desktop/Mobile applications |
| `to` | string  | SIP proxy registration name |
| `sid` | string  | User data |
| `srvLvl` | string  | User data |
| `srvLvlExt` | string  | User data |


**Example**

```json
{
    "uuid": "837270960869181944",
    "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
    "ownerId": "400144455008",
    "pn_apns": {
      "aps": {
        "content-available": 1
      },
      "uuid": "837270960869181944",
      "event": "/restapi/v1.0/account/400144452008/extension/400144455008/telephony/sessions",
      "timestamp": "2018-06-05T00:14:50.181Z",
      "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
      "ownerId": "400144455008",
      "body": {
        "sequence": 5,
        "sessionId": "402936341008",
        "telephonySessionId": "Y3MxNzE4NDE5MDM0MzQwMTgzODRAMTAuNjIuMjUuMTEx",
        "serverId": "10.62.25.111.TAM",
        "eventTime": "2018-06-05T00:14:50.147Z",
        "accountId": "400144452008",
        "parties": [
          {
            "sipData":{
               "callId":"555555555555",
               "toTag":"123",
               "fromTag":"456"
            },
            "extensionId": "400144455008",
            "id": "cs171841903434018384-2",
            "direction": "Inbound",
            "to": {
              "phoneNumber": "102",
              "name": "Tom Sawyer",
              "extensionId": "400144455008"
            },
            "from": {
              "phoneNumber": "103",
              "name": "TheCat Jerry",
              "extensionId": "400144457008"
            },
            "status": {
              "code": "Proceeding",
              "mobilePickupData": {
                "ccMailboxes": [
                  "400144455008"
                ],
                "to": "#19008@example.com:5060",
                "sid": "402936472080",
                "srvLvl": "-149699523",
                "srvLvlExt": "390"
              }
            },
            "missedCall": false,
            "standAlone": false,
            "muted": false
          }
        ],
        "origin": {
          "type": "Call"
        },
        "extensionId": "400144455008"
      }
    }
  }
```


### Extension Telephony Sessions Event

*Since 1.0.36 (Release 10.2)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/telephony/sessions` enables notifications in case of change of the call session information for the specified extension.

The client receives the detailed call notification payload as a JSON object.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `CallControl` | Creating and managing telephony sessions |


**Query Parameters**

| Parameter     | Type | Description |
|---------------|------|-------------|
| `direction` | 'Outbound' or 'Inbound' | Allows to send notifications only on call(s) with a specified direction |
| `missedCall`  | boolean | Allows to send notifications only on missed call(s) event |
| `phoneNumber` | string | Allows to send notifications only on call(s) to/from a certain phone number; e.164 format with '+' sign is supported |
| `sipData`     | boolean | Enables detailed notifications with SIP information |
| `statusCode`  | 'Setup' or  'Proceeding' or 'Answered' or 'Disconnected' or 'Gone' or 'Parked' or 'Hold' or 'VoiceMail' or 'FaxReceive' or 'VoiceMailScreening' | Enables notifications on call sessions with a particular status. It is possible to subscribe to multiple statuses via different event filters |
| `withRecordings` | boolean | Allows to filter and return telephony sessions with recordings only |

**Notification Payload Structure**

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string  | Universally unique identifier of a notification |
| `event` | string  | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string  | Internal identifier of a subscription |
| `timestamp` | date-time  | Datetime of a call action in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z*|
| `body` | Extension Telephony Sessions Event | Body of Telephony Session Event |


**Extension Telephony Sessions Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `sequence` | integer  | Order number of a notification to state the chronology |
| `sessionId` | string  | Legacy identifier of a call session |
| `telephonySessionId` | string  | Call session identifier, required for Telephony API |
| `serverId` | string  | Identifier of a server |
| `eventTime` | string  | The call start datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `origin` | Session Origin Details | Session Origin Details |
| `parties` | Session Parties Details | Call participants details |

**Session Origin Details**

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Reason for call session creation. Could be 'Call' or 'RingOut' or 'RingMe' or 'Conference' or 'GreetingsRecording' or 'VerificationCall' or 'TestCall' |

**Session Parties Details**

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountId` | string  | Internal identifier of an account |
| `extensionId` | string  | Internal identifier of an extension |
| `id` | string  | Internal identifier of a party, globaly unique |
| `direction` | 'Inbound' or 'Outbound' | Technical call direction. 'Inbound' direction often means the call in the party context is initiated from RC to Customer endpoint. 'Outbound' is vice versa, e.g. User make outbound call from any of RC application.    |
| `queueCall` | boolean | Identifies if a call belongs to the call queue |
| `to` | Callee Info  | Callee Info |
| `from` | Caller Info  | Caller Info |
| `status` | Session Status Info | Session Status Info |
| `missedCall` | boolean  | If 'True' means the call was missed by the party |
| `standAlone` | boolean  | Indicates whether the call party is standalone or not |
| `muted` | boolean  | If 'True' means the party is muted |
| `conferenceRole` | 'Host' or 'Participant'| Defines party role in Server Side Conference |
| `sipData` | SIP Info | SIP (Session Initiation Protocol) information. Returned if query parameter `sipData` is set to 'True' |

**Callee Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string  | Callee Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I)(with '+' sign) format |
| `name` | string  | Callee Name |
| `extensionId` | string  | Internal identifier of a Callee extension |
| `deviceId` | string  | Internal identifier of a device |

**Caller Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string  | Caller Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `name` | string  | Caller Name |
| `extensionId` | string  | Internal identifier of a Caller extension |
| `deviceId` | string  | Internal identifier of a device |

**Session Status Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `code` | string  | State Code for the party |
| `reason` | 'Pickup' or 'Supervising' or 'TakeOver' or 'Timeout' or 'BlindTransfer' or 'RccTransfer' or 'AttendedTransfer' or 'CallerInputRedirect' or 'CallFlip' or 'ParkLocation' or 'DtmfTransfer' or 'AgentAnswered' or 'AgentDropped' or 'Rejected' or 'Cancelled' or 'InternalError' or 'NoAnswer' or 'TargetBusy' or 'InvalidNumber' or 'InternationalDisabled' or 'DestinationBlocked' or 'NotEnoughFunds' or 'NoSuchUser' or 'CallRedirected' or 'CallReplied' or 'CallFinished' or 'CallDropped' | Reason for a call status, might be specified for some codes |
| `parkData` | string  | Appears in 'Parked' state. |
| `peerId` | Linked Session Details | Contains details of the 'linked' Session. Appears in 'Gone' State Code  |
| `mobilePickupData` | Mobile Pickup Data | Appears, if User configured to answer the call on Desktop/Mobile applications|

**SIP Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `toTag` | string  | Recipient data |
| `fromTag` | string  | Sender data|
| `callId` | string  | SIP call identifier |

**Linked Session Details**

| Parameter | Type | Description |
|-----------|------|-------------|
| `sessionId` | string  | Legacy identifier of a linked call session |
| `telephonySessionId` | string  | Linked call session identifier, required for Telephony API |
| `partyId` | string  | Party identifier of a linked call session  |


**Mobile Pickup Data**

| Parameter | Type | Description |
|-----------|------|-------------|
| `ccMailboxes` | string  | The list of extension IDs, configured to pick a call from Desktop/Mobile applications |
| `to` | string  | SIP proxy registration name |
| `sid` | string  | User data |
| `srvLvl` | string  | User data |
| `srvLvlExt` | string  | User data |


**Example**

```json
{
    "uuid": "837270960869181944",
    "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
    "ownerId": "400144455008",
    "pn_apns": {
      "aps": {
        "content-available": 1
      },
      "uuid": "837270960869181944",
      "event": "/restapi/v1.0/account/400144452008/extension/400144455008/telephony/sessions",
      "timestamp": "2018-06-05T00:14:50.181Z",
      "subscriptionId": "5c37f936-fa66-4b4b-95af-1e94b51a748d",
      "ownerId": "400144455008",
      "body": {
        "sequence": 5,
        "sessionId": "402936341008",
        "telephonySessionId": "Y3MxNzE4NDE5MDM0MzQwMTgzODRAMTAuNjIuMjUuMTEx",
        "serverId": "10.62.25.111.TAM",
        "eventTime": "2018-06-05T00:14:50.147Z",
        "accountId": "400144452008",
        "parties": [
          {
            "sipData":{
               "callId":"555555555555",
               "toTag":"123",
               "fromTag":"456"
            },
            "extensionId": "400144455008",
            "id": "cs171841903434018384-2",
            "direction": "Inbound",
            "to": {
              "phoneNumber": "102",
              "name": "Tom Sawyer",
              "extensionId": "400144455008"
            },
            "from": {
              "phoneNumber": "103",
              "name": "TheCat Jerry",
              "extensionId": "400144457008"
            },
            "queueCall": true,
            "status": {
              "code": "Proceeding",
              "mobilePickupData": {
                "ccMailboxes": [
                  "400144455008"
                ],
                "to": "#19008@sip-mesdevams.lab.nordigy.ru:5060",
                "sid": "402936472080",
                "srvLvl": "-149699523",
                "srvLvlExt": "390"
              }
            },
            "missedCall": false,
            "standAlone": false,
            "muted": false
          }
        ],
        "origin": {
          "type": "Call"
        },
        "extensionId": "400144455008"
      }
    }
  }
```

## Message Store Events 

### Fax Message Event

*Since 1.0.37 (Release 10.3)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/fax?direction=Inbound` enables notifications in case of new inbound fax message:

The updated message info is accessible by calling the Get Message List method.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadMessages` | Viewing user messages |

**Notification Payload Structure**

The client receives messages notifications payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2018-03-10T18:07:52.534Z* |
| `body` | Fax Message Event | Notification payload body |

**Fax Message Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message |
| `to` | Collection of Recipient Info | Message receiver(s) information |
| `from` | Sender Info | Message sender information |
| `type` | string |  Type of a message. The value is 'Fax' |
| `creationTime` | date-time | Message creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `lastModifiedTime` | date-time | Datetime when the message was modified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `readStatus` | string | Status of a message. The default value is 'Unread' |
| `priority` | string |  The default value is 'Normal' |
| `attachments` | Collection of Instant Message Attachment Info | Message attachment data |
| `direction` | string | Message direction. The default value is 'Inbound' |
| `availability` | string | Message availability status. The default value is 'Alive' |
| `subject` | string | Message subject. It replicates message text which is also returned as an attachment |
| `messageStatus` | string | Status of a message. The default value is 'Received' |
| `conversationId` | string | Internal identifier of a conversation this message belongs to |
| `faxResolution` | string | Resolution of a fax message. ('High' for black and white image scanned at 200 dpi, 'Low' for black and white image scanned at 100 dpi)|
| `faxPageCount`  | integer | Page count of a fax message |


**Recipient Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `extensionNumber` | string | Extension number |
| `target` | boolean | 'True' specifies that message is sent exactly to this recipient. Returned in to field for group MMS. Useful if one extension has several phone numbers |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

**Sender Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `extensionNumber` | string | Extension number |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

**Fax Message Attachment Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message attachment |
| `uri` | string | Link to an attachment resource |
| `size` | integer | Attachment size in bytes |
| `type` | 'AudioRecording' or 'AudioTranscription'| Type of a message attachment |
| `contentType` | string | Content type of an attachment, see also MIME Types |


**Example**

```json
{
  "uuid":"ed1cf00c-0420-4bf5-a0ae-e659bb9f77e0",
  "event": "/restapi/v1.0/account/~/extension/823476228762/fax?direction=Inbound",
  "subscriptionId": "dc853541-66ac-45d8-a289-1a239fd72888",
  "ownerId": "823476228762",
  "timestamp": "2018-02-28T10:06:15.000Z",
  "body": {
            "id": "404068973008",
            "from": {
                "phoneNumber": "+14029997777"
            },
            "type": "Fax",
            "creationTime": "2018-02-28T05:11:37.000Z",
            "readStatus": "Unread",
            "priority": "Normal",
            "attachments": [
                {
                    "id": "404068973008",
                    "uri": "https://platform.ringcentral.com/restapi/v1.0/account/404161512008/extension/404161514008/message-store/404068973008/content/404068973008",
                    "type": "RenderedDocument",
                    "contentType": "application/pdf"
                }
            ],
            "direction": "Inbound",
            "availability": "Alive",
            "subject": "+17015402626",
            "messageStatus": "Received",
            "faxResolution": "High",
            "faxPageCount": 2,
            "lastModifiedTime": "2018-02-28T05:11:37.673Z"
        }
}
 ```

### Instant Message Event

*Since 1.0.26 (Release 8.2)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/instant?type=SMS` enables notifications in case of receiving a new inbound SMS message.

The updated message info is accessible by calling the Get Message List method.

**Notification Payload Structure**

The client receives messages notifications payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2018-03-10T18:07:52.534Z* |
| `body` | Instant Message Event | Notification payload body |

**Instant Message Event**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message |
| `to` | Collection of Recipient Info | Message receiver(s) information |
| `from` | Sender Info | Message sender information |
| `type` | string |  Type of a message. The default value is 'SMS' |
| `creationTime` | date-time | Message creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `lastModifiedTime` | date-time | Datetime when the message was modified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `readStatus` | string | Status of a message. The default value is 'Unread' |
| `priority` | string |  The default value is 'Normal' |
| `attachments` | Collection of Instant Message Attachment Info | Message attachment data |
| `direction` | string | Message direction. The default value is 'Inbound' |
| `availability` | string | Message availability status. The default value is 'Alive' |
| `subject` | string | Message subject. It replicates message text which is also returned as an attachment |
| `messageStatus` | string | Status of a message. The default value is 'Received' |
| `conversationId` | string | Identifier of the conversation the message belongs to |

**Recipient Info**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format  |
| `extensionNumber` | string | Extension number  |
| `target` | boolean | 'True' specifies that message is sent exactly to this recipient. Returned in to field for group MMS. Useful if one extension has several phone numbers |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

**Sender Info**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `extensionNumber` | string | Extension number |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

**Instant Message Attachment Info**

| Parameter	| Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message attachment |
| `uri` | string | Link to an attachment resource |
| `size` | integer | Attachment size in bytes |
| `type` | 'AudioRecording' or 'AudioTranscription' or 'RenderedDocument' or 'Text' or 'MmsAttachment' | Type of a message attachment. The default value is 'Text' |
| `contentType` | string | Content type of an attachment, see also MIME Types. The default value is 'text/plain' |

**Example**

```json
{
    "uuid":"ed1cf00c-0420-4bf5-a0ae-e659bb9f77e0",
    "event": "/restapi/v1.0/account/~/extension/823476228762/message-store/instant?type=SMS",
    "subscriptionId": "dc853541-66ac-45d8-a289-1a239fd72888",
    "ownerId": "823476228762",
    "timestamp": "2013-06-14T12:00:00.000Z",
    "body": {
           "id" : "606090030016",
           "to" : [ {
              "phoneNumber" : "+16508974563",
              "location" : "Moss Beach, CA",
           } ],
           "from" : {
              "phoneNumber" : "+14157809227",
              "name" : "John Smith"
           },
           "type" : "SMS",
           "creationTime" : "2016-02-22T17:01:00.000Z",
           "lastModifiedTime" : "2016-02-22T17:01:00.000Z",
           "readStatus" : "Unread",
           "priority" : "Normal",
           "attachments" : [ {
             "uri" : "/restapi/v1.0/account/~/extension/823476228762/message-store/2640223004/content/2640223004",
             "id" : "606090030016",
             "type" : "Text",
             "contentType" : "text/plain",
             "size": 4096
             } ],
           "direction" : "Inbound",
           "availability" : "Alive",
           "subject" : "Hi there",
           "messageStatus" : "Received",
           "conversationId" : "7876416245344257449"
        }
}
 ```


### Voicemail Message Event

*Since 1.0.36 (Release 10.2)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/voicemail` enables notifications in case of new voicemail message is received.

The updated message info is accessible by calling the Get Message List method.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadMessages` | Viewing user messages |

**Notification Payload Structure**

The client receives messages notifications payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId`	| string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2018-03-10T18:07:52.534Z* |
| `body` | Voicemail Message Event | Notification payload body |

**Voicemail Message Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message |
| `to` | Collection of Recipient Info | Message receiver(s) information |
| `from` | Sender Info | Message sender information |
| `type` | string |  Type of a message. The value is 'Voicemail' |
| `creationTime` | date-time | Message creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `lastModifiedTime` | date-time | Datetime when the message was modified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `readStatus` | string | Status of a message. The default value is 'Unread' |
| `priority` | string |  The default value is 'Normal' |
| `attachments` | Collection of Instant Message Attachment Info | Message attachment data |
| `direction` | string | Message direction. The default value is 'Inbound' |
| `availability` | string | Message availability status. The default value is 'Alive' |
| `subject` | string | Message subject. It replicates message text which is also returned as an attachment |
| `messageStatus` | string | Status of a message. The default value is 'Received' |
| `conversationId` | string | Internal identifier of a conversation this message belongs to |
| `vmTranscriptionStatus`| string | Specifies if a voicemail message transcription is already completed or not |

**Recipient Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `extensionNumber` | string | Extension number |
| `target` | boolean | 'True' specifies that message is sent exactly to this recipient. Returned in to field for group MMS. Useful if one extension has several phone numbers  |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

**Sender Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) (with '+' sign) format |
| `extensionNumber` | string | Extension number |
| `location` | string | Contains party location (city, state), if any |
| `name` | string | Symbolic name associated with a caller/callee |

**Voicemail Message Attachment Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a message attachment |
| `uri` | string | Link to an attachment resource |
| `size` | integer | Attachment size in bytes |
| `type` | 'AudioRecording' or 'AudioTranscription'| Type of a message attachment |
| `contentType` | string | Content type of an attachment, see also MIME Types |
| `vmDuration` | integer | Duration of a voicemail in seconds |


**Example**

```json
{
  "uuid": "ed1cf00c-0420-4bf5-a0ae-e659bb9f77e0",
  "event": "/restapi/v1.0/account/~/extension/823476228762/voicemail",
  "subscriptionId": "dc853541-66ac-45d8-a289-1a239fd72888",
  "ownerId": "823476228762",
  "timestamp": "2018-02-28T10:06:15.000Z",
  "body": {
    "id" : "82063400004",
    "to" : [ {
      "name" : "John Doe"
    } ],
    "from" : {
      "phoneNumber" : "+18664320079",
      "name" : "Jane Doe"
    },
    "type" : "VoiceMail",
    "creationTime" : "2018-02-28T10:05:55.000Z",
    "readStatus" : "Unread",
    "priority" : "Normal",
    "attachments" : [ {
      "id" : "82063400004",
      "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/14833636004/extension/14833636004/message-store/82063400004/content/82063400004",
      "type" : "AudioRecording",
      "contentType" : "audio/x-wav",
      "vmDuration" : 3
    } ],
    "direction" : "Inbound",
    "availability" : "Alive",
    "messageStatus" : "Received",
    "lastModifiedTime" : "2018-02-28T10:06:05.000Z",
    "vmTranscriptionStatus" : "Completed"
  }
}
 ```

### Message Event

*Since 1.0.6 (Release 5.15)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store` enables notifications in case of:

* any new message creation;
* any message change in extension message store.


The updated message info is accessible by calling the Get Message List method.

**Please note:** To receive notifications on a certain message type (Fax/Voicemail/Pager/SMS) and/or direction (Inbound/Outbound) the following event filter should be specified `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store?type={type}&direction={direction}`.

*For example* to recieve notifications on outbound fax event use the filter: `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store?type=Fax&direction=Outbound`

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadMessages` | Viewing user messages |

**Notification Payload Structure**

The client receives messages notifications payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Message Event | Notification payload body |

**Message Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountId` | string | Internal identifier of an account. Optional parameter |
| `extensionId` | string | Internal identifier of an extension. Optional parameter |
| `lastUpdated` | date-time | Datetime when the message was last modified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `changes` | Message Changes | Message changes |

**Message Changes**

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | 'Voicemail' or 'SMS' or 'Fax' or 'Pager' | Message type |
| `newCount` | integer | The number of new messages. Can be omitted if the value is zero |
| `updatedCount` | integer | The number of updated messages. Can be omitted if the value is zero |

**Example**

```json
{
   "timestamp": "2014-04-29T14:29:27.408+0000",
   "uuid": "b11c9430-9687-4498-b12b-3fcb470bfe04",
   "event": "/restapi/v1.0/account/~/extension/406149828004/message-store",
   "ownerId": "406149828004",
   "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
   "body": {
      "accountId": "406149828004",
      "extensionId": "406149828004",
      "lastUpdated": "2014-04-29T14:29:20.531+0000",
      "changes": [
                {
                  "type": "Pager",
                  "updatedCount": 1,
                  "newCount": 0
                }
                {
                  "type": "SMS",
                  "updatedCount": 0,
                  "newCount": 1
                },
                {...} ],
            },

 }
 ```


## High Volume SMS Event

### Message Batch Event

*Since 1.0.45 (Release 20.4)*

Event filter `/restapi/v1.0/account/{accountId}/a2p-sms/batches` enables notifications in case of any message batch change on the current account.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

**Query Parameters**

| Parameter     | Type | Description |
|---------------|------|-------------|
| `from` | string | Notification is received if the message batch is sent from a specific number in E.164 format, e.g. +16505550100|

**Notification Payload Structure**

The client receives message batch notification payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Message Batch Event  | Notification payload body |

**Message Batch Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the message batch |
| `from` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the messages are going to be sent |
| `batchSize` | integer | Total number of messages in the accepted batch |
| `processedCount` | integer | Total number of messages currently processed in the batch |
| `lastModifiedTime` | string | Last time the batch was processed |
| `status` | 'Processing' or 'Completed' | Current status of a message batch |
| `creationTime` | string | The time at which the batch was created |


**Example**

```json

{
  "uuid": "845056649859290279",
  "event": "/restapi/v1.0/account/405151939033/a2p-sms/batches",
  "subscriptionId": "8466621d-c21d-41e6-8656-9e45100eb9dd",
  "ownerId": "405151939033",
  "timestamp": "2021-05-26T04:15:54.394Z",
  "body": {
     "lastModifiedTime": "2021-05-26T04:15:54.011183Z",
     "cost": 0.07,
     "processedCount": 1,
     "creationTime": "2021-05-26T04:15:50.612950Z",
     "from": "+14089150788",
     "id": "b6f5610f-5ff1-4273-8a8d-e3742ba4e683",
     "batchSize": 1,
     "status": "Completed"
  }
}
```

### Specific Message Batch Event

*Since 1.0.45 (Release 20.4)*

Event filter `/restapi/v1.0/account/{accountId}/a2p-sms/batches/{batchId}` enables notifications in case of specific message batch change.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |


**Notification Payload Structure**

The client receives message batch notification payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Specific Message Batch Event  | Notification payload body |

**Specific Message Batch Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the message batch |
| `from` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the messages are going to be sent |
| `batchSize` | integer | Total number of messages in the accepted batch |
| `processedCount` | integer | Total number of messages currently processed in the batch |
| `lastModifiedTime` | string | Last time the batch was processed |
| `status` | 'Processing' or 'Completed' | Current status of a message batch |
| `creationTime` | string | The time at which the batch was created |


**Example**

```json
{
  "uuid": "845056649859290276",
  "event": "/restapi/v1.0/account/405151939033/a2p-sms/batches/5642276556",
  "subscriptionId": "8566621d-c21d-41e6-8656-9e45100eb9dd",
  "ownerId": "405151939033",
  "timestamp": "2021-05-26T04:15:54.394Z",
  "body": {
     "lastModifiedTime": "2021-05-26T04:15:54.011183Z",
     "cost": 0.05,
     "processedCount": 1,
     "creationTime": "2021-05-26T04:15:50.612950Z",
     "from": "+14089150788",
     "id": "b6f5610f-5ff1-4273-8a8d-e3742ba4e683",
     "batchSize": 1,
     "status": "Completed"
  }
}
```

### Batch Messages Event

*Since 1.0.45 (Release 20.4)*

Event filter `/restapi/v1.0/account/{accountId}/a2p-sms/messages` enables notifications in case of any message change in any batch on the current account.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

**Query Parameters**

| Parameter     | Type | Description |
|---------------|------|-------------|
| `direction` | 'Inbound' or 'Outbound' | Specifies if notification is sent on inbound or outbound messages |
| `batchId`   | string | Notification is sent on inbound/outboud messages of the specific message batch |
| `from`      | string | Notification is sent on outbound messages from a specific phone number in E.164 format |
| `to`        | string | Notification is sent on inbound messages to a specific phone number in E.164 format |

**Notification Payload Structure**

The client receives message batch notification payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Batch Messages Event  | Notification payload body |

**Batch Messages Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the message batch |
| `from` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the messages are  sent |
| `to`   |string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format to which the messages are sent |
| `text` | string | Text of a message, maximum number of characters is 1000 |
| `creationTime` | string | The time at which the message was created |
| `lastModifiedTime` | string | The time when this message was last updated |
| `messageStatus` |'Queued' or 'Delivered' or 'Sent' or 'SendingFailed' or 'DeliveryFailed' |Current status of a message |
| `segmentCount`|integer | Number of segments of a message |
| `cost`| number | Cost of a message |
| `batchId` | string |The batch in which the message was submitted |
| `direction`| 'Inbound' or 'Outbound' | Indicates whether the message is outbound or inbound |
| `errorCode` | string | RC error code of the message sending failure reason |


**Example 1** *Inbound Message*

```json
{
  "uuid": "5496200236759723935",
  "event": "/restapi/v1.0/account/405156321033/a2p-sms/messages?direction=Inbound&to=+12406680432",
  "subscriptionId": "bce65879-8436-4b2b-a7ce-6ff15ed0ba20",
  "ownerId": "405156321033",
  "timestamp": "2021-05-26T04:16:43.533Z",
  "body":{
      "messageStatus": "Delivered",
      "lastModifiedTime": "2021-05-26T04:16:42.985974Z",
      "cost": 0.007,
      "creationTime": "2021-05-26T04:16:42.985974Z",
      "from": "+19287680662",
      "id": "7119",
      "to": ["+12406680432"],
      "text": "Thank you for the message",
      "segmentCount": 1,
      "direction": "Inbound"
  }
}
```
**Example 2** *Outbound Message*

```json
{
  "uuid": "3396141852418552739",
  "event": "/restapi/v1.0/account/405150459033/a2p-sms/messages?direction=Outbound&from=+13102375087",
  "subscriptionId": "417eaa6f-e2bd-4b37-adae-868de87d20e1",
  "ownerId": "405150459033",
  "timestamp": "2021-05-26T04:16:08.244Z",
  "body":{
      "messageStatus": "Delivered",
      "lastModifiedTime": "2021-05-26T04:16:08.107007Z",
      "cost": 0.007,
      "creationTime": "2021-05-26T04:16:05.442760Z",
      "from": "+13102375087",
      "id": "7086",
      "to": ["+14842910071"],
      "text": "Thank you for the message",
      "segmentCount": 1,
      "direction": "Outbound"
  }
}
```


### Batch Message Opt-Out Event

*Since 1.0.45 (Release 20.4)*

Event filter `/restapi/v1.0/account/~/a2p-sms/opt-outs` enables notifications in case customers opt out.
Opt-out events are sent when a user connects to the RingCentral opt-out service using standard keywords including stop, unstop, start, etc.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

**Query Parameters**

| Parameter     | Type | Description |
|---------------|------|-------------|
| `direction` | 'Inbound' or 'Outbound' | Specifies if notification is sent on inbound or outbound messages |
| `batchId`   | string | Notification is sent on inbound/outboud messages of the specific message batch |
| `from`      | string | Notification is sent on outbound messages from a specific phone number in E.164 format |
| `to`        | string | Notification is sent on inbound messages to a specific phone number in E.164 format |

**Notification Payload Structure**

The client receives message batch notification payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Opt-Out Event  | Notification payload body |

**Opt-Out Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `from` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the message is sent  |
| `to` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format to which the message is sent |
| `active` | boolean | Indicates if opt-out service is active or not from/to the number specified|


**Example**

```json
{
  "uuid":"12345678901234567890",
  "event":"/restapi/v1.0/account/11111111/a2p-sms/opt-outs",
  "timestamp":"2020-10-01T00:00:00.000Z",
  "subscriptionId":"11112222-3333-4444-5555-666677778888",
  "ownerId": "22222222",
  "body":{
     "from":"+16505550100",
     "to":"+12125550100",
     "active":true
  }
}

```


## Team Messaging Events

### Team Messaging Post Event

*Since 1.0.32 (Release 9.3)*

Event filter `/team-messaging/v1/posts` enables notifications in case of a team messaging post change (creation, update, removal).

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `UnifiedAppDesktop`| Access to desktop RingCentral application |


**Notification Payload Structure**

The client receives team messaging post change notification payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Team Messaging Post Event  | Notification payload body |

**Team Messaging Post Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a post |
| `groupId` | string | Internal identifier of a chat the post belongs to |
| `type` | 'TextMessage' or 'PersonJoined' or 'PersonsAdded' or 'Card' | Type of a post event |
| `text` | string | Text of a message (for 'TextMessage' type only) |
| `creatorId` |string| Internal identifier of a user - author of a post |
| `addedPersonsIds`| Collection of string | For 'PersonsAdded' post type only. Identifiers of persons added to a chat|
| `removedPersonsIds`| Collection of string | For 'PersonsRemoved' post type only. Identifiers of persons removed from a chat|
| `creationTime` | date-time | Post creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) |
| `lastModifiedTime`| date-time | Post last change datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) |
| `eventType` | 'PostAdded' or 'PostChanged' or 'PostRemoved' | Type of a post event |
| `mentions` | Collection of Mentions Info | List of mentions in a post text (with personal names) |
| `attachments`| Collection of attachments| Attachments added to a post |
| `title` | string | Title of a post |
| `iconUri` | string | Link to an post icon |
| `iconEmoji` | string | Emoji used as an icon for this message |
| `activity`  | string | Label of activity type |

**Mentions Info**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a user |
| `type` | 'Person' or 'Team' or 'File' or 'Link' or 'Event' or 'Task' or 'Note' or 'Card'| Type of a mention |
| `name` | string | Name of a user |


**Example #1**

```json
{
    "uuid": "6452004109062593690",
    "event": "/team-messaging/v1/posts",
    "timestamp": "2021-03-26T09:18:41.460Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "26848769679364",
      "groupId": "995723345922",
      "type": "TextMessage",
      "text": "Hello, World!",
      "creatorId": "62534323",
      "addedPersonIds": null,
      "creationTime": "2021-03-26T09:18:41.105Z",
      "lastModifiedTime": "2021-03-26T09:18:41.105Z",
      "attachments": null,
      "activity": null,
      "title": null,
      "iconUri": null,
      "iconEmoji": null,
      "mentions": null,
      "eventType": "PostAdded"
    }
  }

```

**Example #2**

```json
{
    "uuid": "8508428295461025835",
    "event": "/team-messaging/v1/posts",
    "timestamp": "2021-03-26T09:21:11.894Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "26848795934724",
      "groupId": "995723345922",
      "type": "TextMessage",
      "text": "Hello, World :)",
      "creatorId": "62534323",
      "addedPersonIds": null,
      "creationTime": "2021-03-26T09:21:03.702Z",
      "lastModifiedTime": "2021-03-26T09:21:11.866Z",
      "attachments": null,
      "activity": null,
      "title": null,
      "iconUri": null,
      "iconEmoji": null,
      "mentions": null,
      "eventType": "PostChanged"
    }
  }
```

**Example #3**

```json
{
    "uuid": "7095914832707027583",
    "event": "/team-messaging/v1/posts",
    "timestamp": "2021-03-26T09:20:47.090Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "26848769679364",
      "eventType": "PostRemoved"
    }
  }

```

### Team Messaging Chats Event

*Since 1.0.32 (Release 9.3)*

Event filter `/team-messaging/v1/chats` enables notifications in case of a team messaging chat change (creation, update, removal).

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `UnifiedAppDesktop`| Access to desktop RingCentral application |

**Notification Payload Structure**

The client receives team messaging chat change notification payload as JSON object with the following structure:

| Parameter | Type | Description |
|-----------|------|-------------|
| `uuid` | string | Universally unique identifier of a notification |
| `event` | string | Event filter URI |
| `ownerId` | string | Internal identifier of subscription owner extension |
| `subscriptionId` | string | Internal identifier of a subscription |
| `timestamp` | date-time | Datetime of sending a notification in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `body` | Team Messaging Chats Event  | Notification payload body |

**Team Messaging Chats Event**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a chat |
| `name` | string | Name of a chat |
| `description` | string | Description of a chat |
| `type` | 'PrivateChat' or 'Group' or 'Team' or 'PersonalChat'| Type of a chat |
| `status` |'Active' or 'Archived' | Status of a team. For 'Team' chat type only |
| `members` | Collection of string | List of chat members |
| `isPublic` | boolean | Team access level. For 'Team' group type only |
| `creationTime` | date-time | Chat creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) |
| `lastModifiedTime`| date-time | Chat last change datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) |
| `eventType` | 'GroupRenamed' or 'GroupJoined' or 'GroupLeft' or 'GroupChanged' | Type of a chat event. Only the person who joined/was added to a chat will receive 'GroupJoined' notification. Only the person who left/was removed from a chat will receive 'GroupLeft' notification |


**Example #1**

```json
 {
    "uuid": "3007219717146626347",
    "event": "/team-messaging/v1/chats",
    "timestamp": "2021-03-26T09:21:34.548Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "1055879168002",
      "name": null,
      "description": null,
      "type": "Group",
      "status": "Active",
      "members": [
        "62534323",
        "2093617004",
        "2071417012"
      ],
      "isPublic": null,
      "creationTime": "2021-03-26T09:21:33.168Z",
      "lastModifiedTime": "2021-03-26T09:21:33.168Z",
      "eventType": "GroupJoined"
    }
  }

```


**Example #2**

```json
 {
    "uuid": "8657135170884424232",
    "event": "/team-messaging/v1/chats",
    "timestamp": "2021-03-26T09:22:12.366Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "47611420678",
      "name": "Team #1",
      "description": "Integration Team",
      "type": "Team",
      "status": "Active",
      "members": [
        "1813452005",
        "62534323",
        "2071417012"
      ],
      "isPublic": false,
      "creationTime": "2020-06-19T16:57:47.664Z",
      "lastModifiedTime": "2021-03-26T09:22:12.348Z",
      "eventType": "GroupRenamed"
  }

```

**Example #3**

```json
{
    "uuid": "4878974149435952286",
    "event": "/team-messaging/v1/chats",
    "timestamp": "2021-03-26T09:19:41.384Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "69508734982",
      "name": "Team",
      "description": null,
      "type": "Team",
      "status": "Active",
      "members": [
        "293401010179"
      ],
      "isPublic": false,
      "creationTime": "2021-03-26T09:18:54.924Z",
      "lastModifiedTime": "2021-03-26T09:19:41.302Z",
      "eventType": "GroupLeft"
    }
  }

```

