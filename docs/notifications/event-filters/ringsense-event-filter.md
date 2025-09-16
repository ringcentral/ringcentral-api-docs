# RingSense Event

|Event filter|Description|
|||
|`/ai/ringsense/v1/public/accounts/~/domains/pbx/insights`|Subscribe for RingEX voice call RingSense events.<br>Notes: If the AI Notes was turned on for a call, there will be 2 events.<br>The 1st event is triggered by AI Notes, and the 2nd event is triggered by RingSense.|
|`/ai/ringsense/v1/public/accounts/~/domains/rcv/insights`|Subscribe for RingEX video meetings RingSense events.|
|`/ai/ringsense/v1/public/accounts/~/domains/rcx/insights`|Subscribe for RingCX voice calls RingSense events.|
|`/ai/ringsense/v1/public/accounts/~/domains/ms-teams/insights`|Subscribe for Microsoft Teams video conferencing RingSense events.|
|`/ai/ringsense/v1/public/accounts/~/domains/nice-incontact/insights`|Subscribe for NICE CXone phone conferencing RingSense events.|

* Required app scope: `RingSense`
* Required user permission: `ReadCompanyCallRecording`

## Example of a RingEX voice call RingSense event

```json
{!> code-samples/events/ringsense-pbx-event.json !}
```

## Example of a RingCX voice call RingSense event

```json
{!> code-samples/events/ringsense-rcx-event.json !}
```
