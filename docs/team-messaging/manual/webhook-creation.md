# Creating Glip Webhook URLs

There are two primary ways one can post a message to a team. Either developers can post directly via the REST API, or they can post via Glip Webhook URL. In this article you will learn how to create a Glip Webhook URL. 

## Why use a Glip Webhook URL to post a message?

A Glip Webhook URL is a mechanism designed specifically for enabling external service providers to post messages into a specific team without having to also worry about authentication. This helps make integrating with 3rd-parties simple and relatively straight-forward. For example, suppose you want to convert a webhook notification emitted by the issue tracking system Jira into a Glip message, and have that Glip message delivered to a specific team? To do this, one would:

1. Generate a Glip Webhook URL (via RingCentral App, or via the RingCentral API)
2. Copy and paste the Glip Webhook URL into Jira where one configures webhook notifications

Then, when a webhook is triggered in Jira, Jira will post a JSON event payload to the configured Glip Webhook URL. Upon receiving the webhook, Glip will convert the event into a message and post it to the Glip Webhook's corresponding team. 

## How to create a Glip Webhook URL

### Using RingCentral App

There are two ways to create a Glip Webhook URL. The first and most common method involves using the RingCentral App, navigating to the team into which you wish to receive messages, and clicking "Add Apps" from the conversation menu.

<img src="../add-apps.png" class="img-fluid">

On the subsequent screen, you will be prompted to select the app you want to install. Look for the app entitled "Webhook," hover over it, and click "Add." A modal dialog will appear and in it you will see a URL. Copy and paste it into your target system.

### Using the RingCentral API

The other way to create a Glip Webhook URL is via the API. To create a webhook URL in this fashion, a developer uses the API to create a webhook associated with a specific chat ID. Let's look at a sample request and response for how a webhook URL is generated.

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

With a Glip Webhook URL in hand, it can now be used for [posting messages](../webhook-posting/).
