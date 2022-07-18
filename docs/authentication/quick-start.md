no_breadcrumb:true
style: quick-start

# Authorization Flow Authentication

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you authorize a user to login with username and password to get an access token and a refresh token. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create User Login App" button below. Enter a name and description if you want to change them, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Authorization+Flow+Quick+Start+App&desc=A+simple+app+to+demo+authorizing+user+on+RingCentral&public=false&type=ServerWeb&carriers=7710,7310,3420&permissions=ReadAccounts,ReadCallLog&redirectUri=http://localhost:5000/oauth2callback&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create User Login App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Authentication" select "3-legged OAuth flow authorization code" and then "Server-side web app."</li>
<li>Under "Authentication" specify the redirect Uri as http://localhost:5000/oauth2callback.</li>
<li>Under "Security" add the following permissions:
  <ul>
    <li>ReadAccounts</li>
    <li>ReadCallLog</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Download and edit a `.env` file
	
Follow the instructions found in our guide to [running Developer Guide code samples](../../basics/code-samples/). Or:
	
1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above.

## Authorization Flow

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK and some dependencies

    ```bash
    $ npm install @ringcentral/sdk --save
    $ npm install dotenv --save
    $ npm install express --save
    $ npm install express-session --save
    $ npm install ejs --save
    ```

    ### Create and edit index.js

    Create a file called `index.js` using the contents below.

    ```javascript
    {!> code-samples/auth/quick-start/javascript/index.js !} 
    ```

    ### Create a __views__ folder and create an index.ejs and a test.ejs files under the views folder

    Create a file called <tt>index.ejs</tt>. In this file, we'll implement the login page.

    ``` html
    {!> code-samples/auth/quick-start/javascript/index.ejs !} 
    ```

    Create a file called <tt>test.ejs</tt>. In this file, we'll add a few API call test cases and a logout button.

    ``` html
    {!> code-samples/auth/quick-start/javascript/test.ejs !} 
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ node index.js
    ```

    Open a Web browser and load localhost:5000

=== "Python"

    ### Install RingCentral Python SDK and Flask framework

    ```bash
    $ pip install ringcentral
    $ pip install python-dotenv
    $ pip install flask
    ```

    ### Create an index.py

    Create a file called <tt>index.py</tt> using the contents below.

    ```python
    {!> code-samples/auth/quick-start/python/index.py !}
    ```

    ### Create a templates folder and create an index.html and a test.html file under the templates folder

    Create a file called <tt>index.html</tt>. In this file, we'll implement the login page.

    ``` html
    {!> code-samples/auth/quick-start/python/index.html !}
    ```

    Create a file called <tt>test.html</tt>. In this file, we'll add a few API call test cases and a logout button.

    ``` html
    {!> code-samples/auth/quick-start/python/test.html !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ FLASK_APP=index.py flask run
    ```

    Open a Web browser and load localhost:5000

=== "PHP"

    ### Install RingCentral PHP SDK

    ``` bash
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php vlucas/phpdotenv
    ```

    ### Create an index.php

    Create a file called <tt>index.php</tt>. In this file we'll implement the login page.

    ``` HTML+PHP
    {!> code-samples/auth/quick-start/php/index.php !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ php -S localhost:5000
    ```

    Open a Web browser and load localhost:5000

=== "C#"

    ### Initiate the project

    We use .NET core which is cross-platform. You can get it [here](https://dotnet.microsoft.com/download).

    ```bash
    mkdir authorization-demo
    cd authorization-demo
    dotnet new sln
    mkdir my-project
    cd my-project
    dotnet new web
    cd ..
    dotnet sln add ./my-project/my-project.csproj
    cd my-project
    dotnet add package RingCentral.Net
    dotnet add package Newtonsoft.Json
    ```

    ### Edit Startup.cs

    Override `Startup.cs` with content below. Be sure to edit the variables in <ALL CAPS> with your app credentials.

    ```c#
    {!> code-samples/auth/quick-start/c-sharp/Startup.cs !}
    ```

    ### Run your code

    You are almost done. Now run your app.

    ```bash
    $ dotnet run
    ```

    Open a Web browser and load localhost:5000

    If you meet "Unable to configure HTTPS endpoint" issue, please read [this article](http://www.waynethompson.com.au/blog/dotnet-dev-certs-https/).

=== "Java"

    ### Create a Java project (Using Eclipse Java Servlet)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "oauth-demo"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK and other libraries under dependencies as shown below

    ```json

    apply plugin: 'application'

    dependencies {
        // ...
        testImplementation 'org.junit.jupiter:junit-jupiter-api:5.6.0'
        testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine'
        implementation group: 'com.ringcentral', name: 'ringcentral', version: '2.8.2'
        implementation group: 'com.alibaba', name: 'fastjson', version: '1.2.79'
        implementation group: 'org.eclipse.jetty', name: 'jetty-server', version: '11.0.8'
        compileOnly group: 'javax.servlet', name: 'javax.servlet-api', version: '4.0.1'
    }
    ```

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "AuthorizationFlow"

    ```java
    public class AuthorizationFlow {

      public static void main(String[] args) {
        // TODO Auto-generated method stub

      }
    }
    ```

    ### Edit the file "AuthorizationFlow.java"

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/AuthorizationFlow.java !}
    ```

    ### Run your code

    You are almost done. Now run your app using gradle `gradle run` command. 
    Open a Web browser and enter localhost:5000, you should see 'Login with RingCentral' link, click on that and follow the login process using your sandbox credentials to access the secure page where you can call RingCentral APIs. 

=== "Ruby"

    ### Create a new Rails app and install the RingCentral Ruby SDK

    ```bash
    $ rails new authorization-flow
    $ cd authorization-flow
    $ bundle add ringcentral-sdk
    $ bundle add dotenv
    ```

    ### Create a new controller

    ```bash
    $ rails generate controller main login
    ```

    Browse to the "app/controllers" folder and edit the <tt>main_controller.rb</tt>. Be sure to edit the variables in &lt;ALL CAPS> with your app credentials.

    ```ruby
    {!> code-samples/auth/quick-start/ruby/main_controller.rb !}
    ```

    ### Edit the routes.rb file

    Browse the the "config" folder and edit the file <tt>routes.rb</tt>

    ```ruby 
    {!> code-samples/auth/quick-start/ruby/routes.rb !}
    ```

    ### Implement a login page

    Browse to the "app/views/main" folder and edit the <tt>login.html.erb</tt>.

    ```html
    {!> code-samples/auth/quick-start/ruby/login.html.erb !}
    ```

    ### Implement a test page

    ```bask
    $ rails generate controller main test
    ```

    !!! warning "Do not overwrite the main_controller.rb"
        Answer "no" to the overwrite main_controller.rb confirmation!

    Browse to the "app/views/main" folder and edit the <tt>test.html.erb</tt>.

    ```html
    {!> code-samples/auth/quick-start/ruby/test.html.erb !}
    ```

    ### Run your code

    You are almost done. Now run your script.

    ```bash
    $ bin/rails server -p 5000
    ```

    Open a Web browser and load localhost:5000/main/login

## Need Help?

Having difficulty? Feeling frustrated? Receiving an error you don't understand? Our community is here to help and may already have found an answer. Search our community forums, and if you don't find an answer please ask!

<a target="_new" href="https://community.ringcentral.com/search.html?c=8&includeChildren=false&f=&type=question&redirect=search%2Fsearch&sort=relevance&q=authentication">Search the forums &raquo;</a>

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
