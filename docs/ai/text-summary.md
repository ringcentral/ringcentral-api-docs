# Conversation summaries

The Artificial Intelligence conversation summarization API allows you to summarize the contents of speaker-tagged audio transcript by extracting what is determined to be the most relevant parts of the conversation. The API provides two types of summaries:

- **Abstractive**. The summary generated is a unique construction that attempts to convey the meaning of the text. This is ideal for generating an abstract of the specified text.
- **Extractive**. The summary generated is a sequence of excerpts of the most relevant sentences. This is ideal for creating a list of highlights from a block of text.

The API also allows developers to optionally specify the start and end times, as well as a speaker ID in order to generate a summary from a portion of a larger previously diarized transcription, or to contrain the summary to a specific time period. '

## Generating a summary from a block of text??

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

### Sample code

The following example code shows how to provide the utterances input to the API and get the summaries.

Follow the instructions on the [quick start](../quick-start#) section to setup and run your server code before running the sample code below.

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.
    * You can only run on your production account, this means that you have to use app credentials for production.

=== "JavaScript"

    ```javascript
    {!> code-samples/ai/code-snippets-headers/header.js [ln:1-12] !}
    {!> code-samples/ai/code-snippets/summarize.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/ai/code-snippets/summarize.py !}
    {!> code-samples/ai/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/ai/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/ai/code-snippets/summarize.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/ai/code-snippets/summarize.rb !}
    {!> code-samples/ai/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/ai/code-snippets/summarize.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/ai/code-snippets/summarize.java !}
    ```

### Sample response

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
