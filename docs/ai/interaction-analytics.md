# Extract interaction analytics from a media file

Interaction analytics is used to understand a conversation happening in a meeting between two or more people and extract from them more meaningful insights at scale. This API is a comprehensive in that in addition to its unique capabilities, it also bundles functionality found in our other APIs. In processing a media file, this API will provide multiple levels of insights, including:

* Conversation insights
    * [transcription](../speech-to-text/) with [smart punctuation](../text-punctuation/)
    * [content summaries](../text-summary/)
    * keywords and conversation metrics
* Speaker-level insights
    * [speaker diarization](../speaker-diarization/)
    * [speaker identification](../speaker-identification/)
* Utterance-level insights
    * emotion recognition

Let's say we want to analyze a meeting between sales rep and a customer, and that meeting lasted for twenty minutes. Here are some of the insights we can extract using this API: 

* Speaker contribution, e.g. sales rep spoke for twelve minutes, and the customer spoke for eight minutes. 
* Speaker pace, e.g. words spoken per minute.
* Speaker emotions, e.g. what was the tone or emotional context of ever utterance.
* Auto-generated meeting summary

## Extracting interaction analytics

For the best results we recommend following these guidelines. 

* The `audioType` parameter provides the system with a hint about the nature of the meeting which helps improve accuracy. We recommend setting this parameter to `CallCenter` when there are 2-3 speakers expected to be identified and `Meeting` when 4-6 speakers are expected.

* Set the `enableVoiceActivityDetection` parameter to `True` if you want silence and noise segments removed from the diarization output. We suggest you to set it to `True` in most circumstances. 

* Setting the `source` parameter helps to optimize the diarization process by allowing a specialized acoustic model built specifically for the corresponding audio sources. 

* For proper speaker indentification, make sure you have previously [enrolled all speakers in the media file](../speaker-enrollment/) and include them in the `speakerIds` parameter.

### Request parameters

| Parameter      | Type   | Description                                             |
| -------------- | ------ | ------------------------------------------------------- |
| `encoding`     | String | Encoding of audio file like MP3, WAV etc.               |
| `sampleRate`   | Number | Sample rate of the audio file. Optional.                |
| `languageCode` | String | Language spoken in the audio file. Default of "en-US".  |
| `separateSpeakerPerChannel` | Boolean | Set to True if the input audio is multi-channel and each channel has a separate speaker. Optional. Default of `False`. |
| `speakerCount` | Number | Number of speakers in the file. Optional.         |
| `audioType`    | String | Type of the audio based on number of speakers. Optional. Permitted values: `CallCenter`, `Meeting`, `EarningsCalls`, `Interview`, `PressConference` |
| `speakerIds`   | List[String] | Optional set of speakers to be identified from the call. Optional.  |
| `enableVoiceActivityDetection` | Boolean  | Apply voice activity detection. Optional. Default of `False`. |
| `contentUri`   | String | Publicly facing url. | 
| `source`       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc. Optional. |
| `insights`     | List[String] | List of metrics to be run. Send `['All']` to extract all analytics. Permitted Values: `All`, `KeyPhrases`, `Emotion`, `AbstractiveSummaryLong`, `AbstractiveSummaryShort`, `ExtractiveSummary`, `TalkToListenRatio`, `Energy`, `Pace`, `QuestionsAsked`, `Title`, `Tasks`. |

### Example code

After you have setup a [simple web server to process the response](../asynchronous-responses/), copy and paste the code from below in `index.js` and make sure to edit the variables in ALL CAPS to ensure your code runs properly. 

=== "JavaScript"

    ```javascript
    {!> code-samples/ai/interactions.js !}
    ```

    You are almost done. Now run your script to make the request and receive the response.
    
    ```bash
    $ node index.js
    ```

=== "Python"

    ```python
    {!> code-samples/ai/interactions.py !}
    ```

    #### Run Your Code
    You are almost done. Now run your script to make the request and receive the response.
    
    ```bash
    $ python3 app.py
    ```
### Example response

