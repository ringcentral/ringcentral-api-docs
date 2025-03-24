# JWT authentication flow

!!! hint "New to JWT authentication? Check out our [getting started guide](jwt/quick-start.md)."

RingCentral supports [RFC 7523](https://datatracker.ietf.org/doc/html/rfc7523) for using JSON Web Tokens ("JWT", pronounced "JAW-t") in an OAuth authorization flow. A JWT credential can be generated within the [RingCentral Developer Console](https://developers.ringcentral.com/my-account.html), and be used in place of a username and password when establishing an authenticated connection to RingCentral servers to call the API. Using a JWT in this way has the following benefits:

* Credentials do not expire (unless you elect otherwise)
* Credentials are persistent and cannot be changed once generated
* Credentials can be easily revoked by the owner or administrator
* Credentials can be restricted to specific applications

At a high level, the JWT auth flow is as follows:

![JWT code Flow](oauth-password-flow.png){class=".img-fluid" style="max-width: 600px"}}

For a deeper dive into this flow, see "Technical discussion" below.

### When should I use a JWT for authentication?

Using a JSON Web Token for app authentication is ideal in the following circumstances:

* You have a script or application with no user interface through which to facilitate the OAuth auth token flow.
* You need a way for users to grant access to their account using a credential that doesn't expire.
* You need a way to access an account that doesn't rely on token refreshing.

{! docs/authentication/jwt-vs-password.inc !}

### How do I configure an app to use JWT authentication?

To use a JWT, the app you wish to present your JWT credentials to must first be configured to accept JWT tokens as a means of authentication.

* [How to configure an app for JWT &raquo;](jwt/config-app.md)

### How do I generate a JWT credential used for authentication?

JWT tokens are created exclusively within the RingCentral Developer Console. For this reason, JWT credentials can only be created by users who have a valid developer account or role. To create a JWT used for app authentication, follow the instructions below:

* [How to create a JWT credential &raquo;](../getting-started/create-credential.md)

### How does JWT authentication work?

JWT authentication and password-based authentication modes are almost identical. They both are a standards-compliant OAuth flow for which developers will perform the following steps:

1. The developer presents a JSON Web Token to the platform.
2. The platform responds with an access token.
3. The developer utilizes the access token in subsequent requests to the API.

The key to grokking how RingCentral uses JWTs is in understanding that JWTs are not used directly to call the API. Instead, a JWT is a credential that is used to obtain an OAuth access token which is then used to call the API.

To learn more, see "Technical discussion" below.

### Do JWTs expire or do they need to be refreshed?

While JWTs can be configured to never expire, the access tokens obtained via a JWT will always expire unless they are properly refreshed. However, unlike the traditional auth token flow in which a user must re-enter their username and password in order for the application to obtain a new access token, a JWT can easily be presented to the platform again in order to obtain a new and fresh access token.

In other words, JWTs are a way developers can obtain more reliable access to a user's account for the purposes of calling the API on their behalf. And in the event that an access token expires, a new one can be quickly generated without the need for a human to re-enter their login credentials.

!!! info "JWT credentials and rate limiting"
    JWT credentials are used to obtain an access token by calling the Auth API, and are therefore subject to the same rate limits as any other means of authentication/authorization. To avoid being throttled by a rate limit, developers should re-use the access token they obtain until an appropriate time to dispose of it.

## Technical discussion

JSON web tokens, or JWTs, are a form of user credential that can be presented in RingCentral's OAuth flow to obtain an access token. In JWT authentication, there is only one call to make: the call to request an access token. This call is described below.

**Auth URLs**

| Environment      | Value                                                          |
| ---------------- | ----------------------------------------------------------     |
| Production       | `https://platform.ringcentral.com/restapi/oauth/token`         |

**HTTP Headers**

| Header           | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| `Content-type`   | `application/x-www-form-urlencoded`                        |
| `Authorization`  | `Basic ` + base64_encoded( Client ID + ":" + Client Secret ) |

**POST Body**

| Parameter           | Type     | Description                                                             |
| ------------------- | -------- | -----------                                                             |
| `grant_type`        | string   | Required. Must be set to `urn:ietf:params:oauth:grant-type:jwt-bearer`. |
| `assertion`         | string   | Required. Provide your JWT token.                                       |

**Sample Request**

```http
POST /restapi/oauth/token HTTP/1.1
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic cmVsLWFsbC1wZXJtaXNzaWXFjMmpRZmlQcnlkSUkweE92QQ==

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer
   &assertion=eyJhbGciOiJFUzI1NiIsIm.eyJpc3Mi[...omitted for brevity...]
```

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
   "scope" : "AccountInfo CallLog ExtensionInfo Messages SMS",
   "owner_id" : "256440016"
}
```
