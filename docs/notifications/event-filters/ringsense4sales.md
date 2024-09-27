# RingSense for Sales AI Event

This event is triggered whenever a new voice call analysis is completed by RingSense for Sales.

* Filter:  `/ai/ringsense/v1/public/accounts/~/domains/pbx/insights`
* Required app scope: `RingSense`
* Required user permission: `ReadCompanyCallRecording`

## Event payload

| Parameter	| Type | Description |
|-----------|------|-------------|
| `title` | string | For voice calls, the system uses the the caller and callee name to compose the title. |
| `domains` | String | Name of the communication method. Currently only for voice calls ('pbx') are supported. |
| `sourceRecordId` | String | The value is the call recording ID (can be retrieved from the call log).  |
| `sourceSessionId` | String | The value is the call telephony session id. |
| `callDirection` | String | For voice calls only. The value is either `Inbound` or `Outbound`.  |
| `ownerExtensionId` | String | The extension ID of the user who holds the RingSense for Sales license.  |
| `recordingDurationMs` | Integer | The length of the voice call recording.  |
| `recordingStartTime` | String | The date and time when the recording started.  |
| `creationTime` | String | The date and time when the conversational insights are created. |
| `lastModifiedTime` | String | The date and time when the conversational insights are last modified. |
| `speakerInfo` | List | Contains identified call participant objects.  |
| `insights` | JSON object | Contains call conversational insights data objects. |

## Examples

```json
{!> code-samples/events/rcv-ringsense-event.json !}
```
