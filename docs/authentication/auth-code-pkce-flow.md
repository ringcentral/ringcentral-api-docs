# Authorization Code Flow with Proof Key for Code Exchange

The "Authorization Code Flow with Proof Key for Code Exchange" also simply "Auth code flow with PKCE" is the most recommended form of authenticating RingCentral users and exchange tokens in client side applications. It is an enhancement of [Authorization Code Flow](./auth_code_flow):

* No client secret required in client side.
* Exchange token with code and code verifier.

The general flow looks like this:

<img src="../../img/auth_code_pkce_flow.png" class="img-fluid">

The step-by-step details of this flow are explained below.

## Step 1. Generate code verifier and code challenge

Before we open an authorization request to RingCentral API server, we need to generate a pair of code verifier and code challenge.

Code verifier should be a cryptographically-random string, without '+', '/', and '=' characters.

=== "Javascript"
  We can use `crypto` to help generate a random `code_verifier`:

  ```javascript
	import {randomBytes} from 'crypto';

	function _generateCodeVerifier() {
	let codeVerifier: any = randomBytes(32);
			codeVerifier = codeVerifier
					.toString('base64')
					.replace(/\+/g, '-')
					.replace(/\//g, '_')
					.replace(/=/g, '');
			return codeVerifier;
	}
  ```

**Example Code Verifier**

a cryptographically-random example string:

```
pIUgx4tiqFpaOUz0HMc_QbIyQlL901w8mRmkrmhEJ_E
```

Code challenge is generated from code challenge. For devices that can perform a SHA256 hash, the code challenge is a BASE64-URL-encoded string of the SHA256 hash of the code verifier. Clients that do not have the ability to perform a SHA256 hash are permitted to use the plain code verifier string as the challenge.

=== "Javascript"
  We can use `crypto` to help us to get `code_challenge`:

  ```javascript
	import {createHash} from 'crypto';

	this._codeVerifier = this._generateCodeVerifier();
	query.code_challenge = createHash('sha256')
			.update(this._codeVerifier)
			.digest()
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '');
	query.code_challenge_method = 'S256';
  ```

**Example Code Challenge**

Generated from upper code verifier with SHA256 hash and BASE64-URL-encoded:

```
_drLS7o5FwkfUiBhlq2hwJnK_SC6yE7sKOde5O1fdzk
```

## Step 2. Request authorization code

When your application needs to access a user's data, redirect the user to the RingCentral API server. The authorization URL is same as URL from [Authorization Code Flow Step 1](./auth_code_flow#step-1-request-authorization-code), and PKCE flow will need additional parameters `code_challenge` and `code_challenge_method` in authorization URL:

| Parameter       | Type   | Description |
| --------------- | ------ | ----------- |
| `code_challenge` | string | Required. Generated from code challenge.
| `code_challenge_method` | string | Required. The code challenge method, either plain or S256, depending on whether the challenge is the plain verifier string or the SHA256 hash of the string. If this parameter is omitted, the server assumes plain.

**Example Login URL**

Below is an example login URL to initiate the PKCE authorization flow. We recommend developers use an SDK to generate this URL in a more automated fashion.

```
https://platform.ringcentral.com/restapi/oauth/authorize?response_type=code&redirect_uri=<my_uri>&client_id=<client_id>&display=&prompt=&code_challenge=<code_challenge_string>&code_challenge_method=S256
```

## Step 3. User login and consent

This step is same as [Authorization Code Flow Step 2](./auth_code_flow#step-2-user-login-and-consent). After user logs in and approves access request, and the browser will been redirected to the "Redirect URI" you’ve provided in the authorization request.

## Step 4. Handling authorization code server response

This step is same as [Authorization Code Flow Step 3](./auth_code_flow#step-3-handling-authorization-code-server-response).

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

## Step 5. Exchange code for token

After client receives the authorization code, it can exchange the authorization code and code verifier for an access token using token endpoint `/restapi/oauth/token` (API group is *Auth*).

Differences from `Authorization Code flow`:

* Token requests don't need to include client authentication credentials in `Authorization` header. So client secret is not required.
* Additional Parameter `code_verifier` in request body.

**Request Body**

```http
Content Type: application/x-www-form-urlencoded
```

| Parameter           | Type     | Description |
| ------------------- | -------- | ----------- |
| `grant_type`        | string   | Required. Must be set to `authorization_code` for authorization code flow |
| `code`              | string   | Required. Provide your authorization code received in the previous step |
| `client_id`         | string   | Required. Enter your application key (Production or Sandbox) here |
| `code_verifier`         | string   | Required. Code verifier generated in Step 1. |
| `redirect_uri`      | URI      | Required. This is a callback URI which determines where the response is sent. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration. |
| `access_token_ttl`  | integer  | Optional. Access token lifetime in seconds; the possible values are from 600 sec (10 min) to 3600 sec (1 hour). The default value is 3600 sec. If the value specified exceeds the default one, the default value is set. If the value specified is less than 600 seconds, the minimum value (600 sec) is set |
| `refresh_token_ttl` | integer  | Optional. Refresh token lifetime in seconds. The default value depends on the client application, but as usual it equals to 7 days. If the value specified exceeds the default one, the default value is applied

**Respond Body**

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

=== "Request"
	```http
	POST /restapi/oauth/token HTTP/1.1 
	Accept: application/json 
	Content-Type: application/x-www-form-urlencoded 
	code=U0pDMTFQMDFQQVMwM
	  XxBQUJfTVpHWk5lM29zNVFmWnNHQ01MSmJuMHJmNGlRcnRaeEptTWlPS0MzUTdYRDdSTURiaHBuWHZINGM2WTdqaWlBOE
	  VhRHNxRWdJVUNYQjd4dmJsWHJoVVlWQVN2SFo2YWJPanJsRkFWZk9SMm5lek0tWnF5d3h8C3AnYOPxO0flEwO6Ffoq9Tl
	  qs1s&grant_type=authorization_code&client_id=asdsadsadasdadsa&code_verifier=pIUgx4tiqFpaOUz0HMc_QbIyQlL901w8mRmkrmhEJ_E&redirect_uri=https%3A%2F%2Fmyapp.acme.com%2Foauth2redirect           
	```

=== "Response"
	```http
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

## Step 6. Token refresh

We can still refresh token by [Refresh Token Flow](https://developers.ringcentral.com/api-reference/Get-Token#section-refresh-token-flow) as Authorization Code Flow.

> For app type "Web Browser (Javascript)", it doesn't require authorization header at token request. So app client secret is not required.

Differences from `Authorization Code flow` in **Web Browser (Javascript)** app:

* Token requests don't need to include client authentication credentials in `Authorization` header.
* Need to add `client_id` in body.

**Example**

=== "Request"
	```http
	POST /restapi/oauth/token HTTP/1.1
	Accept: application/json
	Content-Type: application/x-www-form-urlencoded

	refresh_token=BCMDFUMDRKV1MwMXx5d5dwzLFL4ec6U1A0XMsUv935527jghj48&grant_type=refresh_token&client_id=adsadsadsadadsad    
	```

=== "Response"
	```http
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
