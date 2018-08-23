RingCentral provides developers the ability to view Authorization Profile information about user extensions. Authorization profiles define the capabilities and features within RingCentral which an extension may execute. This data concerning **Roles** and **Permissions** is presented heuristically as *Authorization Profile* data to developer applications and integrations providing useful context as it relates to a user/extension.

## Authorization Profile

`/restapi/v1.0/account/{accountId}/extension/{extensionId}/authz-profile`

```

GET /restapi/v1.0/account/~/extension/~/authz-profile
Accept: application/json
Accept-Language: en-US
  
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
{
    "uri": ".../restapi/v1.0/account/4589345367/extension/4589345367/authz-profile",
    "permissions": [
        {
            "permission": { "id": "ReadMessages", "uri": ... }, 
            "effectiveRole": { "id": "12346", "uri": ... }, 
            "scope":"Self"
        },
        {
            "permission": { "id": "ReadUserData", "uri": ... }, 
            "effectiveRole": { "id": "987654", "uri": ...}, 
            "scope":"AllExtensions"
        },
        ...
    ]
}
```

* Authorization Profile (or AuthZ for short) data contains the effective list of permissions granted to a principal (extension) via role assignments made explicitly by your RingCentral Account Administrators, and implicitly by RingCentral as it applies to Account Administrator actions for Roles and Permissions. Permissions indicate the access control policy calculated for the currently authenticated  principal. This data (in whole or in part) is calculated by RingCentral every time permission verification is invalidated for a principal during each request.
* Authorization profile (fully or partially) is built every time RingCentral verifies if a certain permission is granted to the authenticated principal.
* AuthZ Profile data is part of the Extension API resource. Each extension in your RingCentral account will have an associated AuthZ Profile

**Note:** This data is only accessible at the Extension Level and not at the Account Level. For Account data, please see view the [RingCentral API Account Resource Reference](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefAccount.html)

## User Permissions and Permission Invalidation

Users are granted specific permissions in RingCentral by Account Administrators within the Online Account Portal for either [Production](https://service.ringcentral.com) or [Sandbox](https://service.devtest.ringcentral.com) accounts.

As a **Best Practice**, it is highly recommended that developers building applications and integrations with RingCentral should perpetually invalidate user actions against the permissions of an extension, and not against the role(s) assigned to a given user extension as permissions assigned to a role can modify over time.

This can be accomplished by Checking Access to verify that a user has a specified permission and can be executed with the following API request (requires a valid `access_token` for the user):

```

GET /restapi/v1.0/account/~/extension/~/authz-profile/check?permissionId=ReadMessages
Accept: application/json
Accept-Language: en-US

HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
{
    "uri": ".../restapi/v1.0/account/4589345367/extension/4589345367/auth-profile/check?permissionId=ReadMessages",
    "successful": true,
    "details": {
        "permission": { "id": "ReadMessages", "uri": ... },
        "effectiveRole": { "id": "12346", "uri": ... },
        "scope": "Self"
    }
}
```

The response attribute `successful` should only ever be `true` if all requested permissions are granted. This API resource is part of the **Light** API Group, which makes it much easier to execute this action for your application or integration.

## Roles and Permissions API Groups and Rate Limits

Since Roles and Permissions are part of the Extension API resource, to make a request to the base route falls under the **Light** API Group.

Dictionary resources used to obtain more detailed and specific Role and Permission information are also **Light** API Group.

You can view the API Developer Guide to understand the rate limits for the Usage Plan of your organization at this URL:

https://developers.ringcentral.com/api-docs/latest/index.html#!#RateLimitDetails.html

## Common Use Cases

Role and Pemrission data can be used in a variety of use cases, the most common use cases are:

* **Security** - Be certain that a principal currently has been granted the necessary permission prior to enabling access to that feature
* **User Experience** - Invalidating the permissions currently granted a principal prior to making a permission-dependent feature available from within your application or integration
* **Risk and Loss Prevention** - Ensuring you are not exposing risk or loss to your application/integration users and their organizations

### Role and Permission Anti-Patterns

It is also important to understand anti-patterns of Roles and Permissions, these are ways developers should **not** use this resource.

* **Role Assumption** - Developers should never ever assume that because a principal has a specific Role that principal will have an associated permission which is generally available
* **Session Permission Caching** - Never store or cache permissions for a given principal for use during an entire session, as permissions may be revoked at any time
