# Call Queues

A call queue is a special extension that can hold a group of user extensions. It provides a convenient way to have multiple people (a department) respond to incoming calls.

As an extension, a call queue has a name, an extension number and can be assigned with a direct phone number. Incoming calls dialed directly to that direct number (if assigned) or to the main company number followed by the * and the extension number (e.g. 16501234567*112), will be redirected to the group of extensions defined in the call queue. 


They work by assigning a number of extensions to a call queue grouping. The call queue grouping has an extension of its own. When a call is directed to the queue's extension, the call is connected with the first extension in the queue that is available. If a call is directed to an extension via the queue, and the receiving extension fails to answer, the call will be directed to that extension's voice mail. The call will *not* re-enter the queue.

## Create a Call Queue

Creating a call queue is performed in the [Online Account Portal](https://service.ringcentral.com) under the Groups option.



## Read Call Queue List

The List Extensions endpoint can be used to retrieve a list of call queues, known as departments via the API.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `v1.0/account/{accountId}/extension?type=Department` | Read a list of call queues, aka departments |

**Sample Response**

```json
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

**Sample Response**

```json
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

```json
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

**Sample Response**

```http
HTTP/1.1 204 No Content
Content-Type: application/json
Content-Language: en-US
```

## Read User Queue Agent Presence

A user extension's actual presence status is determined by aggregating a number of different presence statuses including `dndStatus`, `telephonyStatus` and `userStatus`. These and the aggregate presence, `presenceStatus` are available in the presence endpoint.

A user extension's queue agent status is set by the extension presence `dndStatus` property. This can be set to one of four values:

1. `TakeAllCalls`
1. `DoNotAcceptAnyCalls`
1. `DoNotAcceptDepartmentCalls`
1. `TakeDepartmentCallsOnly`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `v1.0/account/{accountId}/extension/{extensionId}/presence` | Read extension presence |

**Sample Response**

```json
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

```json
{
  "dndStatus": "DoNotAcceptDepartmentCalls"
}
```

## Subscribe for Presence Notification Events

You can receive events about presence changes to an extension by subscribing to extension specific presence information using an event filter. To learn more, consult our documentation relating to our [Presence API](../../../voice/presence/).
