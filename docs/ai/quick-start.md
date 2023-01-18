# Conversational Intelligence API Quick Start Guide

{! docs/ai/beta-notice.md !}

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.
In this Quick Start, we are going to help you create your first "Speech to Text" application on the RingCentral platform in just a few minutes. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create AI App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=AI+Quick+Start+App&desc=A+simple+app+to+demo+using+AI+APIs+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create AI App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "API App for RingCentral Office" under "What type of app are you creating?"</li>
<li>Select "Other Non-UI" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>Under "Auth" select "JWT auth flow". Make sure to create JWT Credentials afterwards.</li>
</ol>
</div>

## Request help from support

Access to the RingCentral Conversational API currently requires help from support in order to grant the "AI" application scope to your application, and graduate it to production. 

<a target="_new" class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfwFYQLx2wTidwcGt3ZEkfnwvUIcrIdshEcH2EYQwTbZUeWyA/viewform?usp=sf_link">Request app graduation</a>


## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.
	
## Setup a server to process the response asynchronously

The Conversational Intelligence APIs provide responses in an asynchronous manner by posting responses to a URL specified by the developer when the request is made. Our first step therefore is setting up a simple web server to display the response we will receive from RingCentral. The server below is written in Javascript and uses [ngrok](https://ngrok.com/download) to proxy requests from RingCentral to your local development machine. To keep your first application simple, this server does nothing more than acknowledge receipt and echo the payload of anything it receives to the console. 

### Start ngrok

Download and install [ngrok](https://ngrok.com/download) if you have not already. Then start your ngrok server and make note of its https URL. You will enter that URL in the server you create in the next step. 

```bash
$ ngrok http 5000
  Forwarding https://xxx-yyy-zzz.ngrok.io -> https://localhost:5000
```

### Create and start your server

Create a file called `server.js` using the contents below. Edit `server.js` to properly reference the `NGROK_URL` generated in the previous step.

```js
{! code-samples/ai/quick-start-server.js !}
```

Finally, start your server.

```bash
$ node server.js
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

### What Next ?

We recommend reading the ["API Reference"](swagger-api-ref.md) to understand the various APIs definition, HTTP Rquest and Response objects. You can also refer to the detail guides for various AI APIs from the left side navigation.