```json
{!> code-samples/ai/interactions-response.json !}
```

!!! note "**NOTES:** "
    * In case of `ExtractiveSummary`, the start and end times refer to the exact time of the segment.
    * In case of `AbstractiveSummaryLong` and `AbstractiveSummaryShort` the start and end time refer to the time of text blob which is abstracted.

#### Interaction-Analytics-Object

| Parameter                | Type                                 | Description                                                         |
| ------------             | ------                               | ---------------------------------------------------------           |
| `utteranceInsights`      | List[Utterance-Insights]             | List of utterances and the insights computed for each utterance.    |
| `speakerInsights`        | Object                               | The set of insights computed for each speaker separately.           |
| `conversationalInsights` | List[Conversational-Insights-Object] | List of insights computed by analyzing the conversation as a whole. |

#### Utterance-Insights-Object

| Parameter     | Type                          | Description                                            |
| ------------- | ------                        | ------------------------------------------------------ |
| `speakerId`   | String                        | The speaker id for the corresponding audio segment.    |
| `start`       | Number                        | Start time of the audio segment in seconds.            |
| `end`         | Number                        | End time of the audio segment in seconds.              |
| `text`        | String                        | The transcription output corresponding to the segment. |
| `confidence`  | Number                        | The confidence score for the transcribed segment.      |
| `insights`    | List[Utterance-Insights-Unit] | List of utterance level insights                       |

#### Utterance-Insights-Unit

| Parameter     | Type        | Description                                                                                  |
| ------------- | ------      | ------------------------------------------------------                                       |
| `name`        | String Enum | Possible values: Anger, Anticipation, Disgust, Fear, Joy, Sadness, Surprise, Trust, Neutral. |
| `value`       | String      | Value corresponding to the insight.                                                          |
| `confidence`  | Number      | Confidence Score. Optional.                                                                  |

#### Speaker-Insights-Object

| Parameter      | Type                        | Description                                                                                                           |
| ----------     | ------                      | ---------------------------------------------------                                                                   |
| `speakerCount` | Number                      | Number of speakers detected. In case `speakerCount`  isn't set, the number of speakers are estimated algorithmically. |
| `insights`     | List[Speaker-Insights-Unit] | List of utterance level insights. Each insight is computed separately for each speaker.                               |

#### Speaker-Insights-Unit

| Parameter     | Type                              | Description                                                                 |
| ------------- | ------                            | ------------------------------------------------------                      |
| `name`        | String Enum                       | Name of the insight. Possible values: `Energy`, `Pace`, `TalkToListenRatio` |
| `values`      | List[Speaker-Insights-Value-Unit] | Value corresponding to the insight                                          |

#### Speaker-Insights-Value-Unit

| Parameter   | Type   | Description                                             |
| ----------  | ------ | ------------------------------------------------------- |
| `speakerId` | String | The speaker id for whom insights are computed.          |
| `value`     | Number | The computed value of the insight for this speaker.     |

#### Timed-Segment

| Parameter  | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| `start`      | Number | Start time of the audio segment in seconds. |
| `end`        | Number | End time of the audio segment in seconds.   |

#### Conversational-Insights-Object

| Parameter     | Type        | Description                                            |
| ------------- | ------      | ------------------------------------------------------ |
| `name`        | String Enum | Name of the insight. Possible values: `AbstractiveSummaryLong`, `AbstractiveSummaryShort`, `ExtractiveSummary`,  `KeyPhrases`, `Tasks`, `Titles`, `QuestionsAsked` |
| `values`      | List[Conversational-Insights-Value-Unit] | Value corresponding to the insight |

#### Conversational-Insights-Value-Unit

| Parameter    | Type   | Description                                               |
| ------------ | ------ | --------------------------------------------------------- |
| `start`      | Number | Start time of the audio segment in seconds.               |
| `end`        | Number | End time of the audio segment in seconds.                 |
| `value`      | String | The output corresponding to the insight.                  |
| `confidence` | Number | The confidence score for the computed insight.            |

