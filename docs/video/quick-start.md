# RingCentral Video REST API Quick Start

!!! warning "The RingCentral Video REST API and Video SDKs are in beta"

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create your first meeting on the platform in just a few minutes. Let's get started.

## Create an app

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Meetings App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Meetings+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+meeting+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Meetings&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Video App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "Password-based auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>Meetings</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Create a meeting bridge

=== "Javascript"

    ### Install RingCentral Node.js SDK

    ```bash
    $ npm install @ringcentral/sdk
    ```

    ### Create and Edit meetings.js

    Create a file called `meetings.js`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```js
	{!> code-samples/video/meetings.js !}
	```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ node meetings.js
    ```

=== "Python"

    ### Install RingCentral Python SDK (Python version 3.x recommended)

    ```bash
    $ pip install ringcentral
    ```

    ### Create and Edit meetings.py

    Create a file called `meetings.py`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```python
    {!> code-samples/video/meetings.py !}
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ python meetings.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```

    ### Create and Edit meetings.php

    Create a file called `meetings.php`. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ```php
    {!> code-samples/video/meetings.php !}
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ php meetings.php
    ```
=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk
    ```

    ### Create and Edit meetings.rb

    Create a file called `meetings.rb`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```ruby
	{!> code-samples/video/meetings.rb !}
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ ruby meetings.rb
    ```

=== "C#"

    !!! warning "C# and .NET SDKs are not currently available"
	    If you are looking to call RingCentral Video APIs using Java or C#, RingCentral Video APIs can't be invoked using RingCentra's Java or C# SDK at the moment. You can however call the APIs directly from those programming lanugaes using a REST based helper library if needed.

=== "Java" 

    !!! warning "A Java SDK is not currently available"
        If you are looking to call RingCentral Video APIs using Java or C#, RingCentral Video APIs can't be invoked using RingCentra's Java or C# SDK at the moment. You can however call the APIs directly from those programming lanugaes using a REST based helper library if needed.

## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=meetings">Search the forums &raquo;</a>

## What's Next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application. Have a look at our private sample (please provide us your GitHub username to allow access to this repo) [Node.JS application](https://github.com/ringcentral/ringcentral-video-js-demo) for reference purpose.

<a class="btn btn-success btn-lg" href="https://ringcentral-ringcentral-video-api-docs.readthedocs-hosted.com/en/latest/sample-app">Take your next step &raquo;</a>

