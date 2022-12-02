no_breadcrumb:true

## Converting Speech to Text

### Description

 Speech To Text or Automatic Speech Recognition API provides high-quality speech-to-text conversion powered by machine learning. This API also supports speaker diarization and smart punctuation to further enhance the utility of the transcribed output.

 In case speaker diarization is enabled, the response will contain speaker count and speaker ids per word. 
 
 In case smart punctuation is enabled, the transcribed text would be properly punctuated.

 This API can be used in tandem with [Speaker Enrollment](speaker-enrollment-api.md) as well. So if there are speakers who are already enrolled into the system for a particular account, those speaker ids can be passed to this API so that they can be identified. More details on this soon.

#### Supported Languages
Today only English is supported, but other languages are coming soon. 

#### Real-time closed captioning
Today this API works only for recorded audio/video meetings and real time support is being planned for future. 

### API Endpoint

```shell
POST https://platform.ringcentral.com/ai/audio/v1/async/speech-to-text
```

### Sample Codes

#### Pre-requisite

First you need acquire your application's 'production' credentials from Developer Console in the [Developer Portal](https://developers.ringcentral.com) and then obtain the JWT token. Refer to this guide to create and obtain [JWT Credentials.](https://developers.ringcentral.com/guide/authentication/jwt/quick-start) 

