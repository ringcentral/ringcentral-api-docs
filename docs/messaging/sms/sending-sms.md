### Sending SMS from a user extension phone number

SMS messages in RingCentral can only be sent from phone numbers that are owned by the authenticated user extension. Ownership means the phone number is directly assigned to the user's extension—either as a direct number or as part of a digital line (i.e., a number associated with a physical or softphone device).

When using the RingCentral `/restapi/v1.0/account/~/extension/~/sms` endpoint to send messages, your application must:

  1. Authenticate a user extension.
  2. Retrieve the list of phone numbers assigned to the authenticated user by calling the `/restapi/v1.0/account/~/extension/~/phone-number` endpoint.
  3. Check that the selected number has SMS capabilities. This can be verified by checking the features field in the phone number metadata (should include "SmsSender").
  4. Send the message using the number that meets the above criteria as the from.phoneNumber in the SMS request payload.

!!! important "Sending text message on behalf of other users?"
    * Even a super admin user cannot send a text message on behalf of other user extensions!
    * Sending SMS messages to Disabled and Frozen extension types is not allowed. When an SMS message is sent to a Disabled/Frozen extension, it is dropped. The dropped message is saved only in the sender's outbox.

#### Use Case Example: Financial Advisor Using a Direct Number for SMS

A financial advisor wants to maintain direct and personalized communication with clients through text messaging. The advisor uses their assigned direct number (+1-555-987-XXXX) to send appointment reminders, respond to inquiries, and share updates on financial plans.

This setup ensures that:

    * Clients always receive SMS messages from the advisor’s personal direct number.
    * The communication remains private, professional, and traceable to a specific agent.
    * There's no confusion caused by shared company numbers or call queues.

If another advisor in the firm also wants to use SMS, the system administrator can enable SMS capabilities for that advisor’s direct number through the RingCentral Admin Portal.

### Sending SMS from company phone numbers

Company numbers—including the main company number, site phone number and any additional numbers—may have the SMS feature enabled. These numbers typically serve as shared voice caller IDs for all user extensions under the same account.

However, when it comes to sending SMS messages from these shared numbers, only designated user extensions are authorized. By default, the main super admin user is assigned SMS access for these numbers. This assignment can be changed at any time via the [Account Admin Portal](https://service.ringcentral.com) via the company auto-receptionist general settings. For step-by-step guidance, please refer to [this article](https://support.ringcentral.com/article-v2/Configuring-company-call-handling.html?brand=RingCentral&product=RingEX&language=en_US).

!!! note
    Even though the phone numbers are shared for voice, SMS sending is permission-based and limited to specific user extensions.

The user extension assigned to handle SMS messages for company phone numbers is considered the owner of those messages. All sent and received SMS messages will be stored in that user’s message store. If the assignment is later changed to another user extension, the original user will no longer be able to send or receive SMS messages using the company numbers. However, they will still have access to all previously sent and received messages stored in their message store. The newly assigned user will gain the ability to send and receive new SMS messages using the company numbers, and all new messages will be stored in the new user message store.

#### Use Case Example: Customer Support Team Using a Main Company Number for SMS

A customer support team uses the main company number (+1-555-123-XXXX) as the caller ID for both inbound and outbound voice calls. This allows all support agents to make and receive calls under a single, recognizable business identity.

However, to maintain consistency in SMS communication and prevent conflicting messages, only the lead support agent is authorized to send and receive SMS using the main company number.

This setup ensures that:

* Customers receive text messages from a trusted, centralized number.
* SMS communication remains consistent and avoids duplication across multiple agents.
* SMS access is limited to a designated team member to preserve accountability.

If another agent requires SMS access on the main company number, the system administrator can grant access by configuring the appropriate permissions in the RingCentral Admin Portal. However, at this time, SMS access for the main company number can be granted to only one user or agent.

The same setup applies to Site Numbers, allowing large organizations to enable SMS capabilities across multiple locations. This is useful when each site has its own number and dedicated agent handling communications.

For example:

|Site|Assigned agent|Phone number|
||||
|Site 1 (California)|Jake|+1-424-123-XXXX|
|Site 2 (Virginia)|Bob|+1-571-123-YYYY|
|Site 3 (Texas)|Marley|+1-737-123-ZZZZ|

This configuration allows each agent to send and receive SMS messages using their respective site number, ensuring localized, direct communication while maintaining separation between regional teams.

### Sending SMS from a call queue's direct phone number (Beta and subject to be changed)

Call queues may have a direct phone number assigned to them, and in some cases, this number may have SMS capabilities enabled. However, by default, call queues are not configured to send SMS messages.

To enable the SMS feature for a call queue's direct number, a specific user extension must be assigned to handle SMS on behalf of that number. This assignment ensures that outgoing messages are managed by a designated user, avoiding confusion or unauthorized use. The assignment must be done through the [Account Admin Portal](https://service.ringcentral.com). For step-by-step guidance, please refer to [this article](https://support.ringcentral.com/article-v2/assigning-an-sms-recipient-for-call-queues-in-the-ringcentral-app-and-admin-portal.html?brand=RingCentral&product=RingEX&language=en_US).

Once assigned, the selected user can send and receive SMS messages using the call queue's direct number, typically through their desktop app, mobile app, or SMS API integration. If the SMS assignment is later transferred to a different user extension, the original user will lose the ability to send or receive SMS messages using the call queue’s number. The newly assigned user will then gain the ability to manage SMS communication on behalf of the call queue.

The user extension assigned to handle SMS messages for a call queue’s direct phone number does not own those messages. Instead, the user is granted permission to send and receive SMS messages on behalf of the call queue. All messages sent and received using the call queue’s number are stored in the call queue’s message store, not in the individual user’s message history.

!!! important "Who can access a call queue's message store? The assigned user does not automatically have access to view the call queue’s message store. To view message history, the user must either:"
    * Be a Super Admin, or
    * Be designated as the Call Queue Manager with either the “Full Access” or “Messages” permission.

#### Use Case Example: Sales Team Using a Call Queue Number for SMS

A company’s Sales department uses a call queue with the direct number +1-555-234-XXXX to manage inbound inquiries. Incoming calls to this number are automatically routed to the next available sales agent, ensuring prompt customer engagement.

To maintain brand consistency and streamline communication, the company wants to use the same call queue number for sending follow-up SMS messages to prospects.

To enable this, the Sales Manager logs into the RingCentral Admin Portal, navigates to the Sales call queue settings and assigns SMS permissions for the call queue number to the lead sales representative’s user extension.

With this setup:

  * The lead sales rep can send SMS messages—such as appointment reminders, follow-ups, or promotional offers—directly from +1-555-234-XXXX.
  * All outbound communication stays consistent with the number customers already associate with the sales team.
  * Only the assigned user can send SMS, maintaining clarity and avoiding message duplication.

## Send an SMS

Try out the [SMS Quick Start Guide](../quick-start.md)
