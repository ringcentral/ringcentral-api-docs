no_breadcrumb:true

## Analyze Interactions From an Audio/Video Recording

### Description

Interaction Analytics is used to understand a conversation happening in a meeting between two or more people and gain more actionable insights. This API is a comprehensive API, that provides all the functionality, such as speaker diarization, speech-to-text, speaker recognition, emotion recognition, summary, keywords & conversation metrics, within the one single API call. 

#### For Example:
Let's say we want to analyze a meeting between sales rep and a customer, and that meeting lasted for around 20 minutes. 

* We can get analytics on speaker ratio, i.e. sales rep spoke for 12 minutes, and 8 minutes were taken by customer (which would be termed as good ratio for a sales call). 
* We can also gauge the pace at which both were talking, as well as the emotions running throughout the meeting. 
* Lastly we can get the gist of the meeting(i.e. Abstractive Summary) as text instead of listening to the recording again for 20 mins.

These data points provides us with priceless insights to act upon intelligently.

This API simplifies your integration by providing 3 levels of insights:

* Conversational Insights - Abstractive Summary(AI's own generated words), Extractive Summary(key extracts from the recording), Key Phrases, Tasks, Titles
* Speaker level Insights - Speaker count, Talk time, Pace, Tone & more.
* Utterance level Insights - Utterance transcripts, Emotions (Anger, Anticipation, Disgust, Fear, Joy, Sadness, Surprise, Trust, Neutral)

 This API can be used in tandem with [Speaker Enrollment](speaker-enrollment-api.md) as well. So if there are speakers who are already enrolled into the system for a particular account, those speaker ids can be passed to this API so that they can be identified. More details on this soon.


### API Endpoint

```shell
POST https://platform.ringcentral.com/ai/insights/v1/async/analyze-interaction
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

    // Login into the Developer Portal using Developer's JWT Credential
    platform.login({
      'jwt': process.env.RC_JWT
    });

    // Call the Interaction Analysis API right after login asynchronously
    platform.on(platform.events.loginSuccess, () => {
      analyzeInteraction();
    })

    async function analyzeInteraction() {
      try {
        console.log("Calling RingCentral Interaction Analytics API");
        let resp = await platform.post("/ai/insights/v1/async/analyze-interaction?webhook=" + WEBHOOK_ADDRESS,{
                          "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
                          "encoding": "Wav",
                          "languageCode": "en-US",
                          "source": "RingCentral",
                          "audioType": "Meeting",
                          "insights": [
                                        "All"
                                      ],
                          "enableVoiceActivityDetection": true,
                          "enablePunctuation": true,
                          "enableSpeakerDiarization": false
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
    You are almost done. Now run your Node.JS Server to make the request and receive the response.
    
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

          # Handle POST 
          def do_POST(self):
              content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
              post_data = self.rfile.read(content_length) # <--- Gets the data itself
              if self.path == '/webhook':
                  print(post_data)
              self._set_response()

      # Invoke Interaction Analysis API 
      def analyzeInteractions():

          # Endpoint to invoke Interaction analysis API 
          endpoint = os.getenv('RC_SERVER_URL')+"/ai/insights/v1/async/analyze-interaction"

          # Webhook as Query string
          querystring = {"webhook":os.getenv('WEBHOOK_ADDRESS')}

          # Payload
          payload = {
              "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
              "encoding": "Wav",
              "languageCode": "en-US",
              "source": "RingCentral",
              "audioType": "Meeting",
              "insights": ["All"],
              "enableVoiceActivityDetection": True,
              "enablePunctuation": True,
              "enableSpeakerDiarization": False
          }

          try:
              # Instantiate Ringcentral SDK 
              rcsdk = SDK( os.getenv('RC_CLIENT_ID'),os.getenv('RC_CLIENT_SECRET'),os.getenv('RC_SERVER_URL'))
              platform = rcsdk.platform()

              # Login Using JWT
              platform.login( jwt=os.getenv('RC_JWT') );

              # Make HTTP POST call to the Interaction analysis endpoint with the query string and payload
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
          analyzeInteractions()
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
        "insights": ["All"],
        "enableVoiceActivityDetection": True,
        "enablePunctuation": True,
        "enableSpeakerDiarization": False
      }
    ```

    #### Make Reques to the API

    Open a terminal window to make the request,  

    ```shell
      curl -X POST \
      "https://platform.ringcentral.com/ai/insights/v1/async/analyze-interaction?webhook=<webhookUrl>" -H 'Authorization: Bearer $BEARER_TOKEN' -H 'content-type: application/json' -d @data.json
    ```


### Async API Response

=== "HTTP Response"

    ```
    HTTP 202 "Accepted" for successful requests
    ```

### WebHook Response

=== "Success"

    ```json
    {
      "status": "Success",
      "response": {
        "utteranceInsights": [
          {
            "start": 2.52,
            "end": 6.53,
            "text": "Could produce large hail isolated tornadoes and heavy rain.",
            "confidence": 0.93,
            "speakerId": "1",
            "insights": [
              {
                "name": "Emotion",
                "value": "Neutral",
                "confidence": 0.7
              }
            ]
          }
        ],
        "speakerInsights": {
          "speakerCount": 2,
          "insights": [
            {
              "name": "Energy",
              "values": [
                {
                  "speakerId": "0",
                  "value": 86.64
                },
                {
                  "speakerId": "1",
                  "value": 62.69
                }
              ]
            },
            {
              "name": "TalkToListenRatio",
              "values": [
                {
                  "speakerId": "0",
                  "value": "32:68"
                },
                {
                  "speakerId": "1",
                  "value": "68:32"
                }
              ]
            },
            {
              "name": "QuestionsAsked",
              "values": [
                {
                  "speakerId": "0",
                  "value": 0,
                  "questions": []
                },
                {
                  "speakerId": "1",
                  "value": 0,
                  "questions": []
                }
              ]
            }
          ]
        },
        "conversationalInsights": [
          {
            "name": "KeyPhrases",
            "values": []
          },
          {
            "name": "ExtractiveSummary",
            "values": [
              {
                "value": "Could produce large hail isolated tornadoes and heavy rain.",
                "start": 2.52,
                "end": 6.53,
                "speakerId": "1",
                "confidence": 0.51
              }
            ]
          },
          {
            "name": "Topics",
            "values": []
          },
          {
            "name": "Tasks",
            "values": []
          },
          {
            "name": "AbstractiveSummaryLong",
            "values": []
          },
          {
            "name": "AbstractiveSummaryShort",
            "values": []
          }
        ]
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

| Parameter    | Type   | Description                                               | Notes                        |
| ------------ | ------ | --------------------------------------------------------- | ---------------------------- |
| encoding     | String | Encoding of audio file like MP3, WAV etc.                 | Required                     |
| sampleRate   | Number | Sample rate of the audio file.                            |  Optional                            |
| languageCode | String | Language spoken in the audio file.                        | Required. [default to &#39;en-US&#39;] |
| separateSpeakerPerChannel | Boolean | Set to True if the input audio is multi-channel and each channel has a separate speaker. | Optional. [default to `False`] |
| speakerCount | Number | Number of speakers in the file | Optional.         |
| audioType    | String | Type of the audio based on number of speakers.            | Optional. Permitted values: `CallCenter`, `Meeting`, `EarningsCalls`, `Interview`, `PressConference` |
| speakerIds   | List[String] | Optional set of speakers to be identified from the call. | Optional. [default to []]    |
| enableVoiceActivityDetection        | Bool   | Apply voice activity detection.                           | Optional. [default to `False`]    |
| content      | String | base64 encoding of the audio file.                        | Semi-Optional.                    |
| contentUri          | String | Publicly facing url.                                      | Semi-Optional.                    |
| source       | String | Source of the audio file eg: `Phone`, `RingCentral`, `GoogleMeet`, `Zoom` etc | Optional                  |
| insights      | List[String] | List of metrics to be run. Send ['All'] to extract all analytics. | Permitted Values: `All`, `KeyPhrases`, `Emotion`, `AbstractiveSummaryLong`, `AbstractiveSummaryShort`, `ExtractiveSummary`, `TalkToListenRatio`, `Energy`, `Pace`, `QuestionsAsked`, `Title`, `Tasks` |

!!! note "**NOTES:** "
    * We recommend using `CallCenter` when there are 2-3 speakers expected to be identified and `Meeting` when 4-6 speakers are expected.
    * Exactly one of `contentUri` and `content` should be passed. In case both values are passed, error is thrown.
    * `enableVoiceActivityDetection`: This parameters is required if you want silence & noise segments removed from the diarization output. We suggest you to set it to `True`.
    * `source`: Adding source information enables an enhanced model which is built specifically for those audio sources.


### Query Parameters

| Parameter    | Type   | Description                                               | Notes                        |
| ------------ | ------ | --------------------------------------------------------- | ---------------------------- |
| webhook    | String | The webhook url at which the responses will be sent.        | Required |

### Response Status Codes (Async)

| Status Code   | Description                       |
| ------------  | ------                            | 
| 202           | Request Successfully Accepted     |
| 400           | Bad Request                       | 
| 401           | Unauthorized                      | 

### Response Parameters (Webhook)

| Parameter    | Type   | Description                                               | Notes                        |
| ------------ | ------ | --------------------------------------------------------- | ---------------------------- |
| response   | Object | The actual output of the interaction analytics or [errors](./errors.md) in case of failures| The Interaction-Analytics-Object is defined below.        |
| status     | Enum   | Options: Success, Fail                                             |                       |


#### Interaction-Analytics-Object

| Parameter    | Type   | Description                                               | Notes                        |
| ------------ | ------ | --------------------------------------------------------- | ---------------------------- |
| utteranceInsights           | List[Utterance-Insights]  | List of utterances and the insights computed for each utterance.          | The Utterance-Insights is defined below.          |
| speakerInsights             | Object   | The set of insights computed for each speaker separately.   | The Speaker-Insights-Object is defined below.   |
| conversationalInsights      | List[Conversational-Insights-Object]    | List of insights computed by analyzing the conversation as a whole.             | The Conversational-Insights-Object is defined below.             |

#### Utterance-Insights-Object

| Parameter     | Type   | Description                                            | Notes |
| ------------- | ------ | ------------------------------------------------------ | ----- |
| speakerId    | String | The speaker id for the corresponding audio segment.    |       |
| start         | Number | Start time of the audio segment in seconds.            |       |
| end           | Number | End time of the audio segment in seconds.              |       |
| text          | String | The transcription output corresponding to the segment. |       |
| confidence    | Number | The confidence score for the transcribed segment.      |       |
| insights       | List[Utterance-Insights-Unit] | List of utterance level insights 

#### Utterance-Insights-Unit
| Parameter     | Type   | Description                                            | Notes |
| ------------- | ------ | ------------------------------------------------------ | ----- |
| name | String Enum | Possible values: Emotion | Anger, Anticipation, Disgust, Fear, Joy, Sadness, Surprise, Trust, Neutral. |
| value | String | Value corresponding to the insight | |
| confidence | Number | Confidence Score | Optional |

#### Speaker-Insights-Object

| Parameter  | Type   | Description                                         | Notes |
| ---------- | ------ | --------------------------------------------------- | ----- |
| speakerCount | Number | Number of speakers detected. |   The number of speakers will be equal to `speakerCount` parameter. In case `speakerCount`  isn't set, the number of speakers are estimated algorithmically.     |
| insights      |  List[Speaker-Insights-Unit] |List of utterance level insights. Each insight is computed separately for each speaker     |       |


#### Speaker-Insights-Unit
| Parameter     | Type   | Description                                            | Notes |
| ------------- | ------ | ------------------------------------------------------ | ----- |
| name | String Enum | Name of the insight. Possible values: `Energy`, `Pace`, `TalkToListenRatio` | |
| values | List[Speaker-Insights-Value-Unit] | Value corresponding to the insight | |

#### Speaker-Insights-Value-Unit

| Parameter  | Type   | Description                                             | Notes |
| ---------- | ------ | ------------------------------------------------------- | ----- |
| speakerId | String | The speaker id for whom insights are computed. |       |
| value      | Number | The computed value of the insight for this speaker.      |       |

#### Timed-Segment

| Parameter  | Type   | Description                                 | Notes |
| ---------- | ------ | ------------------------------------------- | ----- |
| start      | Number | Start time of the audio segment in seconds. |       |
| end        | Number | End time of the audio segment in seconds.   |       |

#### Conversational-Insights-Object
| Parameter     | Type   | Description                                            | Notes |
| ------------- | ------ | ------------------------------------------------------ | ----- |
| name | String Enum | Name of the insight. Possible values: `AbstractiveSummaryLong`, `AbstractiveSummaryShort`, `ExtractiveSummary`,  `KeyPhrases`, `Tasks`, `Titles`, `QuestionsAsked` | |
| values | List[Conversational-Insights-Value-Unit] | Value corresponding to the insight | |

#### Conversational-Insights-Value-Unit

| Parameter    | Type   | Description                                               | Notes                        |
| ------------ | ------ | --------------------------------------------------------- | ---------------------------- |
| start         | Number | Start time of the audio segment in seconds.            |       |
| end           | Number | End time of the audio segment in seconds.              |       |
| value          | String | The output corresponding to the insight. |       |
| confidence    | Number | The confidence score for the computed insight.      |       |



!!! note "**NOTES:** "
    * In case of `ExtractiveSummary`, the start and end times refer to the exact time of the segment.
    * In case of `AbstractiveSummaryLong` and `AbstractiveSummaryShort` the start and end time refer to the time of text blob which is abstracted.


#### More Information

Please refer to the API Reference document for [detailed description.](swagger-api-ref.md)
