Like every other RingCentral API resource, the [Call Log](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefCallLogInfo.html) API resource has specific limitiations in place for accessing Call Log data via our API.

Developers can easily determine the Permissions available for an access token by viewing the `scope` property while requesting an `access_token` from RingCentral OAuth endpoints (this works for either [ROPC]() or [Authorization Flow]()). The `scope` property will be a string which can be split on whitespace " ". The following example shows how to use the [RingCentral JS SDK](https://github.com/ringcentral/ringcentral-js) to inspect for the required API Permissions prior to executing these requests (on an ROPC `Server-Only NO UI` Platform Type application).:

```
var RC = require('ringcentral');
var sdk = new SDK({
    server: 'https://platform.devtest.ringcentral.com' // for Production: https://platform.ringcentral.com
    appKey: '{{REPLACE_WITH_YOUR_APP_KEY}},
    appSecret: '{{REPLACE_WITH_YOUR_APP_SECRET}}
});
var platform = sdk.platform();
var permissions;

platform
    .login({
        username: '{{REPLACE_WITH_YOUR_USERNAME}}',
        password: '{{REPLACE_WITH_YOUR_PASSWORD}},
        extension: '{{OPTIONAL_REPLACE_WITH_YOUR_EXTENSION}}
    })
    .then(function(response) {
        var responseJson = response.json();
        // Sanity check
        if(responseJson.hasOwnProperty('scope') {
            permissions = responseJson.scope.split(" ");
        }
    })
    .catch(function(e) {
        console.error(e);
        throw e;
    });

// Handy utility for checking if a permission exists
function checkPermission(permissionName) {
    return -1 === permissions.indexOf(permissionName)
        ? false
        : true
        ;
}

// Example permission invalidation with ReadCallLog
if(checkPermission('ReadCallLog')) {
    platform
        .get('/account/~/call-log')
        .then(function(response) {
            console.log('Account level call log data');
            console.log(response.json());
        })
        .catch(function(e) {
        });
}
```

## API Permissions

There are two main API permissions developers will need to access Call Log data, `ReadCallLog` and `ReadCallRecording`.

You may need to configure your application in the [RingCentral Developer Portal](https://developer.ringcentral.com) to enable your app/integration to use the Call Log API resources. Always refer to the [RingCentral API Developer Guide](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefCallLogInfo.html) for the most up-to-date information on accessing the Call Log API resource.

The following table provides a quick outline about what API permissions the API Keys your application/integration must have associated in order to access each major category of data which Call Log provides.

| Category | Method | Requires `ReadCallLog` | Requires `ReadCallRecording` | Route |
| ---------------------------| ------ | ---------------------- | ---------------------------- | ----- |
| Active Calls                  | GET | YES | NO | /v1.0/account/{accountId}/extension/{extensionId]/active-calls |
| Account List of Call Logs     | GET | YES | NO | /v1.0/account/{accountId}/call-log |
| Extension List of Call Logs   | GET | YES | NO | /v1.0/account/{accountId}/extension/{extensionId}/call-log |
| Call Recording Meta Data      | GET | YES | YES | /v1.0/account/{accountId}/recording/{recordingId} |
| Call Recording Content Data   | GET | NO  | YES | /v1.0/account/{accountId}/recording/{recordingId}/content |

## Common Permission-Related Call Log Error Responses

If you do not have `ReadCallLog` API Permission set on an application which is submitting request which require this permission, you will receive the following HTTP 403 error response:

```
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

```
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
