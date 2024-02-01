# Subscribing to webinar webhooks and events

Like other RingCentral products, [events are often emitted by the platform](../notifications/index.md) to signal to developers and their applications about key events that have been triggered by a user. Developers should be aware that while there exist many similarities between how one might create and receive a webinar event, and any other event on the platform, there are two distinct interfaces a develope must engage with. In other words, webinar has its own unique set of API endpoints for subscribing to events emitted by the webinar platform. 

## Subscribing to a webinar webhook

To subscribe to a webinar webhook, one will call the [create subscription operation](https://developers.ringcentral.com/api-reference/Webinar-Subscriptions/rcwN11sCreateSubscription) while specifying the list of events to subscribe to via the `eventFilters` parameter, along with the subscription's expiration date and any other pertinent configuration details. The following code sample shows how to create a webinar webhook subscription.

=== "Javascript"

    ```js
    {!> code-samples/webinar/subscribe.js !}
    ```

## Available event filters

The following is a list of all currently available webhooks that a developer can subscribe to. Developers can subscribe to multiple events in a single subscription request by specifying mutiple event filters in their request. 

| Event Filter                                            | Description                                                                            |
|---------------------------------------------------------|----------------------------------------------------------------------------------------|
| `/webinar/configuration/v1/company/sessions`            | Fired when a session is created or modified in any way.                                |
| `/webinar/runtime/v1/company/sessions/state`            | Fired when a webinar session has changed its state, e.g. when it starts and ends.      |
| `/webinar/registration/v1/company/sessions/state`       | Fired when a webinar session's registration setting has been modified.                 |
| `/webinar/registration/v1/company/sessions/registrants` | Fired when a registrant for a webinar session has been created or modified in any way. |

### Event filter parameters

All of the above event filters can be further refined to subscribe to a more precise subset of events from an account that a developer might be interested in. For example, if a developer subscibes to the `.../company/sessions/registrants` filter then the developer will receive all events for all webinar sessions in their account. If however, they only wish to receive events pertaining to a specific webinar, then they can specify the `webinarId` in the event filters parameters:

    /webinar/registration/v1/company/sessions/registrants?webinarId=<INSERT WEBINAR ID>

The following filter parameters are supported:

| Filter parameter | Description                                                    |
|------------------|----------------------------------------------------------------|
| `hostUserId`     | Subscribe to only the events pertaining to a single host.      |
| `webinarId`      | Subscribe to only the events pertaining to a specific webinar. |

