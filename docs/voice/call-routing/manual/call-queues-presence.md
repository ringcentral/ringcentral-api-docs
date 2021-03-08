# Call Queue Member Status (Presence)

The Call Queue Presence (Status) APIs allow developers to develop a call queue management application, which can control call queues and members of a call queue to receive or by-pass incoming calls via a call queue dynamically.

The User Presence APIs can be used together with the Call Queue Presence APIs to build sophisticated call routing application.

## List company call queues

To list all call queues of an account, make a GET request to the `/restapi/v1.0/account/~/call-queues` endpoint.

Required permission(s): ReadAccounts

### Sample code to list all company call queues
=== "HTTP"

    ```http
    GET /restapi/v1.0/account/~/call-queues HTTP/1.1
    Content-Type: application/json   	
    ```

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-queues-read-call-queues.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/call-queues-read-call-queues.py !}
    ```

### Sample response

```json hl_lines="6-8"
{
  "uri": '...',
  "records": [
    {
      "uri": 'https://platform.ringcentral.com/restapi/v1.0/account/809646000/extension/1081167000',
      "id": '1081167000',
      "extensionNumber": '11131',
      "name": 'Sample call queue'
    },{
      "uri": 'https://platform.ringcentral.com/restapi/v1.0/account/809646000/extension/61986637000',
      "id": '61986637000',
      "extensionNumber": '11400',
      "name": 'Demo call queue'
    }
  ],
  "paging": { ... },
  "navigation": { ... }
}
```

## Read a call queue's info

Each call queue has the boolean `editableMemberStatus` property to specify whether or not its members are allowed to change their queue status.

To check if members of call queue can change their status or not, make a GET request to the `/restapi/v1.0/account/~/call-queues/[callQueueId]` endpoint then check the `editableMemberStatus`.

Required permission(s): ReadAccounts

### Sample code to read call queue member status editable property
=== "HTTP"

    ```http
    GET /restapi/v1.0/account/~/call-queues/1081167016 HTTP/1.1
    Content-Type: application/json   	
    ```

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-queues-read-member-status-editable.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/call-queues-read-member-status-editable.py !}
    ```

### Sample response

```json hl_lines="6"
{
  "id": '1081167016',
  "name": 'Sample',
  "extensionNumber": '11131',
  "status": 'Enabled',
  "editableMemberStatus": false
}
```

## Enable/disable call queue members to change their status

To enable or disable call queue members to change their status, make a PUT request to the `/restapi/v1.0/account/~/call-queues/[callQueueId]` endpoint with the `editableMemberStatus` property in request body set to `true` or `false`, respectively.

Required permission(s): EditExtensions

### Request

=== "HTTP"
    ```http
    PUT /restapi/v1.0/account/~/call-queues/1081167016 HTTP/1.1
    Content-Type: application/json   

    {
       "editableMemberStatus": true
    }   
    ```

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-queues-enable-member-status-editable.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/call-queues-enable-member-status-editable.py !}
    ```


## Read Call Queue Members Status

Each member of a call queue has 2 different call queue statuses:

1. The `acceptQueueCalls` status specifies if the member will receive or ignore incoming calls via any call queue it belongs to. This member queue status reflects the member's `DnD` presence status.
2. The `acceptCurrentQueueCalls` status specifies if the member will receive or ignore incoming calls via a single (the current) call queue it belongs to.

To read a call queue's members status, make a GET request to the endpoint `/restapi/v1.0/account/~/call-queues/[callQueueId]/presence`.

Required permission(s): ReadPresence

### Sample code to read call queue member status
=== "HTTP"
    ```http
    GET /restapi/v1.0/account/~/call-queues/[callQueueId]/presence HTTP/1.1
    Content-Type: application/json   
    ```

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-queues-read-member-status.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/call-queues-read-member-status.py !}
    ```

### Sample response
```json hl_lines="10-11"
{ "records" : [
  {
    "member":
    {
      "id": '979428000',
      "name": 'James Smith',
      "extensionNumber": '12104',
      "site": { "id": '62366997000', "name": 'Main Site' }
    },
    "acceptQueueCalls": true,
    "acceptCurrentQueueCalls": true
  },{
    "member": {...},
    "acceptQueueCalls": true,
    "acceptCurrentQueueCalls": false
  },{
    "member": {...},
    "acceptQueueCalls": true,
    "acceptCurrentQueueCalls": true }
  ]
}
```

## Update Call Queue Member Status

Every member in a call queue can decide if it wants to receive incoming calls via the call queue or not.

To change a member or several members status of a call queue to receive or reject incoming calls via that call queue, make a PUT request to the `/restapi/v1.0/account/~/call-queues/[callQueueId]/presence` endpoint with the `acceptCurrentQueueCalls` property in request body set to `true` or `false`, respectively.

