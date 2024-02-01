# Recognizing Emotion From a Meeting Recording

AI's emotion recognition API extracts emotions from an audio file in a time-sliced manner. For example, if you pass a media file with a duration of 10 minutes, you will get a detailed JSON response with the emotional analysis done every 3-6 seconds of that 10 min recording. 

The emotions recognized by this API are based on the [Plutchik Wheel of Emotions](https://www.6seconds.org/2022/03/13/plutchik-wheel-emotions/). Emotions are complex, and there are a great deal of nuance when communicating emotion. For this reason, the API supports a limited range of basic emotions including:

* anger
* excitement
* frustration
* happiness
* sadness 
* neutrality

If you are looking for emotion recognition on per-utterance, per-speaker basis, use the [Interaction Analytics API](interaction-analytics.md), as this API doesn't provide speech-to-text and speaker diarization capabilities. Instead, this API provides a pure time-sliced emotion detection capability for an audio/video recording.

## Performing emotion analysis

### Request parameters

| Parameter     | Type          | Description                               |
| -------------- | ------------ | ----------------------------------------- |
| `encoding`     | String       | Encoding of audio file like MP3, WAV etc. |
| `languageCode` | String       | Language spoken in the audio file. Default: `en-US` |
| `audioType`    | String       | Type of the audio based on number of speakers. Allowed values are: `CallCenter` (default), `Meeting`, `EarningsCalls`, `Interview`, `PressConference`. Optional, but is useful as a hint to aid in the identification process. |
| `contentUri`   | String       | Publicly facing URL where the media file can be accessed. |
| `source`       | String       | Source of the audio file, e.g.: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc |


### Sample code

After you have setup a [simple web server to process the response](asynchronous-responses.md), copy and paste the code from below in `index.js` and make sure to edit the variables in ALL CAPS to ensure your code runs properly. 

=== "Javascript"

    ```javascript
    {!> code-samples/ai/emotion-detection.js !}
    ```

    Run your sample code.

    ```bash
    $ node index.js
    ```

### Sample response

    ```json
    {!> code-samples/ai/emotion-detection-response.json !}
    ```

The response contains an array of `Emotion-Object` described below.

| Parameter   | Type   | Description                                     | Notes |
| ----------- | ------ | ----------------------------------------------- | ----- |
| `emotion`   | String | Type of emotion. | Possible emotion values: `Anger`, `Excited`, `Frustration`, `Happy`, `Sad` and `Neutral` |
| `start`     | Float  | Start of the audio segment.                     |       |
| `end`       | Float  | end of the audio segment.                       |       |
 

