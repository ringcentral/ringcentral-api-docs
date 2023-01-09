# Creating and using incoming webhooks

Incoming webhooks provide developers with the ability to post a message or [a card](../../adaptive-cards/) to a specific chat via a dedicated URL. Incoming webhooks are special in that no authentication credentials are required to post a message via this URL. Incoming webhooks are therefore commonly used to integrate with third-party systems that need the ability to post content to a chat without a lot of overhead. 

!!! note "You can also post messages via the [REST API](../../posting/)"

## Why use an incoming webhook to post a message?

An incoming webhook is a mechanism designed to simplify the integration process with third-parties by providing them with the means to post messages into a chat of your choice safely and securely. For example, suppose you want to convert an event emitted by Jira, an issue tracking system, into a RingCentral message, and then have that message delivered to a specific chat? To do this, one would:

1. Generate an incoming webhook (via RingCentral App, or via the RingCentral API)
2. Copy and paste the incoming webhook URL into Jira [where one configures webhook notifications](https://developer.atlassian.com/server/jira/platform/webhooks/).

Henceforth, when an event is triggered in Jira, it will post a JSON event payload to the incoming webhook URL you configed. Upon receiving the event, RingCentral will convert the event into a message and post the message into the chat corresponding to that incoming webhook.

## Create an incoming webhook using the RingCentral desktop app

There are two ways to create an Incoming Webhook. The first and most common method involves using the RingCentral App, navigating to the chat/team into which you wish to receive messages, and then by clicking "Add Apps" from the conversation menu.

<img src="../add-apps.png" class="img-fluid">

On the subsequent screen, you will be prompted to select the app you want to install. Look for the app entitled "Incoming Webhook," hover over it, and click "Add" button. A dialog will appear and in it you will see the Incoming Webhook's URL. Copy and paste it into your target system.

!!! warning "Be aware that the RingCentral App currently generates an earlier version of Incoming Webhooks ("version 1"). [Learn more](../legacy-format/)."

## Create an incoming webhook using the RingCentral REST API

The other way to create an incoming webhook is via the REST API. First, a developer uses the RingCentral REST API to create an incoming webhook associated with a specified chat ID.

Here is a quick sample request and response for how an Incoming Webhook is generated.

=== "Request"

	```http
	POST https://platform.ringcentral.com/team-messaging/v1/groups/6090227714/webhooks
	```

=== "Response"

	```json 
	{
        "id": "3053f6cf-b6de-418c-a6cd-2eb222cdab4e",
        "creatorId": "61307231006",
        "groupIds": [
          "6090227714"
        ],
        "creationTime": "2018-12-11T16:29:02.185Z",
        "lastModifiedTime": "2018-12-11T16:29:02.185Z",
        "uri": "https://hooks.ringcentral.com/webhook/v2/3053f6cf-b6de-418c-a6cd-2eb222cdab4e",
        "status": "Active"
	}
	```

## Creating an incoming webhook by installing an add-in

[RingCentral add-ins](../../add-ins/creation/) that can be installed directly into a team from within the RingCentral desktop app [automate the process](../../add-ins/installation/) of creating and installing an incoming webhook into a third-party service on behalf of the user. If an add-in elects to implement this process the end user may never actually realize that it is via an incoming webhook that messages are posted to a chat. 

## Posting messages to an incoming webhook

Now that an incoming webhook has been created, messages can be composed and posted to it freely. Read more about posting messages via an incoming webhook in the [next section](../posting/) section.
