no_breadcrumb:true

# RingCentral Line of Business Analytics APIs Quick Start

In this quick start guide, we are going to access call performance data via using Java/C# or Node.JS based command line application.

## Create app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Call Performance Analytics App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Analytics+Quick+Start+App&desc=A+simple+app+to+demo+accessing+call+performance+metrics+on+RingCentral&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Analytics App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Auth" select "JWT auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>Analytics</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

## Download and edit a `.env` file

Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:

1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../../authentication/jwt/create-jwt) for yourself

## Call the Analytics API

=== "Javascript"

    ### Create a Node.JS project

    ```bash
    $ npm init
    ```

    ### Install RingCentral Node.JS SDK & DOTENV Module

    ```bash
    $ npm install @ringcentral/sdk dotenv
    ```

    ### Create and edit 'analytics.js' file

    Create a file called `analytics.js`. Be sure the values in your `.env` file have been set properly, including the `FROM_DATE` and `TO_DATE` variables.

    ```javascript
    {!> code-samples/analytics/quick-start.js !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ node analytics.js
    ```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral python-dotenv
    ```

    ### Create and edit analytics.py

    Create a file called `analytics.py`. Be sure the values in your `.env` file have been set properly, including the `FROM_DATE` and `TO_DATE` variables.

    ```python
    {!> code-samples/analytics/quick-start.py !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ python analytics.py
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Create and edit analytics.php

    Create a file called `analytics.php`. Be sure the values in your `.env` file have been set properly, including the `FROM_DATE` and `TO_DATE` variables.

    ```php
    {!> code-samples/analytics/quick-start.php !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ php analytics.php
    ```

=== "C#"

    ### Create a C# project

    * Choose Console Application .Net or .Net Core
    * Select Target Framework Version
    * Enter project name "WebAPIClient"
    * Add NuGet package [RingCentral.Net SDK](https://github.com/ringcentral/RingCentral.Net) version 5.9.0 or newer
    * Create a JSON file "aggregate-request-body.json" that can be referenced in "JSON Request Body". Refer to the content of this [sample JSON file](https://github.com/ringcentral/call-performance-analytics-demo-csharp/blob/master/WebAPIClient/aggregate-data-request.json).
    * Create a JSON file "timeline-request-body.json" that can be referenced in "JSON Request Body". Refer to the content of this [sample JSON file](https://github.com/ringcentral/call-performance-analytics-demo-csharp/blob/master/WebAPIClient/timeline-data-request.json).

    ### Edit the file 'Program.cs'

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```C#
    {!> code-samples/analytics/Program.cs !}
    ```

    ### Run Your Code

    You are almost done. Now run your app by typing in the command line

    ```bash
    $ cd WebAPIClient
    $ dotnet run
    ```

=== "Java"

    ### Create a Java Gradle/Maven project

    * Make sure you have JDK 11 or newer installed in our machine
    * Install RC Java SDK 2.2.0 or latest from [GitHub](https://github.com/ringcentral/ringcentral-java/releases/tag/2.2.0) or [Maven Central](https://search.maven.org/search?q=a:ringcentral)
    * Create a new Java Class called "App.java"
    * Create a JSON file in the following path inside your project "src/main/resources/aggregate-request-body.json". Refer to the contents of this [sample JSON file](https://github.com/ringcentral/call-performance-analytics-demo-java/blob/master/app/src/main/resources/aggregate-request-body.json).
    * Create a JSON file in the following path inside your project "src/main/resources/timeline-request-body.json". Refer to the contents of this [sample JSON file](https://github.com/ringcentral/call-performance-analytics-demo-java/blob/master/app/src/main/resources/timeline-request-body.json).

    ### Edit the file 'App.java'

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```java
    {!> code-samples/analytics/App.java !}
    ```

    ### Build & Run Your Code

    You are almost done. Now run your app by typing in the command line

    ```bash
    $ javac App.java
    $ java App
    ```

=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    ### Create and edit analytics.rb

    Create a file called `analytics.rb`. Be sure the values in your `.env` file have been set properly, including the `FROM_DATE` and `TO_DATE` variables.

    ```ruby
    {!> code-samples/analytics/quick-start.rb !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ ruby analytics.rb
    ```

## Sample Applications on GitHub

You can reference the following sample applications from GitHub in case you're looking for a completed project or run into any errors:

- [Sample Node.js App](https://github.com/ringcentral/call-performance-analytics-demo-node)
- [Sample C# App](https://github.com/ringcentral/call-performance-api-demo)
- [Sample Java App](https://github.com/ringcentral/call-performance-analytics-demo-java)
