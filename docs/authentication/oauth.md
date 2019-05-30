# Authorization Flows on RingCentral Using OAuth 2.0

Your application and its users must be authorized by RingCentral in order to eliminate any possibility of abuse. The RingCentral API uses the [OAuth 2.0 protocol](http://oauth.net/2/) for authentication and authorization, which is widely supported by the majority of cloud API providers.

In general, the steps your app needs to take to use RingCentral APIs (including authorization) are as follows:

1. Create an app, and obtain the app's credentials from your [Developer Portal account](https://developer.ringcentral.com/my-account.html).

2. Obtain an access token using either the [Authorization Code Flow](../auth-code-flow) or the [Password Flow](../password-flow).

3. Use the access token when calling a RingCentral API.

4. Refresh your access token when necessary, as they can expire. 

## Supported Authorization Flows

There are several authorization flows one can use to obtain an access token to call the RingCentral API. They are:

* **[Authorization Code Flow](../auth-code-flow)** (recommended) - a 3-legged authorization flow common for apps accessed via the web, mobile and desktop applications. 

* **[Password Flow](../password-flow)** (a.k.a. Resource Owner Password Credentials Flow (ROPC) - a 2-legged authorization flow which is more suitable for server apps used by a single user account. This is by far the easiest authentication scheme to implement, but is considered insecure as it requires servers to store username and password credentials in plain text. 

* **Refresh Token Flow** — a flow used to refresh existing access token regardless of the authorization flow (Authorization Code or Password) that was used for obtaining this access token. If refresh token flow is **not** available for your app, you should be using Authorization Code or Password flows for obtaining new access tokens.

!!! warning "App Settings Impact What Auth Flows You Can Use"
    How an application is configured will determine what authorization flows can be used to obtain an access token. This restriction has been known to trip-up many a developer. Please be aware of the following restrictions:
    
       * 'Public' apps are not allowed to use the [Password Flow](../password-flow)
       * 'Private' apps with a platform type of 'Browser-Based' or 'Server/Web' are not allows to use the [Password Flow](../password-flow)
       * Apps with no user interface are not allowed to use [Auth Code Flow](../auth-code-flow)
    
    You can check which flows are available for your app on your app's Setting page.

### Learn More

RingCentral supports OAuth 2.0 authentication flows as described in:

* [RFC-6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
* [RFC-6750: The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://tools.ietf.org/html/rfc6750)
* [RFC-7009: OAuth 2.0 Token Revocation](https://tools.ietf.org/html/rfc7009)

