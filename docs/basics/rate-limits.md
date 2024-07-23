# RingCentral API Rate Limits

## What is a rate limit?

A "rate limit" is a policy that affects the frequency an API can be called. They are put in place to protect server infrastructure from abuse or misuse. RingCentral employs rate limits to enable consistent load allocation across our platform.

## How are rate limits calculated?

Every RingCentral API is assigned to a different "API Group" which determines the default rate limit that an application will be subject to when called that API. This allows each API to be assigned a rate limit based upon the most common usage patterns associated with that API. This also allows RingCentral to better manage and distribute potential load across the platform to better secure and protect it. 

The four basic rate limit groups are below. Please note that the given rate limits and throttle intervals are default and provided as an example only, since they can be customized and therefore may vary from app to app.

| Usage Plan Group | Rate Limit | Penalty Interval | 
|-|-|-|
| Light | 50 requests/minute | 60 seconds |
| Medium | 40 requests/minute | 60 seconds |
| Heavy | 10 requests/minute | 60 seconds |
| Auth | 5 requests/minute | 60 seconds |

Rate limits can be customized and vary in the following ways:
* Rate limits can be assigned to different time intervals, e.g. *n* calls per minute, per hour, per 5 minutes, etc. 
* Usage plan API groups may also support multiple limits per group, based upon the unique needs and the APIs called by an app.

## How do I determine the rate limit associated with an API?

Every API endpoint is assigned to a different Usage Plan group, which is disclosed on the API's corresponding page in the [API Reference](https://developers.ringcentral.com/api-reference) under the heading of "Usage Plan Group".

!!! hint "Your exact rate limit may vary"
    Bear in mind that your rate limit may be different from the default values above if you have applied for and been granted a modification to your application's needs. See "What are your app rate limits" below.

## What are the specific rate limits associated with my app?

In addition to our default limits, RingCentral administrators have the ability to modify rate limits on an app-by-app basis in order to better service the unique needs of our developers. You can view your app's specific rate limits by logging into the Developer Console, loading your app's dashboard, and clicking "Rate Limits". That will show you a page similar to the following:

<img src="../../img/rate_limits.png" class="img-fluid" width="50%">

Within the above presented limits your client application is allowed to send 10 heavy, 40 medium, 50 light and 5 authorization requests per user (RC extension) per minute.

## What not to do if my app exceeds the limits and gets the error code - 429 Too Many Requests

If you exceed these limitations the server returns the `429 Too Many Requests` HTTP error code. It means that the client is throttled by the server due to high request rate. 
The retry period in seconds, after which more requests can be sent, is specified in `Retry-After` response header.
Please make sure your app **does not** send any requests within the penalty interval (60 seconds), or it may stuck in 429 trap forever, since every new request during the penalty interval will restart it.

## How do I detect and respond to my app being throttled?

When an app exceeds its rate limit, the platform will begin to throttle the app, prohibiting more API calls from being made. When this happens, any call to the API will result in a failure, with an HTTP status code of 429 being returned. 

In addition, other HTTP headers are returned to signal to the developer what their limits are, and when they will be reset. This allows developers to code defensively around these potential failure conditions and implement retry logic as needed. 

There are a few other instances in which your application might also receive a 429 error code, including:

* Account-level limit set 
* Any custom rate limit provided by API service

In these circumstances, the error message you receive may not communicate what your specific and custom rate limit might be. Therefore we recommend consulting the Developer Console to see the actual rate limits configured for your application. 

### Rate limit response headers

Rate limits are communicated via specific HTTP headers that should be returned in a response for each request (although may not be present in 100% of responses), unless the request is unlimited. Those headers are:

| Header | Description |
|-|-|
| `X-Rate-Limit-Group` | API group of the given request (*Light*, *Medium*, *Heavy*, *Auth*). | 
| `X-Rate-Limit-Limit` | current rate limit for the given request |
| `X-Rate-Limit-Remaining` | the number of requests left for the time interval (window) of this rate limit |
| `X-Rate-Limit-Window` | time interval in seconds for the given request rate limit |
| `Retry-After` | the number of seconds to wait before attempting to make the same API call again |

!!! warning "`X-Rate-Limit-Group` header values subject to change"
    Developers should be aware that the API group names may vary from app to app, and therefore developers should not create logic in their products that assumes the API group will be exclusively "Light," "Medium," "Heavy," or "Auth."

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
  "mainNumber" : "+18775550010",
  "status" : "Confirmed",
  "setupWizardState" : "Completed"
}
```

### What to do when your app hits a rate limit

Consider the following use cases in which you might hit a rate limit. 

#### Simple single-threaded use case, e.g. downloading files serially

* If you encounter a HTTP Response Header `X-Rate-Limit-Remaining` that reaches 0 then wait the number of seconds defined in `X-Rate-Limit-Window` HTTP Response Header.

* If you encounter a HTTP Response Status code of 429 please wait the number of seconds defined in the `Retry-After` HTTP Response header.

If `X-Rate-Limit-Remaining` is working properly, your app should never encounter a 429 error, which is desirable. In other words, if you build your app to be aware of this HTTP header and to respond accordingly, you can prevent your app from being impacted, or at least alert personnel about the issue. 

#### Server is overloaded

If you encounter a HTTP Response Header 503, wait a default amount of time and retry once. Have your app support the following configuration options: 

* Default retry time
* Max number of retries

The Amazon Web Services SDK implements a feature called [exponential backoff](https://docs.aws.amazon.com/general/latest/gr/api-retries.html), excerpted below:

> In addition to simple retries, each AWS SDK implements exponential backoff algorithm for better flow control. The idea behind exponential backoff is to use progressively longer waits between retries for consecutive error responses. You should implement a maximum delay interval, as well as a maximum number of retries. The maximum delay interval and maximum number of retries are not necessarily fixed values, and should be set based on the operation being performed, as well as other local factors, such as network latency.
> 
> Most exponential backoff algorithms use jitter (randomized delay) to prevent successive collisions. Because you aren't trying to avoid such collisions in these cases, you don't need to use this random number. However, if you use concurrent clients, jitter can help your requests succeed faster. For more information, see the blog post for Exponential Backoff and Jitter.
