# Using Detailed Call Log Data

When the simple Call Log data does not provide enough granularity you can leverage the `Detailed` Call Log data at both the `Account` and `Extension` level.

Using the following Detailed Call Log record, we can become more familiar with how the call was executed by RingCentral...

First, we can see that all the normal call log record data is in place, but we obtain this extra item `legs` which is an array, that is no accident. The call legs are in order executed by RingCentral to connect the call.

1. Inbound Phone Call, Accepted
2. Accepted Call sent to Extension
3. Outbound call from the extension to connect the last leg

What actually happened during the call:

1. I received a call on my extension in RingCentral soft phone, I answered
2. The same call came through on my mobile, to connect the outbound leg
3. The outbound leg was connected to the original inbound call

This is not normal (and the call actually failed), but it provides an example.

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
