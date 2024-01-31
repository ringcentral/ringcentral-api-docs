# Introduction to event notifications and subscriptions

<div class="jumbotron pt-1">
  <h3 class="display-5">Getting started using webhooks and the Subscriptions API</h3>
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

* **Events**. Events are synonymous with notifications, and refer to a message that is sent in response to some corresponding triggering event or state-change. 

* **Subscription**. A subscription refers to how an event notification is delivered to an application. The specifics of a subscription depends upon the medium of event delivery, but most importantly defines the specific events an app would like to be notified of.


## How do I create a subscription, or a webhook?

Webhooks, and subscriptions in general, are created exclusively via the Subscription API. There is no web interface or developer console for creating/registering webhooks.

* [See how to create a webhook using the Subscription API](webhooks/creating-webhooks.md)

## When should I use a webhook vs a WebSocket?

RingCentral supports two primary means for delivering events/notifications: via a webhook and via WebSockets. Here are considerations to make when deciding which to support in your application:

* WebSockets can be relatively easy to setup, and can be a great way to experiment with events, especially if you do not have a web server that is needed for webhooks.
* WebSockets is ideal for delivering low-latency notifications that must be sent directly to clients, e.g. push notifications for mobile applications.
* Webhooks are great if your service is "always on" and needs to receive notifications even if clients are offline. 

To learn more about these two event mediums, checkout the following resources:

* [Learn about webhooks](webhooks/creating-webhooks.md)
* [Learn about WebSockets](websockets/subscribing.md)

## What events/notifications does RingCentral support?

RingCentral offers a comprehensive set of events that developers can subscribe to. Such events include:

* SMS received
* Voicemail received
* Fax received
* Call started and call ended
* Missed call
* Presence/availability changed

For a comprehensive list of events, please consult our [API Reference](https://developers.ringcentral.com/api-reference/Account-Presence-Event). 
