# Speaker enrollment

Speaker enrollment is the process by which an identity becomes associated with a voice or accoustic signature. This allows RingCentral to include those identities in any reports it generates about the speakers within a media file. 

Our Speaker Enrollment API can be used to register speakers and their voices before calling our other speaker-related APIs such as [speaker identification](./speaker-identification/), and [speaker diarization](./speaker-diarization/). The speaker enrollment process is *content agnostic*, meaning there are no specific requirements or restrictions on what the speaker says in order generate their audio signature. However, for the best results, obey the following guidelines:

* Use audio samples that are 12-24 seconds in length. Samples with less than six or more than 30 seconds will be rejected. 
* Ensure the sample include continuous speech, no silence, and no background noise if possible. 
* Enroll a speaker using three to five audio samples that exhibit diversity in the person's speech, and do not use multiple samples from same audio recording.
* If the total speech duration of an enrollment is less than 12 seconds, the enrollment will be treated as incomplete and `enrollmentComplete` will be set to `false`.
* Enrollments with status `enrollmentComplete=True` will be considered for identification, otherwise an error will be returned.

Each enrolled speaker is given a unique `speakerId`. The system does not record any other personal data relating to the speaker. It is therefore the developer's responsibility to store a speaker's `speakerId` and associate it with other data that will allow the client application to display the speaker's name or other speaker meta data in your final output. 

If you find that speaker identification is unreliable for a given individual, you may want to consider augmenting a speaker's enrollment with additional audio files. The process of reenrolling a speaker is done by updating an existing enrollment/speaker. 

## Register a voice-print by enrolling speakers

After you have setup a [simple web server to process the response](../asynchronous-responses/), copy and paste the code from below in `index.js` and make sure to edit the variables in ALL CAPS to ensure your code runs properly. 

=== "Javascript"

    ```javascript
    {!> code-samples/ai/enroll-speaker.js !}
    ```

    Run your sample code.

    ```bash
    $ node index.js
    ```

### Sample response

When RingCentral is done processing your request, it will post the response back to the `webhookUrl` you specified. The payload of that callback will resemble the following:

```json
{!> code-samples/ai/enroll-speaker-response.json !}
```

| Parameter            | Type   | Description                                                                          |
| -------------------- | ------ | ----------------------------------------                                             |
| speakerId            | String | Registered speaker id.                                                               |
| enrollmentQuality    | String | Quality of the enrollment. Values will be one of: `Poor`, `Average`, `Good`, `High`. |
| enrollmentComplete   | Bool   | Status of the enrollment. Will be set to  `True` if total speech exceeds 12sec.      |
| totalSpeechDuration  | Number | Total Speech Duration of the enrollment.                                             |
| totalEnrollDuration  | Number | Total Duration of the enrollment.                                                    |

