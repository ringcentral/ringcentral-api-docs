# Thread messaging event

| Event Filter | Description |
|-|-|
| `/restapi/v1.0/account/~/message-threads/entries/sync` | An event filter for getting notifications when there is some change in the thread messages. E.g. when there is a new inbound or outbound message. |
| `/restapi/v1.0/account/~/message-threads/sync` | An event filter for getting notifications when there is some change within message threads. E.g. when a new thread is assigned to an SMS handler, or when a thread is resolved. |

Due to the complexity and optimization reason, the system fires events with just the lastModifiedTime value in the event payload. Developers can use the event notification as a trigger to call the sync message thread or the sync thread entries API to get the actual data.

* Required app scope: `SMS`
