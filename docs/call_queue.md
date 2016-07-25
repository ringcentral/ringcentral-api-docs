Call queues are a poplar way to have multiple people respond to incoming calls.

## Create a Call Queue

Creating a call queue is performed in the [Online Account Portal](https://service.ringcentral.com) under groups.

## Read Call Queue List

The List Extensions endpoint can be used to retrieve a list of call queues, known as departments via the API.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `v1.0/account/{accountId}/extension?type=Department` | Read a list of call queues, aka departments |

**Example Request**

```bash
GET /restapi/v1.0/account/11111111/extension?type=Department
Accept: application/json
Content-Type: application/json
Accept-Language: en-US
Authorization: Bearer MyToken
```

**Example Response**

```bash
HTTP/1.1 200 OK
Content-Type: application/json

{
  "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension?type=Department&page=1&perPage=100",
  "records" : [
    {
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/22223333",
      "id" : 22223333,
      "extensionNumber" : "201",
      "contact" : {
        "firstName" : "Sales Queue",
        "email" : "john.doe@example.com"
      },
      "name" : "Sales Queue",
      "type" : "Department",
      "status" : "Enabled",
      "permissions" : {
        "admin" : {
          "enabled" : false
        },
        "internationalCalling" : {
          "enabled" : false
        }
      },
      "profileImage" : {
        "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/22223333/profile-image"
      }
    }
  ],
  "paging" : {...}
}
```

## Read Queue Agent List

To get the agent members of a queue, call the department members endpoint.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `v1.0/account/{accountId}/department/{departmentId}/members` | Read department members |

**Example Request**

```bash
POST /restapi/v1.0/account/11111111/department/22223333/members
Accept: application/json
Authorization: Bearer MyToken
```

**Example Response**

```bash
HTTP/1.1 200 OK
Content-Type: application/json

{
  "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/department/22223333/members?page=1&perPage=100",
  "records" : [
    {
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/11112222",
      "id" : 11112222,
      "extensionNumber" : "101"
    },
    {
      "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/11111111/extension/11113333",
      "id" : 11113333,
      "extensionNumber" : "102"
    }
  ],
  "paging" : {...}
  "navigatin" : {...}
}
```

## Update Queue Agent List

Users can be added and removed as queue agents using the `account/{accountId}/department/bulk-assign` endpoint and the extension ids of interest.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `v1.0/account/{accountId}/department/bulk-assign` | Add and remove multiple users from one or more departments |

**Example Request**

```bash
POST /restapi/v1.0/account/11111111/department/bulk-assign
Accept: application/json
Content-Type: application/json
Authorization: Bearer MyToken

{
  "items" : [
    {
      "departmentId" : "22223333",   
      "addedExtensionIds" : [
        "11112222", "11113333"
      ],
      "removedExtensionIds" : [
        "11114444", "11115555"
      ]
    }, 
    {
      "departmentId" : "22224444",   
      "addedExtensionIds" : [
        "11112222", "11113333"
      ]
    }
  ] 
}
```

**Example Response**

```bash
HTTP/1.1 204 No Content
Content-Type: application/json
Content-Language: en-US
```

## Read User Queue Agent Presence

A user extension's actual presence status is determined by aggregating a number of different presence statuses including `dndStatus`, `telephonyStatus` and `userStatus`. These and the aggregate presence, `presenceStatus` are availabe in the presence endpoint.

A user extension's queue agent status is set by the extension presence `dndStatus` property. This can be set to one of four values:

1. `TakeAllCalls`
1. `DoNotAcceptAnyCalls`
1. `DoNotAcceptDepartmentCalls`
1. `TakeDepartmentCallsOnly`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `v1.0/account/{accountId}/extension/{extensionId}/presence` | Read extension presence |

**Example Request**

```bash
GET /restapi/v1.0/account/11111111/extension/11112222/presence
Accept: application/json
Authorization: Bearer MyToken
```

**Example Response**

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 530

{
  "uri" : "https.../restapi/v1.0/account/11111111/extension/11112222/presence",
  "extension" : {
    "uri" : "https.../restapi/v1.0/account/11111111/extension/11112222",
    "id" : 11112222,
    "extensionNumber" : "101"
  },
  "presenceStatus" : "Available",
  "telephonyStatus" : "NoCall",
  "userStatus" : "Available",
  "dndStatus" : "TakeAllCalls",
  "message" : "Hello, World",
  "allowSeeMyPresence" : true,
  "ringOnMonitoredCall" : false,
  "pickUpCallsOnHold" : false
}
```

## Update User Queue Agent Presence

To enable or disable an user extension's queue agent presence, update the extension's presence `dndStatus` property.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `PUT` | `v1.0/account/{accountId}/extension/{extensionId}/presence` | Update extension presence |

**Example Request**

```bash
PUT /restapi/v1.0/account/11111111/extension/11112222/presence
Accept: application/json
Authorization: Bearer MyToken

{
  "dndStatus": "DoNotAcceptDepartmentCalls"
}
```

## Subscribe for Presence Notification Events

To receive events about presence changes to an extension, you can make a subscription for the following extension presence information using the following event filter. To subscribe for multiple extensions, multiple event filters, one or more per extension can be supplied for a single subscription.

`v1.0/account/{accountId}/extension/{extensionId}/presence?detailedTelephonyState=true`