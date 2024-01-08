# Speaker enrollment

Speaker enrollment is a process by which an identity becomes associated with a voice or acoustic signature. This allows RingCentral to include those identities in any reports it generates about the speakers within a media file.

Our speaker enrollment API can be used to register speakers and their voices before calling our other speaker-related APIs such as [speaker identification](../speaker-identification/), and [speaker diarization](../speaker-diarization/). The speaker enrollment process is *content agnostic*, meaning there are no specific requirements or restrictions on what the speaker says in order to generate their audio signature. However, for the best results, obey the following guidelines:

* Use audio samples that are 12-30 seconds in length. Samples with more than 30 seconds will potentially be rejected due to too large size of based64 encoded content.
* Ensure the sample include continuous and monologue speech, no silence, and no background noise if possible.
* Enroll a speaker multiple times using different audio samples that exhibit diversity in the person's speech. After each enrollment, check the enrollment quality in the response. You should expect the quality to be "High".
* If the total speech duration of an enrollment is less than 12 seconds, the enrollment will be treated as incomplete and `enrollmentComplete` will be set to `false`.
* Enrollments with status `enrollmentComplete=True` will be considered for identification, otherwise an error will be returned.

When enrolling a new speaker identification, a unique `speakerId` (a string of alphabetic, numeric and underscore characters) must be specified as an input. The system will register the `speakerId` value and associate it with the voice signature in the provided audio file. If the system detects that the specified `speakerId` exists, it will return an error '409 Conflict'. In that case, you have to update the enrollment if the audio content is recorded from the same person's speech that previously enrolled with that speaker Id. Or you have to specify a new `speakerId` value if the audio content is recorded from a different person's speech.

A speaker Id will be returned in a response of other AI APIs; E.g. the [speech to text API](../speech-to-text), which supports the speaker identification if the voice speech in the audio matches the voice signature associated with the specified `speakerId` (provided that you set the `speakerId` in the API request!). The system does not record any other personal data relating to the speaker. Therefore, it is the developer's responsibility to store a speaker id and associate it with other data that will allow the client application to display the speaker's name or other speaker metadata in the final output.

It's worth mentioning that a `speakerId` is a unique identifier within the same RingCentral account. Therefore, using a person's name to specify the speaker id of users in a large RingCentral account might cause name collision problem. The best practice to enroll speaker identification for users under the same RingCentral account is to use the user's extension id, which is a unique id not only under the same account, but also across all other RingCentral accounts. The benefit of using a user's extension id as a speaker id is that you don't need to store the speaker id with other associated user metadata in your database. You can always use an extension id to read the user metadata e.g. the user first and last name from your RingCentral account and replace the speaker id with the name of the speaker. This is also useful for transcribing a RingCentral call recording when you get the recording URL from a call record from your call log data, which contains the extension id of the user as one of the call party. In that case, simply specify the extension id in the `speakerIds` body params of the AI API.

```json hl_lines="18 24"
{
  "uri": 'https://platform.ringcentral.com/restapi/v1.0/account/...',
  "id": 'WKt-N7_...',
  "duration": 228,
  "durationMs": 227606,
  "type": 'Voice',
  "direction": 'Inbound',
  "action": 'Phone Call',
  "result": 'Accepted',
  "to": {
        "name": 'Agent 1200',
        "extensionId": '59586xxxx',
        "extensionNumber": '11120'
  },
  "from": { "name": '...', "phoneNumber": '...' },
  "extension": {
        "uri": 'https://platform.ringcentral.com/restapi/v1.0/account/...',
        "id": 59586xxxx
  },
  "recording": {
        "uri": "https://platform.ringcentral.com/restapi/v1.0/account/40119014xxxx/recording/401547458000",
        "id": "401547458000",
        "type": "OnDemand",
        "contentUri": "https://media.ringcentral.com/restapi/v1.0/account/40119014xxxx/recording/401547458000/content"
  }
  ...
}
```

If you find that speaker identification is unreliable for a given individual, you may want to consider augmenting a speaker's enrollment with additional audio files. The process of reenrolling a speaker is done by updating an existing speaker id.


## Sample code

The following sample code shows how to enroll a speaker identification for a user extension using its extension id as a `speakerId`. It checks if a speaker id exists, then update the enrollment, otherwise it creates a new speaker id enrollment.

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * You can only run on your production account, this means that you have to use app credentials for production.
    * Also make sure that you have recorded several voice recordings of your own voice.

=== "JavaScript"

    ```javascript
    {!> code-samples/ai/code-snippets-headers/header.js [ln:1-12] !}
    {!> code-samples/ai/code-snippets/enrollment.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/ai/code-snippets/enrollment.py !}
    {!> code-samples/ai/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/ai/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/ai/code-snippets/enrollment.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/ai/code-snippets/enrollment.rb !}
    {!> code-samples/ai/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/ai/code-snippets/enrollment.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/ai/code-snippets/enrollment.java !}
    ```

### Sample response

If your speaker identification request is processed successfully, the response payload will resemble the following:

```json
{!> code-samples/ai/enroll-speaker-response.json !}
```

| Attribute            | Type   | Description                                                                          |
| -------------------- | ------ | ----------------------------------------                                             |
| `speakerId`         | String | Registered speaker id.                                                               |
| `enrollmentQuality`    | String | Quality of the enrollment. Values will be one of: `Poor`, `Average`, `Good`, `High`. |
| `enrollmentComplete`   | Bool   | Status of the enrollment. Will be set to `True` if total speech exceeds 12 secs.       |
| `totalSpeechDuration`  | Number | Total Speech Duration of the enrollment.                                             |
| `totalEnrollDuration`  | Number | Total Duration of the enrollment.                                                    |
