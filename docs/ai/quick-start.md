# Artificial Intelligence API Quick Start Guide

{! mdx_includes/ai-beta-notice.md !}

!!! hint "**Calling the RingCentral API for the first time?** We recommend you try out [getting started experience](../../getting-started/)."

In this quick start, we are going to help you create your first "Speech to Text" application on the RingCentral platform in just a few minutes. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create AI App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=AI+Quick+Start+App&desc=A+simple+app+to+demo+using+AI+APIs+on+RingCentral&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=AI&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create AI App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Auth" select "JWT auth flow."
<li>Under "Security" add the following app scopes:
  <ul>
    <li>AI</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

## Request help from support

Access to the RingCentral Artificial API currently requires help from support in order to grant the "AI" application scope to your application. 

!!! hint "Using the AI API in sandbox vs prodcution"
    The AI API works in both sandbox and production, but sandbox has limitations such as only the first 10 minutes of the audio is processed. Since sandbox is used for testing and development purposes only, we do not expect developers to process large media files in sandbox.

<a target="_new" class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfwFYQLx2wTidwcGt3ZEkfnwvUIcrIdshEcH2EYQwTbZUeWyA/viewform?usp=sf_link">Request app graduation</a>


## Download and edit a `.env` file

Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:

1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.
     * `RC_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_JWT` - set to the [JWT credential you created](../../getting-started/create-credential) for yourself
     * `NGROK_URL` - set to your ngrok tunnel address taken from the ngrok setup steps below.
     * `CONTENT_URI` - set to a publicly accessible URL for your audio/video file you want to transcribe (a test default uri has been provided for you)

## Setup a server to process the response asynchronously

