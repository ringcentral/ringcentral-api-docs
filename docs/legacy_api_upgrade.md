RingCentral has introduced a new RingOut and Fax REST API and has deprecated and will remove support for the ASP Legacy APIs. The REST API is much more comprehensive than the Legacy APIs and includes updating Caller ID settings, retrieving call logs and call recordings, managing forwarding rules, SMS/MMS, user provisioning and much more.

The Legacy APIs mentioned here are the ones at the following endpoints:

* https://service.ringcentral.com/ringout.asp
* https://service.ringcentral.com/faxapi.asp

Information on the RingCentral REST API is available here:

* Developer Portal: https://developer.ringcentral.com/
* Developer Guide: http://ringcentral-api-docs.readthedocs.io/
* API Reference: https://developer.ringcentral.com/api-docs/
* API Explorer: https://developer.ringcentral.com/api-explorer/

This guide provides information on how to migrate from the Legacy APIs to the REST APIs.

## Upgrade Approaches

There are two primary approaches to upgrade your application to use the new REST APIs depending on the capabilities of your APIs. The first is to use the REST APIs directly and the second is to deploy an API Proxy as an intermediary that uses the REST APIs but mimics the Legacy API.

### Direct REST API calls

To use the REST API directly, see [Legacy API Upgrade Details](legacy_api_upgrade_details.md) which has information per-API upgrade information.

### Creating an API Proxy

The REST API is a more advanced API with more capabilities and security, and has some differences with the legacy API. Specifically:

* OAuth 2.0 is required to retrieve an access token which minimally requires one API call to retrieve the access token and another to use the access token, e.g. RingOut.
* Ability to set HTTP request headers in the OAuth 2.0 protocol.
* Ability to set JSON HTTP request body for RingOut. For fax, both the Legacy and REST API support `multipart/form-data` requests.

If your application cannot perform the above and needs to use a single URL GET request, you can create an API proxy to handle this for you while providing an interface like the existing Legacy API for integration purposes.

To create such an API proxy, you will need to set up a server or serverless function, e.g. AWS Lambda, that will have a similar interface to the API you wish to call and then translate that into a RingCentral REST API request.

#### Example API Proxy

Example code for such a proxy service is available here:

https://github.com/grokify/go-ringcentral/tree/master/legacy/examples/legacy2rest

If you are creating a proxy, you can improve this by doing the following:

* Keep your RingCentral credentials within the server app. There's no reason to pass it over the internet to your proxy.
* Limit access to your proxy by IP address or other property
* Manage your access tokens. For a private proxy you can use the OAuth 2.0 password flow (aka Resource Owner Password Credentials). The best approach is to store the access and refresh tokens for later use. You can use the access token for up to an hour and receive a new access/refresh token pair every hour using the refresh token (which expires in a week). If you cannot perform the refresh token step you can disable refresh tokens (by not selecting the grant type, or setting the refresh ttl to `-1`)