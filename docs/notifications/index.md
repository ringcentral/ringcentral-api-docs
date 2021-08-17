# Introduction to Event Notifications and Subscriptions

<div class="jumbotron pt-1">
  <h3 class="display-5">Getting Started with the Subscriptions API</h3>
  <p class="lead"></p>
  <p>We invite all developers to try out our Subscriptions API by writing a simple app to create a webhook subscription when an SMS is received at your phone number. Get started using a Quick Start in any of the following languages:</p>
  <a href="webhooks/quick-start/#Javascript" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="webhooks/quick-start/#PHP" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="webhooks/quick-start/#Python" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="webhooks/quick-start/#Ruby" class="btn btn-light qs-link">Ruby &raquo;</a>
  <a href="webhooks/quick-start/#Java" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="webhooks/quick-start/#C#" class="btn btn-light qs-link">C# &raquo;</a>
</div>

## What are events, notifications and subscriptions?

* **Events** - events are synonymous with notifications, and refer to a message that is sent after it is triggered by an action, or state-change on the platform.

* **Subscription** - a subscription refers to how an event notification is delivered to an application. A subscription contains the following metadata:
  * How the event is delivered, e.g. via webhook, pubnub, APNS, etc.
  * Address - where the notification is delivered
  * Expiry - when the subscription will end
  * The set of events being listened for/subscribed to

## How do I create a subscription, or a webhook?

Webhooks and subscriptions in general are created exclusively via the Subscription API. There is no web interface or developer console for creating/registering webhooks.

* [See how to create a webhook using the Subscription API](./webhooks/creating-webhooks/)

## When should I use a webhook vs PubNub?

RingCentral supports two primary means for delivering events/notifications: via a webhook and via PubNub. Here are considerations to make when deciding which to support in your application:

* With assistance from RingCentral code samples, PubNub notifications are the quickest and simplest to implement, especially when you don't already have a webserver setup and running. 
* Webhooks are great if your service is "always on" and needs to receive notifications even if clients are offline. 
* PubNub is ideal for delivering low-latency notifications that must be sent directly to clients, e.g. push notifications for mobile applications.
* Webhooks can be implemented at no additional cost, as PubNub is a service independent from RingCentral.


* [Learn about webhooks](./webhooks/creating-webhooks/)
* [Learn about PubNub notifications](./push-notifications/pubnub/)

## What events/notifications does RingCentral support?

RingCentral offers a comprehensive set of events that developers can subscribe to. Such events include:

* SMS received
* Voicemail received
* Fax received
* Call started and call ended
* Missed call
* Presence/availability changed

For a comprehensive list of events, please consult our [API Reference](https://developers.ringcentral.com/api-reference/Account-Presence-Event). 
