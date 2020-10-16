no_breadcrumb:true
style: quick-start

# Authorization Flow Authentication - JavaScript Quick Start

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
    var app = require('express')();
    var session = require('express-session');
    var RingCentral = require('@ringcentral/sdk').SDK;
    var path = require('path')

    app.use(session({ secret: 'somesecretstring', tokens: ''}));
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    const RINGCENTRAL_CLIENT_ID= '<ENTER CLIENT ID>'
    const RINGCENTRAL_CLIENT_SECRET= '<ENTER CLIENT SECRET>'
    const RINGCENTRAL_SERVER_URL= 'https://platform.devtest.ringcentral.com'
    const RINGCENTRAL_REDIRECT_URL= 'http://localhost:5000/oauth2callback'

    var rcsdk = new RingCentral({
      server: RINGCENTRAL_SERVER_URL,
      clientId: RINGCENTRAL_CLIENT_ID,
      clientSecret: RINGCENTRAL_CLIENT_SECRET,
      redirectUri: RINGCENTRAL_REDIRECT_URL
    });

    var server = require('http').createServer(app);
    server.listen(5000);
    console.log("listen to port 5000")

    app.get('/index', function (req, res) {
      res.redirect("/")
    })

    app.get('/', async function (req, res) {
      var platform = rcsdk.platform()
      if (req.session.tokens != undefined){
        platform.auth().setData(req.session.tokens)
        if (await platform.loggedIn()){
          return res.render('test')
        }
      }else{
        res.render('index', {
              authorize_uri: platform.loginUrl({
                    redirectUri: RINGCENTRAL_REDIRECT_URL
                    })
        });
      }
    })

    app.get('/logout', async function(req, res) {
      if (req.session.tokens != undefined){
        var platform = rcsdk.platform()
        platform.auth().setData(req.session.tokens)
        if (platform.loggedIn()){
          try{
            var resp = await platform.logout()
            console.log("logged out")
          }catch(e){
            console.log(e)
          }
        }
        req.session.tokens = null
      }
      res.redirect("/")
    });

    app.get('/oauth2callback', async function(req, res) {
      if (req.query.code) {
        try{
          var platform = rcsdk.platform()
          var resp = await platform.login({
              code: req.query.code,
              redirectUri: RINGCENTRAL_REDIRECT_URL
          })
          req.session.tokens = await resp.json()
          console.log(req.session.tokens)
          res.redirect("/test")
        }catch(e) {
          res.send('Login error ' + e);
        }
      }else {
        res.send('No Auth code');
      }
    });

    app.get('/test', function(req, res) {
      if (req.session.tokens != undefined){
        var platform = rcsdk.platform()
        platform.auth().setData(req.session.tokens)
        if (platform.loggedIn()) {
          if (req.query.api == "extension"){
            var endpoint = "/restapi/v1.0/account/~/extension"
            var params = {}
            return callGetMethod(platform, endpoint, params, res)
          } else if (req.query.api == "extension-call-log"){
            var endpoint = "/restapi/v1.0/account/~/extension/~/call-log"
            var params = {}
            return callGetMethod(platform, endpoint, params, res)
          } else if (req.query.api == "account-call-log"){
            var endpoint = "/restapi/v1.0/account/~/call-log"
            var params = {}
            return callGetMethod(platform, endpoint, params, res)
          }
        }
      }
      res.redirect("/")
    });

    async function callGetMethod(platform, endpoint, params, res){
      try{
        var resp = await platform.get(endpoint, params)
        var jsonObj = await resp.json()
        res.send(JSON.stringify(jsonObj))
      }catch(e){
        res.send("Error: " + e.message)
      }
    }
    ```

    ### Create a __views__ folder and create an index.ejs and a test.ejs files under the views folder

    Create a file called <tt>index.ejs</tt>. In this file, we'll implement the login page.

    ``` html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>RingCentral Authorization Code Flow Authentication</title>
      </head>
      <body>
        <h2>
            RingCentral Authorization Code Flow Authentication
        </h2>
        <a href="<%- authorize_uri %>">Login RingCentral Account</a>
      </body>
    </html>
    ```

    Create a file called <tt>test.ejs</tt>. In this file, we'll add a few API call test cases and a logout button.

    ``` html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
      <b><a href="/logout">Logout</a></b>
      <h2>Call APIs</h2>
      <ul>
          <li><a href="/test?api=extension">Read Extension Info</a></li>
          <li><a href="/test?api=extension-call-log">Read Extension Call Log</a></li>
          <li><a href="/test?api=account-call-log">Read Account Call Log</a></li>
      </ul>
    </body>
    </html>
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
    from ringcentral import SDK
    import urllib
    from flask import Flask, render_template, request, session

    app = Flask(__name__)
    app.secret_key = 'somesecretstring'

    RINGCENTRAL_CLIENT_ID= '<ENTER CLIENT ID>'
    RINGCENTRAL_CLIENT_SECRET= '<ENTER CLIENT SECRET>'
    RINGCENTRAL_SERVER_URL= 'https://platform.devtest.ringcentral.com'
    RINGCENTRAL_REDIRECT_URL= 'http://localhost:5000/oauth2callback'

    rcsdk = SDK(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_SERVER_URL)

    @app.route('/')
    @app.route('/index')
    def login():
        base_url = RINGCENTRAL_SERVER_URL + '/restapi/oauth/authorize'
        params = (
            ('response_type', 'code'),
            ('redirect_uri', RINGCENTRAL_REDIRECT_URL),
            ('client_id', RINGCENTRAL_CLIENT_ID),
            ('state', 'initialState')
        )
        auth_url = base_url + '?' + urllib.parse.urlencode(params)
        return render_template('index.html', authorize_uri=auth_url)

    @app.route('/oauth2callback', methods=['GET'])
    def oauth2callback():
        platform = rcsdk.platform()
        auth_code = request.values.get('code')
        platform.login('', '', '', auth_code, RINGCENTRAL_REDIRECT_URL)
        tokens = platform.auth().data()
        session['sessionAccessToken'] = tokens
        return render_template('test.html')

    @app.route('/test', methods=['GET'])
    def callapi():
        platform = rcsdk.platform()
        platform.auth().set_data(session['sessionAccessToken'])
        if platform.logged_in() == False:
            return login()
        api = request.values.get('api')
        if api == "extension":
            resp = platform.get("/restapi/v1.0/account/~/extension")
            return resp.response()._content
        elif api == "extension-call-log":
            resp = platform.get("/restapi/v1.0/account/~/extension/~/call-log")
            return resp.response()._content
        elif api == "account-call-log":
            resp = platform.get("/restapi/v1.0/account/~/call-log")
            return resp.response()._content
        else:
            return render_template('test.html')

    @app.route('/logout', methods=['GET'])
    def logout():
        platform = rcsdk.platform()
        platform.auth().set_data(session['sessionAccessToken'])
        if platform.logged_in():
            platform.logout()
        session.pop('sessionAccessToken', None)
        return login()
    ```

    ### Create a templates folder and create an index.html and a test.html file under the templates folder

    Create a file called <tt>index.html</tt>. In this file, we'll implement the login page.

    ``` html
    <!DOCTYPE html>
    <html>
      <head>
          <meta charset="UTF-8">
          <title>RingCentral Authorization Code Flow Authentication</title>
      </head>
      <body>
        <h2>
            RingCentral Authorization Code Flow Authentication
        </h2>
        <a href="{{ authorize_uri }}">Login RingCentral Account</a>
      </body>
    </html>
    ```

    Create a file called <tt>test.html</tt>. In this file, we'll add a few API call test cases and a logout button.

    ``` html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
      <b><a href="/logout">Logout</a></b>
      <h2>Call APIs</h2>
      <ul>
          <li><a href="/test?api=extension">Read Extension Info</a></li>
          <li><a href="/test?api=extension-call-log">Read Extension Call Log</a></li>
          <li><a href="/test?api=account-call-log">Read Account Call Log</a></li>
      </ul>
    </body>
    </html>
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
    <?php
    $RINGCENTRAL_CLIENT_ID = "<ENTER CLIENT ID>";
    $RINGCENTRAL_CLIENT_SECRET = "<ENTER CLIENT SECRET>";
    $RINGCENTRAL_SERVER_URL = "https://platform.devtest.ringcentral.com";
    $RINGCENTRAL_REDIRECT_URL = "http://localhost:5000/engine.php?oauth2callback";
    ?>
    ```

    ### Create an index.php

    Create a file called <tt>index.php</tt>. In this file we'll implement the login page.

    ``` HTML+PHP
    <!DOCTYPE html>
    <?php
    require(__DIR__ . 'vendor/autoload.php');
    use RingCentral\SDK\Http\HttpException;
    use RingCentral\SDK\Http\ApiResponse;
    use RingCentral\SDK\SDK;
    require_once ('configs.php');

    session_start();

    $rcsdk = new SDK($RINGCENTRAL_CLIENT_ID, $RINGCENTRAL_CLIENT_SECRET, $RINGCENTRAL_SERVER_URL);
    $platform = $rcsdk->platform();

    // Using the authUrl to call the platform function
    $url = $platform->authUrl(array(
              'redirectUri' => $RINGCENTRAL_REDIRECT_URL,
              'state' => 'initialState',
              'brandId' => '',
              'display' => '',
              'prompt' => ''
            ));
    ?>

    <html>
      <head>
          <meta charset="UTF-8">
          <title>RingCentral Authorization Code Flow Authentication</title>
      </head>
      <body>
        <h2>
          RingCentral Authorization Code Flow Authentication
        </h2>
        <a href="<?php echo $url; ?>">Login RingCentral Account</a>
      </body>
    </html>
    ```

    ### Create a test.html file
    Create a file called <tt>test.html</tt>. In this file we'll add a few API call test cases and a logout button.

    ``` html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
      <b><a href="http://localhost:5000/engine.php?logout">Logout</a></b>
      <h2>Call APIs</h2>
      <ul>
          <li><a href="http://localhost:5000/engine.php?api=extension">Read Extension Info</a></li>
          <li><a href="http://localhost:5000/engine.php?api=extension-call-log">Read Extension Call Log</a></li>
          <li><a href="http://localhost:5000/engine.php?api=account-call-log">Read Account Call Log</a></li>
      </ul>
    </body>
    </html>
    ```

    ### Create an __engine.php__ file

    Create a file called <tt>engine.php</tt>. In this file we'll handle the <b>OAuth2 callback</b> and RingCentral API calls.

    ``` php
    <?php
    require_once(__DIR__ . '/vendor/autoload.php');
    use RingCentral\SDK\Http\HttpException;
    use RingCentral\SDK\Http\ApiResponse;
    use RingCentral\SDK\SDK;
    require_once('configs.php');

    session_start();

    $rcsdk = new SDK($RINGCENTRAL_CLIENT_ID, $RINGCENTRAL_CLIENT_SECRET, $RINGCENTRAL_SERVER_URL);
    $platform = $rcsdk->platform();

    if (isset($_REQUEST['oauth2callback'])){
      if (!isset($_GET['code'])) {
          return;
      }
      $qs = $platform->parseAuthRedirectUrl($_SERVER['QUERY_STRING']);
      $qs["redirectUri"] = $RINGCENTRAL_REDIRECT_URL;

      $platform->login($qs);
      $_SESSION['sessionAccessToken'] = $platform->auth()->data();
      header("Location: http://localhost:5000/test.html");
    }

    if (!isset($_SESSION['sessionAccessToken'])) {
        header("Location: http://localhost:5000");
        exit();
    }else{
        $platform->auth()->setData((array)$_SESSION['sessionAccessToken']);
        if (!$platform->loggedIn()) {
            header("Location: http://localhost:5000");
            exit();
        }
        if (isset($_REQUEST['logout'])){
            unset($_SESSION['sessionAccessToken']);
            $platform->logout();
            header("Location: http://localhost:5000");
            exit();
        }elseif (isset($_REQUEST['api'])){
            if ($_REQUEST['api'] == "extension") {
                $endpoint = "/restapi/v1.0/account/~/extension";
                callGetRequest($endpoint, null);
            }elseif ($_REQUEST['api'] == "extension-call-log") {
                $endpoint = "/restapi/v1.0/account/~/extension/~/call-log";
                $params = array(
                    'fromDate' => '2018-12-01T00:00:00.000Z',
                  );
                callGetRequest($endpoint, $params);
            }elseif ($_REQUEST['api'] == "account-call-log") {
                $endpoint = "/restapi/v1.0/account/~/call-log";
                $params = array(
                    'fromDate' => '2018-12-01T00:00:00.000Z',
                  );
                callGetRequest($endpoint, $params);
            }
        }
    }

    function callGetRequest($endpoint, $params){
      global $platform;
      try {
        $resp = $platform->get($endpoint, $params);
        echo "<p>".$resp->text()."</p>";
      } catch (\RingCentral\SDK\Http\ApiException $e) {
        print 'Expected HTTP Error: ' . $e->getMessage() . PHP_EOL;
      }
    }
    ?>
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

    ```cs
    using System.Linq;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.DependencyInjection;
    using RingCentral;
    using Newtonsoft.Json;

    namespace my_project
    {
        public class Startup
        {
            private const string RINGCENTRAL_CLIENT_ID = "<RINGCENTRAL_CLIENT_ID>";
            private const string RINGCENTRAL_CLIENT_SECRET = "<RINGCENTRAL_CLIENT_SECRET>";
            private const bool RINGCENTRAL_PRODUCTION = false;
            private const string RINGCENTRAL_REDIRECT_URL = "http://localhost:5000/oauth2callback";
            private const string SESSION_TOKEN_KEY = "rc-token";

            public void ConfigureServices(IServiceCollection services)
            {
                services.AddMvc().AddSessionStateTempDataProvider();
                services.AddSession();
            }

            private static string Html(string body)
            {
                return $@"<!doctype html><html><body>{body}</body></html>";
            }

            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {
                if (env.IsDevelopment()) app.UseDeveloperExceptionPage();
                app.UseSession();
                app.Run(async (context) =>
                {
                    var rc = new RestClient(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_PRODUCTION);
                    var tokenString = context.Session.GetString(SESSION_TOKEN_KEY);
                    if (tokenString != null)
                    {
                        rc.token = JsonConvert.DeserializeObject<TokenInfo>(tokenString);
                    }
                    else if (context.Request.Path != "/oauth2callback")
                    {
                        var oauthUri = rc.AuthorizeUri(RINGCENTRAL_REDIRECT_URL);
                        await context.Response.WriteAsync(
                            Html($"<h2>RingCentral Authorization Code Flow Authentication</h2><a href=\"{oauthUri}\">Login RingCentral Account</a>"));
                        return;
                    }

                    switch (context.Request.Path)
                    {
                        case "/":
                            await context.Response.WriteAsync(Html(@"<b><a href=""/logout"">Logout</a></b>
                                <h2>Call APIs</h2>
                                <ul>
                                    <li><a href=""/test?api=extension"" target=""_blank"">Read Extension Info</a></li>
                                    <li><a href=""/test?api=extension-call-log"" target=""_blank"">Read Extension Call Log</a></li>
                                    <li><a href=""/test?api=account-call-log"" target=""_blank"">Read Account Call Log</a></li>
                                </ul>"));
                            break;
                        case "/oauth2callback":
                            context.Request.Query.TryGetValue("code", out var codes);
                            var code = codes.First();
                            await rc.Authorize(code, RINGCENTRAL_REDIRECT_URL);
                            context.Session.SetString(SESSION_TOKEN_KEY, JsonConvert.SerializeObject(rc.token));
                            context.Response.Redirect("/");
                            break;
                        case "/test":
                            context.Request.Query.TryGetValue("api", out var apis);
                            var api = apis.First();
                            var result = "";
                            switch (api)
                            {
                                case "extension":
                                    result = await rc.Get<string>("/restapi/v1.0/account/~/extension");
                                    break;
                                case "extension-call-log":
                                    result = await rc.Get<string>("/restapi/v1.0/account/~/extension/~/call-log");
                                    break;
                                case "account-call-log":
                                    result = await rc.Get<string>("/restapi/v1.0/account/~/call-log");
                                    break;
                            }

                            await context.Response.WriteAsync(Html($"<pre>{result}</pre>"));
                            break;
                        case "/logout":
                            await rc.Revoke();
                            context.Session.Remove(SESSION_TOKEN_KEY);
                            context.Response.Redirect("/");
                            break;
                        default:
                            context.Response.StatusCode = 404;
                            break;
                    }
                });
            }
        }
    }
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

    ### Edit the file "Authorization_Flow.java".

    Be sure to edit the variables in ALL CAPS with your app and user credentials.

    ```java
    package Authentication;

    import com.ringcentral.RestClient;
    import com.ringcentral.RestException;
    import com.alibaba.fastjson.JSON;
    import com.alibaba.fastjson.serializer.SerializerFeature;
    import com.ringcentral.definitions.TokenInfo;
    import org.eclipse.jetty.server.Request;
    import org.eclipse.jetty.server.Server;
    import org.eclipse.jetty.server.handler.AbstractHandler;

    import javax.servlet.http.Cookie;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    import java.io.IOException;
    import java.util.Arrays;
    import java.util.Base64;
    import java.util.List;
    import java.util.stream.Collectors;

    public class Authorization_Flow extends AbstractHandler {
        private static String TOKEN_KEY = "rc-token";

        private static String RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        private static String RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
        private static String RINGCENTRAL_SERVER = "https://platform.devtest.ringcentral.com";
        private static String REDIRECT_URI = "http://localhost:5000/oauth2callback";

        private static String RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        private static String RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";

        public static void main(String[] args) throws Exception {
            Server server = new Server(5000);
            server.setHandler(new Authorization_Flow());
            server.start();
            server.join();
        }

        @Override
        public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response)
                throws IOException {
            response.setContentType("text/html; charset=utf-8");
            response.setStatus(HttpServletResponse.SC_OK);
            baseRequest.setHandled(true);
            Cookie[] cookiesArray = request.getCookies();
            List<Cookie> cookies = Arrays.asList(cookiesArray);
            List<Cookie> filteredCookies = cookies.stream().filter(c -> c.getName().equals(TOKEN_KEY)).collect(Collectors.toList());
            RestClient rc = new RestClient( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER);
            String requestUri = request.getRequestURI();
            if (filteredCookies.size() > 0) {
                String base64String = filteredCookies.get(0).getValue();
                byte[] decodedBytes = Base64.getDecoder().decode(base64String);
                String tokenString = new String(decodedBytes);
                rc.token = JSON.parseObject(tokenString, TokenInfo.class);
            } else if (!requestUri.equals("/oauth2callback")) {
                response.getWriter().println("<h2>RingCentral Authorization Code Flow Authentication</h2><a href=\"" + rc.authorizeUri(REDIRECT_URI) + "\">Login RingCentral Account</a>");
                return;
            }
            System.out.println(requestUri);
            switch (requestUri) {
                case "/":
                    response.getWriter().println("<b><a href=\"/logout\">Logout</a></b>\n" +
                            "                            <h2>Call APIs</h2>\n" +
                            "                            <ul>\n" +
                            "                                <li><a href=\"/test?api=extension\">Read Extension Info</a></li>\n" +
                            "                                <li><a href=\"/test?api=extension-call-log\">Read Extension Call Log</a></li>\n" +
                            "                                <li><a href=\"/test?api=account-call-log\">Read Account Call Log</a></li>\n" +
                            "                            </ul>");
                    break;
                case "/oauth2callback":
                    String code = request.getParameter("code");
                    try {
                        rc.authorize(code, REDIRECT_URI);
                    } catch (RestException e) {
                        e.printStackTrace();
                    }
                    String base64String = Base64.getEncoder().encodeToString(JSON.toJSONString(rc.token).getBytes());
                    Cookie cookie2 = new Cookie(TOKEN_KEY, base64String);
                    cookie2.setMaxAge(999999999);
                    response.addCookie(cookie2);
                    response.sendRedirect("/");
                    break;
                case "/test":
                    String api = request.getParameter("api");
                    String result = "";
                    switch (api) {
                        case "extension":
                            result = JSON.toJSONString(rc.restapi().account().extension().list(), SerializerFeature.PrettyFormat);
                            break;
                        case "extension-call-log":
                            result = JSON.toJSONString(rc.restapi().account().extension().calllog().list(), SerializerFeature.PrettyFormat);
                            break;
                        case "account-call-log":
                            result = JSON.toJSONString(rc.restapi().account().calllog().list(), SerializerFeature.PrettyFormat);
                            break;
                    }

                    response.getWriter().println("<pre>" + result + "</pre>");
                    break;
                case "/logout":
                    try {
                        rc.revoke();
                    } catch (RestException e) {
                        e.printStackTrace();
                    }
                    Cookie cookie = new Cookie(TOKEN_KEY, "");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                    response.sendRedirect("/");
                    break;
                default:
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    break;
            }
        }
    }
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
    class MainController < ActionController::Base
      require 'ringcentral'

      RINGCENTRAL_CLIENT_ID= '<ENTER CLIENT ID>'
      RINGCENTRAL_CLIENT_SECRET= '<ENTER CLIENT SECRET>'
      RINGCENTRAL_SERVER_URL= 'https://platform.devtest.ringcentral.com'
      RINGCENTRAL_REDIRECT_URL= 'http://localhost:5000/oauth2callback'

      $rcsdk = RingCentral.new(RINGCENTRAL_CLIENT_ID, RINGCENTRAL_CLIENT_SECRET, RINGCENTRAL_SERVER_URL);

      def login
        base_url = $rcsdk.authorize_uri(RINGCENTRAL_REDIRECT_URL, "initialState")
        @authorize_uri = base_url
      end

      def oauth2callback
        auth_code = params[:code]
        $rcsdk.authorize(username: nil, extension: nil, password: nil, auth_code: auth_code, redirect_uri: RINGCENTRAL_REDIRECT_URL)
        # Save tokens to session
        session[:tokens] = $rcsdk.token
        redirect_to "/main/test"
      end

      def callapis
        req = params[:api]
        api = req.split(/=/)
        if $rcsdk.token == nil
          return redirect_to "/main/login"
        end

        if api[1] == 'extension'
          resp = $rcsdk.get("/restapi/v1.0/account/~/extension")
        elsif api[1] == "extension-call-log"
          resp = $rcsdk.get("/restapi/v1.0/account/~/extension/~/call-log")
        elsif api[1] == "account-call-log"
          resp = $rcsdk.get("/restapi/v1.0/account/~/call-log")
        elsif api[0] == "logout"
          $rcsdk.revoke()
          session[:tokens] = nil
          return redirect_to "/main/login"
        else
          return redirect_to "/main/test"
        end
        render({plain: resp.body})
      end
    end
    ```

    ### Edit the routes.rb file

    Browse the the "config" folder and edit the file <tt>routes.rb</tt>

    ```ruby
    Rails.application.routes.draw do
      get 'main/login'
      get 'main/test'
      match '/main/:api' => 'main#callapis', via: :get
      match '/oauth2callback' => 'main#oauth2callback', via: :get
    end
    ```

    ### Implement a login page

    Browse to the "app/views/main" folder and edit the <tt>login.html.erb</tt>.

    ```html
    <!DOCTYPE html>
    <html>
      <head>
          <meta charset="UTF-8">
          <title>RingCentral Authorization Code Flow Authentication</title>
      </head>
      <body>
        <h2>
            RingCentral Authorization Code Flow Authentication
        </h2>
        <a href="<%= @authorize_uri %>">Login RingCentral Account</a>
      </body>
    </html>
    ```

    ### Implement a test page

    ```bask
    $ rails generate controller main test
    ```

    !!! warning "Do not overwrite the main_controller.rb"
        Answer "no" to the overwrite main_controller.rb confirmation!

    Browse to the "app/views/main" folder and edit the <tt> test.html.erb</tt>.

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
      <b><a href="logout">Logout</a></b>
      <h2>Call APIs</h2>
      <ul>
          <li><a href="api=extension">Read Extension Info</a></li>
          <li><a href="api=extension-call-log">Read Extension Call Log</a></li>
          <li><a href="api=account-call-log">Read Account Call Log</a></li>
      </ul>
    </body>
    </html>
    ```

    ### Run Your Code

    You are almost done. Now run your script.

    ```bash
    $ bin/rails server -p 5000
    ```

    Open a Web browser and load localhost:5000/main/login

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
