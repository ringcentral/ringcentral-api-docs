# Understanding the call log data format

??? note "Are you looking to get a list of currently active calls?"
    A close cousin of the Call Log API is the [Active Call API](../../finding-active-calls/) which utilizes identical data types. The Active Call API resides at a different endpoint however. Virtually all that applies to Call Log API applies to the Active Call API as well. 

There are three major data types which are contained within the Call Log API resource (for the latest information, please check the [API Reference](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefCallLogInfo.html):

* Account and extension-level call log records
    * The **tome** of Call Log knowledge for your RingCentral Acccount
    * Can obtain filtered call log data
    * Detailed Call Log data provides greater granularity for all legs of a call
* Call recording metadata
    * IS NOT the call recording itself
    * Filterable Call Log property
    * Very useful for call recording dashboards
    * Provides the `contentUri` property which points to the actual recording
* Call recording content
    * Plug the contentUri into an HTML5 Audio element to quickly make a recording player

All of Call Log data types have two levels of access, Admin (aka: Account) and User (aka: Extension). Account-level access, is achieved by authenticating (obtaining an access_token) using RingCentral Admin user credentials. Account-level response data will include records across an account, as compared to User/Extension level response data which is scoped ONLY to the **currently authenticated user**.

## Call log records

Developers should consider Call Logs to be the database of authority as it relates to actions (both inbound and outbound) for a RingCentral Account. The data contained can be queried in a variety of ways using filters as well as exposing deeper granualarity for all legs of a call (such as the case with a RingOut or forwarded calls).

The `session_id` value should be used if you want to associate multiple Call Logs as part of a given single call.

Call logs can be searched across an entire account by authenticating (obtaining an access_token) using Admin level credentials.

### Account-level call log list

Developers can access the Call Logs for an entire account. This requires an Admin account to authenticate and obtain the access_token used for this request.

```http
GET /restapi/v1.0/account/~/call-log HTTP/1.1
```

### Extension Level Call Log List

Developers can access the Call Logs associated with the currently authenticated access_token user account credentials.

```http
GET /restapi/v1.0/account/~/extension/~/call-log HTTP/1.1
```

## Filtering call log records

Filters (query parameters) improve the value of Call Log data for developers. For a current list of the filter values available, please refer to the [API Reference](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefGetExtensionCallLog). 

Following standard RESTful API best practices, all filters are used as part of the query string since all Call Log routes are GET routes.

The most commonly used filters are:

| Parameter | Description |
|-|-|
| `direction` | defines which direction calls are made in respect to the RingCentral extension |
| `type` | defines what type of call log the developer wishes to obtain about the extension |
| `view` | defines the complexity of the call log record returned in the response |
| `dateTo` & `dateFrom` | defines the starting (to) and ending (from) dates to filter the call log records |

!!! note "Notes about `dateTo` and `dateFrom`"
    
    1. These are in ISO8601 format: https://www.w3.org/TR/NOTE-datetime
    2. Timezone offset is expected
    3. Timezone offset is from Zulu time (Z)
    
    Example: July 13, 2016 at midnight in San Francisco, CA, USA === 2016-08-13T00:00:00.0800Z

## Response Formats

There are two response formats you can receive which are indicated by the `view` query parameter. By default, the `view` is **Simple**, but you can set the value of this parameter to **Detailed** to obtain greater granularity into the legs of a call.

### Simple Inbound Response

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

### Detailed Inbound Response

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

Developers are able to use __batch operations__ to retrieve multiple homogeneous call log records by their key using a single API request. This is not available for call recordings. To better understand how batch operations work with the RingCentral API, read the [Batch Requests section](https://developers.ringcentral.com/api-reference/Batch-Requests).

