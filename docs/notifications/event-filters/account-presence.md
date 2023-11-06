# Account Presence Event

*Since 1.0.26 (Release 8.2)*

Event filter `/restapi/v1.0/account/{accountId}/presence` enables notifications in case of change of presence information for any extension assigned to the current account.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Presence Event

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

## Example

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

