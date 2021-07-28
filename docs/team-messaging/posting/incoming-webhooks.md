# Using an incoming webhook to post a message to a chat

??? warning "This documentation is for Incoming Webhooks version 2. Which version are you using?"
    Depending upon when an incoming webhook was created, you may notice a slight variation in their URL format, which you can use to identify what version of Incoming Webhooks you are using:
    
    | Version | URI Scheme |
    |-|-|
    | 1 | `https://hooks.glip.com/webhook/{ webhook id }` | 
    | 2 | `https://hooks.glip.com/webhook/v2/{ webhook id }` | 

    Read the documentation for [Incoming Webhooks version 1](../posting-v1/).

    !!! tip "Migrating between Incoming Webhook versions"
        One can easily switch between using the two version by manually editing the Incoming Webhook's URL accordingly.

## What is an "incoming webhook?"

An incoming webhook is a mechanism designed to make integrating with third-party services easier by enabling them to post messages into a specific chat safely and securely. Using an incoming webhook for example, one can direct a service like Asana, Jira, or Pagerduty to post an event/webhook emitted by that service to an incoming webhook's URL. If the service posting the event is among those [service providers we support natively](../service-providers/), RingCentral will convert the event payload it receives into a message, and post it to the corresponding team. 

For all other services, developers must intercept the event posted by the third-party, convert the event into a message, and then post the message to the corresponding incoming webhook. 

## How to post a message via an incoming webhook

To post a message via an incoming webhook, one composes a [message in JSON](../../posting/cards/) and then posts that message to the incoming webhook's URL. Using this methodology, one can post visually rich and information dense messages to a chat.

To post a message successfully, the Content-Type should be set to `application/json`.

[Cards](../attachments/) are the most common form of post as they provide a more practical way of transmitting lots of information to a reader in a screen efficient way.

{!> docs/team-messaging/posting/composition.md.inc !}

