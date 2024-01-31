# Text transcription

Speech-to-text, automatic speech recognition, or transcription is the process of converting the audio contents of a media file into structured breakdown of what was said, by whom, and when. In addition, the API has the ability to automatically modify the transcribed text with proper punctuation for easier reading and consumption. If speaker diarization is enabled, then the response will also contain a speaker count and associate each spoken word with the most probably speaker.
 
The Speech-to-Text API is best used in tandem with [speaker enrollment](speaker-enrollment.md) to help identify the speakers in a media file. Speaker identification relies upon the developer to pass to the API a list of potential speakers so that they can be identified. 

!!! tip "English is currently the only supported language."

## Transcribing speech to text in media files

### Request parameters

| Parameter      | Type   | Description                                                     |
| -------------- | ------ | --------------------------------------------------------------- |
| `encoding`     | String | Encoding of audio file like MP3, WAV etc.                       |
| `languageCode` | String | Language spoken in the audio file. Default of "en-US".          |
| `contentUri`   | String | Publicly facing url.                                            |
| `audioType`    | String | Type of the audio based on number of speakers. Optional. Permitted values: `CallCenter` (default), `Meeting`, `EarningsCalls`, `Interview`, `PressConference` |
| `source`       | String | The source for the audio file: Webex, Zoom, GotoMeeting, Phone. Optional. The value will be used if `enableSpeakerDiarization` is set to `True`. |
| `speakerCount` | Number | Number of speakers in the file. Set to `-1` (default) if there are an unknown number of speakers. Optional. The value will be used if `enableSpeakerDiarization` is set to `True`.      |
| `speakerIds`   | List[String] | Optional set of speakers to be identified. Optional. The value will be used if `enableSpeakerDiarization` is set to `True`. |
| `enableVoiceActivityDetection` | Boolean | Apply voice activity detection. Optional. Default of `False`. The value will be used if `enableSpeakerDiarization` is set to `True`. |
| `enablePunctuation`         | Boolean | Enables RingCentral's [Smart Punctuation API](text-punctuation.md). Optional. Default of `True`. |
| `enableSpeakerDiarization`  | Boolean | Tags each word corresponding to the speaker. Optional. Default of `False`. |
| `separateSpeakerPerChannel` | Boolean | Set to `True` if the input audio is multi-channel and each channel has a separate speaker. Optional. Default of `False`. The value will be used if `enableSpeakerDiarization` is set to `True`. |
| `source`       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc. Optional. |

* The `audioType` parameter provides the system with a hint about the nature of the meeting which helps improve accuracy. We recommend setting this parameter to `CallCenter` when there are 2-3 speakers expected to be identified and `Meeting` when 4-6 speakers are expected.

* Set the `enableVoiceActivityDetection` parameter to `True` if you want silence and noise segments removed from the diarization output. We suggest you to set it to `True` in most circumstances. 

* Setting the `source` parameter helps to optimize the diarization process by allowing a specialized acoustic model built specifically for the corresponding audio sources. 

### Example code

After you have setup a [simple web server to process the response](asynchronous-responses.md), copy and paste the code from below in `index.js` and make sure to edit the variables in ALL CAPS to ensure your code runs properly. 

=== "Javascript"

    ```javascript
    {!> code-samples/ai/transcribe.js !}
    ```

    Run your sample code.

    ```bash
    $ node index.js
    ```


=== "Python"

    ```python
    {!> code-samples/ai/transcribe.py !}
    ```

    You are almost done. Now run your script to make the request and receive the response.
    
    ```bash
    $ python3 app.py
    ```

### Example response

```json
{!> code-samples/ai/transcribe-response.json !}
```

| Parameter      | Type   | Description                                                                                             |
| -------------- | ------ | ---------------------------------                                                                       |
| `speakerCount` | Number | The number of speakers detected. Optional. Field is set only when `enableSpeakerDiarization` is `true`. |
| `words`        | List   | List of word segments (see below).                                                                      |
| `transcript`   | String | The entire transcript with/without punctuations according to the input.                                 |
| `confidence`   | Number | Overall transcription confidence.                                                                       |


#### Word Segment

| Parameter    | Type   | Description                                                                                                                |
| ----------   | ------ | ---------------------------------------------------                                                                        |
| `speakerId`  | String | The speaker id for the corresponding audio segment. Optional. Field is set only when `enableSpeakerDiarization` is `true`. |
| `start`      | Number | Start time of the audio segment in seconds.                                                                                |
| `end`        | Number | End time of the audio segment in seconds.                                                                                  |
| `word`       | String | The word corresponding to the audio segment.                                                                               |
| `confidence` | Number | Confidence score for the word.                                                                                             |
