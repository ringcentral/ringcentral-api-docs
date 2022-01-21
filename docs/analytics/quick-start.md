no_breadcrumb:true

# RingCentral Call Performance API Quick Start

In this quick start guide, we are going to access call performance data via the command line using CURL utility in just a few minutes. Let's get started.

### Create an App if you don't have one already

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Call Performance Analytics App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Analytics+Quick+Start+App&desc=A+simple+app+to+demo+accessing+call+performance+metrics+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Analytics App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "Password-based auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>Analytics</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

#### Get Application credentials

In the RingCentral Developer Dashboard, navigate to your App -> Dashboard -> Credential and note down the following. We will use Sandbox credentials for this example: 

- App Server URL which should be https://platform.devetst.ringcentral.com . This is the URL for RingCentral Sandbox Environment and we will be doing our development in Production Environment for this API. 


### Authentication

There are multiple ways to provide authentication support for your application for RingCentral users. This will depend on the type of authentication mechanism you chose when you created your application. For more information about how to use OAuth 2.0 with your application please refer to this [guide](../../authentication). For this example, we will assume you are using Application that is setup for [Password flow based authentication](../../authentication/password-flow/)

1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.

2. Edit your newly downloaded `.env` file, setting its variables with the proper values using the application credentials from the app you created previously.

### Calling Call Performance Aggregate API

=== "Javascript"

    ### Create a Node.JS project

    ```bash
    $ npm init
    ```

    ### Install RingCentral Node.JS SDK & DOTENV Module

    ```bash
    $ npm install @ringcentral/sdk dotenv
    ```

    ### Create and edit "index.js" file

    Create a file called `index.js`. Be sure the values in your `.env` file have been set properly as that is where your credentials will be loaded. 

    ```javascript
    {!> code-samples/analytics/index.js !} 
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ node index.js
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net or .Net Core
    * Select Target Framework Version
    * Enter project name "WebAPIClient"
    * Add NuGet package RingCentral.Net SDK --version 5.9.0 or newer

    ### Edit the file 'Program.cs'

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```c#
    {!> code-samples/analytics/Program.cs !}
    ```

    ### Run Your Code

    You are almost done. Now run your app by typing in the command line 
    
    ```c# 
    dotnet run
    ```
  
=== "Java"

    ### Create a Java Gradle/Maven project

    * Install RC Java SDK from GitHub or Maven Central
    * Create a new Java Class called "App.java"
    * Create a .json file in the following path inside your project "src/main/resources/aggregate-request-body.json"

    #### App.java

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```java
    {!> code-samples/analytics/App.java !} 
    ```

    ### Build & Run Your Code

    You are almost done. Now run your app by typing in the command line 
      
    ```java 
      javac App.java
      java App
    ```

=== "JSON Request Body"

    Create a file called `aggreate-request-body.json`. Make sure to edit this file based on your needs.

    ```json
    {!> code-samples/analytics/aggregate-request-body.json !} 
    ```

## Sample Applications on GitHub

You can reference the following sample applications from GitHub in case you're looking for a completed project or run into any errors:

- [Sample Node.js App](https://github.com/ringcentral/call-performance-api-demo)
- [Sample C# App](https://github.com/ringcentral/call-performance-api-demo)
- [Sample Java App](https://github.com/ringcentral/call-performance-api-demo)

