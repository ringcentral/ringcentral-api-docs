style: quick-start

# Meetings Quick Start

{! mdx_includes/rcm-deprecation-notice.md !}

??? check "Paid RingCentral account and Meetings app scope required"
     In order to use this API, developers must have a paid RingCentral account. This API is not available to free developer accounts.
	 In addition, applications that call this API require the "Meetings" application scope. To have this scope added to your application, please [contact developer support](https://developers.ringcentral.com/support/create-case). 

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you creating a meeting on the platform in just a few minutes. Let's get started.

## Create an app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Meetings App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Meetings+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+meeting+on+RingCentral&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Meetings&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Meetings App</a>
<a class="btn-link btn-collapse" data-bs-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

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

Access to the RingCentral Meetings API currently requires help from support in order to grant the "Meetings" application scope to your application.

<a target="_new" class="btn btn-primary" href="https://developers.ringcentral.com/support/create-case">Contact support to request the Meetings scope</a>

## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../basics/code-samples.md). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../getting-started/create-credential.md) for yourself

## Create a meeting

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK

    ```bash
    $ npm install @ringcentral/sdk dotenv --save
    ```

    ### Create and edit meetings.js

    Create a file called `meetings.js` using the content below.

    ```javascript
    {!> code-samples/meetings/quick-start.js !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ node meetings.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral python-dotenv
    ```

    ### Create and edit meetings.py

    Create a file called `meetings.py` using the contents below.

    ```python
    {!> code-samples/meetings/quick-start.py !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ python meetings.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Create and Edit meetings.php

    Create a file called `meetings.php` using the contents below.

    ```PHP
    {!> code-samples/meetings/quick-start.php !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ php meetings.php
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1
    * Enter project name "Create_Meeting"
    * Add NuGet package RingCentral.Net (4.1.0) SDK

    ### Edit the file Program.cs

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ``` c#
    {!> code-samples/meetings/quick-start.cs !}
    ```

    ### Run Your Code

    You are almost done. Now run your app from Visual Studio.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "Create_Meeting"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json
    dependencies {
        // ...
        compile 'com.ringcentral:ringcentral:1.4.0'
    }
    ```

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "MeetingsQuickStart"

    ```java
    package com.ringcentral;

    public class MeetingsQuickStart {

      public static void main(String[] args) {
        // TODO Auto-generated method stub

      }
    }
    ```

    ### Edit the file "MeetingsQuickStart.java".

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/MeetingsQuickStart.java !}
    ```

    ### Run your app

    You are almost done. Now run your app from Eclipse.

=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    ### Create and edit meetings.rb

    Create a file called `meetings.rb`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```ruby
    {!> code-samples/meetings/quick-start.rb !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ ruby meetings.rb
    ```


## Need help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://community.ringcentral.com/search.html?c=8&includeChildren=false&f=&type=question&redirect=search%2Fsearch&sort=relevance&q=meetings">Search the forums &raquo;</a>

## What's next?

When you have successfully made your first API call, it is time to take your next step towards building a more robust RingCentral application.

<a class="btn btn-success btn-lg" href="../../basics/your-first-steps/">Take your next step &raquo;</a>
