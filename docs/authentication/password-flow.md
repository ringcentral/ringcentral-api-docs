# Password Flow

Password Flow (Resource Owner Password Credentials) is the simplest OAuth 2.0 authorization flow to implement. It is suitable mostly for server apps which will be used by a single user. Typically the user enters credentials in the form which is provided by the application itself or specifies them in app configuration file (instead of being redirected to the RingCentral website to enter credentials through Web Browser).

!!! warning "Password Flow cannot be used if Single Sign-On is enforced"
    If your organization utilizes and requires Single Sign-On for account access, e.g. Okta, then username and password based auth cannot be used for your application. 

!!! warning "Password Flow is rarely recommended"
    The Password Flow is considered by many to be less secure because it requires an app to store a username and password in plain text by the server or client utilizing it. Utilizing the password flow requires an additional level of trust between you and the application.

This authorization flow uses Resource Owner Password Credentials OAuth grant type. Two steps are required for this flow:

1.  The application by itself obtains user credentials from the user.
    
2.  The application supplies user credentials and application credentials in a request to a token endpoint. Once the credentials are successfully verified, the application receives the access token and the refresh token in an HTTP response.

Resource Owner Password Credentials flow used by RingCentral results in obtaining an access token from API server. The general ROPC flow looks like this:

<img src="../../img/password_flow.png" class="img-fluid">

Below find the step-by-step instructions on how to perform two-legged authorization using the RingCentral API.

## Step 1. Request access token
    
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
	
## Step 2. Handling token server response

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

=== "Request"
	```http
	POST /restapi/oauth/token HTTP/1.1 
	Accept: application/json 
	Content-Type: application/x-www-form-urlencoded 
	Authorization: Basic cmVsLWFsbC1wZXJtaXNzaWXFjMmpRZmlQcnlkSUkweE92QQ==
	grant_type=password&username=18559100010&extension=101&password=121212             
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
	   "owner_id" : "256440016"
	}
	```
