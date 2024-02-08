# Overview of the RingCentral Call Log API

RingCentral's Call Log is one of the platform's most utilized resources as it enables many different use cases important to enterprises and businesses. Developers use RingCentral's Call Log for the following use cases:

* **Archive and/or download call log data to an external system** - Since RingCentral does not store Call Log data indefinitely, developers use the Call Log API to download Call Log data into customer-owned, long-term, persistent storage.

* **Reporting and analytics** - Developers use the Call Log API to analyze call histories, agent performance, answer rates, and more - with a desire and intent to improve company operations and performance. Developers may also consider using the [Analytics API](../../analytics/index.md) to access aggregated data about an organizations call history. 

* **Integration with third-party services, especially CRMs** - Developers can use Call Log data to help augment 3rd party systems with customer interaction histories and more.

* **Billing Systems** - Service industries often need to bill customers based on the time spent serving them over the phone. Call Log data catalogs all time spent with customers to make time tracking easier.

!!! warning "Call Log Anti-Patterns"
    Here are ways developers should **not** use the Call Log API:

    * **Real-time reporting** - The Call Log API resource is labeled as a "Heavy" usage plan. RingCentral offers better solutions for event-driven, real-time reporting for RingCentral Extensions, primarily Webhooks and/or Push Notifications.
    * **Long-Polling** - While this is highly related to the above, it is important to clearly note that long-polling Call Log (executing multiple HTTP requests to simulate real-time, socket-based data) is not a supported use case.

## How long does it take for the call log to be updated?

It can take anywhere between 15-30 seconds for a completed phone call to appear in the call log. Developers who need more real-time access to events that may relate to or impact a company's call log can look to one of the following solutions:

* The [Active Call API](../finding-active-calls.md) is an alternative API to help developers find calls that are currently in process. The Active Call API is **not a real-time API**, however, but it can be a more expedient way to find calls in progress. 
* The [Account Telephony Sessions event](https://developers.ringcentral.com/api-reference/Account-Telephony-Sessions-Event) is an event that is triggered whenever the state of a call is changed. This is a more reliably real-time event for determining when calls begin and end. 
* The [Extension Telephony Sessions event](https://developers.ringcentral.com/api-reference/Extension-Telephony-Sessions-Event) is similar to the Account Telephony Sessions event, but is scoped to a specific user or extension. 

## Call Log API Permissions

There are various API Permissions your application will be required to use depending upon the type of call log data developers need to access from the RingCentral API.

* Active Calls, Account level Call Log Records, and Extension level Call Log Records require the `ReadCallLog` API permission.
* Call Recording Metadata and Call Recording Content require the `ReadCallRecording` API Permission
