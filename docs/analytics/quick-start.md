no_breadcrumb:true

# RingCentral Line of Business Analytics APIs Quick Start

In this quick start guide, we are going to access call performance data via using Java/C# or Node.JS based command line application.

!!! hint "Analytics API is in beta - please request access"
    To call the Analytics API your application needs to have 'Analytics' permission. If you are using an application that doesn't have that permission, you can reach out to our support team with your application's Client ID and [request that the 'Analytics' permission be added](https://developers.ringcentral.com/support/create-case).

## Create App and Get Credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Call Performance Analytics App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

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

## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.

## Download your request template

The payload for an Analytics API request in non-trivial given the many filtering and reporting options available to developers. To assist you in making your first API call, we have provided you with two sample requests that the quick start sample code make use of by reading their contents off of the filesystem. Download these files to the same directory as your quick start script. 

=== "aggreate-request-body.json"

    ```json
    {!> code-samples/analytics/aggregate-request-body.json !} 
    ```

=== "timeline-request-body.json"

    ```json
    {!> code-samples/analytics/timeline-request-body.json !} 
    ```

### Call the Analytics API

=== "Javascript"

    ### Create a Node.JS project

    ```bash
    $ npm init
    ```

    ### Install RingCentral Node.JS SDK & DOTENV Module

    ```bash
    $ npm install @ringcentral/sdk dotenv
    ```

    ### Create and edit 'index.js' file

    Create a file called `index.js`. Be sure the values in your `.env` file have been set properly as that is where your credentials will be loaded. 

    ```javascript
    {!> code-samples/analytics/quick-start.js !} 
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ node index.js
    ```

=== "C#"

    ### Create a C# project

    * Create Console Application .Net or .Net Core for the latest .Net Framework
    ```bash
    $ dotnet new console --framework net6.0
    ```
    * Optionally, give a project name such as "WebAPIClient"
    * Add NuGet package for latest [RingCentral.Net SDK](https://github.com/ringcentral/RingCentral.Net)
    * Create a JSON file "aggregate-request-body.json" that can be referenced in "JSON Request Body"
    * Create a JSON file "timeline-request-body.json" that can be referenced in "JSON Request Body"

    ### Edit the file 'Program.cs'

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```C#
    {!> code-samples/analytics/Program.cs !}
    ```

    ### Run Your Code

    You are almost done. Now run your app by typing in the command line 
    
    ```bash
    $ cd <project name>
    $ dotnet run
    ```
  
=== "Java"

    ### Create a Java Gradle/Maven project

    * Make sure you have JDK 11 or newer installed in our machine
    * Install RC Java SDK v2.x or latest from [GitHub](https://github.com/ringcentral/ringcentral-java/releases/tag/2.2.0) or [Maven Central](https://search.maven.org/search?q=a:ringcentral)
    * Create a new Java Maven or Gradle based CLI App and name the main class "App.java"
    * Create a JSON file in the following path inside your project "src/main/resources/aggregate-request-body.json" that can be referenced in "JSON Request Body"
    * Create a JSON file in the following path inside your project "src/main/resources/timeline-request-body.json" that can be referenced in "JSON Request Body"

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

## Sample Applications on GitHub

You can reference the following sample applications from GitHub in case you're looking for a completed project or run into any errors:

- [Sample Node.js App](https://github.com/ringcentral/call-performance-analytics-demo-node)
- [Sample C# App](https://github.com/ringcentral/call-performance-api-demo)
- [Sample Java App](https://github.com/ringcentral/call-performance-analytics-demo-java)
