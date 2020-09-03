# Using Auth Tokens

!!! info "Need help authenticating your application?"
    This guide is intended to assist developers in using authentication tokens once they have been acquired by going through one of authentication methods:
          
    * [3-legged OAuth Flow](../auth-code-flow/)
    * [Password Flow](../password-flow)
    * [Implicit Grant Flow](../implicit-grant-flow/)

Tokens are used to provide a context in each request for authorization or authentication. It is important to understand distinctions between token types:

* An **Access Token** is a token issued by authorization server and used by the application to make requests to all endpoints which require authentication.

* A **Refresh Token** can be provided alongside the access token during authorization. It is a single-use token used to fetch a new access token before it expires. The refresh token itself cannot be used to access protected resources.

## Token Expiration and Invalidation

Tokens may be invalidated for any of the following reasons:

* Access and refresh tokens can expire. 
* Access and refresh tokens may be revoked by the end-user at any time.
* If a user's credentials are changed (via RingCentral's Service Web, Mobile Web or Admin Interface sites) all issued tokens are invalidated immediately, and all established sessions are terminated.

In an expired or invalidated token is used, RingCentral will respond with an HTTP error of "401 Unauthorized."

When tokens expire or are invalidated, applications must obtain a fresh access token again. 

## Authenticating Your Application to Obtain an Access Token

Each application that intends to obtain an access token must authenticate itself. Applications authenticate themselves by presenting their app's Client ID and Client Secret using the HTTP Basic authentication scheme. 

For example, when you created your app RingCentral provided you with the following credentials for your app:

* Client ID: `YourAppKey`
* Client Secret: `YourAppSecret`

These two credentials will be presented to RingCentral in an HTTP Authorization header in the following way:

1. Combine them in a single string separated with a colon: `YourAppKey:YourAppSecret`
2. Base64 encode the resulting string, which should produce: `WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0`
3. Use this encoded string in your token request as shown below:
   ```http
   POST /restapi/oauth/token HTTP/1.1  
   Host: platform.ringcentral.com
   Authorization: Basic WW91ckFwcEtleTpZb3VyQXBwU2VjcmV0 
   Content-Type: application/x-www-form-urlencoded;charset=UTF-8
   
   grant_type=password&username=18887776655&extension=102&password=Myp@ssw0rd
   ```

## Using Access Tokens to Call RingCentral APIs

Once an access token is obtained, it should be transmitted with each call to the RingCentral API using one of the following methods:

**Option 1: Bearer (recommended)**

Transmit the access token by way of the HTTP Bearer authentication scheme. For example:

```http hl_lines="2"
GET /restapi/v1.0/account/1110475004/extension/1110475004/address-book/contact/29874662828
Authorization: Bearer 2YotnFZFEjr1zCsicMWpAA 
Host: platform.ringcentral.com
Accept: application/json  
Connection: keep-alive
```

**Option 2. Access token query parameter**

Transmit the access token as a query parameter specified as a value. For example:

```http hl_lines="1"
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

