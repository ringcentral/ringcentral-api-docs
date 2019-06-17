# Implicit Grant Flow

Implicit Grant flow is an authorization flow (OAuth 2.0) for browser based apps. If you are building a browser only app and do not have a serverside component , Implicit Grant is the reccomended flow. Implicit grant ensures that your app enables your user to securely login and grant access to only those resources that they consent to . Implicit grant secures your app in a browser enviornment.

This 2-legged authorization flow used by RingCentral involves obtaining an access token from API server, and using the access token for making API calls.The general flow looks like this:

<img src="../../img/implicit_grantflow.png" class="img-fluid">

The step-by-step details of this flow are explained below.

Lets first define the actors in the flow. The actors in the flow are

1. Client or WebApp : This is the web application that you want to build.
2. Resource Owner or User : This is your User
3. User Agent or Browser : This is your browser
4. Authorization Server : This is your auth server
5. Redirection URI : Web hosted client resource 
6. API Server : Server that serves your rest apis. (This is involved in what you do after getting your access token)

## Step 1

First time when the flow is initiated, the WebApp(Client) initiates the flow by directing the user’s browser(User Agent) to the Authorization server. The WebApp(Client) includes its identifier<ClientId>, requested scope, local state and a redirection URI. The endpoint called will be `/restapi/oauth/authorize`.

The endpoint your app will  https://{{RingCentral Server}}/restapi/oauth/authorize

The RingCentral Server sandbox = platform.devtest.ringcentral.com and production = platform.ringcentral.com. 

The Request parameters will be : 
    
| Parameter       | Type   | Description |
| --------------- | ------ | ----------- |
| `response_type` | string | Must be set to `token` |
| `client_id`     | string | Required. Enter your application key (Production or Sandbox) here |
| `redirect_uri`  |URI     | Required. This is a callback URI which determines where the response will be sent to. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration. This URI can be HTTP/HTTPS address for web applications or custom scheme URI for mobile or desktop applications. |
| `state`         | string | Optional, recommended. An opaque value used by the client to maintain state between the request and callback. The authorization server includes this value when redirecting the user-agent back to the client. The parameter should be used for preventing cross-site request forgery |
| `scope`         | string | Optional|
| `brand_id`      | string | Optional . Brand identifier. If it is not provided in request, server will try to determine brand from client app profile. The default value is '1210' - RingCentral US
| `prompt`      | string | Specifies which login form will be displayed. Space-separated set of the following values: 'login' - official RingCentral login form, 'sso' - Single Sign-On login form, 'consent' - form to show the requested scope and prompt user for consent. Either 'login' or 'sso' (or both) must be specified. Please note: The value must be set to 'none' for all requests except for the first one. Possible values 'page' | 'popup'|'touch'|'mobile'

**Request Body**

```http
GET /authorize?response_type=token&client_id=s6BhdRkqt3&state=xyz&redirect_uri=http%3A%2F%2Fexample%2Ecom%2Fcb&scope=Contacts HTTP/1.1
Content Type: text/html
Host: platform.devtest.ringcentral.com
```

## Step 2: User login and consent

On this step your app’s user is redirected by the browser to a RingCentral authorization page, where user can view the list of permissions your app is asking for.

<img src="../../img/implicit_grant_userlogin.png" class="img-fluid">
<img src="../../img/implicit_grant_userconsent.png" class="img-fluid">

After confirming the permissions, user enters his/her RingCentral credentials, and the browser redirects back to the redirect URI you’ve provided in request with the access token in the url #fragment.

Assumning the user grants access , the response would contain the information as shown below

**Example Response**

```http
HTTP/1.1 200 OK
Content-Type: text/html
   
{
    "access_token" : "U1BCMDFUMDRKV1MwMXxzLFSvXdw5PHMsVLEn_MrtcyxUsw",
    "token_type" : "bearer",
    "expires_in" : 3600,
    "endpoint_id" :"xxxxxxxx",
    "scope" : "Contacts"
}
```

The actual #fragment response would be something like below :

http://localhost:8080/callback.html#access_token=XXXXXXXXXXXX&token_type=bearer&expires_in=3600&endpoint_id=0eTdUFwhQJa98zYssI-JFA&scope=Contacts%20ReadCallLog

If the user decides not to grant access to the application, the response URL contains error

## Step 3

In this step your WebApp extracts the access_token got as a response in the previous step and stores it locally to make sucessful API calls with the access token . Also it redirects the app to the redirect URI.Keep in mind, you would also need to take into account the expires_in time (3600 mili seconds). Which means before the access token expires you need to get a new access token.

!!! warning "In Implicit Grant Flow there is no concept of Refresh Token"

When getting a new access token before the expires_in time, you can pass a property prompt=none in the request, this will make sure that user is not presented with a login screen and a new access_token can be generated in the background without any user intervention(Provided the RingCentral Unified Login session is still active).

## Step 4

Use the access_token to make sucessful API Calls to the API Server.
