no_breadcrumb:true

## How to Do Speaker Diarization

### Description

Speaker Diarization is the process that partitions audio stream into homogenous segments according to the speaker identity. It solves the problem of "Who Speaks When". This API splits audio clip into speech segments and tags them with speakers ids accordingly. This API also supports speaker identification by speaker ID if the speaker was already enrolled using [Speaker Enrollment API](speaker-enrollment-api.md).

### API Endpoint

```shell
POST https://platform.ringcentral.com/ai/audio/v1/async/speaker-diarize
```

### Sample Codes

#### Pre-requisite

First you need acquire your application's 'production' credentials from Developer Console in the [Developer Portal](https://developers.ringcentral.com) and then obtain the JWT token. Refer to this guide to create and obtain [JWT Credentials.](https://developers.ringcentral.com/guide/authentication/jwt/quick-start) 

=== "JavaScript"

    #### Setup Node.JS project using NPM CLI and install the RingCentral JavaScript SDK

    ```bash
    $ npm init
    $ npm install @ringcentral/sdk
    $ npm install dotenv
    $ touch index.js
    $ touch .env
    ```
    #### Open and Edit `.env` file. Make sure to keep this file private in order to safely secure your credentials.

    Refer to this guide in order to create and obtain [JWT Credentials](https://developers.ringcentral.com/guide/authentication/jwt/quick-start)

    ```bash
    # Enter in the credentials for this app into the fields below.
    RC_CLIENT_ID         = ''
    RC_CLIENT_SECRET     = ''
    RC_SERVER_URL        = ''

    # These credentials are used for password-grant types
    RC_USERNAME          = ''
    RC_PASSWORD          = ''
    RC_EXTENSION         = ''

    # This credential is used for JWT-grant which is recommended over Password Grant type.
    RC_JWT               = ''
    ```

    #### Open and Edit `index.js` file in the newly created Node.JS application.

    Copy and paste the code from below in `index.js` and makesure to edit the variables in ALL CAPS with your app and user credentials for 'production' enviornment.

    ```javascript
    const RC = require('@ringcentral/sdk').SDK;
    const http = require('http');
    require('dotenv').config();

    const PORT = 5000;
    const WEBHOOK_ADDRESS = "YOUR NGROK HTTPS URL" + "/webhook"; // replace with your ngrok address

    // Create a Node.JS server to listen for the Webhook from RingCentral AI Service
    const server = http.createServer(function(req, res) {
      console.log("Webhook Server is created");
      if (req.method == 'POST') {
        if (req.url == "/webhook") {
          console.log("Post Request recieved on '/webhook'");
          if (req.headers.hasOwnProperty("validation-token")) {
            res.setHeader('Content-type', 'application/json');
            res.setHeader('Validation-Token', req.headers['validation-token']);
            res.statusCode = 200;
            res.end();
          } 
          else {
            let body = []
            req.on('data', function(chunk) {
              body.push(chunk);
            }).on('end', function() {
              body = Buffer.concat(body).toString();
              console.log("Response Txt::" + body);
              res.statusCode = 200;
              res.end();
            });
          }
        }
      } 
      else {
        console.log("Unrelated HTTP Request Recieved")
      }
    });
    // Start the server
    server.listen(PORT);

    // Initialize the RingCentral SDK and Platform
    const rcsdk = new RC({
      'server':       process.env.RC_SERVER_URL,
      'clientId':     process.env.RC_CLIENT_ID,
      'clientSecret': process.env.RC_CLIENT_SECRET
    });

    const platform = rcsdk.platform();

    // Authenticate with RingCentral Developer Platdorm using Developer's JWT Credential
    platform.login({
      'jwt': process.env.RC_JWT
    });

    // Call the Speaker Diarization API right after login asynchronously
    platform.on(platform.events.loginSuccess, () => {
      detectSpeaker();
    })

    async function detectSpeaker() {
      try {
        console.log("Calling RingCentral Speaker Diarization API");
        let resp = await platform.post("/ai/audio/v1/async/speaker-diarize?webhook=" + WEBHOOK_ADDRESS, {
                           "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
                           "encoding": "Mpeg",
                           "languageCode": "en-US",
                           "source": "RingCentral",
                           "audioType": "Meeting",
                           "separateSpeakerPerChannel": false,
                           "speakerCount": 0,
                           "enableVoiceActivityDetection": true
                         });
        console.log("Job is " + resp.statusText + " with HTTP status code " + resp.status);
        console.log("Ready to receive incoming response via WebHook: " + WEBHOOK_ADDRESS + ":" + PORT);
      } 
      catch (e) {
        console.log("An Error Occurred : " + e.message);
      }
    }
    ```

    #### Run Your Code
    You are almost done. Now run your Node.JS Server to make the request and recive the response.
    
    ```bash
    $ node index.js
    ```

=== "Python"

    ```python
    import requests
    import base64

    url = "https://platform.ringcentral.com/ai/audio/v1/async/speaker-diarize"

    querystring = {"webhook":"<webhookUrl>"}

    payload = {
      "encoding": "Mpeg",
      "languageCode": "en-US",
      "source": "RingCentral",
      "audioType": "Meeting",
      "separateSpeakerPerChannel": False,
      "speakerCount": 2,
      "speakerIds": [
        "speakerId1",
        "speakerId2"
      ],
      "enableVoiceActivityDetection": True,
    }

    # The api accepts data either as a url or as base64 encoded content
    # passing payload as contentUri:
    payload["contentUri"] = "https://publicly-facing-url.mp3"
    # alternatively, passing payload as content:
    with open(audioFileName, 'rb') as fin:
        audioContent = fin.read()
    payload["content"] = base64.b64encode(audioContent).Decode('Utf-8')

    headers = {
        'Content-Type': "application/json",
    }

    response = requests.post(url, json=payload, headers=headers, params=querystring)

    print(response.status_code)
    ```

=== "Shell"
    The following example showcases how to make request to the conversational AI API using curl

    #### Prerequisites

    Before we make a CURL request, we need to have the follwing this 
    1. Webhook URL, you can use NGROK to make the webhook URL public  
    2. A Webserver to listen to the response posted by the API, you can create an HTTP webserver in any language of your choice or follow the python or javascript examples given in this documentation. 
    3. A file named *data.json* for the request payload
    4. BEARER_TOKEN for authentication, you can exchange your JWT credentials for a BEARER_TOKEN by following [this](https://developers.ringcentral.com/guide/authentication/jwt/quick-start)


    #### Create Request payload file

    create a file names *data.json* in the folder you want to make the curl request from 

    ```bash
    $ touch data.json
    ```
    copy the following json onto *data.json*

    ```json
    {
          "encoding": "Mpeg",
          "languageCode": "en-US",
          "source": "RingCentral",
          "audioType": "Meeting",
          "separateSpeakerPerChannel": False,
          "speakerCount": 2,
          "speakerIds": [
            "speakerId1",
            "speakerId2"
          ],
          "enableVoiceActivityDetection": True,
        }
    ```

    #### Make Reques to the API

    Open a terminal window to make the request,

    ```shell
    curl -X POST \
    "https://platform.ringcentral.com/ai/audio/v1/async/speaker-diarize?webhook=<webhookUrl>" -H 'Authorization: Bearer $BEARER_TOKEN' -H 'content-type: application/json' -d @data.json

    # contents of data.json
    {
      "content": "string",
      "encoding": "Mpeg",
      "languageCode": "en-US",
      "source": "RingCentral",
      "audioType": "Meeting",
      "separateSpeakerPerChannel": false,
      "speakerCount": 0,
      "speakerIds": [
        "speakerId1",
        "speakerId2"
      ],
      "enableVoiceActivityDetection": true
    }
    ```

### Async Response

=== "HTTP Response"

    ```json
    HTTP 202 "Accepted" for successful requests
    ```

### Response (Webhook)

=== "Success"

    ```json
    {
      "status": "Success",
      "response": {
        "speakerCount": 2,
        "utterances": [
          {
            "speakerId": "JohnDoe",
            "start": 0.3,
            "end": 5.1,
            "confidence": 0.97
          },
          ...
        ]
      }
    }
    ```

=== "Fail"

    ```json
    {
      "status": "Fail",
      "response": {
        "errors": [
          {
            "errorCode": "CAI-101",
            "message": "Parameter [contentUri] is invalid. It should be a valid uri",
            "parameterName": "contentUri"
          }
        ]
      }
    }
    ```
### Body Parameters

| Parameter    | Type   | Description                                              | Notes                        |
| ------------ | ------ | -------------------------------------------------------- | ---------------------------- |
| encoding     | String | Encoding of audio file like MP3, WAV etc.                | Required.                    |
| languageCode | String | Language spoken in the audio file.                       | Required. [default to &#39;en-US&#39;] |
| separateSpeakerPerChannel | Boolean | Set to True if the input audio is multi-channel and each channel has a separate speaker. | Optional. [default to `False`] |
| speakerCount | Number | Number of speakers in the file | Optional.         |
| audioType    | String | Type of the audio based on number of speakers.           | Optional. [default to `CallCenter`]. Permitted values: `CallCenter`, `Meeting`, `EarningsCalls`, `Interview`, `PressConference` |
| speakerIds   | List[String] | Optional set of speakers to be identified from the call.  | Optional |
| content      | String | base64 encoding of the audio file.                       | Semi-Optional.                    |
| contentUri          | String | Publicly facing url.                                     | Semi-Optional.                    |
| source       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc | Optional                  |
| enableVoiceActivityDetection  | Bool | Apply voice activity detection.                  | Optional [default to False]  |


!!! note "**NOTES:** "
    * We recommend using `CallCenter` when there are 2-3 speakers expected to be identified and `Meeting` when 4-6 speakers are expected.
    * Exactly one of `contentUri` and `content` should be passed. In case both values are passed, error is thrown.
    * `enableVoiceActivityDetection`: This parameters is required if you want silence & noise segments removed from the diarization output. We suggest you to set it to `True`.
    * `source`: Adding source information enables an enhanced model which is built specifically for those audio sources. 
    * Enroll user using [Speaker Enrollment Api](./speaker-enrollment-api.md) before using `speakerIds` parameter.


### Query Parameters

| Parameter   | Type   | Description                                                             | Notes                                            |
| ----------  | ------ | ----------------------------------------------------------------------- | ------------------------------------------------ |
| webhook     | String | The webhook url at which the responses will be sent.                    | Required for async requests.                     |

### Response Status Codes (Async)

| Status Code   | Description                       |
| ------------  | ------                            | 
| 202           | Request Successfully Accepted     |
| 400           | Bad Request                       | 
| 401           | Unauthorized                      | 

### Response Parameters (Webhook)

| Parameter  | Type            | Description                           | Notes                                                               |
| ---------- | --------------- | ------------------------------------- | ------------------------------------------------------------------- |
| response   | Object | The actual output of the diarization or [errors](./errors.md) in case of failures | The Diarized-Object is defined below.                               |
| status     | Enum   | Options: Success, Fail                                             |  


#### Diarized-Object

| Parameter    | Type                   | Description                      | Notes                                                                            |
| ------------ | ---------------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| speakerCount | Number                 | The number of speakers detected. | The number of speaker will be detected only when the request set speakers to 0.  |
| utterances   | List[Diarized-Utterances] | List of diarized utterances.  | The Diarized-Utterances is defined below.                                        |

#### Diarized-Utterances

| Parameter  | Type   | Description                                           | Notes |
| ---------- | ------ | ---------------------------------------------------   | ----- |
| speakerId | String | The speaker id for the corresponding audio utterances. |       |
| start      | Number | Start time of the audio utterances in seconds.        |       |
| end        | Number | End time of the audio utterances in seconds.          |       |
| confidence | Number | Confidence score for utterances.                      |       |

