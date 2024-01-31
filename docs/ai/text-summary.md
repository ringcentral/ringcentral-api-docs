# Conversation summaries

The Artificial Intelligence conversation summarization API allows you to summarize the contents of speaker-tagged audio transcript by extracting what is determined to be the most relevant parts of the conversation. The API provides two types of summaries:

- **Abstractive**. The summary generated is a unique construction that attempts to convey the meaning of the text. This is ideal for generating an abstract of the specified text. 
- **Extractive**. The summary generated is a sequence of excerpts of the most relevant sentences. This is ideal for creating a list of highlights from a block of text. 

The API also allows developers to optionally specify the start and end times, as well as a speaker ID in order to generate a summary from a portion of a larger previously diarized transcription, or to contrain the summary to a specific time period. '

## Generating a summary from a block of text

### Request parameters

| Parameter     | Type                  | Description                     |
| ------------- | --------------------- | ------------------------------- |
| `summaryType` | String                | Permitted values: `Extractive` (default), `AbstractiveLong`, `AbstractiveShort`, `All`. Specify `All` to compute both extractive and abstractive type of summaries. |
| `utterances`  | List[utterances-Data] | List of speakerId, start, end and text object. |

### utterances-Data

| Parameter   | Type   | Description                                                                                        |
| ---------   | ------ | -----------------------------                                                                      |
| `text`      | String | Text blob for summary.                                                                             |
| `speakerId` | String | Speaker id for the text blob. Optional. Used in an abstractive summary to reference in the output. |
| `start`     | Number | start time of the segment. Optional.                                                               |
| `end`       | Number | start time of the segment. Optional.                                                               |

### Example code

After you have setup a [simple web server to process the response](asynchronous-responses.md), copy and paste the code from below in a file. In the process, make sure to edit the variables found in ALL CAPS to ensure your code runs properly. 

=== "Javascript"

    ```javascript
    {!> code-samples/ai/summarize.js !}
    ```

    Run your sample code.

    ```bash
    $ node index.js
    ```

=== "Python"

    ```python
    {!> code-samples/ai/summarize.py !}
    ```

    Run your sample code.
    
    ```bash
    $ python3 app.py
    ```

### Example response

```json
{!> code-samples/ai/summarize-response.json !}
```

#### Summaries Object

| Parameter   | Type                      | Description                                                    |
| ----------  | ------                    | -------------------------------------------------------------- |
| `summaries` | List[Summary-Output-Unit] | Summary-Output Unit object defined below                       |

#### Summary-Output Unit

| Parameter  | Type                       | Description                                                  |
| ---------- | ------                     | ---------------------------------------------                |
| `name`     | Enum                       | Options: `Extractive`, `AbstractiveLong`, `AbstractiveShort` |
| `values`   | List[Summary-Timings-Unit] | Summary-Output Unit object defined below                     |

#### Summary-Timings Unit

| Parameter    | Type   | Description                                   |
| ----------   | ------ | --------------------------------------------- |
| `start`      | Number | Start time of the summary segment in seconds. |
| `end`        | Number | End time of the summary segment in seconds.   |
| `value`      | String | Text of the summary segment.                  |
| `confidence` | Number | confidence score for the summary segment      |
