# Authorization Flows on RingCentral Using OAuth 2.0

Your application and its users must be authorized by RingCentral in order to eliminate any possibility of abuse. The RingCentral API uses *OAuth 2.0* protocol for authentication and authorization, which is widely supported by the majority of cloud API providers. For more details see [OAuth 2.0 protocol specification](http://oauth.net/2/).

In general, the steps your app needs to take to use RingCentral APIs (including authorization) are as follows:

1. Get your app credentials from your [Developer Portal account](https://developer.ringcentral.com/my-account.html)

2. Get an access token using either [Authorization Code Flow](#authorization-code-flow) or [Password Flow](#password-flow)

3. Use access token to call RingCentral APIs

4. [Refresh](#refresh-token-flow) your access token when necessary

!!! alert "FYI"
    In order to prevent eavesdropping and tampering, the RingCentral API requires Transport Layer Security. This means that API resources are accessible only through HTTPS connections.

## Tokens

Tokens are used to provide a context in each request for authorization or authentication. It is important to understand distinctions between token types:

* **Access token** is a special token issued by authorization server and used by the application to make requests to all endpoints which require authentication.

* **Refresh token** can be provided along with access token once your application successfully passes the authorization. It can be used only once to refresh short-lived access token. The refresh token itself cannot be used to access protected resources.

To prevent possible abuse by means of intercepting tokens and using them illegally, access and refresh token lifetimes are limited. By default access token **expires in one hour**. Refresh token lifetime is typically limited to one week. Actual lifetimes of access and refresh tokens are returned in `expires_in` and `refresh_token_expires_in` attributes of a token endpoint response.

The API requests which include expired access tokens are rejected with `HTTP 401 Unauthorized` responses. So an application is forced to obtain a new access token using one of the [authorization flows](#authorization-flows).

Both access and refresh tokens may also be [revoked](#token-revocation) by the user at any time. In this case the application is required to authorize again.

If the user's credentials are changed (via RingCentral Service Web, Mobile Web or Admin Interface sites), all issued tokens are invalidated immediately, and all established sessions are terminated.

## Authorization Flows

There are several **authorization flows** you can use to get an authorized access to RingCentral API.

Apps with 'Public' application type are not allowed to use [Password Flow](#password-flow) for security reasons, as well as 'Private' apps of 'Browser-Based' or 'Server/Web' platform type. Apps with no user interface are not allowed to use [Authorization Code Flow](#authorization-code-flow).

You can check which flows are available for your app on your app's Setting page.

* **Authorization Code Flow** — a 3-legged authorization flow and is a preferred flow for your app if it is a web, mobile or desktop application and is intended to work with multiple RingCentral user accounts.

* **Resource Owner Password Credentials Flow (ROPC)**, further named **Password Flow** — a 2-legged authorization flow which is more suitable for server apps used by a single user account.

* **Refresh Token Flow** — a flow used to refresh existing access token regardless of the authorization flow (Authorization Code or Password) that was used for obtaining this access token. If refresh token flow is **not** available for your app, you should be using Authorization Code or Password flows for obtaining new access tokens.

All flows end up with your app obtaining an access token which you will need to call RingCentral APIs.

### Authorization Code Flow

Authorization code flow protects users information and lets them control what they share with your app. You are required to use this flow if your app is a web app and will be used by more than one user.

3-legged authorization flow used by RingCentral involves obtaining an authorization code from API server, which is exchanged for an access token later. The general flow looks like this:

<img src="../../img/auth_code_flow.png" class="img-fluid">

The step-by-step details of this flow are explained below.

#### Step 1. Request authorization code

When your application needs to access a user's data, redirect the user to RingCentral API server. Generate a URL to request access from endpoint `/restapi/oauth/authorize`. This request must be in the `application/x-www-form-urlencoded` format by passing the following parameters in the HTTP request body:
	
| Parameter       | Type   | Description |
| --------------- | ------ | ----------- |
| `response_type` | string | Must be set to `code` |
| `client_id`     | string | Required. Enter your application key (Production or Sandbox) here |
| `redirect_uri`  |URI     | Required. This is a callback URI which determines where the response will be sent to. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration. This URI can be HTTP/HTTPS address for web applications or custom scheme URI for mobile or desktop applications. |
| `state`         | string | Optional, recommended. An opaque value used by the client to maintain state between the request and callback. The authorization server includes this value when redirecting the user-agent back to the client. The parameter should be used for preventing cross-site request forgery |

#### Step 2. User login and consent

On this step your app’s user is redirected by the browser to a RingCentral authorization page, where user can view the list of permissions your app is asking for.
	
<img src="../../img/user_login.png" class="img-fluid">

<img src="../../img/user_consent.png" class="img-fluid">

After confirming the permissions, user enters his/her RingCentral credentials, and the browser redirects back to the redirect URI you’ve provided in request.

#### Step 3. Handling authorization code server response

The authorization server responds to your application's access request by using the URL specified in the request.

If the user approves the access request, then the response contains an authorization code.

If the user does not approve the request, the response contains an error message.

An authorization code response contains:

| Parameter    | Type    | Description |
| ------------ | ------- | ----------- |
| `code`       | string  | The authorization code returned for your application |
| `expires_in` | integer | The remaining lifetime of the authorization code |
| `state`      | string  | This parameter will be included in response if it was specified in the client authorization request. The value will be copied from the one received from the client |
	
If authentication has been passed successfully, your application will get a response similar to the following:
	
```http
HTTP/1.1 302 Found
Location: https://myapp.example.com/oauth2Callback?code=SplxlOBeZQQYbYS6WxSbIA&state=xyz&expires_in=60
```

#### Step 4. Exchange code for token
     
After the web server receives the authorization code, it can exchange the authorization code for an access token using token endpoint `/restapi/oauth/token` (API group is *Auth*).

Token requests must include client authentication (see Client Authentication section).

**Request Body**

```http
Content Type: application/x-www-form-urlencoded
```

| Parameter           | Type     | Description |
| ------------------- | -------- | ----------- |
| `grant_type`        | string   | Required. Must be set to `authorization_code` for authorization code flow |
| `code`              | string   | Required. Provide your authorization code received in the previous step |
| `client_id`         | string   | Required. Enter your application key (Production or Sandbox) here |
| `redirect_uri`      | URI      | Required. This is a callback URI which determines where the response is sent. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration. |
| `access_token_ttl`  | integer  | Optional. Access token lifetime in seconds; the possible values are from 600 sec (10 min) to 3600 sec (1 hour). The default value is 3600 sec. If the value specified exceeds the default one, the default value is set. If the value specified is less than 600 seconds, the minimum value (600 sec) is set |
| `refresh_token_ttl` | integer  | Optional. Refresh token lifetime in seconds. The default value depends on the client application, but as usual it equals to 7 days. If the value specified exceeds the default one, the default value is applied
	
#### Step 5. Handling token server response

**Response Body**

```http
Content Type: application/json
```

| Parameter                  | Type    | Description |
| -------------------------- | ------- | ----------- |
| `access_token`             | string  | Access token to pass to subsequent API requests |
| `expires_in`               | integer | Issued access token TTL (time to live), in seconds |
| `refresh_token`            | string  | Refresh token to get a new access token, when the issued one expires |
| `refresh_token_expires_in` | integer | Issued refresh token TTL (time to live), in seconds |
| `scope`                    | string  | List of permissions allowed with this access token, white-space separated |
| `token_type`               | string  | Type of token. The only possible value supported is 'Bearer'. This value should be used when specifying access token in `Authorization` header of subsequent API requests |
| `owner_id`                 | string  | Extension identifier |
    
**Example**

```http fct_label="Request"
POST /restapi/oauth/token HTTP/1.1 
Accept: application/json 
Content-Type: application/x-www-form-urlencoded 
Authorization: Basic cmVsLWFsbC1wZXJtaXNzaWXFjMmpRZmlQcnlkSUkweE92QQ==code=U0pDMTFQMDFQQVMwM
  XxBQUJfTVpHWk5lM29zNVFmWnNHQ01MSmJuMHJmNGlRcnRaeEptTWlPS0MzUTdYRDdSTURiaHBuWHZINGM2WTdqaWlBOE
  VhRHNxRWdJVUNYQjd4dmJsWHJoVVlWQVN2SFo2YWJPanJsRkFWZk9SMm5lek0tWnF5d3h8C3AnYOPxO0flEwO6Ffoq9Tl
  qs1s&grant_type=authorization_code&redirect_uri=https%3A%2F%2Fmyapp.acme.com%2Foauth2redirect              
```

```http fct_label="Response"
HTTP/1.1 200 OK
Content-Type: application/json
    
{
   "access_token" : "U1BCMDFUMDRKV1MwMXxzLFSvXdw5PHMsVLEn_MrtcyxUsw",
   "token_type" : "bearer",
   "expires_in" : 7199,
   "refresh_token" : "U1BCMDFUMDRKV1MwMXxzLFL4ec6A0XMsUv9wLriecyxS_w",
   "refresh_token_expires_in" : 604799,
   "scope" : "AccountInfo CallLog ExtensionInfo Messages SMS",
   "owner_id" : "256440016"
}
```

### Implicit Grant Flow

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

#### Step 1

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

#### Step 2: User login and consent

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

#### Step 3

In this step your WebApp extracts the access_token got as a response in the previous step and stores it locally to make sucessful API calls with the access token . Also it redirects the app to the redirect URI.Keep in mind, you would also need to take into account the expires_in time (3600 mili seconds). Which means before the access token expires you need to get a new access token.

!!! warning "In Implicit Grant Flow there is no concept of Refresh Token"

When getting a new access token before the expires_in time, you can pass a property prompt=none in the request, this will make sure that user is not presented with a login screen and a new access_token can be generated in the background without any user intervention(Provided the RingCentral Unified Login session is still active).

#### Step 4

Use the access_token to make sucessful API Calls to the API Server.

### Password Flow

Password Flow (Resource Owner Password Credentials) is the simplest OAuth 2.0 authorization flow. It is suitable mostly for server apps which will be used by a single user. Typically the user enters credentials in the form which is provided by the application itself or specifies them in app configuration file (instead of being redirected to the RingCentral website to enter credentials through Web Browser).

**Please note that this flow is considered to be less secure and requires an additional level of trust between you and the application.**

This authorization flow uses Resource Owner Password Credentials OAuth grant type.

Two steps are required for this flow:

1.  The application by itself obtains user credentials from the user.
    
2.  The application supplies user credentials and application credentials in a request to a token endpoint. Once the credentials are successfully verified, the application receives the access token and the refresh token in HTTP response.

Resource Owner Password Credentials flow used by RingCentral results in obtaining an access token from API server. The general ROPC flow looks like this:

<img src="../../img/password_flow.png" class="img-fluid">

Below find the step-by-step instructions on how to perform two-legged authorization using the RingCentral API.

#### Step 1. Request access token
    
You have to implement a way of obtaining user credentials from the users of your application.
    
Once your application has obtained credentials from the user, it can send a specific request to token endpoint `/restapi/oauth/token` (API group is Auth).
    
Token requests must include client authentication (see Client Authentication section).

**Request Header**
   
The `Content-Type` header should be specified as `application/x-www-form-urlencoded`. **Please note:** Request body should be encoded appropriately. For example email `john+doe@example.com` as username parameter should be specified so - `john%2Bdoe%40example.com`.
    
**Request Body**

```http
Content Type: application/x-www-form-urlencoded
```

| Parameter           | Type    | Description |
| ------------------- | ------- | ----------- |
| `grant_type`        | string  | Required. Must be set to `password` for Resource Owner Credentials flow |
| `access_token_ttl`  | integer | Optional. Access token lifetime in seconds; the possible values are from 600 sec (10 min) to 3600 sec (1 hour). The default value is 3600 sec. If the value specified exceeds the default one, the default value is set. If the value specified is less than 600 seconds, the minimum value (600 sec) is set |
| `refresh_token_ttl` |	integer | Optional. Refresh token lifetime in seconds. The default value depends on the client application, but as usual it equals to 7 days. If the value specified exceeds the default one, the default value is applied. |
| `username`          | string  | Phone number in [E.164](http://en.wikipedia.org/wiki/E.164) format or email address linked to account or extension. **Please note:** You cannot use one and the same email address for authorization on different extensions (even if they are assigned to different accounts)
| `extension`         | string  | Optional. Extension short number. If company number is specified as a username, and extension is not specified, the server will attempt to authenticate client as main company administrator |
| `password`          | string  | Required. User's password |
	
#### Step 2. Handling token server response

**Response Body**

```http
Content Type: application/json
```

| Parameter                  | Type    | Description |
| -------------------------- | ------- | ----------- |
| `access_token`             | string  | Access token to pass to subsequent API requests |
| `expires_in`               | integer | Issued access token TTL (time to live), in seconds |
| `refresh_token`            | string  | Refresh token to get a new access token, when the issued one expires |
| `refresh_token_expires_in` | integer | Issued refresh token TTL (time to live), in seconds |
| `token_type`               | string  | Type of token. The only possible value supported is 'Bearer'. This value should be used when specifying access token in `Authorization` header of subsequent API requests |
| `owner_id`                 | string  | Extension identifier |
	
**Example**

```http fct_label="Request"
POST /restapi/oauth/token HTTP/1.1 
Accept: application/json 
Content-Type: application/x-www-form-urlencoded 
Authorization: Basic cmVsLWFsbC1wZXJtaXNzaWXFjMmpRZmlQcnlkSUkweE92QQ==
grant_type=password&username=18559100010&extension=101&password=121212             
```

```http fct_label="Response"
HTTP/1.1 200 OK
Content-Type: application/json
        
{
   "access_token" : "U1BCMDFUMDRKV1MwMXxzLFSvXdw5PHMsVLEn_MrtcyxUsw",
   "token_type" : "bearer",
   "expires_in" : 7199,
   "refresh_token" : "U1BCMDFUMDRKV1MwMXxzLFL4ec6A0XMsUv9wLriecyxS_w",
   "refresh_token_expires_in" : 604799,
   "owner_id" : "256440016"
}
```

### Client Credentials Authorization Flow

This authorization flow is mostly used by RingCentral partner applications which need to create RingCentral user accounts and control their lifecycle without providing credentials of these users. This flow uses Client Credentials OAuth grant type and, in fact, unlike other described flows authorizes only the application.

!!! alert "FYI"
    Since no user authorization is performed this flow is allowed for use only by trusted RingCentral partner applications.

    There are two types of partner authorization sessions: initial signup session (not connected to any specific RingCentral user account) and account-centric session (connected to certain RingCentral user account), which are initialized differently and have some limitations. Let's consider both sessions below.

#### Signup Session

When the client needs to initiate creation of accounts by itself, the initial signup session is applied. It is the starting point for the client application when the user does not have any account. The access token obtained through this session allows the user to look up and reserve phone numbers and to read common dictionaries (countries, states, locations, timezones). Then the user can create an account with the reserved number.

The new application can be authenticated via the general authentication request by passing the following parameters:

* application credentials, provided by RingCentral in Basic Authorization header;
* `grant_type = client credentials`;
* `brand_id` - constant value, provided by RingCentral.
    
```http
POST /restapi/oauth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Authorization: Basic WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0
Accept: application/json

access_token_ttl=7200&grant_type=client_credentials&brand_id=1234
```
				
In response, the server returns the access token which serves for authorization in subsequent requests. Each access token has a limited lifetime which is returned in response alongside with the token itself.
	
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
   "access_token" : "UExBMDFUMDRQV1MwMXzROYH78MeLmsvo8Li9rA2_AY6YPw",
   "token_type" : "bearer",
   "expires_in" : 3599,
   "scope" : "EditExtensions ReadAccounts EditAccounts Accounts NumberLookup"
}
```

!!! alert "FYI"
    If you try to access any account related data through API with signup session token, you'll get the `401 Unauthorized` error. In order to work with the newly created account further, the client application needs to request another access token, see the next section.
	
#### Account-Centric Session

Account-centric session should be established when the application user already has an active account. This session requires the access token which is issued to work with a particular account.

To continue working with the existing account the client application has to request another access token by passing the following parameters:

-  application credentials, provided by RingCentral in Basic Authorization header;
- `grant_type = client credentials`;
- `account_id` – RingCentral internal account id (alternatively a pair `brand_id`/`partner_account_id` can be used)
- `brand_id` – constant value provided by RingCentral
- `partner_account_id` – specific identifier of account designed and stored by the partner
    
```http
POST /restapi/oauth/token HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Authorization: Basic WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0 
Accept: application/json

partner_account_id=BAN0009&access_token_ttl=7200&grant_type=client_credentials&brand_id=1234
```
		
In case of successful authentication the RingCentral API returns the new access token. This access token is tied to a specific account and may only be used to access account-related APIs for the specific account or to access non-account APIs.
    
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
   "access_token" : "UExBMDFUMDRQV1MwMXyr1gnxGh-egGk5mUfgpMpNmdSGKQ",
   "token_type" : "bearer",
   "expires_in" : 3599,
   "scope" : "EditExtensions ReadAccounts EditAccounts..."
}
```

!!! warning "Attempt to access any other account with this access token will result in the `401 Unauthorized` error message."

## Client Authentication

Each application (client) that intends to obtain an access token must be authenticated. To authenticate the application we use **application key** (also referred as “client id” in OAuth 2.0 specification) and **application secret** (also referred as “client secret” in OAuth 2.0 specification) issued during application registration. They are passed to the token endpoint as username and password using the HTTP Basic authentication scheme.

For example, you have obtained application key `YourAppKey` and application secret `YourAppSecret`. Combine them in a string with a colon `YourAppKey:YourAppSecret` and encode with Base64; thus you will get the following authorization token `WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0`. Put this value into your token request as shown in example below (the example represents [Password Flow](#password-flow)):

```http
POST /restapi/oauth/token HTTP/1.1  
Host: platform.ringcentral.com
Authorization: Basic WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0 
Content-Type: application/x-www-form-urlencoded;charset=UTF-8

grant_type=password&username=18887776655&extension=102&password=Myp@ssw0rd
```

Example values are:

* `platform.ringcentral.com` - name of the RingCentral API server

* `WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0` - Base64 encoded HTTP Basic string generated from application credentials (application key and secret)

* `18887776655` - RingCentral customer login (phone number)

* `102` - particular extension number

* `Myp@ssw0rd` - password to log in as the extension 102 of the account 18887776655

Client authentication uses the same principles for both [Password](#password-flow) flow and [Authorization Code](#authorization-code-flow) flow.

## Using Access Token to Call RingCentral APIs

Now your application should use the issued access token to perform the required actions. Each request must pass the access token using one of the following ways:

**Option 1: Bearer (recommended)**

The Bearer authentication scheme followed by access token in the Authorization header. For example, to get a specific address-book entry, you need to perform the following request:

```http
GET /restapi/v1.0/account/1110475004/extension/1110475004/address-book/contact/29874662828
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA 
Host: platform.ringcentral.com
Accept: application/json  
Connection: keep-alive
```

**Option 2. Access token query parameter**

You can also pass the access token as a query parameterpecified as a value. For example, to get a specific address-book entry, you need to perform the following request:

```http
GET /restapi/v1.0/account/1110475004/extension/1110475004/address-book/contact/29874662828?access_token=2YotnFZFEjr1zCsicMWpAA
Host: platform.ringcentral.com
Accept: application/json  
Connection: keep-alive
```

## Token Revocation

There are some situations when the user may want to revoke the already granted access in order to stop application activity. To revoke access/refresh token the following request is used:

```http
POST /restapi/oauth/revoke  HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Authorization: Basic WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0

token=U0pDMDFQMDFKV1MwMXwJ_W7L1fG4eGXBW9Pp-otywzriCw
```

The request must contain HTTP Basic authorization string Base64 encoded and generated from client credentials: the application key ("userid" in terms of [RFC-2617](https://tools.ietf.org/html/rfc2617)) and application secret ("password" in terms of [RFC-2617](https://tools.ietf.org/html/rfc2617)). The request should contain the `token` form (preferred) or query parameter, which holds the value of an access or refresh token. The server returns `HTTP 200 OK` when the request has been successfully processed. Please note that due to security reasons (to prevent eavesdropping) successful response is returned even if revocation was not successful (for instance if a token passed was issued to another application, expired, or by other means malformed. For additional details see [RFC-7009: OAuth 2.0 Token Revocation](https://tools.ietf.org/html/rfc7009).

## Application Permissions

In order to work with particular RingCentral API resources the application should have the corresponding permissions. Required API permissions are generally declared at the stage of application registration and confirmed by the user on authentication stage. The following permissions are available:

| Permission                | Description                                                    | Access Type       | Included Permissions |
| ------------------------- | -------------------------------------------------------------- | ----------------- | -------------------- |
| **Accounts**              | Managing accounts: creating new accounts, viewing and updating account information, deleting existing accounts | CRUD | **EditAccounts** |
| **Contacts**              | Creating, viewing, editing and deleting user personal contacts | CRUD              | **ReadContacts**     |
| **DirectRingOut**         | Performing direct (one-legged) ring-out phone calls            | Special operation |                      |
| **EditAccounts**          | Viewing and updating user account info (including name, business name, address and phone number/account number) | Read and Update | **ReadAccounts**, **EditExtensions** |
| **EditCallLog**           | Viewing and updating user call logs                            | Read and Update   | **ReadCallLog**      |
| **EditCustomData**        | Viewing and updating client custom data (key-value)            | Read and Update   |                      |
| **EditExtensions**        | Viewing and updating user extension info (includes extension name, number, email and phone number, assigned phone numbers, devices and other extension settings) | Read and Update | |
| **EditMessages**          | Viewing and updating user messages                             | Read and Update   | **ReadMessages**     |
| **EditPaymentInfo**       | Viewing and updating account billing settings                  | Read and Update   |                      |
| **EditPresence**          | Getting and modifying user presence information                | Read and Update   | **ReadPresence**     |
| **EditReportingSettings** | Viewing and updating call reporting settings                   | Read and Update   |                      |
| **Faxes**	                | Sending and receiving faxes                                    | Special operation | **ReadMessages**     |
| **InternalMessages**      | Sending and receiving intra-company text messages              | Special operation | **ReadMessages**     |
| **Interoperability**      | Interoperation between client applications                     | Special operation |                      | 
| **Meetings**              | Creating, viewing, editing and deleting meetings               | CRUD              |                      |
| **NumberLookup**          | Looking-up and reserving available phone number                | Special operation |                      |
| **ReadAccounts**          | Viewing user account info (including name, business name, address and phone number/account number) | Read Only | |
| **ReadCallLog**           | Viewing user call logs                                         | Read Only         |                      |	 
| **ReadCallRecording**     | Downloading call recording content                             | Read Only         | **ReadCallLog**      |
| **ReadClientInfo**        | Viewing of client application registered attributes and additional helper information (external URLs, hints, etc.) | Special operation | |
| **ReadContacts**          | Viewing user personal contacts                                 | Read Only         |                      |	 
| **ReadMessages**          | Viewing user messages                                          | Read Only         |                      | 
| **ReadPresence**          | Getting user presence information                              | Read Only         |                      |
| **RingOut**               | Performing two-legged ring-out phone calls                     | Special operation |                      | 
| **RoleManagement**        | Editing and assignment or user roles                           | Special operation |                      |
| **SMS**                   | Sending and receiving (SMS) text messages                      | Special operation | **ReadMessages**     |
| **VoipCalling**           | Registering as VoIP device and making VoIP calls               | Special operation |                      |