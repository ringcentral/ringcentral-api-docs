# High Volume SMS

RingCentral's High Volume SMS APIs allow you to send a large number of SMS texts from a single number using a single API request using phone numbers that meet the wireless industry guidelines for commerical SMS. This can be used for popular use cases such as appointment reminders, marketing campaigns, password resets, etc. Thus, High Volume SMS enables Application-to-Person (A2P) text messaging.

RingCentral supports High Volume SMS with both local numbers and toll free numbers.

High Volume SMS supports the following key features:

* [Sending at high volumes per phone number](./sending-highvolume-sms)
* [Opt-in / Opt-out Handling](./opt-out)
* [Event Notifications](./events)
* [Detailed Error Codes](./handling-errors)
* [Approved for high volume usage with mobile carriers](./toll-free-sms-vs-local-numbers/#carrier-approval)
* [Support for local and toll-free numbers](./toll-free-sms-vs-local-numbers)
* [Support for United States and Canada](./toll-free-sms-vs-local-numbers/#supported-countries)

## How to provision High Volume SMS Numbers

Phone numbers for which High Volume SMS is enabled are acquired with the assistance of RingCentral customer support. To obtain such a phone number please follow these instructions:

1. Login to your [account portal](https://service.ringcentral.com/) and choose or purchase a number. Select either the "Local" or "TollFree" type.

1. Login to your [developer portal](https://developers.ringcentral.com) and choose or create an application.

2. Next, open a support ticket by emailing [devsupport@ringcentral.com](mailto:devsupport@ringcentral.com).
   * Be sure to provide the account ID, the phone number, and the application client ID you wish to setup for high volume SMS in the support ticket you file. 
   * Wait for the support engineer to process your request

!!! warning "Limitations of High Volume SMS"
    High Volume SMS does not currently support the following:
    
    * Sending images, vcards and other files (MMS)
    * Group messaging (MMS)
    * International SMS messaging
    * Scheduling

    If you need to send files, communicate with a group, or send from US/Canada numbers to international destinations, please consider our [standard SMS API](../../).
