# Call Log Access Control

Like every other RingCentral API resource, the [Call Log](https://developers.ringcentral.com/api-reference/Call-Log/readUserCallLog) API resource has specific limitiations in place for accessing Call Log data via our API.

Developers can easily determine the permissions available for an access token by viewing the `scope` property while requesting an `access_token` from RingCentral OAuth endpoints using the [auth code flow](../../authentication/auth-code-flow.md). The `scope` property will be a string which can be split on whitespace " ". The following example shows how to use the [RingCentral JS SDK](https://github.com/ringcentral/ringcentral-js) to inspect for the required API Permissions prior to executing these requests (on an ROPC `Server-Only NO UI` Platform Type application).:

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-log-access.js !}
    ```

## API Permissions

There are two main API permissions developers will need to access Call Log data, `ReadCallLog` and `ReadCallRecording`.

You may need to configure your application in the [RingCentral Developer Console](https://developer.ringcentral.com) to enable your app/integration to use the Call Log API resources. Always refer to the [RingCentral API Reference](https://developers.ringcentral.com/api-reference/Call-Log/readUserCallLog) for the most up-to-date information on accessing the Call Log API resource.

The following table provides a quick outline about what API permissions the API Keys your application/integration must have associated in order to access each major category of data which Call Log provides.

| Category | Method | Requires `ReadCallLog` | Requires `ReadCallRecording` | Route |
| ---------------------------| ------ | ---------------------- | ---------------------------- | ----- |
| Active Calls                  | GET | YES | NO | /v1.0/account/{accountId}/extension/{extensionId]/active-calls |
| Account List of Call Logs     | GET | YES | NO | /v1.0/account/{accountId}/call-log |
| Extension List of Call Logs   | GET | YES | NO | /v1.0/account/{accountId}/extension/{extensionId}/call-log |
| Call Recording Meta Data      | GET | YES | YES | /v1.0/account/{accountId}/recording/{recordingId} |
| Call Recording Content Data   | GET | NO  | YES | /v1.0/account/{accountId}/recording/{recordingId}/content |

## Common Permission Errors

If you do not have `ReadCallLog` API Permission set on an application which is submitting request which require this permission, you will receive the following HTTP 403 error response:

```json
{
    "errorCode": "InsufficientPermissions",
    "message": "In order to call this API endpoint, application needs to have [ReadCallLog] permission",
    "errors": [
        {
            "errorCode": "CMN-401",
            "message": "In order to call this API endpoint, application needs to have [ReadCallLog] permission",
            "permissionName": "ReadCallLog"
        }
    ],
    "permissionName": "ReadCallLog"
}
```

If you do not have `ReadCallRecording` API Permission set on an application which is submitting a request which require this permission, you will receive the following HTTP 403 error response

```json
{
    "errorCode": "InsufficientPermissions",
    "message": "In order to call this API endpoint, application needs to have [ReadCallRecording] permission",
    "errors": [
        {
            "errorCode": "CMN-401",
            "message": "In order to call this API endpoint, application needs to have [ReadCallRecording] permission",
            "permissionName": "ReadCallRecording"
        }
    ],
    "permissionName": "ReadCallRecording"
}
```
