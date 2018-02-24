RingCentral has introduced a new RingOut and Fax REST API and will be deprecating and removing support for the Legacy APIs. The Legacy APIs mentioned here are the ones at the following endpoints:

* https://service.ringcentral.com/ringout.asp
* https://service.ringcentral.com/faxapi.asp

This guide provides information on how to migrate from the Legacy APIs to the REST APIs.

## Upgrade Approaches

There are two upgrade approaches that can be considered:

### Direct REST API calls

The benefit of this approach is that you can use the new REST APIs directly as they were designed.

Some differences with the current legacy APIs are:

* OAuth 2.0 is required to retrieve an access token which minimally requires one API call to retrieve the access token and another to use the access token, e.g. RingOut.
* Ability to set HTTP request headers in the OAuth 2.0 protocol.
* Ability to set JSON HTTP request body for RingOut

To use the REST API directly, see the [Legacy API Upgrade Details](legacy_api_upgrade_details.md) page on which REST endpoints correspond to Legacy API calls.

If your application cannot perform the above, you can create an API proxy to handle this for you while providing an interface like the existing Legacy API for integration purposes.

### Creating an API Proxy

An API proxy can be an ideal way to initiate a RingOut or FaxOut API call using the REST API if your system cannot accommodate the requirements of the REST API, e.g. OAuth 2.0, HTTP request headers, HTTP request body.

To create such an API proxy, you will need to set up a server or serverless function, e.g. AWS Lambda, that will have a similar interface to the API you wish to call and then translate that into a RingCentral REST API request.

#### Improvements

If you are creating a proxy, you can improve this by doing the following:

* Keep your RingCentral credentials within the server app. There's no reason to pass it over the internet to your proxy.
* Limit access to your proxy by IP address or other property
* Manage your access tokens. For a private proxy you can use the OAuth 2.0 password flow (aka Resource Owner Password Credentials). The best approach is to store the access and refresh tokens for later use. You can use the access token for up to an hour and receive a new access/refresh token pair every hour using the refresh token (which expires in a week). If you cannot perform the refresh token step you can disable refresh tokens (by not selecting the grant type, or setting the refresh ttl to `-1`)