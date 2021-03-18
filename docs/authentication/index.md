# Authorization Flows on RingCentral

<div class="jumbotron pt-1">
  <h3 class="display-5">Getting Started with OAuth</h3>
  <p class="lead">RingCentral supports a number of different authentication modes to satisfy the needs of the many different types of applications built on top of our platform, from mobile to desktop, from public to private, from bots to webapps.</p>
  <p>The authentication mode we recommend developers implement is OAuth, a 3-legged auth flow that grants applications access to a user's account without exchanging a username/password with a 3rd party. The guides below will walk you through the creation of a simple OAuth flow.</p>
  <a href="quick-start/authorization-flow/node/" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="quick-start/authorization-flow/php/" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="quick-start/authorization-flow/python/" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="quick-start/authorization-flow/ruby/" class="btn btn-light qs-link">Ruby &raquo;</a>
  <a href="quick-start/authorization-flow/java/" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="quick-start/authorization-flow/c-sharp/" class="btn btn-light qs-link">C# &raquo;</a>
</div>

!!! info "First time building an app?"
    Before you begin implementing a full 3-legged auth flow, we recommend you complete any one of our Quick Start guides which utilize our [Password Flow](./password-flow/). While password based auth is not recommended for most applications, we recognize that it is in many respects the easiest to implement. Start there, and when you have successfully made your first API call, come back to improve the security of your application by implementing our [Authorization Code Flow](./auth-code-flow/). 

## Overview

Your application and its users must be authorized by RingCentral in order to eliminate any possibility of abuse. The RingCentral API uses the [OAuth 2.0 protocol](http://oauth.net/2/) for authentication and authorization, which is widely supported by the majority of cloud API providers.

In general, the steps your app needs to take to use RingCentral APIs (including authorization) are as follows:

1. Create an app, and obtain the app's credentials from your [Developer Portal account](https://developer.ringcentral.com/my-account.html).

2. Obtain an access token using either the [Authorization Code Flow](./auth-code-flow) or the [Password Flow](./password-flow).

3. Use the access token when calling a RingCentral API.

4. Refresh your access token when necessary, as they can expire. 

## What auth flow is right for my app?

??? warning "App Settings Impact What Auth Flows You Can Use"
    How an application is configured will determine what authorization flows can be used to obtain an access token. This restriction has been known to trip-up many a developer. Please be aware of the following restrictions:
    
       * 'Public' apps are not allowed to use the [Password Flow](./password-flow)
       * 'Private' apps with a platform type of 'Browser-Based' or 'Server/Web' are not allows to use the [Password Flow](./password-flow)
       * Apps with no user interface are not allowed to use [Auth Code Flow](./auth-code-flow)
    
    You can check which flows are available for your app on your app's Setting page.

There are several authorization flows one can use to obtain an access token to call the RingCentral API. Choosing the right one will help ensure the security of your customer's data and credentials. 

* **[Auth Code Flow](./auth-code-flow)** (recommended) - a 3-legged authorization flow common for apps accessed via the web, mobile and desktop applications. 

* **[Auth Code with PKCE Flow](./auth-code-pkce-flow)** (recommended) - enhancement for Auth Code Flow with Proof Key for Code Exchange, no client secret required, recommended for apps accessed via web single-page, mobile and desktop applications.

* **[Implicit Flow](./implicit-grant-flow)** - a 2-legged authorization flow common for mobile and desktop apps.

* **[Password Flow](./password-flow)** - a 2-legged authorization flow suitable for server apps used by a single user account. This is by far the easiest authentication scheme to implement, but is considered insecure as it requires servers to store username and password credentials in plain text. 

* **Refresh Token Flow** — a flow used to refresh existing access token regardless of the authorization flow (Authorization Code or Password) that was used for obtaining this access token. If refresh token flow is **not** available for your app, you should be using Auth Code or Password flows for obtaining new access tokens.

### Learn More

RingCentral supports OAuth 2.0 authentication flows as described in:

* [RFC-6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
* [RFC-6750: The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://tools.ietf.org/html/rfc6750)
* [RFC-7009: OAuth 2.0 Token Revocation](https://tools.ietf.org/html/rfc7009)
* [RFC-7636: Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636)
