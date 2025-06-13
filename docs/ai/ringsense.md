# RingSense

{! mdx_includes/ringsense-beta-notice.md !}

RingCentral RingSense transcribes your voice calls and provides in-depth conversational insights, offering detailed analytics derived from post-call analysis of recorded sessions. Based on the richness of the conversation content, the insights may include the following:

* `Transcript` - Transcription objects with identified speakers and the timestamps of their utterances.
* `Summary` - Summary objects with AI-generated summary paragraphs and the timestamps of the conversations.
* `HighLights` - Highlight objects contain speaker utterances that capture key points, valuable insights, and notable moments for quick review and analysis.
* `NextSteps` - Next steps objects contain AI-generated action items for the call participants.
* `AIScore` - A numerical value that represents the confidence level of the RingSense AI's analysis and prediction.
* `BulletedSummary` - A list of AI-generated sentences summarizing the conversations in bullet points.

!!! important "Requirements"
    * A RingSense license must be purchased and assigned to a user extension.
    * The license is transferable from one user extension to another user extension.
    * RingSense data retention is defined in your RingSense settings. By default the data is retained for 1 year.
    * You must request access to RingSense APIs via this [form](https://forms.gle/m1djAo6w6bajXQmS9).

To learn more about RingSense and how to enable the service for a RingCentral RingEX account, please refer to this [online article](https://www.ringcentral.com/ringsense-for-sales.html).

## RingSense API

The RingSense API allows you to programmatically access RingSense data from your account.

!!! notes
    * Currently the API does not support video meeting recordings.

The API functions at the account level and requires the "RingSense for Sales - Access Insights" user permission. This means that any user extension with this permission can access RingSense data for any user holding a RingSense license.

### How to check if an extension has the permission to access RingSense data via API?

**Check from the account admin portal**

- Log in to your [account admin portal](https://service.ringcentral.com) using a super admin user.
- Select the 'Users' tab then click the 'Roles' option
- Select the role which is assigned to the user extension
- Scroll to the Artificial Intelligence section and check if the checkbox is checked

<img class="img-fluid" src="../../img/ai-permission.png" style="max-width:300px;">

**Check from the platform API**

Authenticate the app using the login credentials of the user who is authorized to access RingSense data. Then, make a GET request to the API below:

`/restapi/v1.0/account/~/extension/~/authz-profile/check?permissionId=ReadRingSenseInsights`

If the user has the permission, the response will contain the info below:

```json
{
  "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/80964XXXX/extension/6228832YYYY/authz-profile/check?permissionId=ReadRingSenseInsights&targetExtensionId=6228832YYYY",
  "successful" : true,
  "details" : {
    "permission" : {
      "uri" : "https://platform.ringcentral.com/restapi/v1.0/dictionary/permission/ReadRingSenseInsights",
      "id" : "ReadRingSenseInsights",
      "assignable" : true,
      "readOnly" : false,
      "siteCompatible" : "Independent"
    },
    "effectiveRole" : {
      "uri" : "https://platform.ringcentral.com/restapi/v1.0/dictionary/user-role/1",
      "id" : "1"
    },
    "scopes" : [ "AllExtensions" ]
  }
}
```

There are two methods to access RingSense data: through push notifications (recommended method) or via a REST API call.

### RingSense event notification

You can get notified when a new voice call recording analysis is completed via [RingCentral push notification  service](../notifications/index.md). The RingSense data is included in the event payload together with the event metadata.

To receive RingSense event notification for voice call recordings, [subscribe for this event](../notifications/event-filters/ringsense-event-filter.md).

Remember, the notification events are triggered only if a voice call was recorded by users who hold a RingSense license.

### Read RingSense data

You can read the RingSense data of a recorded voice call if you know the `sourceRecordId` or the `sourceSessionId`. Both `sourceRecordId` and `sourceSessionId` values are included in the RingSense event payload.

!!! notes
    * The `sourceRecordId` of a voice call recording is the recording ID of a recorded call. You can get the recording ID of a call from the [call log data](../voice/call-log/details.md).
    * The `sourceSessionId` of a voice call recording is the telephony session ID of a recorded call. You can get the telephony session ID of a call from the [call log data](../voice/call-log/details.md).

Read RingSense data using a recording Id:

GET `/ai/ringsense/v1/public/accounts/~/domains/pbx/records/[sourceRecordId]/insights`

This endpoint retrieves the RingSense data for a specific call recording, identified by the `sourceRecordId`.

Read RingSense data using a telephony session Id:

GET `/ai/ringsense/v1/public/accounts/~/domains/pbx/sessions/[sourceSessionId]/insights`

This endpoint returns the RingSense data for all call recordings associated with the specified telephony session. Multiple call recordings can exist for a single session in scenarios such as call transfers between agents, where each leg of the call is recorded separately. The RingSense data for each individual recording will be included in the `records` array in the API response.

## Example of API Response

```json
{!> code-samples/ai/ringsense/ringsense-data.json !}
```

| Parameter	| Type | Description |
|-----------|------|-------------|
| `title` | string | For voice calls, the system uses the the caller and callee name to compose the title. |
| `domain` | String | Name of the communication medium. Currently only for voice calls ('pbx') are supported. |
| `sourceRecordId` | String | The value is the call recording ID (can be retrieved from the call log).  |
| `sourceSessionId` | String | The value is the call telephony session id. |
| `callDirection` | String | For voice calls only. The value is either `Inbound` or `Outbound`.  |
| `ownerExtensionId` | String | The extension ID of the user who holds the RingSense license.  |
| `recordingDurationMs` | Integer | The length of the voice call recording.  |
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
| `AIScore`     | List   | A JSON object that contains a numerical value that represents the confidence level of the RingSense AI's analysis and prediction.  |
| `BulletedSummary`   | List   | A list of JSON objects. Each object contains the AI-generated sentences summarizing the conversations.  |
| `CallNotes`   | List   | A JSON objects contains the taken notes from the call conversation. Each call note is separated by a new line "\n".  |

When processing the insights objects—such as reconstructing conversations using the utterances in the `Transcript` objects, you can match the speaker ID from a transcript object with the corresponding speaker ID in the `speakerInfo` object. This allows you to display the speaker's name (if available) alongside the utterance text.