=== "Javascript"

    ```javascript
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

    ```js
    const RC = require('@ringcentral/sdk').SDK;
    const http = require('http');
    require('dotenv').config();

    const PORT = 5000;

    // replace with your ngrok address below
    const WEBHOOK_ADDRESS = "YOUR NGROK HTTPS URL" + "/webhook";

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

    // Call the Speech to Text API right after login asynchronously
    platform.on(platform.events.loginSuccess, () => {
      speechToText();
    })

    async function speechToText() {
      try {
        console.log("Calling RingCentral Speech To Text API");
        let resp = await platform.post("/ai/audio/v1/async/speech-to-text?webhook=" + WEBHOOK_ADDRESS, {
                           "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
                           "encoding": "Wav",
                           "languageCode": "en-US",
                           "source": "RingCentral",
                           "audioType": "Meeting",
                           "enablePunctuation": true,
                           "enableSpeakerDiarization": false
                          });
        console.log("Speech To Text Job " + resp.statusText + " with HTTP status code " + resp.status);
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

    #### Setup Python3 environment and install Ringcentral Python SDK and other necessary dependencies

    ```bash
    $ pip3 install ringcentral
    $ pip3 install python-dotenv
    $ touch app.py
    $ touch .env
    ```
    #### Open and Edit `.env` file. Make sure to keep this file private in order to safely secure your credentials.

    Refer to this guide in order to create and obtain [JWT Credentials](https://developers.ringcentral.com/guide/authentication/jwt/quick-start)

    ```bash
    # Enter in the credentials for this app into the fields below.
    RC_CLIENT_ID         = ''
    RC_CLIENT_SECRET     = ''
    RC_SERVER_URL        = https://platform.devtest.ringcentral.com
    WEBHOOK_ADDRESS      = 'YOUR_NGROK_HTTP_URL'

    # These credentials are used for password-grant types
    RC_USERNAME          = ''
    RC_PASSWORD          = ''
    RC_EXTENSION         = ''

    # This credential is used for JWT-grant which is recommended over Password Grant type.
    RC_JWT               = ''
    ```

    #### Open and Edit `app.py` file.

    Copy and paste the code below into the `app.py` file.


    ```python
    import os,sys
    import logging
    import requests
    from ringcentral import SDK
    from dotenv import load_dotenv
    from http.server import BaseHTTPRequestHandler, HTTPServer

    # Load Enviroment variables
    load_dotenv()

    # Handle Incoming HTTP requests
    class S(BaseHTTPRequestHandler):
        def _set_response(self):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()

        def do_POST(self):
            content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
            post_data = self.rfile.read(content_length) # <--- Gets the data itself
            if self.path == '/webhook':
                print(post_data)
            self._set_response()

    # Invoke Speech to Text API
    def speechToText():


        # Endpoint to invoke Speech to Text API 
        endpoint = os.getenv('RC_SERVER_URL')+"/ai/audio/v1/async/speech-to-text"

        querystring = {"webhook":os.getenv('WEBHOOK_ADDRESS')}

        # Payload
        payload = {
            "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
            "encoding": "Wav",
            "languageCode": "en-US",
            "source": "RingCentral",
            "audioType": "Meeting",
            "enablePunctuation": True,
            "enableSpeakerDiarization": False
        }
        try:
            # Instantiate Ringcentral SDK 
            rcsdk = SDK( os.getenv('RC_CLIENT_ID'),os.getenv('RC_CLIENT_SECRET'),os.getenv('RC_SERVER_URL'))
            platform = rcsdk.platform()

            # Login Using JWT
            platform.login( jwt=os.getenv('RC_JWT') );

            # Make HTTP POST call to the Speech to Text endpoint with the query string and payload
            response = platform.post(endpoint, payload, querystring);
            print(response.json());

        except Exception as e:
            print(e)   

    # Create HTTP server to listen on the defined port
    def run(server_class=HTTPServer, handler_class=S, port=8080):
        logging.basicConfig(level=logging.INFO)
        server_address = ('', port)
        httpd = server_class(server_address, handler_class)
        logging.info('Starting httpd...\n')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
        httpd.server_close()
        logging.info('Stopping httpd...\n')


    try:
        speechToText()
        run()

    except Exception as e:
        print(e)

    ```
    #### Run Your Code
    You are almost done. Now run your Node.JS Server to make the request and receive the response.
    
    ```bash
    $ python3 app.py
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
          "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
          "encoding": "Wav",
          "languageCode": "en-US",
          "source": "RingCentral",
          "audioType": "Meeting",
          "enablePunctuation": True,
          "enableSpeakerDiarization": False
      }
    ```

    #### Make Reques to the API

    Open a terminal window to make the request,  

    ```shell
    curl -X POST \
    "https://platform.ringcentral.com/ai/audio/v1/async/speech-to-text?webhook=<webhookUrl>" -H 'Authorization: Bearer $BEARER_TOKEN' -H 'content-type: application/json' -d @data.json
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
    "response": {
      "transcript": "Could produce large hail isolated tornadoes and heavy rain.",
      "confidence": 0.87,
      "words": [
        {
          "word": "could",
          "start": 2.4,
          "end": 2.8,
          "confidence": 0.804
        },
        {
          "word": "produce",
          "start": 2.8,
          "end": 3.12,
          "confidence": 0.965
        },
        {
          "word": "large",
          "start": 3.12,
          "end": 3.44,
          "confidence": 0.859
        },
        {
          "word": "hail",
          "start": 3.6,
          "end": 3.92,
          "confidence": 0.812
        },
        {
          "word": "isolated",
          "start": 4.16,
          "end": 4.48,
          "confidence": 0.841
        },
        {
          "word": "tornadoes",
          "start": 4.56,
          "end": 5.2,
          "confidence": 0.897
        },
        {
          "word": "and",
          "start": 5.2,
          "end": 5.36,
          "confidence": 0.979
        },
        {
          "word": "heavy",
          "start": 5.44,
          "end": 5.76,
          "confidence": 0.867
        },
        {
          "word": "rain",
          "start": 5.84,
          "end": 5.92,
          "confidence": 0.904
        }
      ],
      "audio_duration": 7.096599
    }
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

| Parameter    | Type   | Description                                                     | Notes                        |
| ------------ | ------ | --------------------------------------------------------------- | ---------------------------- |
| encoding     | String | Encoding of audio file like MP3, WAV etc.                       |                              |
| languageCode | String | Language spoken in the audio file.                              | [default to &#39;en-US&#39;] |
| content      | String | base64 encoding of the audio file.                              | Semi-Optional.               |
| contentUri   | String | Publicly facing url.                                            | Semi-Optional.               |
| audioType    | String | Type of the audio based on number of speakers.  | Optional. Only for Async requests. [default to `CallCenter`]. Permitted values: `CallCenter`, `Meeting`, `EarningsCalls`, `Interview`, `PressConference` |
| source       | String | The source for the audio file: webex, zoom, gotomeeting, phone. | Optional. The value will be used if `enableSpeakerDiarization` is set to `True`.                       |
| speakerCount | Number | Number of speakers in the file (-1 for unknown speakers).       | Optional. [default to -1]. The value will be used if `enableSpeakerDiarization` is set to `True`.      |
| speakerIds   | List[String] | Optional set of speakers to be identified.                | Optional. [default to []]. The value will be used if `enableSpeakerDiarization` is set to `True`.      |
| enableVoiceActivityDetection        | Bool      | Apply voice activity detection.    | Optional. [default to `False`]. The value will be used if `enableSpeakerDiarization` is set to `True`. |
| enablePunctuation         | Boolean | Enables RingCentrals [Smart Punctuation API](text-punctuation-api.md).                      | Optional. [default to `True`]                      |
| enableSpeakerDiarization  | Boolean | Tags each word corresponding to the speaker.                                               | Optional. [default to `False`]                     |
| separateSpeakerPerChannel | Boolean | Set to `True` if the input audio is multi-channel and each channel has a separate speaker. | Optional. [default to `False`] The value will be used if `enableSpeakerDiarization` is set to `True`. |
| source       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc | Optional                  |


!!! note "**NOTES:** "
    * We recommend using `CallCenter` when there are 2-3 speakers expected to be identified and `Meeting` when 4-6 speakers are expected.
    * Exactly one of `contentUri` and `content` should be passed. In case both values are passed, error is thrown.
    * `enableVoiceActivityDetection`: This parameters is required if you want silence & noise segments removed from the diarization output. We suggest you to set it to `True`.
    * `source`: Adding source information enables an enhanced model which is built specifically for those audio sources. 


### Query Parameters

| Parameter  | Type   | Description                                                             | Notes                                            |
| ---------- | ------ | ----------------------------------------------------------------------- | ------------------------------------------------ |
| webhook    | String | The webhook url at which the responses will be sent.                    | Required for async requests.                     |

### Response Status Codes (Async)

| Status Code   | Description                       |
| ------------  | ------                            | 
| 202           | Request Successfully Accepted     |
| 400           | Bad Request                       | 
| 401           | Unauthorized                      | 

### Response Parameters (Webhook)

| Parameter  | Type   | Description                             | Notes                                                               |
| ---------- | ------ | --------------------------------------- | ------------------------------------------------------------------- |
| response   | Object | The actual output of the transcription or [errors](./errors.md) in case of failures | The Transcribed object is defined below.                            |
| status     | Enum   | Options: Success, Fail                                             |  


#### Transcribed Object

| Parameter    | Type   | Description                       | Notes                                                                           |
| ------------ | ------ | --------------------------------- | ------------------------------------------------------------------------------- |
| speakerCount | Number | The number of speakers detected.  | Optional. Field is set only when `enableSpeakerDiarization` is `true`. |
| words        | List   | List of word segments.            | The Word Segment is defined below.                           |
| transcript   | String | The entire transcript with/without punctuations according to the input. |                        |
| confidence   | Number | Overall transcription confidence. |                                                              |


#### Word Segment

| Parameter  | Type   | Description                                         | Notes |
| ---------- | ------ | --------------------------------------------------- | ----- |
| speakerId  | String | The speaker id for the corresponding audio segment. | Optional. Field is set only when `enableSpeakerDiarization` is `true`. |
| start      | Number | Start time of the audio segment in seconds.         |       |
| end        | Number | End time of the audio segment in seconds.           |       |
| word       | String | The word corresponding to the audio segment.        |       |
| confidence | Number | Confidence score for the word.                      |       |

#### More Information

Please refer to the API Reference document for [detailed description.](swagger-api-ref.md)