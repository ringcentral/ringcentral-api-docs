# RingCentral API Error Codes

The API uses specific error codes to make error processing for client applications more simple and effective. The body of the HTTP response should be always logged and analyzed. Sometimes it is impossible to understand the cause of the issue by only HTTP status code. The error code from the response body should be also taken into consideration.

Client apps should rely on the `errorCode` and, in some cases, on additional fields like `parameterName,` not on the error message (because it may change in the next versions of the API or be localized). Response body with error message can contain several error messages and has the following structure:

```javascript
{! code-samples/basics/sample-error.json !} 
```
																			  
The API reference lists some of the error codes that may be returned for a particular API operation.

## Connectivity errors

There is always a possibility that a client application is not able to connect with RingCentral service due to the following reasons:

* HTTP connection timeout 
* HTTP request timeout
* TLS handshake error

These situations are usually temporary. The application should use [Exponential Backoff](#exponential-backoff) approach to retry.

## General 5xx server errors

Clients may receive HTTP 5xx errors (typically, 500/502/503/504) when a server cannot handle a request due to some server-side issue.
Such situations are usually temporary and applications may retry as suggested in [Exponential Backoff](#exponential-backoff).
If retries don't help in your case please contact RingCentral developers support.

## Authentication related errors

Since the RingCentral API uses OAuth 2.0 for authorization, the server behavior is mostly governed by the OAuth specification ([RFC 6749](http://tools.ietf.org/html/rfc6749) and [RFC 6750](http://tools.ietf.org/html/rfc6750)).

* Regardless of the number of threads that send API requests to the server, the application should perform OAuth authentication in a single thread, then store and share tokens to be used in all regular API requests. Backend servers enforce some quotas for the number of authorization requests and number of active application sessions. If the quota is exceeded at any given time, the server starts to return `HTTP 429` on authorization requests.
* Applications must avoid frequent authentication attempts under the same user credentials. In order to extend the session after access token expiration, the token refreshment flow should be used if allowed
* Applications should store `expires_in` and `refresh_token_expires_in` values along with access/refresh tokens and their issue time. This value is to be used to pre-check if the token is expired or about to expire before sending regular API requests in order to refresh tokens proactively. It is strongly recommended to avoid refreshing tokens based on `HTTP 401` errors returned by the server: this just doubles the number of requests required to get a new access token.
* According to the OAuth 2.0 standard, some standard OAuth error codes are returned in the response complemented with RingCentral-specific error codes.

### OAuth authorization errors

For 3-legged OAuth flows, in some cases, `HTTP 400` may be returned on the `/restapi/oauth/authorize` call. This can happen when the client provides an invalid redirect URI in the request. See [RFC 6749](http://tools.ietf.org/html/rfc6749) for details.

### OAuth token errors

As a general rule, if a request to the `/restapi/oauth/token` API for access token fails client must NOT send other API requests until resolved. It has to be properly orchestrated if a client uses multiple threads that share the same tokens to send regular API requests.

* `HTTP 400` – do not repeat request; if possible inform the user about the failure and prompt for new credentials
* `HTTP 429`, `HTTP 503` – retry in an indicated interval returned in the `Retry-After` header.
* `HTTP 4xx`, `HTTP 5xx` – do not repeat request, error in client or server code
* `HTTP 400` – use cached credentials (if possible) to re-authenticate or prompt the user for new credentials.
* `HTTP 408`, `HTTP 500`, client timeout – repeat 3 times with 10 seconds intervals, then try re-request tokens using cached credentials (if possible), or prompt the user for new credentials (all dependent regular requests should be queued and wait for resolution)

### OAuth revokation errors

If the request to the `/restapi/OAuth/revoke` API ends with an error, the client should ignore it and not retry.

### Authentication/authorization error codes

| HTTP Status Code(s) | Error Code | Message                                                                                                                     |
|---------------------|------------|-----------------------------------------------------------------------------------------------------------------------------|
| 403                 | OAU-101    | Parameter [brandId] is invalid                                                                                              |
| 403                 | OAU-102    | Unable to issue authorization code                                                                                          |
| 403                 | OAU-105    | Login for ${extensionType} extension is not allowed.                                                                        |
| 403                 | OAU-106    | Invalid authorization code                                                                                                  |
| 403                 | OAU-108    | Authorization code is expired                                                                                               |
| 403                 | OAU-109    | Redirect URIs do not match                                                                                                  |
| 403                 | OAU-110    | Authorization code was not issued for this application                                                                      |
| 400                 | OAU-111    | Request parameter duplication detected                                                                                      |
| 403                 | OAU-112    | The client is unauthorized for the required grant type: [${grant_type}]                                                     |
| 403                 | OAU-113    | No redirect uri is registered for the client                                                                                |
| 403                 | OAU-116    | Invalid authorization method                                                                                                |
| 403                 | OAU-117    | The scope of requesting application cannot be narrower than the target application                                          |
| 403                 | OAU-119    | International Virtual number cannot be used to login                                                                        |
| 401                 | OAU-120    | Wrong Application ID                                                                                                        |
| 401                 | OAU-121    | Wrong Application                                                                                                           |
| 401                 | OAU-123    | Invalid Authorization header value: ${parameter}                                                                            |
| 401                 | OAU-125    | Grant type is not allowed for application.                                                                                  |
| 401                 | OAU-127    | Invalid application release.                                                                                                |
| 401                 | OAU-128    | Access token expired.                                                                                                       |
| 401                 | OAU-129    | Access token corrupted.                                                                                                     |
| 401                 | OAU-134    | Invalid Authorization header.                                                                                               |
| 401                 | OAU-136    | Extension not found.                                                                                                        |
| 401                 | OAU-140    | Invalid resource owner credentials.                                                                                         |
| 401                 | OAU-141    | Login for extension in current state is not allowed.                                                                        |
| 401                 | OAU-142    | Login to account in current state is not allowed.                                                                           |
| 401                 | OAU-146    | Invalid client credentials                                                                                                  |
| 400                 | OAU-147    | The account is locked out due to multiple unsuccessful logon attempts.                                                      |
| 400                 | OAU-148    | The account is locked out due to multiple unsuccessful logon attempts. Please use Single Sign-on way to authenticate.       |
| 401                 | OAU-149    | Unparsable access token                                                                                                     |
| 400                 | OAU-150    | The value of query parameter [${queryParameterName}] should be equal to parameter [${requestParameterName}] in request body |
| 401                 | OAU-151    | Authorization method not supported                                                                                          |
| 401                 | OAU-168    | Password grant is not allowed because MFA is required.                                                                      |

## Rate-limit related error codes

| HTTP Status Code(s) | Error Code | Message                                                                                                                     |
|---------------------|------------|-----------------------------------------------------------------------------------------------------------------------------|
| 429                 | CMN-301    | Request rate exceeded                                                                                                       |
| 429                 | CMN-302    | Request rate exceeded                                                                                                       |
| 429                 | CMN-303    | Can not resolve API plan. Rate limits undefined                                                                             |
| 429                 | CMN-304    | Duplicate concurrent request. Try again later                                                                               |
| 429                 | CMN-310    | Global request rate exceeded                                                                               |

## Notification subscription related error codes

| HTTP Status Code(s) | Error Code | Message                                                                                                                     |
|---------------------|------------|-----------------------------------------------------------------------------------------------------------------------------|
| 403                 | SUB-402    | Presence feature is disabled for this extension type (${param} / ${url})                                                    |
| 403                 | SUB-403    | User disallowed to monitor his presence                                                                                     |
| 403                 | SUB-404    | User disallowed this subscriber to pick up calls                                                                            |
| 403                 | SUB-405    | Not allowed subscribe for messages to other extensions                                                                      |
| 403                 | SUB-406    | Not allowed subscribe for events to extensions of other account                                                             |
| 403                 | SUB-407    | Not allowed subscribe for APNS if endpoint_id not defined                                                                   |
| 403                 | SUB-408    | Not allowed subscribe for unknown user                                                                                      |
| 403                 | SUB-505    | Subscriptions limit exceeded                                                                                                |
| 404                 | SUB-507    | Subscription with key [${subscriptionKey}] and assigned session [${session}] was expired                                    |
| 400                 | SUB-508    | Invalid event filters: [${filters}]                                                                                         |
| 405                 | SUB-511    | Action not allowed for APNS subscription                                                                                    |

## General API error codes

| HTTP Status Code(s) | Error Code | Message                                                                                                                     |
|---------------------|------------|-----------------------------------------------------------------------------------------------------------------------------|
| 400, 403            | CMN-101    | Parameter [${parameterName}] value is invalid.                                                                              |
| 400, 404            | CMN-102    | Resource for parameter [${parameterName}] is not found                                                                      |
| 400                 | CMN-103    | JSON can't be parsed.                                                                                                       |
| 400                 | CMN-104    | Cannot parse request                                                                                                        |
| 400                 | CMN-105    | URL should not contain query string when method is [${method}] and content type is [${contentType}]                         |
| 400                 | CMN-106    | Batch request is limited to ${limit} entries                                                                                |
| 416                 | CMN-107    | Requested Range Not Satisfiable                                                                                             |
| 400                 | CMN-108    | Parameter ${parameterName} value in request body doesn't match specified in path.                                           |
| 403                 | CMN-109    | Feature not available.                                                                                                      |
| 400                 | CMN-110    | Header ${header} should be specified.                                                                                       |
| 404                 | CMN-120    | Invalid URI                                                                                                                 |
| 500                 | CMN-201    | Service Temporary Unavailable                                                                                               |
| 501                 | CMN-202    | Operation is not supported                                                                                                  |
| 500                 | CMN-203    | Internal Server Error                                                                                                       |
| 403                 | CMN-401    | Specific application permission required                                                                                    |
| 403                 | CMN-402    | Administrator permission required                                                                                           |
| 403                 | CMN-403    | The feature is not available for this extension type                                                                        |
| 403                 | CMN-404    | Attempt to access another extension                                                                                         |
| 401                 | CMN-405    | Login to extension required.                                                                                                |
| 400.403             | CMN-406    | Duplicate value for parameter ${parameterName}: ${parameterValue} found in request                                          |
| 400                 | CMN-407    | Parameter in header is invalid                                                                                              |
| 4003                | CMN-408    | [{permissionName}] permission required                                                                                      |
| 400                 | CLG-101    | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                   |
| 400                 | CLG-102    | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                   |
| 400                 | CLG-103    | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                   |
| 400                 | CLG-104    | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                   |
| 400                 | CLG-105    | Parameter [syncToken] is invalid [Sync token expired, call log was reset]                                                   |
| 400                 | CLG-110    | Parameter [sessionId] is not allowed for usage along with parameter [${parameterName}]                                      |


## Messaging API error codes

| HTTP Status Code(s) | Error Code | Message                                                                                                                     |
|---------------------|------------|-----------------------------------------------------------------------------------------------------------------------------|
| 403                 | MSG-240    | Specified recipient [${toPhoneNumber}] isn't an US phone number                                                             |
| 403                 | MSG-241    | Cannot send SMS from Fax number                                                                                             |
| 403                 | MSG-242    | Sending SMS is not available from the number specified.                                                                     |
| 400                 | MSG-243    | Phone number is blocked                                                                                                     |
| 400                 | MSG-245    | Cannot find the phone number which belongs to user                                                                          |
| 503                 | MSG-290    | Sending SMS to ${toPhoneNumber} failed. Please try later.                                                                   |
| 403                 | MSG-304    | Phone number doesn't belong to extension                                                                                    |
| 429                 | MSG-305    | Request rate exceeded                                                                                                       |
| 403                 | MSG-309    | Cannot receive SMS on Fax number                                                                                            |
| 400                 | MSG-310    | Phone number is not assigned                                                                                                |
| 403                 | MSG-314    | Extension is of inappropriate type                                                                                          |
| 400                 | MSG-316    | No department members found.                                                                                                |
| 400                 | MSG-324    | Recipient extension is in inappropriate state                                                                               |
| 403                 | MSG-325    | Reply is forbidden for old message threads                                                                                  |
| 403                 | MSG-326    | Reply is denied for user, who is no longer a thread participant                                                             |
| 403                 | MSG-330    | Sending from department message is not supported.                                                                           |
| 400                 | MSG-331    | Sender extension number does not correspond to logged in extension                                                          |
| 400                 | MSG-333    | Invalid message synchronisation request: full synchronization is required                                                   |
| 400                 | MSG-337    | Attachment size limit exceeded                                                                                              |
| 400                 | MSG-338    | Message size limit exceeded                                                                                                 |
| 403                 | MSG-340    | Outbound fax is not available for extension type [${type}]                                                                  |
| 403                 | MSG-341    | Outbound fax is not allowed for extension [${extensionId}]                                                                  |
| 406                 | MSG-343    | Fax resend is not allowed for message in current state                                                                      |
| 400                 | MSG-347    | Attachment body is empty                                                                                                    |
| 415                 | MSG-348    | Unsupported attachment media type                                                                                           |
| 400                 | MSG-349    | Unable to parse fax envelope                                                                                                |
| 400                 | MSG-350    | No content disposition                                                                                                      |
| 400                 | MSG-351    | No file name in content disposition                                                                                         |
| 500                 | MSG-352    | Message content is null                                                                                                     |

## Exponential Backoff

The Exponential Backoff approach helps to avoid overwhelming backend servers with excessive request retries, making ongoing incidents more severe, and preventing clients from being penalized for making an excessive number of requests.
The basic idea is that the client retries with exponentially increased intervals up to a certain threshold: if the server is down temporarily, it will not be overwhelmed with all the requests hitting it at the same time when it comes back up.

When the app experiences an error that is caused by a server issue and retries are allowed, the following strategy is recommended.

- Your app should have the following configuration options:
  - Initial retry interval (e.g. 2 seconds)
  - Maximum number of retries (e.g. 5)
  - Optional maximum retry interval (e.g. 60 seconds)

- In case of an error that may be handled by retries:
  - If a `Retry-After` header was provided in response, retry after the provided interval.
  - Otherwise
    - The first retry should occur after the configured initial retry interval
    - The wait interval for each next retry should be calculated as 2 * previous-retry-interval
    - Repeat until the maximum number of retries is reached, OR
    - Once the maximum retry interval is reached, repeat with the last interval until the maximum number of retries 

The example of exponential backoff retry intervals with 2 seconds / 8 retries configuration:

* 2 seconds
* 4 seconds
* 8 seconds
* 16 seconds
* 32 seconds
* 64 seconds
* 128 seconds
* 256 seconds

The example of exponential backoff retry intervals with 2 seconds / 50 retries / 60 seconds max configuration:

* 2 seconds
* 4 seconds
* 8 seconds
* 16 seconds
* 32 seconds
* 64 seconds
* 64 seconds
* 64 seconds
* ... (until 50 attempts reached)

