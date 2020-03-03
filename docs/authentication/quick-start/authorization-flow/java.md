no_breadcrumb:true

# Authorization Flow Authentication - Java Quick Start

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
<li>Give your app a name and description, then click Next.</li>
<li>On the second page of the create app wizard enter the following:
  <ul>
  <li>Select 'Private' for Application Type.</li>
  <li>Select 'Server/Web' for Platform Type.</li>
  </ul>
  </li>
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>ReadAccounts,ReadCallLog</li>
  </ul>
  </li>
<li>Specify the redirect Uri as http://localhost:5000/oauth2callback.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.


## Authorization Flow

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

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
