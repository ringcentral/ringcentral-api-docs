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

Let's say we want to analyze a meeting between a sales representative and a customer, and that meeting lasted for twenty minutes. Here are some of the insights we can extract using this API:

* Speaker talking time, e.g. a sales representative spoke for ten minutes, and the customer spoke for eight minutes.
* Speaker pace, which is measured by an average number of words spoken per minute.
* Speaker emotions, which was the tone or emotional context of every utterance.
* Auto-generated meeting summary

## Extracting interaction analytics

For the best results we recommend following the guidelines below.

* The `audioType` parameter provides the system with a hint about the nature of the meeting which helps improve accuracy. We recommend setting this parameter to `CallCenter` when there are 2-3 speakers expected to be identified and `Meeting` when 4 or more speakers are expected.

* Set the `enableVoiceActivityDetection` parameter to `True` if you want silence and noise segments removed from the diarization output. We suggest you to set it to `True` in most circumstances.

* Setting the `source` parameter helps to optimize the diarization process by allowing a specialized acoustic model built specifically for the corresponding audio sources.

* If you specify the `speakerIds` parameter, make sure that all the speaker ids in the array exist. Otherwise, the API call will fail. As a good practice, you can always read the speaker ids from your account and use the correct ids of the speakers, who you think that might speak in the audio file.

### Request body parameters

| Parameter      | Type   | Description                                             |
| -------------- | ------ | ------------------------------------------------------- |
| `encoding`     | String | Encoding of audio file like MP3, WAV etc.               |
| `sampleRate`   | Number | Sample rate of the audio file. Optional.                |
| `languageCode` | String | Language spoken in the audio file. Default of "en-US".  |
| `separateSpeakerPerChannel` | Boolean | Set to True if the input audio is multi-channel and each channel has a separate speaker. Optional. Default of `False`. |
| `speakerCount` | Number | Number of speakers in the file. Optional.         |
| `audioType`    | String | Type of the audio based on number of speakers. Optional. Permitted values: `CallCenter`, `Meeting`, `EarningsCalls`, `Interview`, `PressConference`, `Voicemail` |
| `speakerIds`   | List[String] | Optional set of speakers to be identified from the audio. Optional.  |
| `enableVoiceActivityDetection` | Boolean  | Apply voice activity detection. Optional. Default of `False`. |
| `contentUri`   | String | Publicly facing url. |
| `source`       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc. Optional. |
| `insights`     | List[String] | List of insights to be returned. Specify `['All']` to extract all insight analytics. Permitted Values: `All`, `KeyPhrases`, `Emotion`, `AbstractiveSummaryLong`, `AbstractiveSummaryShort`, `ExtractiveSummary`, `TalkToListenRatio`, `Energy`, `Pace`, `QuestionsAsked`, `Topics`. |
| `speechContexts` | List[Phrase Object] | Indicates the words/phrases that will be used for boosting the transcript. This can help to boost accuracy for cases like Person Names, Company names etc. |

## Sample code to extract insights of a conversation

The following code sample shows how to extract insights of a conversations from a call recording.

