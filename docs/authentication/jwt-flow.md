# JWT authorization code flow

RingCentral supports [RFC 7523](https://datatracker.ietf.org/doc/html/rfc7523) for using JSON Web Tokens ("JWT", pronounced "JAW-t") in an OAuth authorization flow. A JWT credential can be generated within the [RingCentral Developers Console](https://developers.ringcentral.com/console/), and be used in place of a username and password when establishing an authenticated connection to RingCentral servers to call the API. Using a JWT in this way has the following benefits:

* Credentials do not expire (unless you elect otherwise)
* Credentials are persistent and cannot be changed once generated
* Credentials can be easily revoked by the owner or administrator
* Credentials can be restricted to specific applications

At a high-level, the JWT auth flow is as follows:

<img src="../oauth-password-flow.png" class="img-fluid" style="max-width: 700px">

For a deeper dive of this flow, see "Technical discussion" below. 

### When should I use a JWT for authentication?

Using a JSON Web Token for app authentication is ideal in the following circumstances:

* You have a script or application with no user interface through which to facilitate the OAuth auth token flow. 
* You need a way for users to grant access to their account using a credential that doesn't expire.
* You need a way to access an account that doesn't rely on token refreshing.

{! docs/authentication/jwt-vs-password.inc !} 

### How do I configure an app to use JWT authentication?

To configure an app for JWT authentication, follow these steps:

1. Login to the [RingCentral Developer Console](https://developers.ringcentral.com/console/). 
2. Select "Apps" from the left-hand navigation.
3. Click "Create App."
4. Select the "REST API App" app type, and click Next.
5. Under the "Auth" section of the subsequent screen, select "JWT auth flow."
6. Save and create the app.

<img src="../jwt-auth-config.png" class="img-fluid" style="max-width:500px">

### How do I generate a JWT credential used for authentication?

JWT tokens are created exclusively within the RingCentral Developer Console. For this reason, JWT credentials can only be created by users who have a valid developer account or role. To create a JWT used for app authentication, follow these steps:

1. Login to the [RingCentral Developer Console](https://developers.ringcentral.com/console). If you do not have access to the Developer Console, please reach out to your account administrator to request access. 

2. Hover your mouse over your name in the upper righthand corner, and select "Credentials."

3. Click "Create JWT."

    <img src="../jwt-auth-list.png" class="img-fluid" style="max-width:600px">

4. Configure your JWT and click "Create." 

    <img src="../jwt-auth-create.png" class="img-fluid" style="max-width:500px">

In this way, JWT credentials are associated with a specific user within an organization. The user a JWT credential is associated with determines what features and capabilities can be performed using that credential. For example, if a user Luke does not have permission to edit accounts, and Luke's credential is used to edit an account, then that API call will fail because Luke's account lacks the necessary permission. 

??? hint "Special considerations for Developer Admins"
    Developers with the role of "Developer Admin" have the ability to not only manage their own JWT credentials, but also the JWT credentials of other developers within their organization. 
	To manage another developer's credentials, click on "Organization" in the navigation. Then select the developer whose credentials you would like to manage, and finally click on "Credentials" in the navigation. 

#### How to restrict access for your JWT

For added security, especially when you intend to share your JWT with a third-party, we recommend you restrict your JWT to be used with a finite list of apps. To restrict a JWT to be used with only a specific app, you will need to ask the application developer for the client ID of their application. 

Then check "Only specific apps of my choice" under "What apps are permitted to use this credential?" and copy and paste the client ID you received into the text field. 

![JWT App Config](../jwt-auth-clientid.png)

Click "Add app." If the app was found, a table will appear showing the current list of apps authorized to use this token. 

![JWT App Config](../jwt-auth-app-access.png)

Click "Create" or "Save."

### How does JWT authentication work?

JWT authentication and password-based authentication modes are almost identical. They both are a standards-compliant OAuth flow for which developers will perform the following steps:

1. The developer presents a JSON Web Token to the platform.
2. The platform responds with an access token.
3. The developer utilizes the access token in subsequent requests to the API. 

The key to groking how RingCentral uses JWTs is in understanding that JWTs are not used directly to call the API. Instead, a JWT is used in the process of obtaining an access token which is itself then used to call the API. 

To learn more, see "Technical discussion" below.

### Do JSON Web Tokens expire or do they need to be refreshed?

While JWTs can be configured to never expire, the access tokens obtained via a JWT will always expire unless they are properly refreshed. However, unlike the traditional auth token flow in which a user must re-enter their username and password in order for the application to obtain a new access token, a JWT can easily be presented to the platform again in order to obtain a new and fresh access token. 

In other words, JWTs are a way developers can obtain more reliable access to a user's account for the purposes of calling the API on their behalf. And in the event that an access token expires, a new one can be quickly generated without the need for a human to re-enter their login credentials. 

!!! info "JWT credentials and rate limiting"
    JWT credentials are used to obtain an access token by calling the Auth API, and are therefore subject to the same rate limits as any other means of authentication/authorization. To avoid being throttled by a rate limit, developers should re-use the access token they obtain until an appropriate time to dispose of it. 


### Using JWT in sandbox and production

JWT credentials are bound to the environment specified when they were created. A JWT configured for sandbox cannot be used to authenticate in production, and vice versa. 

Furthermore, JWT credentials are owned by a specific individual. So, if a user does not have an account in their sandbox environment, they will be unable to generate a JWT in sandbox. To fix this problem, navigate to your [sandbox accounts page](https://developers.ringcentral.com/console/sandbox) and look for the section entitled, "Your login credentials." Click the create sandbox account link as instructed to create an account for yourself within the sandbox environment.

### Using an SDK to perform the JWT auth flow

The JWT auth flow is made a lot simpler when a RingCentral SDK is used. 

=== "Javascript"

    ```js
    {!> code-samples/auth/jwt.js !} 
	```

=== "PHP"

    ```php
    {!> code-samples/auth/jwt.php !} 
    ```

## Technical discussion

JSON web tokens, or JWTs are a form of user credential that can be presented in RingCentral's OAuth flow to obtain an access token. There is only one call to make in JWT authentication: the call to request an access token. This call is described below.

**HTTP Headers**

| Header           | Value                                                      |
| ---------------- | ---------------------------------------------------------- |
| `Content-type`   | `application/x-www-form-urlencoded`                        |
| `Authorization`  | `Basic ` + base64_encoded( Client ID + ":" + Client Secret ) |

**POST Parameters**

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
