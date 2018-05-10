# Call Monitoring Groups

RingCentral provides REST APIs to manage Call Monitoring Groups.

You can learn more about Call Monitoring here:

* [Call Monitoring Overview](https://www.ringcentral.com/office/features/call-monitoring/overview.html)
* [Call Monitoring KB Article](https://success.ringcentral.com/articles/RC_Knowledge_Article/8086)

RingCentral provides the following APIs for Call Monitoring:

## Get Call Monitoring Groups

The following endpoint can be called to retrieve a list of call monitoring groups.

* Endpoint: `GET /restapi/v1.0/account/{accountId}/call-monitoring-groups`
* Application Permission: `ReadAccounts`
* User Permission: `ReadExtensions`

This API supports the following query parameters:

| Name | Type | Location | Notes |
|------|------|----------|-------|
| `accountId` | `string` | path | |
| `page` | `integer` | query string | |
| `perPage` | `integer` | query string | | 
| `memberExtensionId` | `string` | query string | `extensionId` filter|

## Get Call Monitoring Group members

This API call returns a list o f

* Endpoint: `GET /restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}/members`
* Application Permission: `ReadAccounts`
* User Permission: `ReadExtensions`

| Name | Type | Location | Notes |
|------|------|----------|-------|
| `accountId` | `string` | path | |
| `page` | `integer` | query string | |
| `perPage` | `integer` | query string | | 

## Edit Call Monitoring Group

The Edit Call Monitoring Group API allows modification of user members and their permissions.

* Endpoint: `POST /restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}/bulk-assign`
* Application Permission: `EditExtensions`
* User Permission: `Groups`
* Content-Type: `application/json`

| Name | Type | Location | Notes |
|------|------|----------|-------|
| `accountId` | `string` | path | |
| `groupId` | `string` | path | |
| `addedExtensions` | `[]CallMonitoringExtensionUpdate` | JSON body |
| `removedExtensions` | `[]CallMonitoringExtensionUpdate` | JSON body |
| `updatedExtensions` | `[]CallMonitoringExtensionUpdate` | JSON body |

### CallMonitoringExtensionUpdate

| Name | Type | Notes |
| `id` | string | an extensionId. Only the following extension types are allowed: `User`, `DigitalUser`, `VirtualUser`, `FaxUser`, `Limited` |
| `permissions` | `[]string` | Valid values include: `Monitoring`, `Monitored` |

### Example Request

```
POST /restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}/bulk-assign
Authorization: Bearer <myAccessToken>
Content-Type: `application/json`

{
  "addedExtensions": [
    {
      "id": "11111111",
      "permissions": ["Monitoring"]
    },
    {
      "id": "22222222",
      "permissions": ["Monitored"]
    },
    {
      "id": "33333333",
      "permissions": ["Monitored", "Monitoring"]
    }
  ],
  "removedExtensions": [
    {
      "id": "44444444"
    }
  ],
  "updatedExtensions": [
    {
      "id": "55555555",
      "permissions": ["Monitored", "Monitoring"]
    }
  ]
}
