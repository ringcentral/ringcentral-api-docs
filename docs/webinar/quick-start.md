# RingCentral Webinar API Quick Start

{! docs/webinar/beta-notice.md !}

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create your first webinar on the platform in just a few minutes. Let's get started.

## Create an app

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Webinar App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Meetings+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+meeting+on+RingCentral&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Webinar&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Webinar App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Auth" select "JWT auth flow."
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Request help from support

Access to the RingCentral Webinar API currently requires help from support in order to grant the "Webinar" application scope to your application, and graduate it to production. 

<a target="_new" class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfwFYQLx2wTidwcGt3ZEkfnwvUIcrIdshEcH2EYQwTbZUeWyA/viewform?usp=sf_link">Request app graduation</a>

## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above, paying close attention to the following:
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../../authentication/jwt/create-jwt) for yourself

## Create a webinar

=== "Javascript"

    ### Install RingCentral Node.js SDK

    ```bash
    $ npm install @ringcentral/sdk dotenv
    ```

    ### Create and edit webinar.js

    Create a file called `webinar.js`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```js
	{!> code-samples/webinar/quick-start.js !}
	```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ node webinar.js
    ```

=== "Python"

    ### Install RingCentral Python SDK (Python version 3.x recommended)

    ```bash
    $ pip install ringcentral
    ```

    ### Create and edit webinar.py

    Create a file called `webinar.py`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```python
    {!> code-samples/webinar/quick-start.py !}
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ python webinar.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```

    ### Create and edit webinar.php

    Create a file called `webinar.php`. Be sure to edit the variables in ALL CAPS with your app and user credentials. 

    ```php
    {!> code-samples/webinar/quick-start.php !}
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ php webinar.php
    ```
=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk
    ```

    ### Create and edit webinar.rb

    Create a file called `webinar.rb`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```ruby
	{!> code-samples/webinar/quick-start.rb !}
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ ruby webinar.rb
    ```

=== "C#"

    !!! warning "C# and .NET SDKs are not currently available"
	    If you are looking to call RingCentral Webinar APIs using Java or C#, RingCentral Webinar APIs can't be invoked using RingCentral's Java or C# SDK at the moment. You can however call the APIs directly from those programming lanugaes using a REST based helper library if needed.

=== "Java" 

    !!! warning "A Java SDK is not currently available"
        If you are looking to call RingCentral Webinar APIs using Java or C#, RingCentral Webinar APIs can't be invoked using RingCentral's Java or C# SDK at the moment. You can however call the APIs directly from those programming lanugaes using a REST based helper library if needed.

## Need help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=meetings">Search the forums &raquo;</a>

## What's next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application. 

<a class="btn btn-success btn-lg" href="https://ringcentral-ringcentral-video-api-docs.readthedocs-hosted.com/en/latest/sample-app">Take your next step &raquo;</a>

