# RingSense AI Event

This event is triggered whenever there is a new voice call or video call analysis completed by RingSense for Sales.

* Filter:  `/ai/ringsense/v1/public/accounts/~/domains/pbx/insights`
* Filter:  `/ai/ringsense/v1/public/accounts/~/domains/rcv/insights`
* Required app scope: `RingSense`
* Required user permission: `ReadCompanyCallRecording`

## Event payload

| Parameter	| Type | Description |
|-----------|------|-------------|
| `eventType` | string | Internal identifier of an extension |
| `title` | string | Telephony presence status. Returned if telephony status is changed. See Telephony Status Values |
| `domain` | integer | Order number of a notification to state the chronology |
| `sourceRecordId` | 'Offline' or 'Busy' or 'Available' | Aggregated presence status, calculated from a number of sources |
| `sourceSessionId` | 'Offline' or 'Busy' or 'Available' | User-defined presence status (as previously published by the user) |
| `creationTime` | string | If 'True' enables other extensions to see the extension presence status |
| `lastModifiedTime` | string | If 'True' enables to ring extension phone, if any user monitored by this extension is ringing |
| `speakerInfo` | JSON object | Meetings presence status |
| `insights` | JSON object | Extended DnD (Do not Disturb) status |

## Examples

```json
{!> code-samples/events/rcv-ringsense-event.json !}
```
