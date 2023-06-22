# How to analyze media files using the AI API

A number of Artificial Intelligence API endpoints operate by processing a media files that reside at a publicly accessible URL. These APIs all work in an [asynchronous manner](../asynchronous-responses/) and follow this basic flow:

1. Developer calls API passing a URL in the `contentUri` parameter
2. RingCentral responds with a 20x status code to acknowledge receipt of request
3. RingCentral downloads and processes media file 
4. RingCentral posts response back to developer at the `webhookUrl` they specify

The URLs referenced by the `contentUri` parameter must be public accessible to RingCentral servers. If the media files referenced are protected in some way, then the file must be retrievable and accessible via a single URL. The AI API does not currently allow developers to specify custom HTTP headers to be transmitted when fetching the `contentUri` URL. 

## How to analyze RingCentral call recordings and RingCentral meeting recordings

RingCentral hosts all downloadable [media content](../../basics/media/) on a protected server, and requires developers to transmit a valid access token with their request in order to access the corresponding content. RingCentral makes it possible to access protected media content, like RingCentral [call recordings](../../voice/call-log/recordings/) and RingCentral Video [meeting recordings](../../video/api/meeting-history/) by appending the access token via the `access_token` querystring parameter. For example, let's look at how one would construct a URL that would allow the AI API to access a RingCentral call recording. 

### Sample call log entry

Here is an excerpt from a call to the [Call Log API](../../voice/call-log/) and shows an entry that contains a reference to a recording of a phone call. 

```json hl_lines="24"
{!> code-samples/voice/call-log-sample.json !}
```

### Obtaining an access token

To access a protected media file, you will first need to obtain an access token. Luckily the access token you will use is the same used to call the RingCentral API. You can obtain the access token easily via each of our SDKs.

=== "Javascript"

    ```js
    {!> code-samples/basics/access-key.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/basics/access-key.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/basics/access-key.php !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/basics/access-key.rb !}
    ```

### Appending the access token to the media file URL

Now, pass the access token to the media file's content URL in the following manner:

```
https://media.ringcentral.com/restapi/..snip../recording/1662272004/content?access_token=<access token>
```
!!! Important
    To retrieve the recording and use the AI API to process the recording, you need to have the following app permissions:

    For Call Recordings: **AI**, **Read Call Recording**

    For Video Meeting Recordings: **AI**, **Video Internal**
