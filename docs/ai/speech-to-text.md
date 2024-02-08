# Speech to text transcription

Speech-to-text is the process of converting speech content into text. RingCentral uses advanced machine learning algorithms to transcribe speech to text and further process the text contents to provide rich transcription with punctuations, number of speakers and conversational utterances with useful properties such as speaker id, timestamps of every utterance and of every spoken word.

The Speech-to-text API also supports speaker recognition if you have trained the voice signature of the speakers using the [Speaker id enrollment API](speaker-enrollment.md). Speaker recognition relies on the API `speakerIds` input as list of pre-enrolled speaker ids of the potential speakers in the conversation.

!!! Note "English is currently the only supported language."

## Transcribing speech to text in media files

### Request parameters

| Parameter      | Type   | Description                                                     |
| -------------- | ------ | --------------------------------------------------------------- |
| `encoding`     | String | Encoding of audio file like MP3, WAV etc.                       |
| `languageCode` | String | Language spoken in the audio file. Default of "en-US".          |
| `contentUri`   | String | Publicly accessible url of a media content.                                            |
| `audioType`    | String | Type of the audio based on number of speakers. Optional. Permitted values: `CallCenter` (default), `Meeting`, `EarningsCalls`, `Interview`, `PressConference` |
| `source`       | String | The source for the audio file: Webex, Zoom, GotoMeeting, Phone. Optional. The value will be used if `enableSpeakerDiarization` is set to `True`. |
| `speakerCount` | Number | Number of speakers in the file. Set to `-1` (default) if there are an unknown number of speakers. Optional. The value will be used if `enableSpeakerDiarization` is set to `True`.      |
| `speakerIds`   | List[String] | A list of speakers to be identified. See [speaker enrollment](speaker-enrollment.md) section for more details. Optional. The value will be used if `enableSpeakerDiarization` is set to `True`. |
| `enableVoiceActivityDetection` | Boolean | Apply voice activity detection. Optional. Default of `False`. The value will be used if `enableSpeakerDiarization` is set to `True`. |
| `enablePunctuation`         | Boolean | Enables RingCentral's [Smart Punctuation API](text-punctuation.md). Optional. Default of `True`. |
| `enableSpeakerDiarization`  | Boolean | Tags each word corresponding to the speaker. Optional. Default of `False`. |
| `separateSpeakerPerChannel` | Boolean | Set to `True` if the input audio is multi-channel and each channel has a separate speaker. Optional. Default of `False`. The value will be used if `enableSpeakerDiarization` is set to `True`. |
| `source`       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc. Optional. |

* The `audioType` parameter provides the system with a hint about the nature of the audio conversations which helps improve accuracy. We recommend setting this parameter to `CallCenter` when there are 2-3 speakers expected to be identified and `Meeting` when 4-6 speakers are expected.

* Set the `enableVoiceActivityDetection` parameter to `True` if you want silence and noise segments removed from the diarization output. We suggest you to set it to `True` in most circumstances.

* Setting the `source` parameter helps to optimize the diarization process by allowing a specialized acoustic model built specifically for the corresponding audio sources.

* If you specify the `speakerIds` parameter, make sure that all the speaker ids in the array exist. Otherwise, the API call will fail. As a good practice, you can always read the speaker ids from your account and use the correct ids of the speakers, who you think that might speak in the audio file.

### Example code

Try out the [AI Quick Start Guide](quick-start.md)

### Sample response

!!! Note "The response data differs based on the API input parameters. For instance, if the `enableSpeakerDiarization` flag is set to false, the response will not include the speaker id info and the utterances segment will be omitted. This will also speed up the transcription processing time. Therefore, if you need to transcribe a voicemail recording, you should set the `enableSpeakerDiarization` to false."

```json
{!> code-samples/ai/quick-start-response.json !}
```

| Parameter      | Type   | Description                                                                                             |
| -------------- | ------ | ---------------------------------                                                                       |
| `speakerCount` | Number | The number of speakers detected. Optional. Field is set only when `enableSpeakerDiarization` is `true`. |
| `words`        | List   | List of word segments (see below).                                                                      |
| `transcript`   | String | The entire transcript with/without punctuations according to the input.                                 |
| `confidence`   | Number | Overall transcription confidence.                                                                       |
| `utterances`   | list   | List of utterances                                                                                      |

#### Word Segment

| Parameter    | Type   | Description                                                                                                                |
| ----------   | ------ | ---------------------------------------------------                                                                        |
| `speakerId`  | String | The speaker id for the corresponding audio segment. Optional. Field is set only when `enableSpeakerDiarization` is `true`. |
| `start`      | Number | Start time of the audio segment in seconds.                                                                                |
| `end`        | Number | End time of the audio segment in seconds.                                                                                  |
| `word`       | String | The word corresponding to the audio segment.                                                                               |
| `confidence` | Number | Confidence score for the word.                                                                                             |

#### Utterances Segment

| Parameter    | Type   | Description                                                                                                                |
| ----------   | ------ | ---------------------------------------------------                                                                        |
| `speakerId`  | String | The speaker id for the corresponding audio segment. Optional. Field is set only when `enableSpeakerDiarization` is `true`. |
| `start`      | Number | Start time of the audio segment in seconds.                                                                                |
| `end`        | Number | End time of the audio segment in seconds.                                                                                  |
| `text`       | String | The utterance.                                                                                                             |
| `confidence` | Number | Confidence score for the word.                                                                                             |
| `wordTimings`| List   | List of spoken words within this utterance                                                                                 |

#### WordTimings Segment

| Parameter    | Type   | Description                                                                                                                |
| ----------   | ------ | ---------------------------------------------------                                                                        |
| `speakerId`  | String | The speaker id for the corresponding audio segment. Optional. Field is set only when `enableSpeakerDiarization` is `true`. |
| `confidence` | Number | Confidence score for the word. |
| `start`      | Number | Start time of the audio segment in seconds.                                                                                |
| `end`        | Number | End time of the audio segment in seconds.                                                                                  |
| `word`       | String | The spoken word.                                                                                                           |
