RingCentral provides developers the ability to view Role and Permission information about users/extensions. Roles and Permissions define the capabilities and features of RingCentral which an extension may execute. This data concerning **Roles** and **Permissions** is presented heuristically as *Authorization Profile* data to developer applications and integrations providing useful context as it relates to a user/extension.

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

## Nomenclature

### Principals

A Principal is an entity that can be authenticated by RingCentral, and always corresponds to some user extension/mailbox or non-user extension (e.g. Call Queue, Shared Line Group) which is allowed to authenticate to RingCentral.

### Objects

An Object (in reference to Roles and Permissions) is a RingCentral resource which requires a permission to access.

### Operations

An Operation is an action RingCentral performs on a certain Object on behalf of a specific Principal.

For configuration options RingCentral supports two main Operations:

* Read
* Edit (which includes Create, Update, and Delete when applicable)

In some cases, an Operation may be very specific, such as "Make Calls".

## AuthZ Profile

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

* Authorization (or AuthZ for short) Profile data contains the effective list of permissions granted to a principal via role assignments (explicit or implicit) and these permissions indicate the access control policy calculated for principal after successful authentication. This data (in whole or in part) is calculated by RingCentral every time permission verification is invalidated for a principal during each request.
* Authorization provile (fully or partially) is built every time RingCentral verifies if a certain permission is granted to the authenticated principal.
* AuthZ Profile data is part of the Extension API resource. Each extension in your RingCentral account will have an associated AuthZ Profile which provides developers with data required to use when executing associated Dictionary lookups for Roles, Permissions, and Permission Categories

**Note:** This data is only accessible at the Extension Level and not at the Account Level. For Account data, please see view the [RingCentral API Account Resource Reference](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefAccount.html)

### Permission Categories

/restapi/v1.0/dictionary/permission-category

```
GET /restapi/v1.0/dictionary/permission-category
Accept: application/json
Accept-Language: en-US
 
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
{
    "uri": ".../restapi/v1.0/dictionary/permission-category?page=1&perPage=100",
    "records": [
        {
            "id": "UserSettings",
            "uri": ".../restapi/v1.0/dictionary/permission-category/UserSettings",
            "displayName": "User Settings",
            "description": "..."
        },
        /* ... other records ... */
    ],
    "paging": ...
    "navigation": ...
}
```

Returns the list of available permission categories based on authenticated principal service plan.

### Permission Category Item

/restapi/v1.0/dictionary/permission-category/{{PERMISSION_CATEGORY_ID}}

```
GET /restapi/v1.0/dictionary/permission-category/UserSettings
Accept: application/json
Accept-Language: en-US
  
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
{
      "id": "UserSettings",
      "uri": ".../restapi/v1.0/dictionary/permission-category/UserSettings",
      "displayName": "User Settings",
      "description": "..."
}
```

Returns information about a particular permission category, helps to understand how permissions are organized by the RingCentral administrator.

### Permissions

/restapi/v1.0/dictionary/permission

```
GET /restapi/v1.0/dictionary/permission
Accept: application/json
Accept-Language: en-US
 
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
{
"uri": ".../restapi/v1.0/dictionary/permission?page=1&perPage=100",
"records": [
    {
      "id": "ReadMessages",
      "uri": ".../restapi/v1.0/dictionary/permission/ReadMessages",
      "displayName": "Read user's messages",
      "description": "...",
      "assignable": false,
      "category": {
         "id": "UserData",
         "uri": ".../restapi/v1.0/dictionary/permission-category/UserData"
      }
    },
    {
      "id": "EditMessages",
      "uri": ".../restapi/v1.0/dictionary/permission/EditMessages",
      "displayName": "Modify and delete user's messages",
      "description": "...",
      "assignable": false,
      "category": {
         "id": "UserData",
         "uri": ".../restapi/v1.0/dictionary/permission-category/UserData"
      },
      "includedPermissions": [
          {
             "id": "ReadMessages",
             "uri": "uri": ".../restapi/v1.0/dictionary/permission/ReadMessages"
          }
       ]
    },
    /* ... other records ... */
  ],
  "paging": ...
  "navigation": ...
}
```

Returns the list of available permissions for a given authenticated principal based on their service plan.

`displayName` and `description` fields should be localized.

This is the resource which should be used by developers for invalidation of permissions upon each subsequently related user action.

A Permission is an approval (positive permission) to perform an operation on one or more API protected resources. RingCentral does not support `negative permissions` due to the complexity and confusion this can cause developers.

To simplify developing with Roles and Permissions, RingCentral has introduced `implied permissions`. What this means is that when some Permission has been granted to a Principal, RingCentral will automatically grant all subsequently required permissions.

Example: "Edit Messages" implies "Read Messages", because it is impossible to edit without being able to read.

Some permissions are only applicable to certain extension types. Example: A principal with "Take Message Only" can have the "Edit Messages" permission, but cannot have the "Make Calls" permission.

Some permissions are only available if it has been enabled for the account. Example: The "Send SMS" permission is only applicable if the SMS feature has been enabled for the account (which is not the case for HIPAA-compliant customers).

Permissions are only able to be assigned to a Role, and cannot be assigned directly to a principal.

### Permission Item

/restapi/v1.0/dictionary/permission/{{PERMISSION_ID}}

