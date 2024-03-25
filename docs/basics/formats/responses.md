# Responses and response formats

Since REST APIs are built on top of HTTP protocol, they [reuse some concepts and common HTTP status codes](http://www.restapitutorial.com/httpstatuscodes.html) to inform a client about a result of API method execution. These responses fall into three main categories:

* **Success**. The client gets HTTP response with 2XX or 3XX status code and optionally some payload in the body depending on the request.
* **Client error**. The server returns HTTP response with one of the 4xx status code. In most cases, the response body contains more detailed information about the reason for the issue. Such error usually means that the client does something wrong, unexpected or disallowed.
* **Server error**. The server returns HTTP response with one of the 5xx status code. In most cases, the response body contains more detailed information about the reason for the issue.  This kind of errors is returned in case of unexpected issues on the server side.

## HTTP 2xx – Success

Most of the HTTP 2xx status codes (200, 201, 202, 204, 206) indicate that the action requested by the client was received, understood, accepted and processed successfully.

`HTTP 207 Multi-status` code can be returned for some API requests which means that response consists of multiple parts returned as a "multipart/mixed" body (see also [RFC 2046](https://tools.ietf.org/html/rfc2046)). In this case, the first part of this multipart response contains JSON array with real status codes corresponding to each part of a response, see [Batch Requests](../batch-requests.md) section below.

## HTTP 3xx  – Redirection

This class of status code indicates the client must take additional action to complete the request. Many of these status codes are used in redirection.

For  `HTTP 301`, `HTTP 302`, `HTTP 303`, `HTTP 307` and `HTTP 308` client must support automatic redirection to new URL returned in Location header as specified in [RFC 2616](http://tools.ietf.org/html/rfc2616#section-10.3)

If by some reason `Location` header is not returned, the client should repeat request to the same URL.

`HTTP 304` – can be returned only for some API requests which allow specifying conditional headers `If-None-Match`, `If-Modified-Since`  (see also [RFC 7232](https://tools.ietf.org/html/rfc7232#page-13)). Such status is an indication that resource is not modified and the client doesn't need to update locally cached version of a resource.

API clients have to follow the following rules when processing HTTP 3xx responses:
* `HTTP 301`, `HTTP 302`, `HTTP 303` — request to target URL specified in Location header must be performed with `HEAD` method (if original method was `HEAD`) or `GET` method (if original method was `GET`, `PUT`, `POST` or `DELETE`)
* `HTTP 307`, `HTTP 308` — request to target URL specified in `Location` header must be performed with the same HTTP method as the original request
* `HTTP 304` – no additional requests to the server should be performed.

## HTTP 4xx  – Client Error

The 4xx class of status code is intended for cases in which the client seems to have erred. In most cases (except `HTTP 429`) request should **not** be retried in unchanged form. RingCentral API can return `HTTP 400`, `HTTP 403`, `HTTP 405`, `HTTP 406`, `HTTP 408`, `HTTP 409`, `HTTP 415` and other statuses which should be handled this way.

### HTTP 429 – Too Many Requests

This means that the client exceeded some quota or rate limit defined for all or for certain types of API requests.
The client may retry the original request after getting this HTTP code not earlier than in a number of seconds returned in `Retry-After` header (see [RFC 6585](https://tools.ietf.org/html/rfc6585#section-4)).

Additional information about throttling limits is returned in `X-RateLimit-XXX` response headers. Learn more in our [rate limit](../rate-limits.md) documentation.

### HTTP 401 – Unauthorized

It means that access token provided by a client is invalid or expired. The client should request new access token and repeat the request with it. Depending on used OAuth grant type and application settings the client may have refresh token (which should be used in this situation to get new access token). In case of client credentials, implicit and some other flows the client should repeat the original method to request a fresh access token.

### HTTP 404 – Not Found

This status code may mean that particular URL requested is invalid, or that resource with given ID (indicated as a part of URL) does not exist or not accessible for the authorized user.
Such error can be usually ignored if returned as a result of `DELETE` request which means that resource was already deleted on the server (which may happen due to different server-side retention policies or concurrent requests from other API clients).

## HTTP 5xx  – Server Error

The server failed to fulfill an apparently valid request. The server is aware that it has encountered an error or is otherwise incapable of performing the request.
There can be very different reasons for the 50x status returned. The app should retry request up to 3 times, and the developer may contact RingCentral Developer Support if the problem persists.

### HTTP 503 – Service Unavailable

The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.
In some cases, this status indicates that server cannot handle just this particular type of requests while other can be processed.
The client may retry the original request after getting this HTTP code not earlier than in a number of seconds returned in `Retry-After` header (see [RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.1.3)).

### Other 5xx

The client should not repeat the request. RingCentral Developer Support should be informed about the problem.

