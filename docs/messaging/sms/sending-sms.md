# Sending SMS

SMS messages can be sent from a RingCentral phone number only by the owner of the phone number. In other words, a user extension can only send SMS messages from the phone number(s) which are assigned to that user extension, be it a direct phone number, a digital line (phone number associated with a device). In addition, the phone number(s) must have the SMS feature enabled. This requirement means that when using the `/sms` API to send SMS messages, an application must be authenticated by a user extension who owns phone numbers, read the user's phone number(s), check the number SMS feature before choosing a phone number to send a text message from.

Main company number and company number(s) may have SMS feature enabled. These phone numbers are usually the common voice caller ids for all user extensions under the same account. But for sending text messages from those phone numbers, only the user extension who is assigned to handle SMS for those company numbers would be allowed. The assignment is default to the main super admin user, but can be changed from the [account admin portal](https://service.ringcentral.com) via the company auto-receptionist general settings.

## Send an SMS

Try out the [SMS Quick Start Guide](../../quick-start/)

!!! important "Sending text message on behalf of other users?"
    * Sending an SMS on behalf of a call queue is not supported currently. If you need to send SMS messages from a call queue direct number, you must create the call queue without having a call queue manager. The call queue must be set with unique email address and password and to send SMS from that call queue number, the app must be authenticated using the call queue's login credentials.
    * Even a super admin user cannot send a text message on behalf of other user extensions!
    * Sending SMS messages to Disabled and Frozen extension types is not allowed. When an SMS message is sent to a Disabled/Frozen extension, it is dropped. The dropped message is saved only in the sender's outbox.
