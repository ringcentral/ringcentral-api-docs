# Thread messaging event notifications

Push notifications help to keep your application informed about SMS thread messaging activities. Any SMS handler assigned to a common resource to handle thread messages can subscribe to the [RingCentral push notification service](../notifications/index.md) to receive events.

To receive thread messaging notification events, [subscribe for one or more event filters](../notifications/event-filters/thread-messaging-event-filter.md).

There are two event filters:

| Event Filter | Name | Description |
|-|-|-|
| `/restapi/v1.0/account/~/message-threads/sync` | Thread event | An event filter for getting notifications when there is some change within message threads. E.g. when a new thread is assigned to an SMS handler, or when a thread is resolved. |
| `/restapi/v1.0/account/~/message-threads/entries/sync` | Message event | An event filter for getting notifications when there is some change in the thread messages. E.g. when there is a new inbound or outbound message. |

Due to the complexity and optimization reason, the system fires events with just the `lastModifiedTime` value in the event payload. Developers can use the event notification as a trigger to call the [sync message thread](../thread-handling/#sync-message-threads) or the [sync thread entries](../message-handling/#sync-thread-entries-messages) API to get the actual data.

## Thread messaging event recipients

| Action | Thread event | Message event | Event Recipients |
| :---- | :---- | :---- | :---- |
| New inbound msg (unassigned) | Yes | Yes | All members. |
| Inbound msg (assigned) | No | Yes | Current assignee |
| New outbound msg | Yes | Yes | Current assignee |
| Reply outbound msg | No | Yes | Current assignee |
| Assigning thread | Yes | No | All members |
| Reassigning thread | Yes | No | All members |
| Resolving thread | Yes | No | All members |
| Deleting thread | No | No | All members |
