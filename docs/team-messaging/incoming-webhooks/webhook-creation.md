# Creating an Incoming Webhook

There are two primary ways one can post a message to a RingCentral chat. Either developers can post directly via the REST API, or third-parties can be authorized to post into a team in order to alert team members of key events. What enables third parties to do this is called an Incoming Webhook, which in this article, you will learn how to create. 

## Why use an Incoming Webhook to post a message?

An Incoming Webhook is a mechanism designed to effectively authorize a third-parties to post messages into a chat of your choice safely and securly. This simplifies the integration process. For example, suppose you want to convert a webhook notification emitted by Jira, an issue tracking system, into a RingCentral message, and have that message delivered to a specific chat? To do this, one would:

1. Generate an Incoming Webhook (via RingCentral App, or via the RingCentral API)
2. Copy and paste the Incoming Webhook's URL into Jira [where one configures webhook notifications](https://developer.atlassian.com/server/jira/platform/webhooks/).

Henceforth, when an event is triggered in Jira, it will post a JSON event payload to the configured URL of an Incoming Webhook. Upon receiving the webhook, RingCentral will convert the event into a message and post it to the Incoming Webhook's corresponding chat. 

## How to create an Incoming Webhook

### Using RingCentral App

There are two ways to create an Incoming Webhook. The first and most common method involves using the RingCentral App, navigating to the chat/team into which you wish to receive messages, and then by clicking "Add Apps" from the conversation menu.

<img src="../add-apps.png" class="img-fluid">

On the subsequent screen, you will be prompted to select the app you want to install. Look for the app entitled "Incoming Webhook," hover over it, and click "Add" button. A dialog will appear and in it you will see the Incoming Webhook's URL. Copy and paste it into your target system.

!!! warning "Be aware that the RingCentral App currently generates an earlier version of Incoming Webhooks ("version 1"). [Learn more](../formatting/)."

### Using the RingCentral API

The other way to create an Incoming Webhook URL is via the REST API. First, a developer uses the RingCentral REST API to create an Incoming Webhook associated with a specified chat ID.

Here is a quick sample request and response for how an Incoming Webhook is generated.

=== "Request"

	```http
	POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/6090227714/webhooks
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
	    "uri": "https://hooks.glip.com/webhook/v2/3053f6cf-b6de-418c-a6cd-2eb222cdab4e",
	    "status": "Active"
	}
	```
	
## Learning more

With an Incoming Webhook in hand, it can now be used for [posting messages](../webhook-posting/).
