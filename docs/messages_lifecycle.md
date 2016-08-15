#Message Availability and Life Cycle

Every outbound or inbound message is created in the system in alive state. This state is tracked using the `availability` property, which is returned as a part of message metadata, and contains the `Alive` value by default.

Once the message is deleted by the user, its availability is changed to `Deleted`, but it still remains in the extension mailbox and can be restored by the user.

After being `Deleted` for a certain time (by default, 5 days) the system erases message data (attachments) and automatically switches its availability to `Purged`. Purged messages cannot be restored but their metadata is stored in the system for some time (by default, 5 days). After that all information about such messages is physically removed from the system.

There is a separate constraint defining the maximum number of messages which can be stored in a mailbox. If this threshold is exceeded the system will delete some old messages automatically.

The user is able to filter out the messages by their availability. By default, unless a specific availability value is passed in the query, all message retrieval endpoints hide the deleted or purged messages.

