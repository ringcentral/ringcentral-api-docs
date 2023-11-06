# Detailed Extension Presence with SIP Event

*Since 1.0.6 (Release 5.15)*

1. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence?detailedTelephonyState=true&sipData=true` enables detailed notifications with SIP information in case of any change of extension presence information:

2. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line/presence?detailedTelephonyState=true&sipData=true` enables detailed notifications with SIP information in case of changes of presence information for extensions monitored by the current extension.

3. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite/presence?detailedTelephonyState=true&sipData=true` enables detailed notifications with SIP information if presence status of any extension included in favorites list of the current extension is changed.

Please note: If you specify that `sipData=true` then `presence?detailedTelephonyState=true` also, as SIP data is a part of active calls section. If both detailed presence and detailed presence with SIP event types are specified in getting subscription request, then the detailed presence with SIP notifications will be returned.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

## Detailed Presence with SIP Event

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

### Active Call Info

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

### SIP Data

| Parameter	| Type | Description |
|-----------|------|-------------|
| `toTag` | string | Recipient data |
| `fromTag` | string | Sender data |
| `remoteUri` | string | Remote address URL |
| `localUri` | string | Local address URL |

## Example

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
