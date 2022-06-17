# Application Permissions

In order to work with particular RingCentral API resources the application should have the corresponding permissions. Required API permissions are generally declared at the stage of application registration and confirmed by the user on authentication stage. The following permissions are available:

| Permission                | Description                                                    | Access Type       | Included Permissions |
| ------------------------- | -------------------------------------------------------------- | ----------------- | -------------------- |
| **A2P SMS**               | Sending SMS messages in large numbers                          | Special operation |                      |
| **Accounts**              | Managing accounts: creating new accounts, viewing and updating account information, deleting existing accounts | CRUD | **EditAccounts** |
| **Analytics**             | Access call analytics data via the Analytics product           | Read only         |                      |
| **Call Control**          | Manipulate and controls in progress                            | Special operation |                      |
| **Contacts**              | Creating, viewing, editing and deleting user personal contacts | CRUD              | **ReadContacts**     |
| **DirectRingOut**         | Performing direct (one-legged) ring-out phone calls. *Available on request.* | Special operation |                      |
| **EditAccounts**          | Viewing and updating user account info (including name, business name, address and phone number/account number) | Read and Update | **ReadAccounts**, **EditExtensions** |
| **EditCallLog**           | Viewing and updating user call logs                            | Read and Update   | **ReadCallLog**      |
| **EditCustomData**        | Viewing and updating client custom data (key-value)            | Read and Update   |                      |
| **EditExtensions**        | Viewing and updating user extension info (includes extension name, number, email and phone number, assigned phone numbers, devices and other extension settings) | Read and Update | |
| **EditMessages**          | Viewing and updating user messages                             | Read and Update   | **ReadMessages**     |
| **EditPaymentInfo**       | Viewing and updating account billing settings                  | Read and Update   |                      |
| **EditPresence**          | Getting and modifying user presence information                | Read and Update   | **ReadPresence**     |
| **EditReportingSettings** | Viewing and updating call reporting settings. *Available on request.* | Read and Update   |                      |
| **Faxes**	                | Sending and receiving faxes                                    | Special operation | **ReadMessages**     |
| **Glip**	                | Read and post message, read and manage chats                   | Read and Update   |                      |
| **InternalMessages**      | Sending and receiving intra-company text messages              | Special operation | **ReadMessages**     |
| **Meetings**              | Creating, viewing, editing and deleting meetings               | CRUD              |                      |
| **NumberLookup**          | Looking-up and reserving available phone number                | Special operation |                      |
| **ReadAccounts**          | Viewing user account info (including name, business name, address and phone number/account number) | Read Only | |
| **ReadCallLog**           | Viewing user call logs                                         | Read Only         |                      |	 
| **ReadCallRecording**     | Downloading call recording content                             | Read Only         | **ReadCallLog**      |
| **ReadClientInfo**        | Viewing of client application registered attributes and additional helper information (external URLs, hints, etc.) | Special operation | |
| **ReadContacts**          | Viewing user personal contacts                                 | Read Only         |                      |	 
| **ReadMessages**          | Viewing user messages                                          | Read Only         |                      | 
| **ReadPresence**          | Getting user presence information                              | Read Only         |                      |
| **RingOut**               | Performing two-legged ring-out phone calls                     | Special operation |                      | 
| **RoleManagement**        | Editing and assignment or user roles. *Available on request*   | Special operation |                      |
| **SMS**                   | Sending and receiving (SMS) text messages                      | Special operation | **ReadMessages**     |
| **VoicemailBroadcasting** | Delivering voicemail messages to multiple internal recipients  | Special operation |                      |
| **VoipCalling**           | Registering as VoIP device and making VoIP calls               | Special operation |                      |
| **WebhookSubscriptions**  | Subscribing to and managing webhook notification preferences   | Special operation |                      |
