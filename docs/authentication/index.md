# Choosing the best auth method for your app

Every app needs to first authenticate itself and the user it will be acting on behalf of before calling the API. This process ensures that the application and the user have been authorized to perform the given action via the API. RingCentral supports multiple authentication/authorization methods to support a number of different scenarios and use cases. 

## What auth flow is right for my app?

There are two primary authorization flows a developer can use to obtain an access token to call the RingCentral API. Choosing the right one will help ensure the security of your customer's data and credentials. These two methods are:

1. **Authorization Code**. Best for authorizing frontend apps acting on behalf of individual users where users are prompted for credentials interactively
2. **JWT**. Best for authenticating server apps connecting to the API on behalf of the pre-determined user

Still unsure which method is right for your app? Here are some questions you can ask yourself.

### Does your app have a user interface, and are there multiple users who need to connect to RingCentral?

If your app's users need to independently log into RingCentral, the best authorization method is the [Auth Code with PKCE Flow](auth-code-pkce-flow.md). However, some apps may elect to use the simpler, older, and less secure [Auth Code Flow](auth-code-flow.md).

These flows are ideal for apps that:

* Have a front-end user interface.
* Need to validate that the current user has a valid RingCentral account.
* Need to call the API on behalf of a multitude of different users. 

The following are examples of the kinds of apps these auth flows are ideal for:

* A CRM app that initiates a phone call for one or more different users.
* A scheduling assistant app that schedules meetings for one or more different users. 

??? hint "JWT flow is NOT recommended for individual user authentication"
    Many developers are attracted to using JWT for authentication because it is much simpler to implement, especially when learning the platform for the first time. However, JWT is not designed to scale to support the need to authenticate a large number of users. JWT is ideally suited to authenticate a single "service user" (typically an admin) who will be acting on behalf of all users within an account. 

??? hint "Use refresh tokens to keep sessions alive"
    When the authorization code flow is used to obtain an access token for a specific user, it is highly recommended that you also implement the [refresh flow](refresh-tokens.md) in order to keep access tokens fresh and valid. If you do not, they will eventually expire, and your users will be required to re-authenticate via a user interface. 

### Does your app lack a user interface, and/or does it act on behalf of all users within an organization?

Apps that lack a user interface, or are run from the command line are typically utility apps that act on behalf of all users within an organization simultaneously. These apps often utilize a "service user" account that possesses administrative privileges that allow it to act on behalf of all or any user in the organization. For these types of apps, we recommend the [JWT auth flow](jwt-flow.md).

The following are examples of the kinds of apps these auth flows are ideal for:

* A script that runs every night at midnight to download and archive all phone calls in an organization.
* A service that periodically gathers call analytics to assess performance across an organization. 

### Further reading and relevant specifications

RingCentral supports OAuth 2.0 authentication flows as described in:

* [RFC-6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
* [RFC-6750: The OAuth 2.0 Authorization Framework: Bearer Token Usage](https://tools.ietf.org/html/rfc6750)
* [RFC-7009: OAuth 2.0 Token Revocation](https://tools.ietf.org/html/rfc7009)
* [RFC-7636: Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636)
* [RFC 7523: JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants](https://datatracker.ietf.org/doc/html/rfc7523)
