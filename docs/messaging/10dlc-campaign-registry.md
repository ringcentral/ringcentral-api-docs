# 10DLC SMS Compliance & Campaign Registration

## Overview
Businesses have increasingly turned to texting as a way to interact with their customers. They have adopted the “Application-to-Person” (A2P) messaging approach to send messages in bulk from 10DLC phone numbers to consumers around the U.S. Traditionally the A2P messaging classification only applied to 1-to-many use cases like marketing, two-factor authentication, group notification, etc, and not the 1-1 “Person-to-Person” (P2P) conversational messaging over SMS/MMS that is supported by RingCentral.

Earlier in 2021, carriers reclassified all business SMS as 10DLC A2P (for background, 10DLC or 10-digit long code numbers are local 10-digit numbers that support high volumes of messages). Critical changes are taking place regarding RingCentral’s SMS/MMS messaging service in the US and Canada due to the above reclassification.

U.S. wireless carriers AT&T, Verizon, T-Mobile, US Cellular now require that all SMS/MMS messages that 
1) originate from a business/brand and 
2) terminate to the U.S. wireless carriers’ subscribers 
must be managed as application-to-person (A2P) messages. The stated reason for this change by the U.S. wireless carriers is to control unwanted messages like spam.

One of the critical compliance factors for 10DLC is that all RingCentral customers sending SMS/MMS via any means should be registered with [The Campaign Registry](https://www.campaignregistry.com/) and have phone numbers associated with right campaigns. This article will describe this requirement and its impact in detail.
!!! info "At this time text messaging over toll-free numbers remains unaffected."

## Applies To
* RC MVP
* RC SMS APIs
* RC HV SMS APIs
* SMS / MMS Messaging
* US & Canada
* 10DLC (10 Digit Long Code)
* The Campaign Registry

## Questions and Answers
What does this mean?
This change by U.S. wireless carriers means that RingCentral needs to register its customers' Brand and Campaigns with The Campaign Registry, and then associate their SMS/MMS enabled phone numbers (10DLC’s) with those campaigns.

## What is a brand?
A brand is a collection of information used to identify the business sending the SMS. It’s the company or entity the end user believes to be sending the message. For example, if a HVAC company, “Superior HVAC” sends SMS maintenance reminders to its end customers via RingCentral, then “Superior HVAC” will be considered as a brand.

## What is a campaign?
A campaign is basically a collection of information used to identify customer use case and CTIA compliance for wireless carrier evaluation. A campaign requires details such as SMS/MMS message examples. For example, if a medical facility “Patient Works” wants to send appointment reminders to its end customers via SMS, then “appointment reminders” will be created as a campaign.

## Why do I need to register my business numbers (10DLC’s) with campaigns?
This is effectively a wireless carrier mandate (not RingCentral). The industry has been working for years to find ways to support the use of local phone numbers to deliver high-volume A2P messaging traffic to mobile subscribers.

So as stated above, wireless carriers have decided to require registration and payment of additional fees for increasing their messaging throughput caps for campaigns that should be granted a higher messaging class. These carriers also require the use of The Campaign Registry in order to capture additional information on A2P message senders, and what kind of traffic is being sent to their mobile subscribers.

The Campaign Registry enables SMS messaging service providers such as RingCentral to register 10DLC campaigns on behalf of the customers they work with.

## What are P2P and A2P, and why do they matter?
P2P and A2P are industry classifications of SMS messages:

P2P means Person to Person, and is typically defined as conversational messages sent between people.
A2P means Application to Person, and is typically defined as messages originating from an application rather than a person. These types of messages include multi-factor authentication messages and other codes typically sent from an automated business-related service.
The U.S. wireless carriers mentioned above are requiring that business-related SMS messages be sent as A2P messages rather than P2P, as part of their effort to control the flow of unwanted messages sent to their wireless subscribers.

To comply with wireless carrier mandates, all SMS traffic originating from RingCentral MVP ( Desktop, Mobile), Standard SMS APIs, High Volume SMS APIs is now covered under A2P classification.

## Is there a cost involved with registration?
Registration with The Campaign Registry is not free, so normally RingCentral customers would be required to register their SMS/MMS campaigns.

At this time RingCentral will register customers on their behalf, so initially these costs will not be passed on. However, please note that we are still reviewing the impact of these new costs and may need to change that position at a later date.

## Can I opt out of the registration process?
It’s important to note that companies that are not registered will be blocked from sending messages to users who use AT&T and T-Mobile wireless service. They can also see an impact on pricing and fees. 

### Possible Fines and Penalties if not registered:
* Higher surcharge fees per message will likely be applied
* Throttling and filtering of messages
* Carrier specific non-compliance fees (for example huge fines in case carriers like T-mobile  receives a complaint that traffic is being sent prior to the program being fully approved)
* Grey Route: There may be a $10 fee per message if A2P messages are sent over P2P routes

We do not recommend opting out of this registration process, However, if you have any specific questions, please contact your RingCentral account manager.


## Do I need to do anything?
At this time there is nothing that RingCentral customers need to do proactively. As stated above, initially RingCentral will take care of the registration process on your behalf and may reach you if we need more information on your SMS use case(s).

