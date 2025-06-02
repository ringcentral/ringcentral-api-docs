## Enabling SMS on RingCentral Phone Numbers

By default, RingCentral phone numbers—whether assigned directly to an extension or purchased separately—do not have SMS functionality enabled.

To enable SMS functionality, follow the appropriate steps based on the type of phone number:

#### Local (Domestic) Numbers

If you are enabling SMS functionality on local phone numbers in the U.S. or Canada:

  1. Register your brand and campaign: You must complete both brand and campaign registration and receive approval before proceeding.

  2. Link phone numbers to your approved campaign: Only phone numbers that are linked to an active, approved campaign will be enabled for SMS messaging.

[Learn more about registering your business to send text messages](https://support.ringcentral.com/article-v2/Setting-up-TCR-registration-assigning-numbers-to-SMS-campaigns.html?brand=RingCentral&product=RingEX&language=en_US).

#### Toll-Free Numbers

If you're enabling SMS functionality on toll-free numbers:

  1. Complete the toll-free verification process: Toll-free numbers must be verified to comply with industry regulations and to enable SMS.

[Learn more about SMS toll-free verification for your numbers](https://support.ringcentral.com/article-v2/Verifying-your-toll-free-number-for-SMS.html?brand=RingCentral&product=RingEX&language=en_US).

Once your number is properly registered, it will be SMS-enabled. Based on the registration configuration, the system will attach the following features to the number’s metadata, indicating that it supports sending and receiving SMS and MMS messages:

* `SmsSender` – Enables standard SMS messaging
* `MmsSender` – Enables MMS messaging (multimedia)
* `InternationalSmsSender` – Enables sending SMS messages to international numbers

!!! note
    - If a phone number is provisioned for high volume SMS, the number metadata feature will be `A2PSmsSender`
    - If a toll-free number is provisioned for SMS, the phone number will not have the `MmsSender` feature.
    - The `InternationalSmsSender` feature is enabled if the phone number is enabled for International SMS.

## Understanding Phone Number Ownership and Feature Assignment in RingCentral

In RingCentral, each account has a phone number assigned as the main company number and additional purchased phone numbers. The additional phone numbers can be assigned and reassigned to different resources. The assigned resource can be a user extension, a call queue extension, an IVR extension, a site (a site itself is a special extension) or the main site’s auto-receptionist.

Typically, all phone numbers with voice capability include the `CallerId` feature in their metadata, indicating that the number can be used as a caller ID. If a phone number is SMS-enabled, the phone number will also have the SMS features as discussed in the previous section.

When a phone number is assigned to a resource, the resource is the owner of the phone number, but the features of the number are assigned differently depending on the type of the resource.

1. If the resource is a user extension, that extension is automatically assigned with all the features that number has, allowing the user extension to use the number to make phone calls and to send or receive SMS messages (provided that the number is SMS-enabled)
2. If a phone number is assigned to a common resource, such as a site or an IVR, the `CallerId` feature is automatically assigned to all user extensions belonging to that common resource. The SMS features of the number can be assigned (or reassigned) to only 1 selected extension and only that selected extension can send or receive SMS messages from that phone number. The assignment can be done via the [Account Admin Portal](https://service.ringcentral.com) via the company auto-receptionist general settings. For step-by-step guidance, please refer to [this article](https://support.ringcentral.com/article-v2/Configuring-company-call-handling.html?brand=RingCentral&product=RingEX&language=en_US).
3. If a phone number is assigned to a call queue, the `CallerId` feature is automatically assigned to all call queue’s members. But the SMS features of the number must be manually assigned (or reassigned) to only one user extension, regardless of if the user is a member of the call queue or not. The assignment must be done through the [Account Admin Portal](https://service.ringcentral.com). For step-by-step guidance, please refer to [this article](https://support.ringcentral.com/article-v2/assigning-an-sms-recipient-for-call-queues-in-the-ringcentral-app-and-admin-portal.html?brand=RingCentral&product=RingEX&language=en_US).

The following table shows how the phone number features are assigned to extensions based on the type of resource which owns the phone number:

|Assigned Resource|Number Usage Type|CallerId feature|SMS features|
|||||
|User extension|Direct Number|The extension itself|The extension itself|
|Auto-Receptionist| Main Company Number & Company Number|All extensions under the account|Dedicated assigned user/call queue extension|
|Call Queue Extension|Direct Number|All call queue’s members|Dedicated assigned user/call queue extension|
|IVR Extension|Direct Number|All user extensions under the site where the IVR is created for|Dedicated assigned user/call queue extension|
|Site Extension|Direct Number|All user extensions under the site|Dedicated assigned user/call queue extension|

Only the extension assigned to a phone number’s SMS feature can send and receive SMS messages using that number.
