# Introduction to the RingCentral Artificial Intelligence APIs

{! mdx_includes/ai-beta-notice.md !}

<div class="jumbotron pt-1" markdown>
  <h2 class="h3 display-5">Getting Started with the Artificial Intelligence API</h2>
  <p class="lead">The RingCentral Artificial Intelligence API helps developers process and extract meaningful insights from media files. This not only includes creating a transcript, but also aids in performing sentiment and emotion analysis, speaker identification, and speaker diarization. It also aids in the extraction and generation of key content, like content summaries and action items.</p>
  <p>We invite all developers to try out our Artificial Intelligence API by writing a simple app to process a small media file to produce a transcript. Get started using a Quick Start in any of the following languages:</p>
  [Javascript &raquo;](quick-start.md#javascript){class="btn btn-light qs-link"}
  [PHP &raquo;](quick-start.md#php){class="btn btn-light qs-link"}
  [Python &raquo;](quick-start.md#python){class="btn btn-light qs-link"}
  [Ruby &raquo;](quick-start.md#ruby){class="btn btn-light qs-link"}
  [Java &raquo;](quick-start.md#java){class="btn btn-light qs-link"}
  [C# &raquo;](quick-start.md#c){class="btn btn-light qs-link"}
  [Postman &raquo;](https://god.postman.co/run-collection/3d14640ee8edc23e10b6?action=collection%2Fimport#?env%5BRC%20Enviornment%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5yaW5nY2VudHJhbC5jb20iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6InBsYXRmb3JtLnJpbmdjZW50cmFsLmNvbSIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJSQ19DYWxsYmFja19VUkwiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjoxfSx7ImtleSI6IlJDX0FQUF9LRVkiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjoyfSx7ImtleSI6IlJDX0FQUF9TRUNSRVQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4IjozfSx7ImtleSI6IlJDX1VTRVJOQU1FIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6NH0seyJrZXkiOiJSQ19FWFRFTlNJT04iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo1fSx7ImtleSI6IlJDX1BBU1NXT1JEIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiZGVmYXVsdCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6Nn0seyJrZXkiOiJSQ19KV1QiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo3fSx7ImtleSI6Im15X2FjY2Vzc190b2tlbiIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjh9LHsia2V5IjoiYmFzaWNfYXV0aF9oZWFkZXIiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJ0ZXh0Iiwic2Vzc2lvblZhbHVlIjoiIiwic2Vzc2lvbkluZGV4Ijo5fV0=){class="btn btn-light qs-link"}
</div>

## What can I do using the Artificial Intelligence API?

In addition to converting speech-to-text, the Artificial Intelligence API also helps developers to extract meaningful insights and data from media files. Using the Artificial Intelligence API, developers can:

* Detect the engagement level with talk-to-listen ratios of each speaker
* Extract keywords, key phrases and topics from a conversation
* Summarize and create abstracts of a conversation
* Create a list of questions asked by speakers
* Perform emotional analysis of each speaker in a conversation
* Detect multiple speakers from a single audio channel source
* Perform speaker speech training for speaker recognition

## Key Artificial Intelligence API concepts

Below are the details of some of the key concepts used by these Artificial Intelligence APIs which we would like you to become familiar with.

### Calling the APIs asyncrhonously

Certain requests, such as transcribing speech to text from a large audio, would take some time to process and usually result in timing out your request. In those circumstances we support asynchronous APIs which will return a job Id as soon as a request is accepted. The job Id can be used for checking the job processing status and to get the actual result. In addition, our asynchronous APIs support HTTP callback mechanism via a user-defined webhook URL. When an asynchronous task is finished, a response payload will be posted to the given webhook URL if it is specified in the request.

To correlate any callback you receive in this manner to the request that generated it, we recommend you to keep the `jobId` returned from the asynchronous request and match it with the `jobId` included in the webhook callback payload.

Upon receiving a callback from RingCentral, please respond with an HTTP status code of `200` to acknowledge receipt. Replying with any other HTTP status code will signal to RingCentral to attempt re-delivery. RingCentral will attempt to redeliver callbacks up to five times with an exponential backoff.

### Supported media formats

RingCentral supports various audio formats for ease of integration. We support all audio types supported by [ffmpeg](https://trac.ffmpeg.org/wiki/audio%20types), including but not limited to the following:

* AAC
* MP3, MP4, MPA
* MOV
* Mulaw
* PCM (signed/unsigned) (8/16/32/64 bit) (big/little endian)
* WAV
* WMV (Windows Media Video)

### Supported languages for media input

Only the English language is supported during the beta. 

### What is speaker enrollment, and how does it work?

[Speaker enrollment](speaker-enrollment.md) is the process by which identities are associated with a voice or accoustic signature. This ultimately allows for RingCentral to identify who is speaking, and pass that identity information on its reports. 

### Tips on how to get the best results from media files

1. **Do not process or alter media files**. It is recommended to pass audio and media content in its original format, without processing it or modifying in any way. Changes such as encoding, up-sampling, down-sampling, and automatic gain control (AGC) will impact the accuracy of the results you will receive.

2. **Store media data in a lossless format**. Lossy audio will have a negative impact on the accuracy of the API.

3. **Transmit multiple audio channels**. Allow RingCentral to downmix audio channels into a single channel during its transcoding process so that it can leverage channel segmentation in its analysis.