Follow the instructions on the [quick start](../quick-start#) section to setup and run your server code before running the sample code below.

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * You can only run on your production account, this means that you have to use app credentials for production.
    * Also make sure that you have recorded several voice recordings of your own voice.

=== "JavaScript"

    ```javascript
    {!> code-samples/ai/code-snippets-headers/header.js !}
    {!> code-samples/ai/code-snippets/interactions.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/ai/code-snippets/interactions.py !}
    {!> code-samples/ai/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/ai/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/ai/code-snippets/interactions.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/ai/code-snippets/interactions.rb !}
    {!> code-samples/ai/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/ai/code-snippets/interactions.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/ai/code-snippets/interactions.java !}
    ```

### Example response

```json
{!> code-samples/ai/interactions-response.json !}
```

### Interaction-Analytics-Object

Interaction analytics are presented by insights grouped and categorized under the following category objects:

| Parameter                | Type                                 | Description                                                         |
| ------------             | ------                               | ---------------------------------------------------------           |
| `utteranceInsights`      | List[Utterance-Insights]             | List of utterances and the insights computed for each utterance.    |
| `speakerInsights`        | Object                               | The set of insights computed for each speaker separately.           |
| `conversationalInsights` | List[Conversational-Insights-Object] | List of insights computed by analyzing the conversation as a whole. |

### Utterance-Insights

The `utteranceInsights` is a list of objects, with each object contains the following key/value pairs:

| Parameter     | Type                          | Description                                            |
| ------------- | ------                        | ------------------------------------------------------ |
| `start`       | Number                        | Start time of the audio segment in seconds.            |
| `end`         | Number                        | End time of the audio segment in seconds.              |
| `text`        | String                        | The transcription output corresponding to the segment (a.k.a an utterance). |
| `confidence`  | Number                        | The confidence score for the transcribed segment.      |
| `speakerId`   | String                        | The speaker id for the corresponding audio segment.    |
| `insights`    | List[Utterance-Insights-Unit] | List of insights from the utterance text.              |

#### Utterance-Insights-Unit

Currently, only the `Emotion` insight is supported

| Parameter     | Type        | Description                                                                                  |
| ------------- | ------      | ------------------------------------------------------                                       |
| `name`        | String Enum | Currently supported insight: [ Emotion ].                                                    |
| `value`       | String      | Possible values: Anger, Anticipation, Disgust, Fear, Joy, Sadness, Surprise, Trust, Neutral. |
| `confidence`  | Number      | Confidence Score. Optional.                                                                  |

### Speaker-Insights-Object

The `speakerInsights` object contain the number of speakers which was detected

| Parameter      | Type       | Description    |
| ----------     | ------     | --------------------------------------------------- |
| `speakerCount` | Number     | Number of speakers detected. In case `speakerCount` is not specified, the number of speakers are estimated algorithmically. |
| `insights`     | List[Speaker-Insights-Unit] | List of overall level insights. Each insight is computed separately for each speaker. |

#### Speaker-Insights-Unit

| Parameter     | Type                              | Description |
| ------------- | ------                            | ----------- |
| `name`        | String Enum                       | Name of the insight. Possible values: `Energy`, `Pace`, `TalkToListenRatio`, `QuestionsAsked` |
| `values`      | List[Speaker-Insights-Value-Unit] | Value corresponding to the insight                                          |

##### Speaker-Insights-Value-Unit

- *Energy*

    | Parameter   | Type   | Description                                             |
    | ----------  | ------ | ------------------------------------------------------- |
    | `speakerId` | String | The speaker id for whom insights are computed.          |
    | `value`     | Number | The computed value of the insight for this speaker.     |

- *Pace*

    | Parameter   | Type   | Description                                             |
    | ----------  | ------ | ------------------------------------------------------- |
    | `speakerId` | String | The speaker id for whom insights are computed.          |
    | `value`     | String | The label of speech speed. `slow`, `medium` or `fast`.    |
    | `wpm`       | Number | The average number of words per minute spoken by this speaker.     |

- *TalkToListenRatio*

    | Parameter   | Type   | Description                                             |
    | ----------  | ------ | ------------------------------------------------------- |
    | `speakerId` | String | The speaker id for whom insights are computed.          |
    | `value`     | String | The computed time ratio a speaker talks and listens.     |

- *QuestionsAsked*

    | Parameter   | Type   | Description  |
    | ----------  | ------ | ------------ |
    | `speakerId` | String | The speaker id for whom insights are computed.          |
    | `value`     | Number | The computed value of the insight for this speaker.     |
    | `questions` | List[Question-Insights-Value-Unit] | List of questions asked by each speaker.     |

##### Question-Insights-Value-Unit

| Parameter   | Type   | Description                                             |
| ----------  | ------ | ------------------------------------------------------- |
| `text` | String | The question a speaker asked.          |
| `start`| Number | The start time of the audio segment in seconds.  |
| `end`  | Number | The end time of the audio segment in seconds.     |

#### Timed-Segment

| Parameter  | Type   | Description                                 |
| ---------- | ------ | ------------------------------------------- |
| `start`      | Number | Start time of the audio segment in seconds. |
| `end`        | Number | End time of the audio segment in seconds.   |

### Conversational-Insights-Object

| Parameter     | Type        | Description                                            |
| ------------- | ------      | ------------------------------------------------------ |
| `name`        | String Enum | Name of the insight. Possible values: `AbstractiveSummaryLong`, `AbstractiveSummaryShort`, `ExtractiveSummary`,  `KeyPhrases`, `Topics` |
| `values`      | List[Conversational-Insights-Value-Unit] | Value corresponding to the insight |

#### Conversational-Insights-Value-Unit

- *KeyPhrases*

    | Parameter    | Type   | Description                                               |
    | ------------ | ------ | --------------------------------------------------------- |
    | `start`      | Number | Start time of the audio segment in seconds.               |
    | `end`        | Number | End time of the audio segment in seconds.                 |
    | `value`      | String | The output corresponding to the insight.                  |
    | `confidence` | Number | The confidence score for the computed insight.            |

- *Topics*

    | Parameter    | Type   | Description                                               |
    | ------------ | ------ | --------------------------------------------------------- |
    | `start`      | Number | Start time of the audio segment in seconds.               |
    | `end`        | Number | End time of the audio segment in seconds.                 |
    | `value`      | String | The output corresponding to the insight.                  |
    | `confidence` | Number | The confidence score for the computed insight.            |

- *ExtractiveSummary*

    | Parameter    | Type   | Description                                               |
    | ------------ | ------ | --------------------------------------------------------- |
    | `start`      | Number | Start time of the audio segment in seconds.               |
    | `end`        | Number | End time of the audio segment in seconds.                 |
    | `sentence`   | String | The summarized text segment.                  |

- *AbstractiveSummaryLong*

    | Parameter    | Type   | Description                                               |
    | ------------ | ------ | --------------------------------------------------------- |
    | `value`      | String | The text of a long abstractive summary.                  |
    | `start`      | Number | Start time of the audio segment in seconds.               |
    | `end`        | Number | End time of the audio segment in seconds.                 |
    | `confidence` | Number | The confidence score for the computed insight.            |
    | `groupId`    | String | The index of this long abstractive summary.               |

- *AbstractiveSummaryShort*

    | Parameter    | Type   | Description                                               |
    | ------------ | ------ | --------------------------------------------------------- |
    | `value`      | String | The text of a short abstractive summary.                  |
    | `start`      | Number | Start time of the audio segment in seconds.               |
    | `end`        | Number | End time of the audio segment in seconds.                 |
    | `confidence` | Number | The confidence score for the computed insight.            |

!!! note "**NOTES:** "
    * In case of `ExtractiveSummary`, the start and end times refer to the exact time of the segment.
    * In case of `AbstractiveSummaryLong` and `AbstractiveSummaryShort` the start and end time refer to the time of text blob which is abstracted.
