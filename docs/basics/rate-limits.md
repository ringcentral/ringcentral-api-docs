# RingCentral API Rate Limits

## What is a rate limit?

A "rate limit" is a policy that affects the frequency an API can be called. They are put in place to protect server infrastructure from abuse or misuse. RingCentral employs rate limits to enable consistent load allocation across our platform.

## What types of rate limits exist in RingCentral API?

There are the following types of rate limits.

* **User-level** limits. These limits are defined for the pair (authenticated user, application ID) and the particular group of APIs. They limit the number of API requests belonging to a certain group made by a particular user and app within a time window. See the detailed description of these limits further in this article.
* **Account-level** limits. These limits are defined for the pair (account ID, application ID). They limit the number of all API requests made by users of some account and app within a time window. These limits are not generally set but can be applied as an emergency protection measure.
* **Global defensive** limits. These limits are set globally to protect RingCentral backend infrastructure and usually define the maximum number of requests accepted from a certain IP address within a time window.
* **Custom** limits. Some API services may implement their own rate limits to protect themselves from excessive request traffic.

 ## What happens if my app exceeds the limits, and how should I handle it?

If you exceed any of the rate limits, the server rejects API requests with the `HTTP 429 Too Many Requests` status code. This means that the server throttles the client due to a high request rate. 

In most cases, the `Retry-After` response header is returned, and its value contains the recommended retry interval in seconds.
If `Retry-After` is not returned, the original request should be retried in 30 seconds or later. 

!!! info "Examples of error codes returned in HTTP 429 response can be found in [rate-limit related error codes](errors.md#rate-limit-related-error-codes) documentation"

For user-level limit violations, the response also contains special `X-Rate-Limit-XXX` headers that would help handle this situation (see [Rate limit response headers](#rate-limit-response-headers)). If you do not see such headers in the response, it means that your app hit some other type of rate limit. Please contact RingCentral developer support if you need to better understand the situation.

## User-level limits

User-level rate limits apply to each user using an application. For example, if the rate limit is 1,000 API calls per minute, then each individual user can call the API 1,000 times each minute. 

### How are user-level limits calculated?

Every RingCentral API is assigned to a different "usage plan Group" which determines the default rate limit that an application will be subject to when called that API. This allows each API to be assigned a rate limit based on the most common usage patterns associated with that API. This also allows RingCentral to better manage and distribute potential load across the platform to better secure and protect it. The group associated with a particular API method can be found in the [API Reference](https://developers.ringcentral.com/api-reference) under the "Usage Plan Group" heading.

The four basic usage plan groups are described below. Please note that the rate limits and penalty intervals given are provided as an example only — they can be customized and vary among apps.

| Usage Plan Group | Rate Limit (default)    | Penalty Interval (default) |
|------------------|-------------------------|----------------------------|
| Light            | 50 requests/user/minute | 60 seconds                 |
| Medium           | 40 requests/user/minute | 60 seconds                 |
| Heavy            | 10 requests/user/minute | 60 seconds                 |
| Auth             | 5 requests/user/minute  | 60 seconds                 |

The rate limits are applied as follows:

- Server counts all requests associated with the same group that are sent by the app on behalf of a particular user during a sliding time window
  - For example, if your app sends requests that use 5 different API methods, but all of them are associated with the "Light" group, they will be counted together against the corresponding group bucket.
  - API methods belonging to different groups are counted separately, e.g., the app can exceed a rate limit for "Light" calls but still have a remaining quota for "Medium" calls.

- Once the rate limit is reached, the server applies a penalty by rejecting any requests (within the corresponding group) from the same user and app sent during penalty interval. With each new request the penalty interval is reset.
  - It's better to ensure your app **does not** send any requests within the penalty interval after it reaches the rate limit. Otherwise, it may stuck in the 429 trap forever, since every new request during the penalty interval restarts the penalty. 

Rate limits for your app can be customized in the following ways:

* The rate limit itself can be changed, e.g. to allow 100 requests per minute instead of 50.
* The time window size can be changed, e.g. to count requests per 5-minute intervals instead of 1-minute.
* The penalty interval can be adjusted.

Usually, the runtime information about rate limit settings is communicated back to the app via heders: see [Rate limit response headers](#rate-limit-response-headers).

### What are the specific user-level rate limits associated with my app?

In addition to our default limits, RingCentral administrators have the ability to modify rate limits on an app-by-app basis in order to better service the unique needs of our developers. You can view your app's specific rate limits by logging into the Developer Console, loading your app's dashboard, and clicking "Rate Limits". That will show you a page similar to the following:

<img src="../../img/rate_limits.png" class="img-fluid" width="50%">

Within the above-presented limits, your client application is allowed to send 10 heavy, 40 medium, 50 light, and 5 authorization requests per user (extension) per minute.

### Rate limit response headers

The runtime state of user-level rate limits is communicated via specific HTTP response headers returned in response to any API request (although, in some rare cases, they may not be absent). Those headers are:

| Header                   | Description                                                                     |
|--------------------------|---------------------------------------------------------------------------------|
| `X-Rate-Limit-Group`     | API group of the given request (*Light*, *Medium*, *Heavy*, *Auth*).            |
| `X-Rate-Limit-Limit`     | Current rate limit for the given request                                        |
| `X-Rate-Limit-Remaining` | The number of requests left for the time interval (window) of this rate limit   |
| `X-Rate-Limit-Window`    | Time interval in seconds for the given request rate limit                       |

!!! warning "`X-Rate-Limit-Group` header values subject to change"
    Developers should be aware that the API group names may change in the future. The developers should not create logic in their products that assumes the API group will be exclusively "Light," "Medium," "Heavy," or "Auth."

#### Example

Let us consider the example of the request that retrieves account information. Rate Limits headers are returned in response alongside with HTTP status code.

```http
HTTP/1.1 200 OK
X-Rate-Limit-Group: light
X-Rate-Limit-Limit: 1000
X-Rate-Limit-Remaining: 999
X-Rate-Limit-Window: 60
Content-Language: en-US
Content-Type: application/json; charset=UTF-8

{
  "uri" : "https.../restapi/v1.0/account/1696121004",
  "id" : 1696121004,
  "serviceInfo" : { /* snip */ },
  "operator" : { /* snip */ }, 
  "mainNumber" : "+18775550010",
  "status" : "Confirmed",
  "setupWizardState" : "Completed"
}
```

### How to use X-Rate-Limit headers in a simple single-threaded use case?

If your app sends API requests within a single thread (e.g. downloads message attachments sequentially), the following approach can be used. 

* Check the `X-Rate-Limit-Remaining` header in each API response. If its value reaches zero, wait for the number of seconds returned in the `X-Rate-Limit-Window` response header.

* If you encounter an HTTP 429 error, wait for the number of seconds specified in the `Retry-After` response header.

If your logic that relies on `X-Rate-Limit-Remaining` works properly, your app should never encounter 429 errors due to violating user-level rate limits. In other words, if you build your app to be aware of this HTTP header and respond accordingly, you can prevent your app from being impacted, or at least alert personnel about the issue. 

