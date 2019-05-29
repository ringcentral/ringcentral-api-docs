# Authorization Flows on RingCentral Using OAuth 2.0

The RingCentral API supports OAuth 2.0 authentication flows as described in [RFC-6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749), [RFC-6750: The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://tools.ietf.org/html/rfc6750) and [RFC-7009: OAuth 2.0 Token Revocation](https://tools.ietf.org/html/rfc7009).

Your application and its users must be authorized by RingCentral in order to eliminate any possibility of abuse. The RingCentral API uses *OAuth 2.0* protocol for authentication and authorization, which is widely supported by the majority of cloud API providers. For more details see [OAuth 2.0 protocol specification](http://oauth.net/2/).

In general, the steps your app needs to take to use RingCentral APIs (including authorization) are as follows:

1. Get your app credentials from your [Developer Portal account](https://developer.ringcentral.com/my-account.html)

2. Get an access token using either [Authorization Code Flow](#authorization-code-flow) or [Password Flow](#password-flow)

3. Use access token to call RingCentral APIs

4. [Refresh](#refresh-token-flow) your access token when necessary

## Authorization Flows

There are several **authorization flows** you can use to get an authorized access to RingCentral API.

Apps with 'Public' application type are not allowed to use [Password Flow](#password-flow) for security reasons, as well as 'Private' apps of 'Browser-Based' or 'Server/Web' platform type. Apps with no user interface are not allowed to use [Authorization Code Flow](#authorization-code-flow).

You can check which flows are available for your app on your app's Setting page.

* **Authorization Code Flow** — a 3-legged authorization flow and is a preferred flow for your app if it is a web, mobile or desktop application and is intended to work with multiple RingCentral user accounts.

* **Resource Owner Password Credentials Flow (ROPC)**, further named **Password Flow** — a 2-legged authorization flow which is more suitable for server apps used by a single user account.

* **Refresh Token Flow** — a flow used to refresh existing access token regardless of the authorization flow (Authorization Code or Password) that was used for obtaining this access token. If refresh token flow is **not** available for your app, you should be using Authorization Code or Password flows for obtaining new access tokens.

All flows end up with your app obtaining an access token which you will need to call RingCentral APIs.

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