The Artificial Intelligence APIs provide responses in an asynchronous manner by posting responses to a URL specified by the developer when the request is made. Our first step therefore is setting up a simple web server to display the response we will receive from RingCentral. The sample servers below use [ngrok](https://ngrok.com/download) to proxy requests from RingCentral to the server running on your local machine. To keep your first application simple, this server does nothing more than printing the payload of anything it receives to the console (for the PHP server, it writes the payload to a file.). Feel free to use these sample servers, or setup your own web server to receive and process the responses.

### Start ngrok

Download and install [ngrok](https://ngrok.com/download) if you haven't done so. Then start your ngrok server and copy the https URL and set it to the `NGROK_URL` variable in your .env file as discussed above.

```bash
$ ngrok http 3000
  Forwarding https://xxxx-yy-181-201-33.ngrok-free.app -> https://localhost:3000
```

### Create and start your server app

=== "Javascript"

    Create a file called `server.js` using the contents below. Set the PORT to the same port number opening for the ngrok tunnel.

    ```js
    {!> code-samples/ai/server.js !}
    ```

    Finally, start your server.

    ```bash
    $ node server.js
    ```

=== "Python"

    Create a file called `server.py` using the contents below. Set the PORT to the same PORT number opening for the ngrok tunnel.

    ```js
    {!> code-samples/ai/server.py !}
    ```

    Finally, start your server.

    ```bash
    $ python server.py
    ```

=== "PHP"

    Create a folder named `webhook` and navigate to the new folder then create a file called `server.php` using the contents below.

    ```js
    {!> code-samples/ai/server.php !}
    ```

    Finally, start your server.

    ```bash
    php -S localhost:3000
    ```

=== "Ruby"

    First, install the prerequisites.

    ```bash
    $ pip install sinatra
    ```

    #### Create and edit `server.rb`

    Create a file called `server.rb` using the contents below. Set the PORT to the same PORT number opening for the ngrok tunnel.

    ```js
    {!> code-samples/ai/server.rb !}
    ```

    #### Run your code

    Finally, start your server.

    ```bash
    $ ruby server.rb
    ```

=== "C#"

    We use .NET core which is cross-platform. You can get it [here](https://dotnet.microsoft.com/download).

    ### Create a Web server solution

    ```bash
    mkdir server
    cd server
    dotnet new web
    dotnet add package Newtonsoft.Json
    ```

    Edit the `Startup.cs` file and override its content with code below:

    ```c#
    {!> code-samples/ai/server/Startup.cs !}
    ```

    #### Run the server code

    The default port is 5000 and it is set in the `launchSettings.json` file under the `server/Properties` folder. Open the file and change the port number to match the opening port for the ngrok tunnel. E.g.

    ```JSON
    "applicationUrl": "https://localhost:3001;http://localhost:3000"
    ```

    Finally, start your server. At the server terminal, run:

    ```bash
    dotnet run
    ```

=== "Java"

    ### Create a WebhookServer project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "AIServer"
    * Open the <tt>build.gradle</tt> file and add the dependencies to the project as shown below:
    ```json
    dependencies {
        // ...
        implementation 'org.eclipse.jetty.aggregate:jetty-all:9.4.51.v20230217'
        implementation: 'javax.servlet:javax.servlet-api:4.0.1'
    }
    ```
    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    We use jetty-all version 9.4.x for our server. You can get a different version [here](https://mvnrepository.com/artifact/org.eclipse.jetty.aggregate/jetty-all) if you want to.

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "WebhookServer"

    Edit the `WebhookServer.java` with code below:

    ```Java
    {!> code-samples/ai/WebhookServer.java !}
    ```

    Build and run the app from Eclipse.


## Implement and run speech to text code

=== "Javascript"

    Install RingCentral JS SDK & dotenv library

    ```bash
    $ npm install @ringcentral/sdk dotenv
    ```

    #### Create and edit `speech-to-text.js`

    Create a file called `speech-to-text.js` using the contents below.

    ```javascript
    {!> code-samples/ai/quick-start.js [ln:1-54] !}
    ```

    #### Run your code

    You are almost done. Now run your script.

    ```bash
    $ node speech-to-text.js
    ```

=== "Python"

    Install RingCentral Python SDK & dotenv library

    ```bash
    $ pip install ringcentral
    $ pip install python-dotenv
    ```

    #### Create and edit `speech-to-text.py`

    Create a file called `speech-to-text.py` using the contents below.

    ```js
    {!> code-samples/ai/quick-start.py [ln:1-47] !}
    ```

    #### Run your code

    You are almost done. Now run your script.

    ```bash
    $ python speech-to-text.py
    ```

=== "PHP"

    Install RingCentral PHP SDK & phpdotenv library

    ```php
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Create and edit `speech-to-text.php`

    Create a file called `speech-to-text.php` using the contents below.

    ```php
    {!> code-samples/ai/quick-start.php [ln:1-53] !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ php speech-to-text.php
    ```

=== "Ruby"

    Install RingCentral Ruby SDK & dotenv library

    ```bash
    $ gem install ringcentral-sdk dotenv
    ```

    ### Create and Edit `speech-to-text.rb`

    Create a file called `speech-to-text.rb` using the contents below.

    ```ruby
    {!> code-samples/ai/quick-start.rb [ln:1-53] !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ ruby speech-to-text.rb
    ```

=== "C#"

    ### Create a C# project using Visual Studio

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1 or a higher version
    * Enter project name "SpeechToTextQuickStart"
    * Add the RingCentral.Net (6.1.1) SDK and DotEnv NuGet packages
    * Save the .env file under your project folder. E.g. /SpeechToTextQuickStart/bin/Debug/netcoreapp2.2/.env

    ### Edit the file 'Program.cs' using the content below:

    ```c#
    {!> code-samples/ai/quick-start.cs !}
    ```

    ### Run Your Code

    You are almost done. Now run your app from Visual Studio.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "SpeechToTextQuickStart"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:
    ```json
    dependencies {
        // ...
        implementation 'com.ringcentral:ringcentral:3.1.1'
    }
    ```
    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu
    * On Eclipse menu, select "Run" and choose the "Run Configurations" and in the dialog, select your project and select the "Environments" tab then enter the following variables:
        - RC_CLIENT_ID
        - RC_CLIENT_SECRET
        - RC_SERVER_URL
        - RC_JWT
        - NGROK_URL
        - CONTENT_URI

    ### Edit the file 'SpeechToTextQuickStart.java' using the content below:

    ```java
    {!> code-samples/ai/quick-start.java !}
    ```

    ### Build & Run Your Code

    You are almost done. Now run your app from Eclipse and check the console log from the server app.

## Wait for a response from RingCentral

When RingCentral has fully processed the request, a response will be posted to the server you created previously. The response should look similar to the following.

```bash
{! code-samples/ai/quick-start-response.json !}
```
