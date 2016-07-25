As you develop applications and integrations with the Call Log resource, there are certain concerns which may arise that you may/may not be aware of which have serious development, business, and/or user-experience considerations.

* Throttling Call Log Requests Properly
* HIPAA Considerations while Developing with Call Log
* Generating Call Log data in your Sandbox Account

Each of the above items has different impact depending upon the current needs of the developer.

## Throttling Call Log Requests Properly

In any language, you can interpret the response headers to determine how to properly throttle your Call Log Requests.

RingCentral will respond (from any request to Call Log) the following headers to help guide you:

1. X-Rate-Limit-Group: A string representing the Usage Plan for the requested resource
2. X-Rate-Limit-Limit: While a little redundant in naming (LOL), shows you how many requests you are permitted in the current Usage Plan within the X-Rate-Limit-Window header value
3. X-Rate-Limit-Remaining: A number representing the amount of requests you have remaining in the X-Rate-Limit-Window from your initial request (the Date header of your first request)
4. X-Rate-Limit-Window: The amount (in seconds) you are able to execute the maximum (X-Rate-Limit-Limit) number of requests

Turning this into a simple algorithm, we could do the following (in pseudo-JS code)

```
var initialRequestTimeStamp = +new Date();
var limitMax = initialRequestTimeStamp + 60000);

while(+new Date() < limitMax) {
    if( headers['X-Rate-Limit-Remaining] > 0 ) {
        executeNextRequest(params);
    } else {
        setTimeout(executeRequest(params), 60000);
    }
}
```

The above may not be perfect, but it does get your head thinking in the right direction. If you have a better way to do this, submit a PR to this repository and we will include it after testing.


## HIPAA Considerations While Developing with Call Log

RingCentral offers HIPAA-Compliant services to customers that require it. HIPAA-Compliant accounts do not have SMS ability (because SMS is not currently HIPAA-Compliant) as a communication channel.

As a developer, it is YOUR responsibility to consider the best implications for HIPAA-Compliance in your application and integrations.

For Example: Thinking about making an application which allows the ability to email transcription of a call recording or call recording binary data....we would instead recommend that you email a time-sensitive link back to your application which requires authentication by a RingCentral user in that account to access that data.

Be mindful of how multiple customer types will use your application or integration and keep HIPAA-Compliance as a "top-of-mind" aspect to your development.


### Generating Call Log data in your Sandbox Account

Through our Call Log tutorials, we have shown developers how to use the RingCentral Soft Phone to create call log data and call recording data. Sometimes you need much more for testing or development.

For those cases, our Developer Relations team has created the following repository on Github in PHP for [Generating Call Recording Data in your Sandbox account](https://github.com/anilkumarbp/RingCentral-Call-Generator-Recordings-Downloader). This is good for generating 100-200 call logs and recordings, but is not recommended for more than 200 because it will max out your minutes available in the Sandbox account.
