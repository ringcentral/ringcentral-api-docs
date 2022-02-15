# Password auth flow

The password-based authorization flow is among the simplest OAuth 2.0 authorization flows to implement. It is suitable mostly for apps that both lack a user interface, and/or that use a single set of credentials to act on behalf of everyone within an account. 

This authorization flow presumes you are in possession of a user's login credentials. If so, then obtaining an access token is a two-step process:

1.  The application requests and access token by presenting a user's login credentials to the platform.. 
    
2.  Once the credentials are successfully verified, the platform responds with the access and refresh tokens.

<img src="../oauth-password-flow.png" class="img-fluid">

Below find the step-by-step instructions on how to perform two-legged authorization using the RingCentral API.

### When should I use the password auth flow?

The password auth flow is used most often by apps that lack a frontend user interface, such as a script, cronjob, etc. 

!!! warning "We recommend using the JWT authorization flow"
    The password grant flow for OAuth is discouraged as it requires developers to store username and password information on their servers, which if compromised, would give others full access to their account. A safer and recommended form of authentication is the [JWT auth flow](../jwt-flow).

!!! warning "Password auth flow does not work with Single Sign-On"
    If your organization utilizes and requires Single Sign-On for account access, e.g. Okta, then username and password based auth cannot be used for your application. Instead, we recommend using the [JWT auth flow](../jwt-flow) which does not have this restriction.

{! docs/authentication/jwt-vs-password.inc !} 

## Technical discussion

There is only one call to make in the password authorizaton flow: the call to request an access token. This call is described below.

### Access token request

**HTTP Headers**

| Header           | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| `Content-type`   | `application/x-www-form-urlencoded`                        |
| `Authorization`  | `Basic ` + base64_encoded( Client ID + ":" + Client Secret ) |

**POST parameters**

| Parameter           | Type    | Description |
| ------------------- | ------- | ----------- |
| `grant_type`        | string  | Required. Must be set to `password` for Resource Owner Credentials flow |
| `access_token_ttl`  | integer | Optional. Access token lifetime in seconds; the possible values are from 600 sec (10 min) to 3600 sec (1 hour). The default value is 3600 sec. If the value specified exceeds the default one, the default value is set. If the value specified is less than 600 seconds, the minimum value (600 sec) is set |
| `refresh_token_ttl` |	integer | Optional. Refresh token lifetime in seconds. The default value depends on the client application, but as usual it equals to 7 days. If the value specified exceeds the default one, the default value is applied. |
| `username`          | string  | Phone number in [E.164](http://en.wikipedia.org/wiki/E.164) format or email address linked to account or extension. **Please note:** You cannot use one and the same email address for authorization on different extensions (even if they are assigned to different accounts)
| `extension`         | string  | Optional. Extension short number. If company number is specified as a username, and extension is not specified, the server will attempt to authenticate client as main company administrator |
| `password`          | string  | Required. User's password |
	
**Sample Request**

```http
POST /restapi/oauth/token HTTP/1.1 
Accept: application/json 
Content-Type: application/x-www-form-urlencoded 
Authorization: Basic cmVsLWFsbC1wZXJtaXNzaWXFjMmpRZmlQcnlkSUkweE92QQ==

grant_type=password&username=18559100010&extension=101&password=121212
```

### Access token response

**Response parameters**

| Parameter                  | Type    | Description |
| -------------------------- | ------- | ----------- |
| `access_token`             | string  | Access token to pass to subsequent API requests |
| `expires_in`               | integer | Issued access token TTL (time to live), in seconds |
| `refresh_token`            | string  | Refresh token to get a new access token, when the issued one expires |
| `refresh_token_expires_in` | integer | Issued refresh token TTL (time to live), in seconds |
| `token_type`               | string  | Type of token. The only possible value supported is 'Bearer'. This value should be used when specifying access token in `Authorization` header of subsequent API requests |
| `owner_id`                 | string  | Extension identifier |
	
**Sample Response**

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
