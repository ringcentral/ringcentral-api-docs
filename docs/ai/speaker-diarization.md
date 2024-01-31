# Speaker diarization

Speaker Diarization is the process that partitions audio stream into homogenous segments according to the speaker identity. It solves the problem of "Who Speaks When". This API splits audio clip into speech segments and tags them with speakers ids accordingly. This API also supports speaker identification by speaker ID if the speaker was already enrolled using [Speaker Enrollment API](speaker-enrollment.md).

## Using the Diarization API

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
| `contentUri`          | String | Publicly facing url. |
| `source`       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc. Optional. |
| `enableVoiceActivityDetection`  | Boolean | Apply voice activity detection. Optional. Default of False. |


### Example code

After you have setup a [simple web server to process the response](asynchronous-responses.md), copy and paste the code from below in `index.js` and make sure to edit the variables in ALL CAPS to ensure your code runs properly. 

=== "Javascript"

    ```javascript
    {!> code-samples/ai/diarization.js !}
    ```

    Run your sample code.

    ```bash
    $ node index.js
    ```

=== "Python"

    ```python
    {!> code-samples/ai/diarization.py !}	
    ```

### Example response

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


