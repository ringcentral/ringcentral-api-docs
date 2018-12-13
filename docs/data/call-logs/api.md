# Call Log API Basics

Before completing this section of the course content, please make sure you have read the [Introduction](../data/call-logs).

The RingCentral Call Log API resource is the **tome** of knowledge about inbound and outbound actions for all users of your RingCentral account. Call Log data is segmented into four (4) data types:

## Data Types

Currently there are four major data types which are contained within the Call Log API resource (for the latest information, please check the [API Reference](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefCallLogInfo.html):

* [Active Calls](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefExtensionActiveCalls.html)
    * Provides a list of currently active, or recently ended calls
    * For Voice Calls ONLY
    * Is NOT a suitable replacement for real-time account-level or extension-level event notifications
    * Major use case is to perform quick lookups (from PubSub or Webhook data) for a recently closed session to bootstrap data for CRM integrations
    * Default length of time that a recently closed call is held in the list of Active Calls is 120 seconds
* Account and Extension Level Call Log Records
    * The **tome** of Call Log knowledge for your RingCentral Acccount
    * Can obtain filtered call log data
    * Detailed Call Log data provides greater granularity for all legs of a call
* Call Recording Meta Data
    * IS NOT the call recording itself
    * Filterable Call Log property
    * Very useful for call recording dashboards
    * Provides the `contentUri` property which points to the actual recording
* Call Recording Content
    * Plug the contentUri into an [HTML5 Audio element]() to quickly make a recording player

All of Call Log data types have two levels of access, Admin (aka: Account) and User (aka: Extension). Account level access, is achieved by authenticating (obtaining an access_token) using RingCentral Admin user credentials. Account level response data will include records across an account, as compared to User/Extension level response data which is scoped ONLY to the **currently authenticated user**.

## Active Calls

Active Calls provides developers with time-sensitive insights into what is (or has recently) occurred in your RingCentral Account. We can perform this lookup at the Account Level or at the Extension Level depending upon the role of the user who has authenticated and obtained an access_token.

Active Calls are not `real time`. There is some latency between the time when a call has terminated and when it shows up in the records returned, this latency differs but it is typically 3-10 seconds.

Active Calls are created to work as a tool for integration developers who need to lookup call log data to append notes, and sentiment for things such as CRM integrations. Active Calls are a handy tool for looking up this time-sensitive information, but this can also be confusing for developers expecting this Call Log data type to represent `real time` active calls. For `real-time` or `near real-time` call data developers will want to either use [Webhooks](http://ringcentral-quickstart.readthedocs.io/en/latest/webhooks/) or [Push Notification](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefNotifications.html).

Developers should consider Active Calls to be a time-sensitive cache, where the default period of time a call remains in this cache (after being ended) is approximately 120 seconds.

Query parameters are dropped if supplied and only `Simple` views of Call Log data are available using Active Call requests.

**Routes**

**Note: All requests below are referencing the Sandbox API Base URI (https://platform.devtest.ringcentral.com) as compared to the Production API Base URI (https://platform.ringcentral.com)**

**Account Level Active Calls** are the Active Calls for an entire account. Requires an Admin account to authenticate and obtain the access_token used for this request.

```http
GET /restapi/v1.0/account/~/active-calls HTTP/1.1
Host: platform.devtest.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_ADMIN_LEVEL_ACCESS_TOKEN
Cache-Control: no-cache
```

Note: Attempting to access Account-Level Active Calls with an access_token which is not associated with an Admin account will result in the following error:

```json
{
    "errorCode": "InsufficientPermissions",
    "message": "[ReadCompanyCallLog] permission required",
    "errors": [
        {
            "errorCode": "CMN-408",
            "message": "[ReadCompanyCallLog] permission required",
            "permissionName": "ReadCompanyCallLog"
        }
    ],
    "permissionName": "ReadCompanyCallLog"
}
```

**Extension Level Active Calls** are the Active Calls associated with the currently authenticated access_token user account credentials.

```http
GET /restapi/v1.0/account/~/extension/~/active-calls HTTP/1.1
Host: platform.devtest.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_USER_LEVEL_ACCESS_TOKEN
Cache-Control: no-cache
```

**Response Format**

Each record in the response JSON will be the same for either Account-Level or Extension-Level Active Call Records.

```json
{
    "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/ACCOUNT_ID/extension/EXTENSION_ID/call-log/CALL_ID?view=Simple",
    "id": "CALL_LOG_ID",
    "sessionId": "CALL_SESSION_ID",
    "startTime": "2016-06-06T18:07:41.000Z",
    "duration": 64, // in seconds
    "type": "Voice",
    "direction": "Outbound",
    "action": "VoIP Call", // One of the valid Call Actions
    "result": "Call connected", // One of the valid Call Results
    "to": {
        "phoneNumber": "+RING_CENTRAL_PHONE_NUMBER",
        "location": "LOCATION STRING"
    },
    "from": {
        "name": "RINGCENTRAL_USER_EXTENSION_NAME"
    },
    "recording": {
        "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/ACCOUNT_ID/recording/RECORDING_ID",
        "id": "RECORDING_ID",
        "type": "OnDemand", // One of the valid Recording Types
        "contentUri": "https://media.devtest.ringcentral.com:443/restapi/v1.0/account/ACCOUNT_ID/recording/RECORDING_ID/content"
    }
}
```

## Call Log Records

Developers should consider Call Logs to be the database of authority as it relates to actions (both inbound and outbound) for a RingCentral Account. The data contained can be queried in a variety of ways using filters as well as exposing deeper granualarity for all legs of a call (such as the case with a RingOut or forwarded calls).

The session_id value should be used if you want to associate multiple Call Logs as part of a given single call.

Call logs can be searched across an entire account by authenticating (obtaining an access_token) using Admin level credentials.

**Routes**

**Account Level Call Log List** are the Call Logs for an entire account. Requires an Admin account to authenticate and obtain the access_token used for this request.

```http
GET /restapi/v1.0/account/~/call-log HTTP/1.1
Host: platform.devtest.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_ACCESS_TOKEN_OBTAINED_WITH_ADMIN_CREDENTIALS
```

**Extension Level Call Log List** are the Call Logs associated with the currently authenticated access_token user account credentials.

```http
GET /restapi/v1.0/account/~/extension/~/call-log HTTP/1.1
Host: platform.devtest.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_ACCESS_TOKEN
```

**Detailed Call Log Item (Account/Extension)** is available if you wish to obtain the details of a single call log item. This is only available for the currently authenticated user and their call logs respectively.

```http
GET /restapi/v1.0/account/~/extension/~/call-log/REPLACE_WITH_CALL_LOG_ID HTTP/1.1
Host: platform.devtest.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_YOUR_ACCESS_TOKEN
```

**Filters**

Filters (query parameters) improve the value of Call Log data for developers. For a current list of the filter values available, please refer to the [API Reference](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefGetExtensionCallLog). 

Following standard RESTful API best practices, all filters are used as part of the query string since all Call Log routes are GET routes.

The most commonly used filters are:

* direction: defines which direction calls are made in respect to the RingCentral extension
* type: defines what type of call log the developer wishes to obtain about the extension
* view: defines the complexity of the call log record returned in the response
* dateTo & dateFrom: defines the starting (to) and ending (from) dates to filter the call log records

Some key things to note about dateTo and dateFrom:

1. These are in ISO8601 format: https://www.w3.org/TR/NOTE-datetime
2. Timezone offset is expected
3. Timezone offset is from Zulu time (Z)

Example: July 13, 2016 at midnight in San Francisco, CA, USA === 2016-08-13T00:00:00.0800Z

**Response Format**

There are two response formats you can receive which are indicated by the `view` query parameter. By default, the `view` is **Simple**, but you can set the value of this parameter to **Detailed** to obtain greater granularity into the legs of a call.

**SIMPLE INBOUND RESPONSE**

```json
{
    "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/ACCOUNT_ID/call-log/CALL_LOG_RECORD_ID?view=Simple",
    "id": "CALL_LOG_RECORD_ID",
    "sessionId": "SESSION_ID",
    "startTime": "2016-06-06T18:26:52.000Z",
    "duration": 54,
    "type": "Voice", // Can be one of the valid types: Voice, SMS, Fax, etc...
    "direction": "Inbound", // Will be `Outbound` for outbound communications
    "action": "Phone Call", // Can be one of the valid call actions
    "result": "Accepted", // Can be one of the valid call results
    "to": {
        "phoneNumber": "+PHONE_NUMBER"
    },
    "from": {
        "phoneNumber": "+PHONE_NUMBER",
        "name": "LOCATION_NAME",
        "location": "LOCATION_NAME"
    }
}
```

**DETAILED INBOUND RESPONSE**

Note: The following response data is for the exact same type of Simple Call Log record example shown above. But provides the call leg information about how the call was forwarded (the `legs` property of the response payload).

```json
{
    "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/ACCOUNT_ID/call-log/CALL_LOG_RECORD_ID?view=Detailed",
    "id": "CALL_LOG_RECORD_ID",
    "sessionId": "SESSION_ID",
    "startTime": "2016-06-06T18:26:52.000Z",
    "duration": 54,
    "type": "Voice",
    "direction": "Inbound",
    "action": "Phone Call",
    "result": "Accepted",
    "to": {
        "phoneNumber": "+PHONE_NUMBER"
    },
    "from": {
        "phoneNumber": "+PHONE_NUMBER",
        "name": "LOCATION_NAME",
        "location": "LOCATION_VALUE"
    },
    "transport": "PSTN",
    "lastModifiedTime": "2016-06-06T18:28:03.335Z",
    "legs": [
        {
            "startTime": "2016-06-06T18:26:52.000Z",
            "duration": 54,
            "type": "Voice",
            "direction": "Inbound",
            "action": "Phone Call",
            "result": "Accepted",
            "to": {
                "phoneNumber": "+RINGCENTRAL_USER_PHONE_NUMBER"
            },
            "from": {
                "phoneNumber": "+SOURCE_PHONE_NUMBER",
                "name": "SAN MATEO    CA",
                "location": "San Mateo, CA"
            },
            "transport": "PSTN",
            "legType": "Accept"
        },
        {
            "startTime": "2016-06-06T18:26:52.000Z",
            "duration": 54,
            "type": "Voice",
            "direction": "Inbound",
            "action": "Phone Call",
            "result": "Accepted",
            "to": {
            "phoneNumber": "+RINGCENTRAL_USER_PHONE_NUMBER",
                "name": "RINGCENTRAL_USER_EXTENSION_NAME"
            },
            "from": {
                "phoneNumber": "+SOURCE_PHONE_NUMBER",
                "name": "LOCATION_NAME",
                "location": "LOCATION_VALUE"
            },
            "transport": "PSTN",
            "legType": "Accept",
            "extension": {
                "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/ACCOUNT_ID/extension/EXTENSION_ID",
                "id": EXTENSION_ID
            }
        },
        {
            "startTime": "2016-06-06T18:26:56.000Z",
            "duration": 50,
            "type": "Voice",
            "direction": "Outbound",
            "action": "FindMe",
            "result": "Accepted",
            "to": {
                "phoneNumber": "+RINGCENTRAL_USER_ASSOCIATED_NUMBER",
                "name": "CONTACT_NAME",
                "location": "LOCATION_VALUE"
            },
            "from": {
                "phoneNumber": "+SOURCE_PHONE_NUMBER",
                "name": "RINGCENTRAL_USER_EXTENSION_NAME"
            },
            "transport": "PSTN",
            "legType": "FindMe",
            "extension": {
                "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/ACCOUNT_ID/extension/EXTENSION_ID",
                "id": EXTENSION_ID
            }
        }
    ]
}
```

## Batch Call Log Records

Developers are able to use __batch operations__ to retrieve multiple homogeneous call log records by their key using a single API request. This is not available for call recordings. To better understand how batch operations work with the RingCentral API, read the [Batch Requests section](../../basics/uris.md#batch-requests).

## Call Recording Metadata and Content

Call Recording data is available to developers (if call recording data exists) in both the Call Log List and the Call Log Item records as a property named `recording`. The property is a JSON object with the following schema:

```json
"recording": {
    "uri": "STRING_REPRESENTING_THE_URI_TO_THE_CALL_RECORDING_METADATA_OBJECT",
    "id": "CALL_RECORDING_ID",
    "type": "STRING_REPRESENTING_TYPE_OF_RECORDING", // Either "OnDemand" or "Automatic"
    "contentUri": "STRING_REPRESENTING_THE_URI_TO_THE_CALL_RECORDING_BINARY_DATA"
}
```

To save developers time and reduce redundant API requests, the `recording` property of a Call Log (either list or item) **IS** the Call Log Metadata object, this object provides you with data **about** the recording content. Contained within the metadata is the Call Recording Content URI `contentUri`, which can be used by developers to obtain the binary data of the recording.

You can access the call recording data from any of the following: Online Account Portal (for Production or Sandbox), your RingCentral SoftPhone, your RingCentral Desktop application, the RingCentral API.

Call Recordings are ONLY saved by RingCentral if they are longer than 30 seconds in length. To learn how to [configure call recording with RingCentral](http://success.ringcentral.com/articles/en_US/RC_Knowledge_Article/How-to-Change-the-Automatic-Call-Recording-Settings). 

There is a dedicated section for call recordings later in this course.

**Routes**

**Call Recording Metadata**

Used to obtain data about a Call Recording for the currently authenticated user

```http
GET /restapi/v1.0/account/~/recording/REPLACE_WITH_CALL_RECORDING_ID HTTP/1.1
Host: platform.devtest.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_VALID_ACCESS_TOKEN 
```

**Call Recording Content**

Used to obtain binary data that IS the Call Recording for the currently authenticated user

```http
GET /restapi/v1.0/account/~/recording/REPLACE_WITH_CALL_RECORDING_ID/content HTTP/1.1
Host: platform.devtest.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer REPLACE_WITH_VALID_ACCESS_TOKEN 
```

**Response (meta data)**

*The response for Call Recording Content is being omitted since it is just binary data*

```json
{
    "id": "RECORDING_ID",
    "contentUri": "https://media.devtest.ringcentral.com:443/restapi/v1.0/account/ACCOUNT_ID/recording/RECORDING_ID/content",
    "contentType": "audio/mpeg", // Configurable in your Online Account Portal, but this is default
    "duration": 46 // Value is in seconds
}
```
