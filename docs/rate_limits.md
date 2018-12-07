# RingCentral API Rate Limits

## What is a Rate Limit?

A "rate limit" is a policy that affects the frequency an API can be called. They are put in place to protect server infrastructure from being abused or misused. RingCentral employs them to enable consistent load allocation with our platform.

## Applying Rate Limits

Each Rate Limit specifies how many requests to each API group are allowed. Currently four API groups are distinguished:

* *Light*
* *Medium*
* *Heavy*
* *Auth*

That means all the requests are characterized by their processing as *Light*, *Medium* or *Heavy*. There are also authorization requests, that form a separate group — *Auth*. Each request in [API Reference](https://developers.ringcentral.com/api-docs/latest/APIReference.html) is marked as *Heavy*, *Medium*, *Light* or *Auth* under the header *API Group*.

## What Are Your App Rate Limits?

Rate Limits plan available for your client application is available in your RC account by clicking the 'Rate Limits' in My Apps tab, see the image below. It informs you how many requests of each API group are supported and what is the time frame in seconds for every request.

![Rate Limits](img/rate_limits.png)

Let's consider the given rate limits. Within the above presented limits your client application is allowed to send 10 heavy, 40 medium, 50 light and 5 authorization requests per user (RC extension) per minute. If you exceed these limitations the server returns the `429 Too Many Requests` HTTP error code. It means that the client is throttled by the server due to high request rate. The retry period in seconds, after which the requests can be sent, is specified in `Retry-After` response header.

## Rate Limits Response Headers

Rate Limits are returned in specific headers in response for each request, unless the request is unlimited. Those headers are:

* **X-Rate-Limit-Group** — API group of the given request (*Light*, *Medium*, *Heavy*, *Auth*)

* **X-Rate-Limit-Limit** — current rate limit for the given request

* **X-Rate-Limit-Remaining** — the number of requests left for the time interval (window) of this rate limit

* **X-Rate-Limit-Window** — time interval in seconds for the given request rate limit

Let us consider the example of request retrieving account information. Rate Limits headers are returned in response alongside with HTTP status code.

```http
GET /restapi/v1.0/account/1696121004 HTTP/1.1
Authorization: Bearer U0pDMDFQMDFQQVMwMXxBQUNZemU3b2ZxMUtDWXBoeAxQQ
Accept: application/json


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
  "serviceInfo" : {
    "uri" : "https.../restapi/v1.0/account/1696121004/service-info",
    "brand" : {
      "id" : "1210",
      "name" : "RingCentral",
      "homeCountry" : {
        "id" : "1",
        "uri" : "https.../restapi/v1.0/dictionary/country/1",
        "name" : "United States",
        "isoCode" : "US",
        "callingCode" : "1"
      }
    },
    "servicePlan" : {
      "id" : "1216",
      "name" : "Professional",
      "edition" : "Unknown"
    },
    "billingPlan" : {
      "id" : "159",
      "name" : "Monthly",
      "durationUnit" : "Month",
      "duration" : 1,
      "type" : "Regular"
    }
  },
  "operator" : {
    "uri" : "https.../restapi/v1.0/account/1696121004/extension/1696121004",
    "id" : 1696121004,
    "extensionNumber" : "101"
  },
  "mainNumber" : "+18774180010",
  "status" : "Confirmed",
  "signupInfo" : {
    "signupState" : [ "CreditCardApproved", "BillingEntered", "AccountCreated", "AccountConfirmed" ],
    "verificationReason" : "Unknown"
  },
  "setupWizardState" : "Completed"
}
```