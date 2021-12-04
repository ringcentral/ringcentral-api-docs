# Call Queues

A call queue is a special extension that can hold a group of user extensions (members). It provides a convenient way to have multiple people (a department) respond to incoming calls.

As an extension, a call queue has a name, an extension number and can be assigned with a direct phone number as well. When a call is directed to the call queue's extension, the call is connected with the members of group in several ways depending on the settings of the call queue:

- **Rotating** - Regularly change the order that you ring available members to evenly distribute calls.
- **Simultaneous** - Ring all available members at the same time. You can do this for up to 10 extensions.
- **Sequential** - Ring available members one at a time in the order you set.

## Create a Call Queue

To create a call queue extension, login your RingCentral account at [Online Account Portal](https://service.ringcentral.com), choose the "Phone System" tab then go under the Group(s) option. Click the "New Call Queue" button to start creating a new one.

!!! Note
    There is no API to create a call queue extension!

## Read Call Queue List

To read all call queue extensions from an account:

* Make a GET request to the `/restapi/v1.0/account/~/call-queues` endpoint.

Required permission(s): ReadAccounts

**Sample Response**
```json hl_lines="6"
{
  "uri":"https://platform.ringcentral.com/restapi/v1.0/account/809646000/call-queues?page=1&perPage=100",
  "records":[
    {
      "uri":"https://platform.ringcentral.com/restapi/v1.0/account/809646000/extension/1081167016",
      "id":"1081167016",
      "extensionNumber":"11131",
      "name":"Sale representative queue"
    },{
      "uri":"https://platform.ringcentral.com/restapi/v1.0/account/809646000/extension/61986637016",
      "id":"61986637016",
      "extensionNumber":"11132",
      "name":"Product support queue"
    },{
      ...
    }
  ],
  "paging":{...}
}
```

Alternatively, you can read all call queue extensions from an account using the `extension` API together with the query filter `/restapi/v1.0/account/~/extension?type=Department`

## Read Call Queue members

To read all members (user extensions) of a call queue:

* Make a GET request to the `/restapi/v1.0/account/{accountId}/call-queues/[groupId]/members` endpoint, where `groupId` is the id of a call queue.

!!! Hint
    A valid `groupId` can be retrieved using the previous API to read all call queue extensions.

Required permission(s): ReadAccounts

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
  ...
}
```

## Update Call Queue members

Members can be added to and removed from an existing call queue.

To add new member(s) to a call queue:

* Specify the `addedExtensionIds` array and add new member(s) with their extension id.

To remove existing member(s) from a call queue:

* Specify the `removedExtensionIds` array and add existing member(s) with their extension id.

* Make a POST request to the `/restapi/v1.0/account/{accountId}/call-queues/[groupId]/bulk-assign` endpoint, where the `groupId` is the id of the call queue extension to be updated.

!!! Notes
    You can specify both `addedExtensionIds` and `removedExtensionIds` parameters to add new members to and to remove old members from a call queue in a single post request.

Required permission(s): EditExtensions

### Sample code to update a call queue's members

The following code sample shows how to add 2 new members to a call queue named "Support Department". Presumed that the "Support Department" call queue exists and the new members' extension id is "888888888" and "999999999", respectively.

=== "JavaScript"

    ```javascript
    {!> code-samples/voice/call-queues.js !}
    ```    

=== "Python"

    ```python
    {!> code-samples/voice/call-queues.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/voice/call-queues.php !}
    ```

=== "C#"

    ```c#
    {!> code-samples/voice/call-queues.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/UpdateCallQueueMembers.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/voice/call-queues.rb !}
    ```
