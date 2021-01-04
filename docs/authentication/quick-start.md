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
<li>Select "API App for RingCentral Office" under "What type of app are you creating?"</li>
<li>Select "Web server" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>ReadAccounts</li>
    <li>ReadCallLog</li>
  </ul>
  </li>
<li>Specify the redirect Uri as http://localhost:5000/oauth2callback.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Authorization Flow

Select your preferred language below.

=== "Javascript"

    ### Install RingCentral JavaScript SDK and some dependencies

    ```bash
    $ npm install @ringcentral/sdk --save
    $ npm install express --save
    $ npm install express-session --save
    $ npm install ejs --save
    ```

    ### Create and Edit index.js

    Create a file called <tt>index.js</tt>. Be sure to edit the variables in &lt;ALL CAPS> with your app credentials. In this file, we'll implement code to start a Web server and a few functions to handle express routing.

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

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ node index.js
    ```

    Open a Web browser and load localhost:5000

=== "Python"

    ### Install RingCentral Python SDK and Flask framework

    ```bash
    $ pip install ringcentral
    $ pip install flask
    ```

    ### Create an index.py

    Create a file called <tt>index.py</tt>. Be sure to edit the variables in &lt;ALL CAPS> with your app credentials.

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

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ FLASK_APP=index.py flask run
    ```

    Open a Web browser and load localhost:5000

=== "PHP"

    ### Install RingCentral PHP SDK

    ``` bash
    $ curl -sS https://getcomposer.org/installer | php
    $ php composer.phar require ringcentral/ringcentral-php
    ```
    ### Create a configs.php file

    Create a file called <tt>configs.php</tt>. Be sure to edit the variables value in &lt;ALL CAPS> with your app credentials.

    ``` PHP
    {!> code-samples/auth/quick-start/php/configs.php !}
    ```

    ### Create an index.php

    Create a file called <tt>index.php</tt>. In this file we'll implement the login page.

    ``` HTML+PHP
    {!> code-samples/auth/quick-start/php/index.php !}
    ```

    ### Create a test.html file
    Create a file called <tt>test.html</tt>. In this file we'll add a few API call test cases and a logout button.

    ``` html
    {!> code-samples/auth/quick-start/php/test.html !}
    ```

    ### Create an __engine.php__ file

    Create a file called <tt>engine.php</tt>. In this file we'll handle the <b>OAuth2 callback</b> and RingCentral API calls.

    ``` php
    {!> code-samples/auth/quick-start/php/engine.php !}
    ```

    ### Run Your Code

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

    ### Run Your Code

    You are almost done. Now run your app.

    ```bash
    $ dotnet run
    ```

    Open a Web browser and load localhost:5000

    If you meet "Unable to configure HTTPS endpoint" issue, please read [this article](http://www.waynethompson.com.au/blog/dotnet-dev-certs-https/).

=== "Java"

    ### Create a Java project (using Eclipse IDE)

    * Create a new Java project
    * Select the Gradle Project wizard
    * Enter project name "Authentication"
    * Open the <tt>build.gradle</tt> file and add the RingCentral Java SDK, Javax Servlet, and Jetty to the project as shown below:

    ```json hl_lines="3 4 5",linenums="3"
    dependencies {
        // ...
        compile 'com.ringcentral:ringcentral:1.0.0-beta13'
        compile 'javax.servlet:javax.servlet-api:4.0.1'
        compile 'org.eclipse.jetty:jetty-server:9.4.19.v20190610'
    }
    ```

    * Right-click the project in the Package Explorer and choose "Refresh Gradle Project" under the "Gradle" sub-menu

    ### Create a new Java Class

    Select "File -> New -> Class" to create a new Java class named "Authorization_Flow"

    ```java
    package Authentication;

    public class Authorization_Flow {

      public static void main(String[] args) {
        // TODO Auto-generated method stub

      }
    }
    ```

    ### Edit the file "Authorization_Flow.java"

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```java
    {!> code-samples/auth/quick-start/java/Authorization_Flow.java !}
    ```

    ### Run Your Code

    You are almost done. Now run your app from Eclipse. Then Open a Web browser and enter localhost:5000.

=== "Ruby"

    ### Create a new Rails app and install the RingCentral Ruby SDK

    ```bash
    $ rails new authorization-flow
    $ cd authorization-flow
    $ bundle add ringcentral-sdk
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

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ bin/rails server -p 5000
    ```

    Open a Web browser and load localhost:5000/main/login

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
