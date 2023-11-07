# Detailed Extension Presence Event

*Since 1.0.6 (Release 5.15)*

1. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence?detailedTelephonyState=true` enables detailed notifications in case of any change of extension presence information:

2. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line/presence?detailedTelephonyState=true` enables detailed notifications in case of changes of presence information for extensions monitored by the current extension.

3. Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite/presence?detailedTelephonyState=true` enables detailed notifications if presence status of any extension included in favorites list of the current extension is changed.

Please note: If both simple presence and detailed presence event types are specified in getting subscription request, then the detailed presence notifications will be received.


**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

## Event payload

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

### Active Call Info

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

## Example

```json
{!> code-samples/events/detailed-extension-presence.json !}
```
