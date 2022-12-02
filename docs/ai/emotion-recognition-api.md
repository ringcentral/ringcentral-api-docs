no_breadcrumb:true
## Recognizing Emotion From a Meeting Recording

### Description

Emotion recognition API extracts emotions from the audio file in a time-sliced manner. 
For example, if you pass an audio/video recording with a duration of 10 minutes, you will get a detailed JSON response with the emotional analysis done every 3-6 seconds of that 10 min recording. See "Webhook Response" as an example below.

The emotion categories are based on the [Plutchik Wheel of Emotions](https://www.6seconds.org/2022/03/13/plutchik-wheel-emotions/) and currently, this API supports these six common emotions: Anger, Excitement, Frustration, Happy, Sadness and Neutral.



In case you are looking for emotion recognition per utterance per speaker, you would need to use [Interaction Analytics](interaction-analytics-api.md) as this API doesn't provide speech-to-text and speaker diarization capabilities. This /recognize-emotion API provides a pure time-sliced emotion detection capability on an audio/video recording.



#### API Endpoint

```bash
  POST https://platform.ringcentral.com/ai/audio/v1/async/recognize-emotion
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
              var jsonObj = JSON.parse(body)
              console.log(jsonObj.body);
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

    // Authenticate with RingCentral Developer Platform using Developer's JWT Credential
    platform.login({
      'jwt': process.env.RC_JWT
    });

    // Call the Emotion Recognition API right after login asynchronously
    platform.on(platform.events.loginSuccess, () => {
      recognizeEmotion();
    })

    async function recognizeEmotion() {
      try {
        console.log("Calling RingCentral Emotion Recognition API");
        let resp = await platform.post("/ai/audio/v1/async/recognize-emotion?webhook=" + WEBHOOK_ADDRESS,
                                      {
                                        "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
                                        "encoding": "Wav",
                                        "languageCode": "en-US",
                                        "source": "RingCentral",
                                        "audioType": "Meeting"
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
<!--
  === "Python"

    ```python
    import requests
    import base64

    asyncUrl = "https://platform.ringcentral.com/ai/audio/v1/async/recognize-emotion" 

    querystring = {"webhook":"<webhookUrl>"}

    payload = {
        "encoding": "Mpeg",
        "languageCode": "en-US",
        "source": "RingCentral",
        "audioType": "Meeting",
    }
    # The api accepts data either as a contentUri or as base64 encoded content
    # passing payload as contentUri:
    payload["contentUri"] = "https://publicly-facing-url.mp3"
    # alternatively, passing payload as content:
    with open(audioFileName, 'rb') as fin:
        audioContent = fin.read()
    payload["content"] = base64.b64encode(audioContent).Decode('Utf-8')

    headers = {
        'Content-Type': "application/json",
    }
    response = requests.post(asyncUrl, json=payload, headers=headers, params=querystring)
    print(response.text)
    ```
-->

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
      "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
      "encoding": "Wav",
      "languageCode": "en-US",
      "source": "RingCentral",
      "audioType": "Meeting"
    }
```

#### Make Reques to the API

Open a terminal window to make the request,

    ```shell
    curl -X POST \
    "https://platform.ringcentral.com/ai/audio/v1/async/recognize-emotion?webhook=<webhookUrl>" --header 'Authorization: Bearer $BEARER_TOKEN' --header 'content-type: application/json' -d @data.json
    ```


### Async API Response

=== "HTTP Response"
    ```json
    HTTP 202 "Accepted" for successful requests
    ```
### WebHook Response

=== "Success"

    ```json
    {
      "status": "Success",
      "response": [{
          "start": 0.0,
          "end": 6.0,
          "emotion": "Excitement"
        },
        {
          "start": 6.0,
          "end": 9.0,
          "emotion": "Neutral"
        },
        {
          "start": 12.0,
          "end": 15.0,
          "emotion": "Anger"
        },
        {
          "start": 15.0,
          "end": 18.0,
          "emotion": "Happy"
        },
        {
          "start": 18.0,
          "end": 21.0,
          "emotion": "Frustration"
        }
      ]
    }
    ```

=== "Failure"

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

| Parameter    | Type   | Description                               | Notes                        |
| ------------ | ------ | ----------------------------------------- | ---------------------------- |
| encoding     | String | Encoding of audio file like MP3, WAV etc. |                              |
| languageCode | String | Language spoken in the audio file.        | [default to &#39;en-US&#39;] |
| audioType    | String | Type of the audio based on number of speakers.           | Optional. [default to `CallCenter`]. Permitted values: `CallCenter`, `Meeting`, `EarningsCalls`, `Interview`, `PressConference` |
| content      | String | base64 encoding of the audio file.        | Semi-Optional.               |
| contentUri          | String | Publicly facing url.                      | Semi-Optional. |
| source       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc | Optional                  |


!!! note "**NOTE:** "
    Exactly one of `contentUri` and `content` should be passed. In case both values are passed, error is thrown.


### Query Parameters

| Parameter  | Type   | Description                                                            | Notes                                           |
| ---------- | ------ | ---------------------------------------------------------------------- | ----------------------------------------------- |
| webhook    | String | The webhook url at which the responses will be sent                    | Required for async requests                     |

### Response Status Codes (Async)

| Status Code   | Description                       |
| ------------  | ------                            | 
| 202           | Request Successfully Accepted     |
| 400           | Bad Request                       | 
| 401           | Unauthorized                      | 

### Response Parameters (Webhook)

| Parameter  | Type   | Description                                                        | Notes                 |
| ---------- | ------ | -------------------------------------------------------------------| ----------------------|
| response   | Object | List [Emotion-Object] or [errors](./errors.md) in case of failures |                       |
| status     | Enum   | Options: Success, Fail                                             |                       |

### Emotion-Object

Response is the list of emotion scores. The parameters in emotion scores are as follows:

| Parameter | Type   | Description                                     | Notes |
| --------- | ------ | ----------------------------------------------- | ----- |
| emotion   | String | Type of emotion. | Possible emotion values: `Anger`, `Excited`, `Frustration`, `Happy`, `Sad` and `Neutral` |
| start     | Float  | Start of the audio segment.                     |       |
| end       | Float  | end of the audio segment.                       |       |
 

#### More Information

Please refer to the API Reference document for [detailed description.](swagger-api-ref.md)
