# Authorization Code Flow

The "Authorization Code Flow," also referred to as a "3-legged authorization flow" or simply "OAuth" is the most common and recommended form of authenticating RingCentral users within the context of an application. This process conforms to the OAuth 2.0 standard and works to:

* Keep a user's auth credentials secure, and out of the hands of a third-party.
* Disclose what permissions an app requires.
* Prompt the user to explicitly authorize an app to access their data.
* Provide the developer with a token that can used to by their application to act on a user's behalf. 

The general flow looks like this:

<img src="../../img/auth_code_flow.png" class="img-fluid">

The step-by-step details of this flow are explained below.

## Step 1. Request authorization code

When your application needs to access a user's data, redirect the user to the RingCentral API server. Generate a URL to request access from endpoint `/restapi/oauth/authorize`. This request must be in the `application/x-www-form-urlencoded` format and must contain the following parameters in the HTTP request body:
	
| Parameter       | Type   | Description |
| --------------- | ------ | ----------- |
| `response_type` | string | Must be set to `code` |
| `client_id`     | string | Required. Enter your application key (Production or Sandbox) here |
| `redirect_uri`  |URI     | Required. This is a callback URI which determines where the response will be sent to. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration. This URI can be HTTP/HTTPS address for web applications or custom scheme URI for mobile or desktop applications. |
| `state`         | string | Optional, recommended. An opaque value used by the client to maintain state between the request and callback. The authorization server includes this value when redirecting the user-agent back to the client. The parameter should be used for preventing cross-site request forgery |
| `brandId`       | integer | Optional. A number identifying the RingCentral Carrier Partner logo to display on the login page. See [RingCentral Partner Compatibility Guide](../../basics/partner-compatibility/).

**Example Login URL**

Below is an example login URL to initiate the authorization flow. We recommend developers use an SDK to generate this URL in a more automated fashion. 

```
https://platform.ringcentral.com/restapi/oauth/authorize?response_type=code&redirect_uri=<my_uri>&client_id=<client_id>&brand_id=7710&display=&prompt=
```

## Step 2. User login and consent

On this step your app’s user is redirected by the browser to a RingCentral authorization page, where user can view the list of permissions your app is asking for.
	
<img src="../../img/user_login.png" class="img-fluid">

<img src="../../img/user_consent.png" class="img-fluid">

After confirming the permissions, the user enters their RingCentral credentials, and the browser is then redirected to the "Redirect URI" you’ve provided in the request.

## Step 3. Handling authorization code server response

The authorization server responds to your application's access request by using the URL specified in the request.

* If the user approves the access request, then the response contains an authorization code.
* If the user does not approve the request, the response contains an error message.

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

## Step 4. Exchange code for token
     
After the web server receives the authorization code, it can exchange the authorization code for an access token using token endpoint `/restapi/oauth/token` (API group is *Auth*).

Token requests must include client authentication credentials (see Client Authentication section).

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
	
## Step 5. Handling token server response

The server responds with an access token which can presented in subsequent requests in the HTTP Authorization header to authenticate API Calls. The response will contain the following parameters: 

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

```http tab="Request"
POST /restapi/oauth/token HTTP/1.1 
Accept: application/json 
Content-Type: application/x-www-form-urlencoded 
Authorization: Basic cmVsLWFsbC1wZXJtaXNzaWXFjMmpRZmlQcnlkSUkweE92QQ==code=U0pDMTFQMDFQQVMwM
  XxBQUJfTVpHWk5lM29zNVFmWnNHQ01MSmJuMHJmNGlRcnRaeEptTWlPS0MzUTdYRDdSTURiaHBuWHZINGM2WTdqaWlBOE
  VhRHNxRWdJVUNYQjd4dmJsWHJoVVlWQVN2SFo2YWJPanJsRkFWZk9SMm5lek0tWnF5d3h8C3AnYOPxO0flEwO6Ffoq9Tl
  qs1s&grant_type=authorization_code&redirect_uri=https%3A%2F%2Fmyapp.acme.com%2Foauth2redirect              
```

```http tab="Response"
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