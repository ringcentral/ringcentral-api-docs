# Artificial Intelligence API Quick Start Guide

{! mdx_includes/ai-beta-notice.md !}

!!! hint "**Calling the RingCentral API for the first time?** We recommend you try out [getting started experience](../getting-started/index.md)."

In this quick start, we are going to help you create your first "Speech to Text" application on the RingCentral platform in just a few minutes. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create AI App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

[Create AI App](https://developer.ringcentral.com/new-app?name=AI+Quick+Start+App&desc=A+simple+app+to+demo+using+AI+APIs+on+RingCentral&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=AI&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart){class="btn btn-primary" target="_new"}
[Show detailed instructions](#create-app-instructions){class="btn-link btn-collapse" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="create-app-instructions"}

<div class="collapse" id="create-app-instructions" markdown>
<ol>
<li>[Login or create an account](https://developer.ringcentral.com/login.html#/") if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Auth" select "JWT auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>RingOut</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

## Request help from support

Access to the RingCentral Artificial API currently requires help from support in order to grant the "AI" application scope to your application. 

!!! hint "Using the AI API in sandbox vs prodcution"
    The AI API works in both sandbox and production, but sandbox has limitations such as only the first 10 minutes of the audio is processed. Since sandbox is used for testing and development purposes only, we do not expect developers to process large media files in sandbox.

[Request app graduation](https://docs.google.com/forms/d/e/1FAIpQLSfwFYQLx2wTidwcGt3ZEkfnwvUIcrIdshEcH2EYQwTbZUeWyA/viewform?usp=sf_link){target="_new" class="btn btn-primary"}


## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../basics/code-samples.md). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../getting-started/create-credential.md) for yourself
     * `RC_MEDIA_URL` - set to a publicly accessible URL for a file you want to transcribe (a functioning default value has been provided for you)
	
## Setup a server to process the response asynchronously

The Artificial Intelligence APIs provide responses in an asynchronous manner by posting responses to a URL specified by the developer when the request is made. Our first step therefore is setting up a simple web server to display the response we will receive from RingCentral. Two sample servers are provided below in Javascript and Python. Both use [ngrok](https://ngrok.com/download) to proxy requests from RingCentral to the server running on your local development machine. To keep your first application simple, this server does nothing more than acknowledge receipt and echo the payload of anything it receives to the console. You are free to use these sample servers, or setup your own web server to process the responses transmitted by RingCentral.

### Start ngrok

Download and install [ngrok](https://ngrok.com/download) if you have not already. Then start your ngrok server and make note of its https URL. You will enter that URL in the server you create in the next step. 

```bash
$ ngrok http 5000
  Forwarding https://xxx-yyy-zzz.ngrok.io -> https://localhost:5000
```

### Create and start your server

=== "Javascript" 

    First, install the prerequisites.

    ```bash
    $ npm install @ringcentral/sdk
    $ npm install dotenv
    ```

    Create a file called `server.js` using the contents below. Edit `server.js` to properly reference the `NGROK_URL` generated in the previous step.

    ```js
    {!> code-samples/ai/quick-start-server.js !}
    ```

    Finally, start your server.

    ```bash
    $ node server.js
    ```

=== "Python" 

    First, install the prerequisites.

    ```bash
    $ pip install pprintpp
    ```
	
    Create a file called `server.py` using the contents below. Edit `server.py` to properly reference the `NGROK_URL` generated in the previous step.


    ```js
    {!> code-samples/ai/quick-start-server.py !}
    ```

    Finally, start your server.

    ```bash
    $ python server.py
    ```

## Convert speech to text

=== "Javascript"

    #### Setup your project

    ```bash
    $ npm install @ringcentral/sdk
    $ npm install dotenv
    ```

	Finally, add your `.env` file you created earlier to your project directory. 

    #### Create and edit `index.js`

    Copy and paste the code from below in `index.js`. Be sure the values in your `.env` file have been set properly, including the `RC_MEDIA_URL` variable. 

    ```js
    {!> code-samples/ai/quick-start.js !}
    ```

    #### Run your code

    You are almost done. Now run your script above to send the request to RingCentral and recive the response.
  
    ```bash
    $ node index.js
    ```

=== "Python"

    #### Setup your project

    ```bash
    $ pip install ringcentral
    $ pip install python-dotenv
    ```

	Finally, add your `.env` file you created earlier to your project directory. 

    #### Create and edit `index.py`

    Copy and paste the code from below in `index.py`. Be sure the values in your `.env` file have been set properly, including the `RC_MEDIA_URL` variable. 
	
    ```js
    {!> code-samples/ai/quick-start.py !}
    ```

    #### Run your code

    You are almost done. Now run your script above to send the request to RingCentral and recive the response.
  
    ```bash
    $ python index.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Create and edit index.php

    Create a file called `index.php`. Be sure the values in your `.env` file have been set properly, including the `RC_MEDIA_URL` variable. 

    ```php
    {!> code-samples/messaging/quick-start.php !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ php index.php
    ```

## Await receipt of a response from RingCentral

In time, when RingCentral has fully processed the request, a response will be posted to the server you created previously. The response should look similar to the following.

```bash
{! code-samples/ai/quick-start-response.json !}
```

