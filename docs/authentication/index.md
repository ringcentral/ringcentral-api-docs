# Chosing the auth method that is best for my app

<div class="jumbotron pt-1">
  <h3 class="display-5">Chomping at the bit and just want to get started?</h3>
  <p class="lead">RingCentral supports a number of different authentication modes to satisfy the needs of the many different types of applications built on top of our platform, from mobile to desktop, from public to private, from bots to webapps.</p>
  <p>The authentication mode we recommend developers use in production is a <a href="../quick-start/">3-legged auth flow</a> that grants applications access to a user's account without exchanging a username/password with a 3rd party. But the easiest and fastest way to get started is to use JWT:</p>
  <a href="jwt/quick-start/#Javascript" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="jwt/quick-start/#PHP" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="jwt/quick-start/#Python" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="jwt/quick-start/#Ruby" class="btn btn-light qs-link">Ruby &raquo;</a>
</div>

Your application and its users must be authorized by RingCentral in order to eliminate any possibility of abuse. The RingCentral API uses the [OAuth 2.0 protocol](http://oauth.net/2/) for authentication and authorization, which is widely supported by the majority of cloud API providers.

In general, the steps your app needs to take to use RingCentral APIs (including authorization) are as follows:

1. Create an app, and obtain the app's credentials from your [Developer Console account](https://developer.ringcentral.com/my-account.html).

2. Obtain an access token using either the [authorization code flow](./auth-code-flow) or the [JWT Flow](./jwt-flow).

3. Use the access token in your HTTP Authorization header when calling a RingCentral API.

4. Refresh your access token when necessary, as they can expire. 

## What auth flow is right for my app?

There are several authorization flows one can use to obtain an access token to call the RingCentral API. Choosing the right one will help ensure the security of your customer's data and credentials. Here are some questions you need to ask yourself:

### Does your app have a user interface, and will each of your users need to connect to RingCentral?

If the users of your app will need to independently log into RingCentral, then the best auth method for you is the [Auth Code with PKCE Flow](./auth-code-pkce-flow). However, some apps may elect to use the simpler, older and less secure [Auth Code Flow](./auth-code-flow).

These flows are ideal for apps that:
* Have a frontend user interface.
* Need to validate that the current user has a valid RingCentral account.
* Need to call the API on behalf of a multitude of different users. 

The following are examples of the kinds of apps these auth flows are ideal for:

* An CRM app that initiates a phone call for one or more different users.
* A scheduling assistant app that schedules meetings for one or more different users. 

!!! hint "Use refresh tokens"
    When the auth code flow is used to obtain an access token for a specific user, it is highly recommended that you also implement the [refresh flow](./refresh-tokens/) in order to keep access tokens fresh and valid. If you do not, they will eventually expire, and your users will be required to re-authenticate via a user interface. 

### Does your app lack a user interface, and/or does it act on behalf of all users within an organization?

Apps that lack a user interface, or are run from the command line are typically utility apps that act on behalf of all users within an organization simultaneously. These apps often utilize a "service user" account that possesses administrative priveleges that allow it to act on behalf of all or any user in the organization. For these types of apps, we recommend the [JWT auth flow](./jwt-flow/).

The following are examples of the kinds of apps these auth flows are ideal for:

* A script that runs every night at midnight to download and archive all phone calls in an organization.
* A service that periodically gather call analytics to assess performance across am organization. 

### Further reading and relevant specifications

RingCentral supports OAuth 2.0 authentication flows as described in:

* [RFC-6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
* [RFC-6750: The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://tools.ietf.org/html/rfc6750)
* [RFC-7009: OAuth 2.0 Token Revocation](https://tools.ietf.org/html/rfc7009)
* [RFC-7636: Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636)
* [RFC 7523: JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants](https://datatracker.ietf.org/doc/html/rfc7523)
