# Speaker identification

The Speaker Identification API can be used to determine "who speaks and when" from a conversation from a media file. It is intended to be used to identify speakers who have been previously [enrolled](../speaker-enrollment/) for speaker id. The Speaker Identification API segments an audio clip into a sequence of utterances, each corresponding to a unique speaker. It then attempts to determine the identity of each speaker based upon their voice signature. In cases where the speaker is ambiguous or unknown, utterances are marked with a status of `UserNotIdentified`.

### Request parameters

To identify speakers using the Speaker Identification API, one must formulate a request using the following request parameters:

| Parameter     | Type          | Description                               |
| -------------- | ------------ | ----------------------------------------- |
| `encoding`     | String       | Encoding of audio file like MP3, WAV etc. |
| `languageCode` | String       | Language spoken in the audio file. Default: `en-US` |
| `audioType`    | String       | Type of the audio based on number of speakers. Allowed values are: `CallCenter` (default), `Meeting`, `EarningsCalls`, `Interview`, `PressConference`, `Voicemail`. Optional, but is useful as a hint to aid in the identification process. |
| `speakerIds`   | List[String] | List of previously enrolled speakers to identify in the media file. |
| `contentUri`   | String       | Publicly facing URL where the media file can be accessed. |
| `source`       | String       | Source of the audio file, e.g.: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc |

To properly identify speakers in a media file, speakers must have been [previously enrolled](../speaker-enrollment/) so that their voice signature can be compared to the speakers in the audio file. It also relies on the developer having some knowledge of who the likely speakers are in the media file being processed, and providing a list of those speakers in their request.

## Sample code

The following example code shows how to identify speakers from a conversation in a media file.

Follow the instructions on the [quick start](../quick-start#) section to setup and run your server code before running the sample code below.

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * You can only run on your production account, this means that you have to use app credentials for production.
    * Also make sure that you have enrolled at least one speaker id under your account.

=== "JavaScript"

    ```javascript
    {!> code-samples/ai/code-snippets-headers/header.js [ln:1-12] !}
    {!> code-samples/ai/code-snippets/speaker-identification.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/ai/code-snippets/speaker-identification.py !}
    {!> code-samples/ai/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/ai/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/ai/code-snippets/speaker-identification.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/ai/code-snippets/speaker-identification.rb !}
    {!> code-samples/ai/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/ai/code-snippets/speaker-identification.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/ai/code-snippets/speaker-identification.java !}
    ```

### Sample response

If your speaker identification request is processed successfully, the response payload will resemble the following:

```json
{!> code-samples/ai/speaker-id-response.json !}
```

Each utterance contains the following information and parameters:

| Parameter    | Type   | Description                           |
| ----------   | ------ | ------------------------------------- |
| `speakerId`  | String | Speaker id of the identified speaker. |
| `start`      | Float  | Start of the audio segment.           |
| `end`        | Float  | End of the audio segment.             |
| `confidence` | Float | Confidence score of speaker identification. |
