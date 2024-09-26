# RingSense AI Event

This event is triggered whenever there is a new voice call or video call analysis completed by RingSense for Sales.

* Filter:  `/ai/ringsense/v1/public/accounts/~/domains/pbx/insights`
* Filter:  `/ai/ringsense/v1/public/accounts/~/domains/rcv/insights`
* Required app scope: `RingSense`
* Required user permission: `ReadCompanyCallRecording`

## Event payload

| Parameter	| Type | Description |
|-----------|------|-------------|
| `title` | string | For voice calls, the system uses the the caller and callee name to compose the title. For video calls, the title of the meeting. |
| `domains` | String | Name of the call method. `pbx` for voice calls and `rcv` for video meetings. |
| `sourceRecordId` | String | For voice calls, the value is the call recording ID (can be retrieved from the call log). For video calls, the value is a unique ID of the RingSense for Sales recording item.  |
| `sourceSessionId` | String | For voice calls, the value is the call telephony session id. For video calls, the value is a unique ID of the RingSense for Sales recording item.  |
| `callDirection` | String | For voice calls only. The value is either `Inbound` or `Outbound`.  |
| `ownerExtensionId` | String | The extension ID of the voice call or the meeting who recorded the session.  |
| `recordingDurationMs` | Integer | The length of the voice call or the video meeting recording.  |
| `recordingStartTime` | String | The date and time when the recording started.  |
| `creationTime` | String | The date and time when the conversational insights are created. |
| `lastModifiedTime` | String | The date and time when the conversational insights are last modified. |
| `speakerInfo` | List | Contains identified call participant objects.  |
| `insights` | JSON object | Contains call conversational insights data objects. |

## Examples

```json
{!> code-samples/events/rcv-ringsense-event.json !}
```
