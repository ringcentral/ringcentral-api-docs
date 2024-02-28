# RingCentral Video REST API Quick Start

{! mdx_includes/video-beta-notice.md !}

!!! hint "**Calling the RingCentral API for the first time?** We recommend you try out [getting started experience](../../getting-started/index.md)."

In this quick start, we are going to help you create your first meeting on the platform in just a few minutes. Let's get started.

## Create an app

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Video App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Video+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+meeting+on+RingCentral&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Video&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Video App</a>
<a class="btn-link btn-collapse" data-bs-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "JWT auth flow."
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Request help from support

Access to the RingCentral Video API currently requires help from support in order to grant the "Video" application scope to your application, and graduate it to production. 

<a target="_new" class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfwFYQLx2wTidwcGt3ZEkfnwvUIcrIdshEcH2EYQwTbZUeWyA/viewform?usp=sf_link">Request app graduation</a>

## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples.md). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above, paying close attention to the following:
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../../getting-started/create-credential.md) for yourself

## Create a meeting bridge

=== "Javascript"

    ### Install RingCentral Node.js SDK

    ```bash
    $ npm install @ringcentral/sdk
    ```

    ### Create and edit meetings.js

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

    ### Create and edit meetings.py

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

    ### Create and edit meetings.php

    Create a file called `meetings.php`. Be sure to edit the variables in ALL CAPS with your app and user credentials. 

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

    ### Create and edit meetings.rb

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

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1 or higher version
    * Enter project name "Send_SMS"
    * Add NuGet package RingCentral.Net (6.0.0) SDK
    * Save the .env file under your project folder. E.g. /Send_SMS/bin/Debug/netcoreapp2.2/.env

    ### Edit the file Program.cs

    ```c#
    {!> code-samples/video/meetings.cs !}
    ```
	
	### Run Your App

    You are almost done. Now run your app from Visual Studio.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "SendSMS"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

        ```json
        dependencies {
            // ...
            compile 'com.ringcentral:ringcentral:3.0.0'
        }
        ```

    * On Eclipse menu, select "Run" and choose the "Run Configurations" and in the dialog, select your project and select the "Environments" tab then enter the following variables:
        - RC_CLIENT_ID
        - RC_CLIENT_SECRET
        - RC_SERVER_URL
        - RC_JWT

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "CreateMeeting"

    ```java
    package CreateMeeting;

    public class CreateMeeting {

      public static void main(String[] args) {
        // TODO Auto-generated method stub

      }
    }
    ```

    ### Edit the file "CreateMeeting.java".

    ```java
    {!> code-samples/video/meetings.java !}
    ```

    ### Run Your App

    You are almost done. Now run your app from Eclipse.

## Need help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://forums.developers.ringcentral.com/search.html?c=11&includeChildren=false&f=&type=question+OR+kbentry+OR+answer+OR+topic&redirect=search%2Fsearch&sort=relevance&q=meetings">Search the forums &raquo;</a>

## What's next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application. Have a look at our private sample (please provide us your GitHub username to allow access to this repo) [Node.JS application](https://github.com/ringcentral/ringcentral-video-js-demo) for reference purpose.

<a class="btn btn-success btn-lg" href="https://ringcentral-ringcentral-video-api-docs.readthedocs-hosted.com/en/latest/sample-app">Take your next step &raquo;</a>