A great use case is, for example, a tech support team consists of 8 agents who take incoming calls via a "Support call queue", 4 agents will be on-duty from 8:00 to 12:00 and the other 4 agents will be on-duty from 12:00 to 16:00. You can use this API to change the status of all the agents according to their on-duty/off-duty schedule.

Required permission(s): EditPresence

### Sample code to enable/disable a call queue's member status
=== "HTTP"
    ```http
    PUT /restapi/v1.0/account/~/call-queues/1081167016/presence HTTP/1.1
    Content-Type: application/json   

    {
       "records": [
        {
          "member": { "id" : "111111111" },
          "acceptCurrentQueueCalls": true
        },
        {
          "member": { "id" : "222222222" },
          "acceptCurrentQueueCalls": false
        },
       ]
    }   
    ```

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-queues-update-member-status.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/call-queues-update-member-status.py !}
    ```

!!! Note
    The member id in the record object is the extension id of the member

## Update Extension's Call Queues Status

To change the status of a member of a call queue or several call queues, in which the member belongs to, to receive or reject incoming calls via those call queues, make a PUT request to the `/restapi/v1.0/account/~/extension/[extensionId]/call-queue-presence` endpoint with the `acceptCalls` property in request body set to `true` or `false`, respectively.

A great use case is, for example, a receptionist who works for 2 different doctors in the same clinic. Monday to Wednesday she takes incoming calls from a call queue for doctor A. And Thursday to Friday she takes incoming calls from a call queue for doctor B. You can use this API to change the status of the receptionist to receive incoming calls from each call queue based on her schedule.

Required permission(s): EditPresence

### Sample code to enable/disable extension call queue member status
=== "HTTP"
    ```http
    PUT /restapi/v1.0/account/~/extension/111111111/call-queue-presence HTTP/1.1
    Content-Type: application/json   

    {
       "records": [
        {
          "callqueue": { "id" : "1081167000" },
          "acceptCalls": true
        },
        {
          "callqueue": { "id" : "62284876000" },
          "acceptCalls": false
        }
       ]
    }   
    ```

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-queues-update-extension-status.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/call-queues-update-extension-status.py !}
    ```

!!! Note
    - The call queue id in the record object is the extension id of the call queue extension
    - An extension can change its `acceptCalls` status to receive or reject incoming calls via that call queue only if the call queue `editableMemberStatus` property is set to `true`.

## Enable/disable call queue member's `acceptQueueCalls` status  

A call queue member can decide to receive or reject incoming calls via all call queues he/she belongs to. This feature is controlled by the `acceptQueueCalls` property of a member in a call queue. The value can be set using the member's `DnD` (Do not Disturb) presence status.

```json hl_lines="9"
{
  "member":
  {
    "id": '979428000',
    "name": 'James Smith',
    "extensionNumber": '12104',
    "site": { "id": '62366997000', "name": 'Main Site' }
  },
  "acceptQueueCalls": true,
  "acceptCurrentQueueCalls": true
}
```

!!! Note
    1. If a call queue's member `DnD` status is set to `DoNotAcceptAnyCalls`, the `acceptQueueCalls` value if that member in all call queues he/she belongs to will be `false` and the member will not receive any incoming calls directly or via call queues.
    2. If a call queue's member `DnD` status is set to `DoNotAcceptDepartmentCalls`, the `acceptQueueCalls` value if that member in all call queues he/she belongs to will be `false` and the member will not receive any incoming calls via call queues, whilst the member still can receive direct incoming calls to his/her own numbers.

To disable a call queue's member taking incoming calls via all call queues it belongs to, make a PUT request to the `/restapi/v1.0/account/~/extension/[extensionId]/presence` endpoint with the `dndStatus` property in request body set to `DoNotAcceptDepartmentCalls`.

To enable a call queue's member taking incoming calls via all call queues it belongs to, make a PUT request to the `/restapi/v1.0/account/~/extension/[extensionId]/presence` endpoint with the `dndStatus` property in request body set to `TakeAllCalls`.

Required permission(s): EditPresence

### Sample code to enable/disable a call queue's member status
=== "HTTP"
    ```http
    PUT /restapi/v1.0/account/~/extension/111111111/presence HTTP/1.1
    Content-Type: application/json   

    {
       "dndStatus": "DoNotAcceptDepartmentCalls"
    }   
    ```

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-queues-update-extension-dnd.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/call-queues-update-extension-dnd.py !}
    ```

!!! Important
    Do not use the `TakeDepartmentCallsOnly` value to set a member's `DnD` status. It is existed for legacy purpose only and is not supported via API.
