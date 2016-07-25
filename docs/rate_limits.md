# What is Rate Limit

The Rate Limits is a scheme specifying limits of using the API resources.

Applying rate limits enables consistent load allocation through correct interaction with RingCentral Connect Platform.

# Rate Limit Details

Each Rate Limit specifies how many requests to each API group are allowed. Currently four API groups are distinguished:

* *Light*
* *Medium*
* *Heavy*
* *Auth*

That means all the requests are characterized by their processing as *Light*, *Medium* or *Heavy*. There are also authorization requests, that form a separate group — *Auth*. Each request in [API Reference](https://developers.ringcentral.com/api-docs/latest/APIReference.html) is marked as *Heavy*, *Medium*, *Light* or *Auth* under the header *API Group*.

Your Rate Limits details are displayed as shown in the table below. It informs you how many requests of each API group are supported and what is the time frame in seconds for every request.

**Rate Limits (Example)**

| API group | Request limit per user |
| --------- | ---------------------- |
| Heavy     | 10 requests/60 seconds |
| Medium    |40 requests/60 seconds  |
| Light     | 50 requests/60 seconds |
| Auth      | 5 requests/60 seconds  |

Let's consider the given rate limits. Within the above presented limits your client application is allowed to send 10 heavy, 40 medium, 50 light and 5 authorization requests per user (RC extension) per minute. If you exceed these limitations the server returns the `429 Too Many Requests` HTTP error code. It means that the client is throttled by the server due to high request rate. Specific retry period in seconds, after which the requests can be sent, is specified in `Retry-After` response header.