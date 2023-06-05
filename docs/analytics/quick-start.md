no_breadcrumb:true

# RingCentral Line of Business Analytics APIs Quick Start

In this quick start guide, we are going to access call performance data via using Java/C# or Node.JS based command line application.

## Create app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Call Performance Analytics App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Analytics+Quick+Start+App&desc=A+simple+app+to+demo+accessing+call+performance+metrics+on+RingCentral&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Analytics&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Analytics App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "JWT auth flow"
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

    Create a file called `analytics.js`. Be sure the values in your `.env` file have been set properly.

    ```javascript
    {!> code-samples/analytics/quick-start.js [ln:1-64]!}
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

    Create a file called `analytics.py`. Be sure the values in your `.env` file have been set properly.

    ```python
    {!> code-samples/analytics/quick-start.py [ln:1-59]!}
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

    Create a file called `analytics.php`. Be sure the values in your `.env` file have been set properly.

    ```php
    {!> code-samples/analytics/quick-start.php [ln:1-60]!}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ php analytics.php
    ```

=== "Ruby"

    ### Install RingCentral Ruby SDK

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    ### Create and edit analytics.rb

    Create a file called `analytics.rb`. Be sure the values in your `.env` file have been set properly.

    ```ruby
    {!> code-samples/analytics/quick-start.rb [ln:1-59]!}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ ruby analytics.rb
    ```

=== "C#"

    ### Create a C# project using Visual Studio

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1 or a higher version
    * Enter project name "AnalyticsQuickStart"
    * Add NuGet package RingCentral.Net (6.0.0) SDK

    ### Edit the file 'Program.cs'

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```c#
    {!> code-samples/analytics/Program.cs !}
    ```

    ### Run Your Code

    You are almost done. Now run your app from Visual Studio.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "AnalyticsQuickStart"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json
    dependencies {
        // ...
        implementation 'com.ringcentral:ringcentral:3.0.0'
    }
    ```

    * On Eclipse menu, select "Run" and choose the "Run Configurations" and in the dialog, select your project and select the "Environments" tab then enter the following variables:
        - RC_CLIENT_ID
        - RC_CLIENT_SECRET
        - RC_SERVER_URL
        - RC_JWT

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Edit the file 'AnalyticsQuickStart.java'

    ```java
    {!> code-samples/analytics/AnalyticsQuickStart.java !}
    ```

    ### Build & Run Your Code

    You are almost done. Now run your app from Eclipse.

## Sample Applications on GitHub

You can reference the following sample applications from GitHub in case you're looking for a completed project or run into any errors:

- [Sample Node.js App](https://github.com/ringcentral/call-performance-analytics-demo-node)
- [Sample C# App](https://github.com/ringcentral/call-performance-api-demo)
- [Sample Java App](https://github.com/ringcentral/call-performance-analytics-demo-java)
