# Introduction to the RingCentral Artificial Intelligence APIs

{! mdx_includes/ai-beta-notice.md !}

<div class="jumbotron pt-1">
  <h2 class="h3 display-5">Getting Started with the Artificial Intelligence API</h2>
  <p class="lead">The RingCentral Artificial Intelligence API helps developers process and extract meaningful insights from media files. This not only includes creating a transcript, but also aids in performing sentiment and emotion analysis, speaker identification, and speaker diarization. It also aids in the extraction and generation of key content, like content summaries and action items.</p>
  <p>We invite all developers to try out our Artificial Intelligence API by writing a simple app to process a small media file to produce a transcript. Get started using a Quick Start in any of the following languages:</p>
  <a href="quick-start/#javascript" class="btn btn-light qs-link">Javascript &raquo;</a>
  <!--
  <a href="quick-start/#php" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="quick-start/#python" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="quick-start/#ruby" class="btn btn-light qs-link">Ruby &raquo;</a>
  <a href="quick-start/#java" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="quick-start/#c#" class="btn btn-light qs-link">C# &raquo;</a>
  -->
  <a href="https://god.postman.co/run-collection/3d14640ee8edc23e10b6?action=collection%2Fimport#?env%5BRC%20Enviornment%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5yaW5nY2VudHJhbC5jb20iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6InBsYXRmb3JtLnJpbmdjZW50cmFsLmNvbSIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJSQ19DYWxsYmFja19VUkwiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjoxfSx7ImtleSI6IlJDX0FQUF9LRVkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjoyfSx7ImtleSI6IlJDX0FQUF9TRUNSRVQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjozfSx7ImtleSI6IlJDX1VTRVJOQU1FIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6NH0seyJrZXkiOiJSQ19FWFRFTlNJT04iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo1fSx7ImtleSI6IlJDX1BBU1NXT1JEIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6Nn0seyJrZXkiOiJSQ19KV1QiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo3fSx7ImtleSI6Im15X2FjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjh9LHsia2V5IjoiYmFzaWNfYXV0aF9oZWFkZXIiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo5fV0=" class="btn btn-light qs-link">Postman &raquo;</a>
</div>

## What can I do using the Artificial Intelligence API?

In addition to converting speech-to-text, the Artificial Intelligence API also helps developers to extract meaningful insights and data from media files. Using the Artificial Intelligence API, developers can:

* Convert speech to text
* Detect the engagement level with talk-to-listen ratios
* Enhance post-meeting experiences by automatically creating an agenda for the next meeting
* Perform sentiment/emotional analysis of those speaking

## Key Artificial Intelligence API concepts

Below are the details of some of the key concepts used by these Artificial Intelligence APIs which we would like you to become familiar with.

### Calling the APIs asyncrhonously

Certain requests, such as extracting emotion from a large audio, may take some time to process and could result in timing out your request. In these circumstances we recommend calling this APIs in an asynchronous manner by specifying a URL via the request's `webhook` parameter. When RingCentral finishes processing your request, a response payload will be posted to the webhook URL you specified. 

To correlate any callback you receive in this manner to the request that generated it, we recommend including a correlation ID of somekind in the webhook URL you specify. 

Upon receiving a callback from RingCentral, please respond with an HTTP status code of `200` to acknowledge receipt. Replying with any other HTTP status code will signal to RingCentral to attempt re-delivery. RingCentral will attempt to redeliver callbacks up to five times with an exponential backoff. 

#### What can affect the processing time of a media file?

When considering when to engage a Artificial Intelligence API asynchronously, consider the following factors that could impact the processing time of your request.

  - The relative geographic location of the API caller compared to the RingCentral Platform server
  - Network infrastructure e.g. speed, load
  - The size of the request payload, e.g. the duration of audio file
  - The number of jobs in the RingCentral Platform processing queue 

### Supported audio formats

RingCentral supports various audio formats for ease of integration. We support all audio types supported by [ffmpeg](https://trac.ffmpeg.org/wiki/audio%20types), including but not limited to the following:

* AAC
* MP3, MP4, MPA
* MOV
* Mulaw
* PCM (signed/unsigned) (8/16/32/64 bit) (big/little endian)
* WAV
* WMV (Windows Media Video)

### What languages are supported for media input? i.e English, German, Spanish?

Speaker identification itself is language-agnostic, but for all other APIs we currently only support English. Support for other languages is planned prior to the end of our beta period. 

### What is speaker enrollment, and how does it work?

[Speaker enrollment](./speaker-enrollment/) is the process by which identities are associated with a voice or accoustic signature. This ultimately allows for RingCentral to identify who is speaking, and pass that identity information on its reports. 

### Tips on how to get the best results from media files

1. **Do not process or alter media files**. It is recommended to pass audio and media content in its original format, without processing it or modifying in any way. Changes such as encoding, up-sampling, down-sampling, and automatic gain control (AGC) will impact the accuracy of the results you will receive. 

2. **Store media data in a lossless format**. Lossy audio will have a negative impact on the accuracy of the API.

3. **Transmit multiple audio channels**. Allow RingCentral to downmix audio channels into a single channel during its transcoding process so that it can leverage channel segmentation in its analysis.




