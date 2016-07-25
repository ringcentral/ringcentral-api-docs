Developing with the [RingCentral Call Log API resource](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefCallLogInfo.html) is one of the most popular topics among [RingCentral Developers](https://developer.ringcentral.com).

The RingCentral Call Log is the source of truth for how extensions within your [RingCentral Account](https://service.ringcentral.com) have used RingCentral for making and receiving: Voice Calls, SMS messages, and Fax messages. Every inbound and outbound call, SMS, or fax attempted using RingCentral is recorded at the **Extension** level into RingCentral data stores, and is accessible at either the **Account** level (meaning they are recorded for each user extension in your RingCentral account, and accessible specifically for a particular Extension or in aggregate at the account level by an account administrator).

## Call Log Access

There are several routes available for accessing specific types of call log data.

The base route for accessing call log data is scoped to the Account Level or the Extension Level depending upon the role of the authenticated access_token user.

Account-Level Call Log data (this is data for the entire account). Please note that call recording meta data and the binary audio files which are call recordings are only accessible at the account level.

/restapi/v1.0/account/{accountId}/active-calls
/restapi/v1.0/account/{accountId}/call-log
/restapi/v1.0/account/{accountId}/call-log/{callRecordId}
/restapi/v1.0/account/{accountId}/recording/{recordingId}
/restapi/v1.0/account/{accountId}/recording/{recordingId}/content

or Extension-Level Call Log data (this is data for only a specific extension within your RingCentral account).

/restapi/v1.0/account/{accountId}/extension/{extensionId}/active-calls
/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log
/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log/{callRecordId}

## Call Log API Permissions

There are various API Permissions your application will be required to use depending upon the type of call log data developers need to access from the RingCentral API.

Active Calls, Account level Call Log Records, and Extension level Call Log Records require the *ReadCallLog* API permission
Call Recording Metadata and Call Recording Content require the *ReadCallRecording* API Permission

## Call Log API Groups and Rate Limits

All call log resources fall under the **Heavy** API Groups. You can view the API Developer Guide to understand the rate limits for the Usage Plan of your organization at this URL:

https://developers.ringcentral.com/api-docs/latest/index.html#!#RateLimitDetails.html

## Call Log Data Retention Policies

The standard RingCentral Message Store and Account Data Retention Policy dictates the quantity or length of time call log records and call recordings are stored by RingCentral.

To see the most up-to-date version of this policy please read the following article in the RingCentral Knowledge Base:

http://success.ringcentral.com/articles/en_US/RC_Knowledge_Article/2178

## Non-Programmatic Ways to Access Call Log Data

Frequently, while developing an application or integration, it is helpful for Developers to be able to test or invaliate data they are seeing using Call Log data. The training content contained in this document describes how Developers can use the [RingCentral API](https://developer.ringcentral.com/api-explorer) to access and view Call Log API resource data. You can use one of the following methods to access this data as well:

1. [Login to your RingCentral Online Account](http://success.ringcentral.com/articles/RC_Knowledge_Article/Logging-in-to-your-RingCentral-account) to [view Call Activity Log information](http://success.ringcentral.com/articles/RC_Knowledge_Article/Activity-Log-Overview) for your RingCentral extension or RingCentral Account.
2. [Accessing Call Data on your RingCentral Mobile Application](http://success.ringcentral.com/articles/en_US/RC_Knowledge_Article/5122)
3. [Use the RingCentral Desktop Application](http://success.ringcentral.com/articles/en_US/RC_Knowledge_Article/7244) to view Call Log data.

## Common Use Cases

Call Log data can be used as a solution for several use cases, the most common use cases for Call Log data by developers are:

* **Downloading** - Call Log Data to an External Database** Since RingCentral does not store Call Log data indefinitely (see [Introduction](calllog_introduction.md) and view the **Access and Permissions** section for more information), using the Call Log API to download or transfer Call Log data into customer-owned, long-term, persistent storage has been a very common use case.
* **Reporting** - Developers can also achieve this use case by implementing downloaded Call Log data into their persistent storage. Application developers who do not need long-term data storage have opted to use the Call Log data to power short-term reporting pages.
* **Dashboards** - Polling a RingCentral account Call Log data at a set interval of time (that is not real-time) can provide insights into performance of a team or call center.
* **CRM Integration** - Developers who need to populate interaction records into history for contacts in your CRM can leverage Call Log data when not using real-time solutions.
* **Billing Systems** - Developers who need to provide contact-specific data for time-based billing can leverage RingCentral Call Log data to populate this information on an hourly or daily basis with greater confidence.
* **Reconciliations** - Confirming if messages of a particular type were received or sent to a contact are made easy using the RingCentral Call Log data.

### Call Log Anti-Patterns

It is also important to understand anti-patterns of using Call Log, these are ways developers should **not** use this resource.

* **Real-time, or near-real-time reporting** - The Call Log API resource is labeled as a "Heavy" usage plan. RingCentral offers better solutions for event-driven, real-time (or near-real-time) reporting of what the various Extensions in your RingCentral account are doing at any given time: [Webhooks]() and/or [Push Notifications]() are the two recommended solutions.
* **Long-Polling** - While this is highly related to the above anti-pattern, it is important to clearly note that long-polling Call Log (executing multiple HTTP requests to simulate real-time, socket-based data) is not a supported use case.

## Call Log Data Aspects

**Note** For the latest, and most up-to-date response specification, always refer to the RingCentral API Developer Guide.

Currently there are four major data types which are contained within the Call Log API resource:

* Active Calls
    * Provides a list of currently active, or recently closed calls
    * For Voice Calls ONLY
    * Is NOT a suitable replacement for real-time account-level or extension-level data
    * Major use case is to perform quick lookups (from PubSub or Webhook data) for a recently closed session to bootstrap data for CRM integrations
    * Default length of time that a recently closed call is held in the list of Active Calls is 120 seconds
* Account and Extension Level Call Log Records
    * The **tome** of Call Log knowledge for your RingCentral Acccount
    * Can obtain filtered call log data
    * Detailed Call Log data provides great granularity
* Call Recording Meta Data
    * IS NOT the call recording itself
    * Filterable Call Log property
    * Very useful for call recording dashboards
    * Provides the `contentUri` property which points to the actual recording
* Call Recording Content
    * Plug the contentUri into an [HTML5 Audio element]() to quickly make a recording player
