# RingSense for Sales

{! mdx_includes/ringsense-beta-notice.md !}

RingCentral RingSense for Sales transcribes your voice calls and video meetings and provides in-depth conversational insights, offering detailed analytics derived from post-call analysis of recorded sessions. Based on the richness of the conversation content, the insights may include the following:

* `Transcript` - Transcription objects with identified speakers and the timestamps of their utterances.
* `Summary` - Summary objects with AI-generated summary paragraphs and the timestamps of the conversations.
* `HighLights` - Highlight objects contain speaker utterances that capture key points, valuable insights, and notable moments for quick review and analysis.
* `NextSteps` - Next steps objects contain AI-generated action items for the call participants.

!!! important Requirements
    * A RingSense for Sales license must be purchased and assigned to a user extension.
    * The license is transferable from one user extension to another user extension.
    * RingSense for Sales data retention follows the RingCentral account's data retention policies.

To learn more about RingSense for Sales and how to enable the service for a RingCentral RingEX account, please refer to this [online article](https://www.ringcentral.com/ringsense-for-sales.html).

## RingSense for Sales API

The RingSense for Sales API allows you to programmatically access RingSense for Sales data from your account.

The API functions at the account level and requires the "ReadCompanyCallRecording" user permission. This means that any user extension with this permission can access RingSense for Sales data for any user holding a RingSense for Sales license.

There are two methods to access RingSense for Sales data: through push notifications (recommended method) or via a REST API call.

### RingSense for Sales event notification

You can get notified when a new voice call or a new video meeting recording analysis is completed via [RingCentral push notification  service](https://developers.ringcentral.com/guide/notifications). The RingSense for Sales data is included in the event payload together with the event metadata.

To get RingSense for Sales event notification for voice call recordings, subscribe for this event:

`/ai/ringsense/v1/public/accounts/~/domains/pbx/insights`

To get RingSense for Sales event notification for video meeting recordings, subscribe for this event:

`/ai/ringsense/v1/public/accounts/~/domains/rcv/insights`

Remember, the notification events are triggered only if voice calls or video meetings were recorded by users who hold a RingSense for Sales license.

### Read RingSense for Sales data

You can read the RingSense for Sales data of a voice call recording or of a video meeting recording if you know the `sourceRecordId`. The `sourceRecordId` value of a recording is included in the RingSense for Sales event payload.

!!! notes
    * The `sourceRecordId` of a voice call recording is the recording ID of a recorded call. You can get the recording ID of a call from the [call log data](../voice/call-log/details.md).
    * Unfortunately, currently there is no API to detect the `sourceRecordId` of a video meeting recording.

## Example of API Response

```json
{!> code-samples/ai/ringsense/ringsense-data.json !}
```

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

### SpeakerInfo

The `speakerInfo` is a list of objects, with each object contains the following key/value pairs:

| Parameter     | Type     | Description                                            |
| ------------- | ------   | ------------------------------------------------------ |
| `speakerId`   | String   | System given speaker identifier. For voice calls, the ID is the call party ID assigned by the telephony system.  |
| `name`        | String   | The name of a participant. If the speaker is an agent (a user under the account), the name is the full name of the user extension. If the speaker is a call party outside of the account, the name is the specified name of the contact associated with the agent company or personal contacts. |
| `accountId`   | String   | The ID of the RingCentral account. If the speaker is a call party outside of the account, this value is `null`.  |
| `extensionId` | String   | The ID of the user extension. If the speaker is a call party outside of the account, this value is `null`.      |

### Insights

The `insights` is an object that may contain the following objects:

| Parameter     | Type   | Description                                            |
| ------------- | ------ | ------------------------------------------------------ |
| `Transcript`  | List   | A list of JSON objects. Each object contains transcribed texts and related metadata.    |
| `Summary`     | List   | A list of JSON objects. Each object contains the summary value and related metadata.    |
| `HighLights`  | List   | A list of JSON objects. Each object contains the highlight value and related metadata.  |
| `NextSteps`   | List   | A list of JSON objects. Each object contains the next step value and related metadata.  |

When processing the insights objects—such as reconstructing conversations using the utterances in the Transcript objects, you can match the speaker ID from a transcript object with the corresponding speaker ID in the `speakerInfo` object. This allows you to display the speaker's name (if available) alongside the utterance text.
