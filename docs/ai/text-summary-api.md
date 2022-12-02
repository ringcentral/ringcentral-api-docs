no_breadcrumb:true

## Conversational Summarization API

### Description

The Conversational Summarization API allows you to summarize the meaning of an audio transcript (speaker tagged), extracting its most relevant part of the conversation. The API provides two types of summaries:

- Abstractive (Default): Text summarization aims to understand the meaning behind a text and communicate it in newly generated sentences.
- Extractive: Extracting the most relevant sentences. Its suited for the sales call, customer support call, virtual meetings, podcasts & more.
- AbstractiveLong:
- AbstractiveAll:
- All: This returns all of the above types.

Optionally, can also pass "start" and "end" times and "speakerId" as the part of request to get the speaker aware summaries (both extractive and abstractive).

### API Endpoint

```shell
POST https://platform.ringcentral.com/ai/text/v1/async/summarize
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

    ```javascript
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
        conversationSummarization();
    });

    async function conversationSummarization() {
        try {
        console.log("Calling RingCentral Conversational Summarization API");
        let resp = await platform.post("/ai/text/v1/async/summarize?webhook=" + WEBHOOK_ADDRESS, {
            "summaryType": "Extractive",
            "utterances": [
            {
                "text": "A knowledge base is an online support library that contains useful information 
				         about your product or service and any related topics. Commonly referred to as 
						 a “self-service” solution, a knowledge base lets your customers find answers 
						 to their support questions without having to speak to a person on your team 
						 (and taking up their precious time).  A knowledge base can include any variety 
						 of resources that help customers get the most from a product or service, 
						 including how-to guides, video tutorials, FAQs, white papers, case studies, 
						 and even user forums.  Unlike marketing materials and onboarding sequences, 
						 knowledge bases provide comprehensive and detailed information about all 
						 aspects of a company’s products and customer service.  For example, you might 
						 include in-depth documentation about how to troubleshoot different product 
						 issues, as well as knowledge base articles explaining your payment structures 
						 and refund policies."
            }
            ]
        });
        console.log("Converation Summarization Job " + resp.statusText + " with HTTP status code " + resp.status);
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
                print(f'Test post method invoked')
                print(post_data)
            self._set_response()

    # Invoke Conversational Summary API
    def conversationalSummary():

        # Endpoint to invoke Conversational Summary
        endpoint = "https://platform.devtest.ringcentral.com/ai/text/v1/async/summarize"

        # Webhook as Query Param
        querystring = {"webhook":os.getenv('WEBHOOK_ADDRESS')}

        # Payload
        payload = {
            "summaryType": "Extractive",
            "utterances": [
                {
                    "text": "A knowledge base is an online support library that contains useful 
					         information about your product or service and any related topics. 
							 Commonly referred to as a “self-service” solution, a knowledge base 
							 lets your customers find answers to their support questions without 
							 having to speak to a person on your team (and taking up their 
							 precious time).  A knowledge base can include any variety of 
							 resources that help customers get the most from a product or service, 
							 including how-to guides, video tutorials, FAQs, white papers, case 
							 studies, and even user forums.  Unlike marketing materials and 
							 onboarding sequences, knowledge bases provide comprehensive and 
							 detailed information about all aspects of a company’s products and 
							 customer service.  For example, you might include in-depth 
							 documentation about how to troubleshoot different product issues, 
							 as well as knowledge base articles explaining your payment structures 
							 and refund policies."
                }
            ]
        }

        try:
            # Instantiate Ringcentral SDK 
            rcsdk = SDK( os.getenv('RC_CLIENT_ID'),os.getenv('RC_CLIENT_SECRET'),os.getenv('RC_SERVER_URL'))
            platform = rcsdk.platform()

            # Login Using JWT
            platform.login( jwt=os.getenv('RC_JWT') );

            # Make HTTP POST call to the Conversational Summarization endpoint with the query string and payload
            response = platform.post(endpoint, payload, querystring);
            print(response.json());

        except Exception as e:
            print(e)

    ```
    # Create HTTP server to listen on the defined port  

    ```python
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
        conversationalSummary()
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
                "summaryType": "Extractive",
                "utterances": [
                    {
                    "text": "A knowledge base is an online support library that contains useful 
					         information about your product or service and any related topics. 
							 Commonly referred to as a “self-service” solution, a knowledge base 
							 lets your customers find answers to their support questions without 
							 having to speak to a person on your team (and taking up their 
							 precious time).  A knowledge base can include any variety of 
							 resources that help customers get the most from a product or service, 
							 including how-to guides, video tutorials, FAQs, white papers, case 
							 studies, and even user forums.  Unlike marketing materials and 
							 onboarding sequences, knowledge bases provide comprehensive and 
							 detailed information about all aspects of a company’s products and 
							 customer service.  For example, you might include in-depth 
							 documentation about how to troubleshoot different product issues, 
							 as well as knowledge base articles explaining your payment structures 
							 and refund policies."
                }
                ]
    }
    ```

    #### Make Reques to the API

    Open a terminal window to make the request,

        ```shell
        curl -X POST \
            "https://platform.ringcentral.com/ai/text/v1/async/summarize?webhook=<webhookUrl>" \
			-H 'Authorization: Bearer $BEARER_TOKEN' \
			-H 'content-type: application/json' \
			-d @data.json
        ```


### Async Response

=== "HTTP Response"

    ```json
    HTTP 202 "Accepted" for successful requests
    ```

### Webhook Response (Async)

=== "Success"

    ```json
    {
      "status": "Success",
      "response": {
        "summaries": [
          {
            "name": "Extractive",
            "values": [
              {
                "value": "Commonly referred to as a “self-service” solution, a knowledge base. 
				          Lets your customers find answers to their support questions without 
						  having to speak to a person on your team and taking up their precious 
						  time.",
                "start": 0.12,
                "end": 1.12,
                "speakerId": "",
                "confidence": 0.5238
              },
              {
                "value": "A knowledge base can include any variety of resources that help 
				          customers get the most from a product or service, including howto 
						  guides, video tutorials, Faqs, white papers, case studies and even 
						  user forums.",
                "start": 0.12,
                "end": 1.12,
                "speakerId": "",
                "confidence": 0.5143
              }
            ]
          }
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
            "message": "Parameter [summaryType] is invalid. It should be one of `Extractive`, `AbstractiveLong`, `AbstractiveShort`, `All`",
            "parameterName": "summaryType"
          }
        ]
      }
    }
    ```

### Body Parameters

| Parameter   | Type               | Description                     | Notes                   |
| ----------- | ------------------ | ------------------------------- | ----------------------- |
| summaryType | String             | Permitted values: `Extractive`, `AbstractiveLong`, `AbstractiveShort`, `All`. | Default is `Extractive`. Pass `All` to compute both extractive and abstractive type of summaries. |
| utterances | List[utterances-Data] | List of speakerId, start, end and text object. |                         |


### utterances-Data
| Parameter | Type   | Description                   | Notes                                                                                       |
| --------- | ------ | ----------------------------- | ------------------------------------------------------------------------------------------- |
| speakerId | String | Speaker id for the text blob  | Optional, abstractive summary uses speakerId to reference in the output |
| text      | String | Text blob for summary         | Required                             |
| start     | Number | start time of the segment     | Optional                             |
| end       | Number | start time of the segment     | Optional                             |

### Query Parameters

| Parameter  | Type   | Description                      | Notes    |
| ---------- | ------ | -------------------------------- | ---------|
| webhook    | String | The webhook url at which the responses will be sent.                    | Required for async requests.                     |

### Response Status Codes (Async)

| Status Code   | Description                       |
| ------------  | ------                            | 
| 202           | Request Successfully Accepted     |
| 400           | Bad Request                       | 
| 401           | Unauthorized                      | 

### Response Parameters (Webhook): 

| Parameter  | Type   | Description                                                    | Notes         |
| ---------- | ------ | -------------------------------------------------------------- | ------------- |
| response   | Object | Summaries object defined below or [errors](./errors.md) in case of failure     |               |
| status     | Enum   | Options: Success, Fail                                         |               |  


### Summaries Object:
| Parameter  | Type   | Description                                                    | Notes         |
| ---------- | ------ | -------------------------------------------------------------- | ------------- |
| summaries  | List[Summary-Output-Unit] | Summary-Output Unit object defined below      |               |

### Summary-Output Unit
| Parameter  | Type   | Description                                   | Notes |
| ---------- | ------ | --------------------------------------------- | ----- |
| name       | Enum   | Options: `Extractive`, `AbstractiveLong`, `AbstractiveShort` | |
| values     | List[Summary-Timings-Unit] | Summary-Output Unit object defined below      |               |
### Summary-Timings Unit

| Parameter  | Type   | Description                                   | Notes |
| ---------- | ------ | --------------------------------------------- | ----- |
| start      | Number | Start time of the summary segment in seconds. | Conditional on input payload       |
| end        | Number | End time of the summary segment in seconds.   | Conditional on input payload       |
| value      | String | Text of the summary segment.                  |       |
| confidence | Number | confidence score for the summary segment      | Optional      |

!!! note "**NOTES:** "
    * In case of extractive summary, the start and end times refer to the exact time of the segment.
    * In case of abstractive summary, the start and end time refer to the time of text blob which is abstracted.
    * The start, end times are returned if they're part of the input payload

#### More Information

Please refer to the API Reference document for [detailed description.](swagger-api-ref.md)