```
GET /restapi/v1.0/dictionary/permission/EditMessages
Accept: application/json
Accept-Language: en-US
  
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
{
      "id": "EditMessages",
      "uri": ".../restapi/v1.0/dictionary/permission/EditMessages",
      "displayName": "Modify and delete user's messages",
      "description": "...",
      "assignable": false,
      "category": {
         "id": "UserData",
         "uri": ".../restapi/v1.0/dictionary/permission-category/UserData"
      },
      "includedPermissions": [
          {
             "id": "ReadMessages",
             "uri": "uri": ".../restapi/v1.0/dictionary/permission/ReadMessages"
          }
       ]
}
```

Returns data about the specified permission.

`displayName` and `description` should be localized.

### Roles

/restapi/v1.0/dictionary/user-role/{{roleID}}?custom={{BOOLEAN}}

```
GET /restapi/v1.0/account/~/user-role?custom=false
Accept: application/json
Accept-Language: en-US
  
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
{
"uri": ".../restapi/v1.0/account/4589345367/user-role?custom=false&page=1&perPage=100",
"records": [
   {
      "id": "21008",
      "uri": ".../restapi/v1.0/dictionary/user-role/21008",
      "displayName": "System Administrator",
      "description": "...",
      "custom": false,
      "scope": "Self",
      "hidden": false,
      "lastUpdated": "2015-12-02T15:07:41.000Z",
      "permissions": [
            {
               "uri": "http://psw01-p01-pas01:8080/restapi/v1.0/dictionary/permission/MessagesAndNotifications",
               "id": "MessagesAndNotifications"
            },
            {
               "uri": "http://psw01-p01-pas01:8080/restapi/v1.0/dictionary/permission/ReassignDevices",
               "id": "ReassignDevices"
            }
            /* ... other permissions ... */
     ]
     }
    /* ... other records ... */
  ],
  "paging": ...
  "navigation": ...
}
```

Returns a list of roles available (predefined + custom).
When used with the query parameter `custom` set to false, is equivalent to GET dictionary/user-role associated with the service plan of the authenticated principal.

### Role Item

/restapi/v1.0/dictionary/user-role/{{roleID}}

```
GET /restapi/v1.0/account/~/user-role/21008
Accept: application/json
Accept-Language: en-US
 
HTTP/1.1 200 OK
Content-Type: application/json
Content-Language: en-US
   {
      "id": "21008",
      "uri": ".../restapi/v1.0/account/4589345367/user-role/21008",
      "displayName": "System Administrator",
      "description": "...",
      "custom": false,
      "scope": "Self",
      "hidden": false,
      "lastUpdated": "2015-12-02T15:07:41.000Z",
      "permissions": [
            {
               "uri": "http://psw01-p01-pas01:8080/restapi/v1.0/dictionary/permission/MessagesAndNotifications",
               "id": "MessagesAndNotifications"
            },
            {
               "uri": "http://psw01-p01-pas01:8080/restapi/v1.0/dictionary/permission/ReassignDevices",
               "id": "ReassignDevices"
            }
            /* ... other permissions ... */
     ]
     }
  }
```

A Role is a job function within the context of an organization (RingCentral Account) which semantically provides context regarding the authority and responsibilities conferred upon principals assigned the role.

Roles define sets of permissions granted to a principal, provided the role is active.

Principals can be assigned more than one role.

Roles can be activated automatically upon successful authentication of a principal, or can have specific additional activation criteria. Example: Role can be activated only during company business hours, or if user logs in via a particular endpoint (Soft Phone or Online Account Portal), or role can be activated only if user accepts TOS (Terms of Service) document.

Roles can be either predefined or custom.

Predefined Roles are configured based upon your RingCentral Service Plan.

Custom Roles are defined by end-user (Administrators) and can vary depending upon the account.

RingCentral has introduced the concept of the "primative" role. This role cannot be assigned to a user, but can be used as a building block for other custom roles.

Standard User role is assigned automatically for every user in cases where no other role is defined for a given principal.

Developers can obtain a list of Roles as part of the Dictionary API resource.

/restapi/v1.0/dictionary/user-role

## Roles and Permissions - API Permissions

*ReadAccounts* API permission

## Account Level Operations (Requires Administrator or SuperAdmin Role to access)

### Get List of Assigned Roles

/restapi/v1.0/account/~/assigned-role

Returns the list of assigned roles for a given account.

### Modify List of Assigned Roles

/restapi/v1.0/account/~/extension/~/assigned-role

Modifies the list of assigned roles for given extension. 
At least one role must be assigned to every extension.
It is not allowed to modify assigned roles for non-user extensions.

### Get List of Predefined Roles

/restapi/v1.0/dictionary/user-role

Returns the list of available predefined roles based on the service plan of the authenticated principal.

This API is intended for use in General Web when roles need to be retrieved before creating an account. 

All these roles are read-only by definition. 

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

## Role and Permission Data Aspects

**Note** For the latest, and most up-to-date response specification, always refer to the RingCentral API Developer Guide.

Role and Permission Data is currently broken up into the following structure:

* Extension - Authorization Profile
    * uri
    * permissions
    * permissions.permission
    * permission.id
    * permission.uri
    * permissions.effectiveRole
    * effectiveRole.id
    * effectiveRole.uri
* Dictionary - Roles
    * uri
    * records
        * uri
        * id
        * displayName
        * description
        * custom
        * scope
        * hidden
        * permissions
            * uri
            * id
    * paging
    * [navigation]
* Dictionary - Permissions
    * uri
    * records
        * uri
        * id
        * displayName
        * description
        * assignable
        * readOnly
        * category
            * uri
            * id
        * includedPermissions
            * uri
            * id
    * paging
    * [navigation]
* Dictionary - Permission Categories
    * uri
    * records
        * uri
        * id
        * displayName
    * paging
    * [navigation]
