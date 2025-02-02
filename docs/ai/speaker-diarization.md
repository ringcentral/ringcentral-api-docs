# Speaker diarization

Speaker diarization is the process that partitions audio stream into homogenous segments according to the speaker identity. It solves the problem of "Who Speaks When". This API splits audio clip into speech segments and tags them with speakers ids accordingly. This API also supports speaker identification by speaker ID if the speaker was already enrolled using [Speaker Enrollment API](speaker-enrollment.md).

## Using the diarization API

For the best results we recommend following these guidelines.

* The `audioType` parameter provides the system with a hint about the nature of the meeting which helps improve accuracy. We recommend setting this parameter to `CallCenter` when there are 2-3 speakers expected to be identified and `Meeting` when 4-6 speakers are expected.

* Set the `enableVoiceActivityDetection` parameter to `True` if you want silence and noise segments removed from the diarization output. We suggest you to set it to `True` in most circumstances.

* Setting the `source` parameter helps to optimize the diarization process by allowing a specialized acoustic model built specifically for the corresponding audio sources.

* For proper speaker indentification, make sure you have previously [enrolled all speakers in the media file](speaker-enrollment.md) and include them in the `speakerIds` parameter.

### Request parameters

| Parameter      | Type   | Description                                              |
| -------------- | ------ | -------------------------------------------------------- |
| `encoding`     | String | Encoding of audio file like MP3, WAV etc.                |
| `languageCode` | String | Language spoken in the audio file. Default of "en-US". |
| `separateSpeakerPerChannel` | Boolean | Set to True if the input audio is multi-channel and each channel has a separate speaker. Optional. Default of False. |
| `speakerCount` | Number | Number of speakers in the file. Optional.         |
| `audioType`    | String | Type of the audio based on number of speakers. Optional. Permitted values: `CallCenter` (default), `Meeting`, `EarningsCalls`, `Interview`, `PressConference` |
| `speakerIds`   | List[String] | Optional set of speakers to be identified from the call. Optional. |
| `contentUri`   | String | Publicly facing url. |
| `source`       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc. Optional. |
| `enableVoiceActivityDetection`  | Boolean | Apply voice activity detection. Optional. Default of False. |


## Sample code

The following example code shows how to detect speakers from a conversation in a media file.

Follow the instructions on the [quick start](quick-start.md) section to setup and run your server code before running the sample code below.

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * You can only run on your production account, this means that you have to use app credentials for production.

=== "JavaScript"

    ```javascript
    {!> code-samples/ai/code-snippets-headers/header.js [ln:1-12] !}
    {!> code-samples/ai/code-snippets/speaker-diarization.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/ai/code-snippets/speaker-diarization.py !}
    {!> code-samples/ai/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/ai/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/ai/code-snippets/speaker-diarization.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/ai/code-snippets/speaker-diarization.rb !}
    {!> code-samples/ai/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/ai/code-snippets/speaker-diarization.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/ai/code-snippets/speaker-diarization.java !}
    ```


### Sample response

```json
{
    "status": "Success",
    "response": {
      "speakerCount": 2,
      "utterances": [
        {
          "speakerId": "JohnDoe",
          "start": 0.3,
          "end": 5.1,
          "confidence": 0.97
        },
        ...
      ]
    }
}
```
