# RingCentral API Rate Limits

## What is a Rate Limit?

A "rate limit" is a policy that affects the frequency an API can be called. They are put in place to protect server infrastructure from being abused or misused. RingCentral employs them to enable consistent load allocation with our platform.

## Applying Rate Limits

RingCentral groups APIs into four different buckets where each bucket is restricted to a different rate limit. This allows RingCentral to better manage and distribute potential load across the platform to better secure and protect it. The four groups are: 

* *Light*
* *Medium*
* *Heavy*
* *Auth*

Every API endpoint is assigned to a different group, which can be discovered via the [API Reference](https://developer.ringcentral.com/api-reference) under the heading of "API Group."

## What Are Your App Rate Limits?

In addition to our default limits, RingCentral administrators have the ability to modify rate limits on an app-by-app basis in order to better service the unique needs of our developers. You can view your app's specific rate limits by logging into the Developer Console, loading your app's dashboard, and clicking "Rate Limits." That will show you a page similar to the following:

<img src="../../img/rate_limits.png" class="img-fluid" width="50%">

Within the above presented limits your client application is allowed to send 10 heavy, 40 medium, 50 light and 5 authorization requests per user (RC extension) per minute. If you exceed these limitations the server returns the `429 Too Many Requests` HTTP error code. It means that the client is throttled by the server due to high request rate. The retry period (in seconds) after which more requests can be sent, is specified in `Retry-After` response header.

## How best to detect and respond to rate limits

### Rate Limits Response Headers

Rate Limits are returned in specific headers in response for each request, unless the request is unlimited. Those headers are:

| Header | Description |
|-|-|
| `X-Rate-Limit-Group` | API group of the given request (*Light*, *Medium*, *Heavy*, *Auth*) | 
| `X-Rate-Limit-Limit` | current rate limit for the given request |
| `X-Rate-Limit-Remaining` | the number of requests left for the time interval (window) of this rate limit |
| `X-Rate-Limit-Window` | time interval in seconds for the given request rate limit |

These headers are returned in order to enable apps to preemptively respond to circumstances in which their app may be impacted by a rate limit enforcement.

#### Example

Let us consider the example of request retrieving account information. Rate Limits headers are returned in response alongside with HTTP status code.

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
  "mainNumber" : "+18774180010",
  "status" : "Confirmed",
  "setupWizardState" : "Completed"
}
```

### What to do when your app hits a rate limit

Consider the following use cases in which you might hit a rate limit. 

#### Simple single-threaded use case, e.g. downloading files serially

* If you encounter a HTTP Response Header `X-Rate-Limit-Remaining` that reaches 0 then wait the number of seconds defined in `X-Rate-Limit-Window` HTTP Response Header.

* If you encounter a HTTP Response Status code of 429 wait the number of seconds defined in the `Retry-After` HTTP Response header.

If `X-Rate-Limit-Remaining` is working properly, your app should never encounter a 429 error, which is desirable. In other words, if you build your app to be aware of this HTTP header and to respond accordingly, you can prevent your app from being impacted, or at least alert personnel about the issue. 

#### Server is overloaded

If you encounter a HTTP Response Header 503, wait a default amount of time and retry once. Have your app support the following configuration options: 

* Default retry time
* Max number of retries

The Amazon Web Services SDK implements a feature called [exponential backoff](https://docs.aws.amazon.com/general/latest/gr/api-retries.html), excerpted below:

> In addition to simple retries, each AWS SDK implements exponential backoff algorithm for better flow control. The idea behind exponential backoff is to use progressively longer waits between retries for consecutive error responses. You should implement a maximum delay interval, as well as a maximum number of retries. The maximum delay interval and maximum number of retries are not necessarily fixed values, and should be set based on the operation being performed, as well as other local factors, such as network latency.
> 
> Most exponential backoff algorithms use jitter (randomized delay) to prevent successive collisions. Because you aren't trying to avoid such collisions in these cases, you don't need to use this random number. However, if you use concurrent clients, jitter can help your requests succeed faster. For more information, see the blog post for Exponential Backoff and Jitter.