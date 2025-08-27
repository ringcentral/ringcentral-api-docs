# RingSense Event

|Event filter|Description|
|||
|`/ai/ringsense/v1/public/accounts/~/domains/pbx/insights`|Subscribe for RingEX voice call RingSense event.<br>Notes: If the AI Notes was turned on for a call, there will be 2 events. The 1st event is triggered by AI Notes, and the 2nd event is triggered by RingSense.|
|`/ai/ringsense/v1/public/accounts/~/domains/rcv/insights`|Subscribe for video meeting RingSense event.|
|`/ai/ringsense/v1/public/accounts/~/domains/rcx/insights`|Subscribe for RingCX voice call RingSense event.|

* Required app scope: `RingSense`
* Required user permission: `ReadCompanyCallRecording`

## Example of a RingEX voice call RingSense event

```json
{!> code-samples/events/ringsense-event.json !}
```
