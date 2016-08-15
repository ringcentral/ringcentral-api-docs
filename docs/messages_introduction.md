# Messages: Intro 
A wide range of telecommunication tools are used by business today: cell phones, desk phones, laptops, PDAs, fax machines, voice mailboxes, etc. the RingCentral service functions as a unified messaging system and provides customers with a seamless interface to interact with various communication media. Using the API you can create applications enabled to work with all kinds of messages available to the RingCentral customers:

- *SMS* — text messages sent via standard SMS communication technology;

- *Fax* — facsimile messages sent via fax-rendering system;

- *Pager* — text messages sent from one extension to another within a single RingCentral account;

- *Voicemail* — audio messages recorded by the caller when the called party is temporary unavailable.

Every RingCentral extension has an assigned mailbox that is used to store all the incoming and outgoing messages for this extension. You can access all messages available for a certain extension via the unified message store endpoint. In addition, for convenience there are endpoints available for specific types of messages: SMS, Faxes and Pager messages.

Unified `message-store` endpoint allows:

- retrieving a list of messages filtered by a specific criteria from an extension mailbox;

- retrieving content and metadata of a message;

- changing the status of a message (read/unread);

- removing a message from an extension mailbox.

Dedicated `fax`, `sms` and `company-pager` endpoints allow working with messages of the particular type including creating and sending new messages out.


