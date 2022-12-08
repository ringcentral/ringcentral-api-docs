# Speaker identification

The Speaker Identification API is used in order to determine "who speaks when" for a given media file. It is intended to be used to identify speakers who have been previously [enrolled](../speaker-enrollment/). The Speaker Identification API segments an audio clip into a sequence of utterances, each corresponding to a unique speaker. It then attempts to determine the identity of each speaker based upon their voice print. In cases where the speaker is ambiguous or unknown, utterances are marked with a status of `UserNotIdentified`.

## Identifying speakers

### Request parameters

To identify speakers using the Speaker Identification API, one must formulate a request using the following request parameters:

| Parameter     | Type          | Description                               |
| -------------- | ------------ | ----------------------------------------- |
| `encoding`     | String       | Encoding of audio file like MP3, WAV etc. |
| `languageCode` | String       | Language spoken in the audio file. Default: `en-US` |
| `audioType`    | String       | Type of the audio based on number of speakers. Allowed values are: `CallCenter` (default), `Meeting`, `EarningsCalls`, `Interview`, `PressConference`. Optional, but is useful as a hint to aid in the identification process. |
| `speakerIds`   | List[String] | List of previously enrolled speakers to identify in the media file. |
| `contentUri`   | String       | Publicly facing URL where the media file can be accessed. |
| `source`       | String       | Source of the audio file, e.g.: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc |

To properly identify speakers in a media file, speakers must have been [previously enrolled](../speaker-enrollment/) so that their voice print can be compared to the speakers in the audio file. It also relies on the developer having some knowledge of who the likely speakers are in the media file being processed, and providing a list of those speakers in their request.

### Sample code

After you have setup a [simple web server to process the response](../asynchronous-responses/), copy and paste the code from below in `index.js` and makesure to edit the variables in ALL CAPS to ensure your code runs properly. 

=== "Javascript"

    ```javascript
    {!> code-samples/ai/id-speaker.js !}
	```

### Example response

```json
{!> code-samples/ai/speaker-id-response.json !}
```

Each utterance contains the following information and parameters:

| Parameter    | Type   | Description                           |
| ----------   | ------ | ------------------------------------- |
| `speakerId`  | String | speaker id of the identified speaker. |
| `start`      | Float  | Start of the audio segment.           |
| `end`        | Float  | end of the audio segment.             |
| `confidence` | Number | Confidence of speaker identification. |

