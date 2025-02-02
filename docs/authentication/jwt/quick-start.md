# Getting started using JWT credentials

Before you get started, make sure you are using the [best authentication method](../index.md) for your application. JWT is ideally suited for developers just getting started, and for server-to-server authentication. If you need to authenticate individual users, we strongly recommend the more common [OAuth flow](../quick-start.md).

## Create a JWT

The key first step in getting started is to [generate the JWT token](../../getting-started/create-credential.md) you will be using to authenticate. 

## Create an app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create User Login App" button below. Enter a name and description if you want to change them, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=JWT+Quick+Start+App&desc=A+simple+app+to+demo+authorizing+user+on+RingCentral&public=false&type=JWT&carriers=7710,7310,3420&permissions=ReadAccounts&grant-type=jwt&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create JWT App</a>
<a class="btn-link btn-collapse" data-bs-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "JWT auth flow."</li>
<li>Under "Security" add the following permissions:
  <ul>
    <li>ReadAccounts</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples.md). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.

## JWT auth flow

The JWT auth flow is made a lot simpler when a RingCentral SDK is used. 

=== "Javascript"

    ### Install RingCentral JavaScript SDK and some dependencies

    ```bash
    $ npm install @ringcentral/sdk --save
    $ npm install dotenv --save
    ```

    ### Create and edit index.js

    Create a file called `index.js` using the contents below.

    ```js
    {!> code-samples/auth/jwt.js !} 
	```

=== "Python"

    ### Install RingCentral Python SDK

    ```bash
    $ pip install ringcentral
    $ pip install python-dotenv
    ```

    ### Create an index.py

    Create a file called <tt>index.py</tt> using the contents below.

    ```python
    {!> code-samples/auth/jwt.py !} 
    ```

=== "PHP"

    ### Install RingCentral PHP SDK

    ``` bash
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Create an index.php

    Create a file called <tt>index.php</tt>. In this file we'll implement the login page.

    ```php
    {!> code-samples/auth/jwt.php !} 
    ```

=== "Ruby"

    ### Create a new Rails app and install the RingCentral Ruby SDK

    ```bash
    $ rails new jwt-flow
    $ cd jwt-flow
    $ bundle add ringcentral-sdk
    $ bundle add dotenv
    ```

    ### Create an index.rb

    ```ruby
    {!> code-samples/auth/jwt.rb !} 
    ```

=== "C#"

    ### Create a Visual Studio project

    * Choose Console Application .Net Core -> App
    * Select Target Framework .NET Core 2.1
    * Enter project name "JWT_Auth"
    * Add NuGet package RingCentral.Net (4.1.0) SDK

    ### Edit the file Program.cs

    Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

    ``` c#
    {!> code-samples/auth/jwt.cs !}
    ```

    ### Run Your App

    You are almost done. Now run your app from Visual Studio.

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "JWT_QuickStart"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK to the project as shown below:

    ```json
    dependencies {
        // ...
        compile 'com.ringcentral:ringcentral:1.4.0'
    }
    ```

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "JWTQuickStart"

    ```java
    package JWTQuickStart;

    public class JWTQuickStart {

        public static void main(String[] args) {
            // TODO Auto-generated method stub

        }
    }
    ```

    ### Edit the file "JWTQuickStart.java".

    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/JWTQuickStart.java !}
    ```

    ### Run Your App

    You are almost done. Now run your app from Eclipse.

