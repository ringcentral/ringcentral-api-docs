# Introduction to SMS and Fax Messaging on RingCentral

!!! info "Developers should familiarize themselves with RingCentral's [SMS price changes](https://support.ringcentral.com/article/Enhanced-Business-SMS-new-Price-Changes.html) and [SMS content and messaging policies](https://www.ringcentral.com/legal/sms-mms-content-policies.html)"

<div class="jumbotron pt-1">
  <h3 class="h3 display-5">Getting started with SMS and Fax messaging</h3>
  <p class="lead">Within the RingCentral Platform, Messaging encompasses a number of elements that work together to enable developers to send and receive SMS, fax, voicemail and pager messages through the network. In addition, all messages sent and received over the network are captured within the RingCentral Message Store which allows developers to download messages, access message histories, and manage user inboxes.</p>
  <p>We invite all developers to try out our SMS and Fax API by writing a simple app to send an SMS message in almost no time at all. Get started using a Quick Start in any of the following languages:</p>
  <a href="quick-start/#Javascript" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="quick-start/#PHP" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="quick-start/#Python" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="quick-start/#Ruby" class="btn btn-light qs-link">Ruby &raquo;</a>
  <a href="quick-start/#Java" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="quick-start/#C#" class="btn btn-light qs-link">C# &raquo;</a>
</div>

## What types of messages can be sent or received?

RingCentral supports a number of different types of messages that can be sent and received. They are all types of messages most are familiar with. But just in case:

| Type | Description |
|-|-|
| **SMS** | SMS includes both text messages, and multimedia messages (MMS). They are sent over cell networks, but can also be delivered to customers directly via their RingCentral Soft Phone. |
| **Fax** | Fax messages are a means of transmitting documents in such a way that they can be easily printed by a fax machine over phone lines. RingCentral's Fax API allows one to completely digitize how faxes are sent and/or received. |
| **Voicemail** | A core part of RingCentral's Voice platform is the ability to define extensions at which caler's can leave recorded messages. These extensions can be for an individual or a group of people. |
| **Pager Messages** | Pager messages allow individuals to send one-way announcements from a desk phone or mobile phone. They are often used in retail or warehouse environments, such as, "clean up on aisle 5." | 

RingCentral's APIs allow for developers to send and receive messages of all of the above types. 

!!! note "Glip Messages"
    Another type of message is a "Glip Message" which are transmitted via RingCentral's Team Messaging product called "Glip." These messages are not managed via our SMS and Fax messaging system and are discussed in more detail in [Glip section](../team-messaging/) of our Developer Guide.

## How does one send or receive a message?

The SMS and Fax API allows developers to both send and receive messages of every type. The following guides will help you und

**SMS**

* [How to send an SMS](./sms/sending-sms)
* [How to send an MMS message](./sms/sending-images)

**Fax**

* [How to send a fax](./fax/sending-faxes)
* [How to receive a fax](./fax/receiving-faxes)

**Pager Messages**

* [How to send a pager message](./pager/sending-pager-messages)

## Where does one access or download past messages?

The RingCentral Message Store is responsible for keeping a record of every message sent or received over the network. The Message Store gives developers the ability to:

* Download messages
* Download message attachments
* Resend messages (as is sometimes needed with faxes)
* Inspect the delivery status of a message
* Remove/delete a message from a user's inbox
* Change the read/unread status of messages
* Change the message priority

Learn the basic structure of messages, as well as how to get a list of messages using the API:

<a class="btn btn-primary" href="./message-store/working-with-message-store/">Working with Message Store &raquo;</a>
