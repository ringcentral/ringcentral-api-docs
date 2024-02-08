# How to analyze media files using the AI API

Most of RingCentral AI APIs such as the `/speech-to-text` and the `/analyze-interaction` endpoints take the input media content `contentUri` as a URI link to a media file resides at a remote server. These APIs all work in an [asynchronous manner](../asynchronous-responses/) and follow this basic flow:

1. Developer calls an API endpoint passing a URI in the `contentUri` parameter
2. RingCentral responds with a 20x status code to acknowledge receipt of request
3. RingCentral downloads and processes media file
4. RingCentral posts a response back to the specified webhook URL in the API request

The URI link referenced by the `contentUri` parameter must be publicly accessible. If a media file access is protected in some way, then the file must be retrievable and accessible via a single URI (see the case of RingCentral call recording example below). Otherwise, RingCentral will fail the API request and post an error to the asynchronous response. The AI API does not currently allow developers to specify custom HTTP headers to be transmitted when fetching the media content from the `contentUri` URI.

## How to analyze RingCentral call recordings and meeting recordings

RingCentral hosts all downloadable [media content](../../basics/media/) on a protected server, and requires developers to provide a valid access token in a request in order to access the content. RingCentral makes it possible to access protected media content, like RingCentral [call recordings](../../voice/call-log/recordings/) and RingCentral Video [meeting recordings](../../video/api/meeting-history/) by appending the access token via the `access_token` query parameter. For example, let's look at how one would construct a URL that would allow the AI API to access a RingCentral call recording.

### Sample call log entry

Here is an excerpt from a call to the [Call Log API](../../voice/call-log/) and shows an entry that contains a reference to a recording of a phone call.

```json hl_lines="24"
{!> code-samples/voice/call-log-sample.json !}
```

## Sample code to construct a content URI for accessing RingCentral call recording

The following example code shows how to obtain the access token using a RingCentral platform SDK and attach the access token to the media file's content URL.

!!! note "Running the code"
    * Edit the variables in ALL CAPS with your app and user credentials before running the code.

=== "JavaScript"

    ```javascript
    {!> code-samples/ai/code-snippets-headers/header.js !}
    {!> code-samples/ai/code-snippets/access-token.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/ai/code-snippets/access-token.py !}
    {!> code-samples/ai/code-snippets-headers/footer.py [ln:1-5] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/ai/code-snippets-headers/header.php [ln:1-9] !}
    {!> code-samples/ai/code-snippets/access-token.php [ln:2-] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/ai/code-snippets/access-token.rb !}
    {!> code-samples/ai/code-snippets-headers/footer.rb [ln:1-4] !}
    ```    

=== "C#"

    ```c#
    {!> code-samples/ai/code-snippets/access-token.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/ai/code-snippets/access-token.java !}
    ```

!!! Important
    To retrieve the recording and use the AI API to process the recording, you need to have the following app permissions:

    For Call Recordings: **AI**, **Read Call Log**, **Read Call Recording**

    For Video Meeting Recordings: **AI**, **Video**
