# Retrieving and Modifying Message Histories

The RingCentral API allows clients to retrieve and modify message histories. This allows developers to modify the read status of a message, or even delete a message, like an internal pager message or a voicemail.

Here are a few examples of how developers can interface with the RingCentral Message Store.

## Updating the Read Status

Individual messages can also be modified.

!!! note "The RingCentral API only allows developers to change the Read Status of a message."

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/message-history-read-status.js !}
    ```

## Deleting a Message

One or more messages can be deleted as well. Deleting messages is a two-step process. The first call changes the status of a message to "Deleted." The second call will purge the message, the equivalent of "emptying the trashcan." Developers can optionally skip this two-step process by using the `purge=true` parameter in the delete request.

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/message-history-delete.js !} 
    ```
