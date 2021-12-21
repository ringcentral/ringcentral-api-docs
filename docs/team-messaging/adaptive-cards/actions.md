# Handling interactivity in Adaptive Cards

## Types of interactivity for an adaptive card

In addition to supporting the full array of display elements that aid in the rendering and presentation of a card, RingCentral currently supports the following types of interactivity, corresponding to each of the supported Actions in Adaptive Cards. These include:

* `Action.OpenUrl` - when invoked, RingCentral will open the designated URL in an external web browser
* `Action.ShowCard` - when invoked, RingCentral will display the designated Adaptive Card 
* `Action.Submit` - when invoked, RingCentral will collect the data entered into affiliated input elements and transmit them to the client
* `Action.ToggleVisbility` - when invoked, RingCentral will show and/or hide designated target elements 

Only the `Action.Submit` action requires a developer to implement handlers and webhooks in order to receive and process submitted data. All other actions define their behavior natively within the card itself. 

## Handling a form submission

If your application posts cards that utilize the `Action.Submit` action, in other words, if the card contains input elements and allows users to submit a form, then your app will need to implement the following sequence.

### Design the card

Your first step is to design the card if you have not already done so. The example below will be based upon the following card, simulating and add-in that a user would install into their personal chat to prompt them to enter a call log entry whenever they completed a call. 

*Excluded from this example, is how this message below is triggered. Presumably when the add-in is installed, the add-in would subscribe to an [Extension Telephony Session event](https://developers.ringcentral.com/api-reference/Extension-Telephony-Sessions-Event) so that it can be notified when a call with the installing user has ended. Upon receiving that event, the add-in would then post the message below.*

```json
{!> code-samples/team-messaging/adaptive-cards/form-submit.json !}
```

### Post the card

To post the card, the app would utilize either the [REST API](../../posting/) or an [incoming webhook](../../incoming-webhooks/posting/), depending upon how the underlying app is architected. Bots and apps typically use the REST API, while add-ins often use incoming webhooks. 

*The example below reads the contents of the above message from the local filesystem.*

```js
{!> code-samples/team-messaging/post-card.js [ln:12-31] !}
```

The above card when posted to RingCentral, will appear as shown below:

![Basic form submission](../form-submit.png)

### Receive interactive message webhook

When the user clicks the submit button, RingCentral will transmit the form data that the user entered, and deliver it as a webhook to the URL designated in the "Outbound webhook URL" field associated with your app, under the "Interactive messages" feature. 

Here is a sample webhook you might receive for the adaptive card above.

```json
{
    'uuid': 'abcdefg',
    'timestamp': '2016-03-10T18:07:52.534Z',
    'type': 'button_submit',
    'appId': 'abcdefg-123443-ghijklmnop',
    'user': {
        'id': 'abcdefg-1234',
		'firstName': 'Jim',
		'lastName': 'Halpert',
		'accountId': '123456789'
    },
	'conversation': {
        'id': 'abcdefg-1234',
        'type': 'group',
        'public': true,
        'name': 'Top paper sales'
	},
	'post': {
        'id': 'abcdefg-1234',
        'creationTime': '2016-03-10T18:07:52.534Z',
        'lastModifiedTime': '2016-03-10T18:07:52.534Z',
	},
	'data': {
	    'call-log' : 'Spoke to Christian from Lackawanna Country. He might be interested in 20 reams.'
	}
}
```

!!! warning "Interactive messages and generic incoming webhooks"
    Incoming webhooks created inside the RingCentral desktop client are unable to support interactive messages, specifically cards that utilize the `Action.Submit` element because those webhooks are not associated with an Outbound Webhook URL. To build and test the `Action.Submit` element, please post the message from a bot or add-in. 

### Verify the sender of the event

To ensure RingCentral is the originator of the event, and no one else might be impersonating the sender, we recommend people verify the uthenticity of the event by comparing the contents of the `X-Glip-Signature` header with a SHA1 hash of the request body.

```js
{!> code-samples/team-messaging/verify-event.js !}
```

### Post a response

After processing the event, your application must respond to acknowledge receipt of the event, and optionally transmit an error message back to RingCentral to display to the end user. 

```js
const SHARED_SECRET = "abcdefghijklmnopqrstuvwxyz"
api.post('/hook', function (req, res) {
 var signature = req.get('X-Glip-Signature', 'sha1=')
 var bodyCrypted = require('crypto')
  .createHmac('sha1', SHARED_SECRET)
  .update(JSON.stringify(req.body))
  .digest('hex')
 if (bodyCrypted !== signature) {
  res.status(401).send()
  return
 }
 console.log('Webhook received')
 var error = process_event(req.body)
 if (error) {
   res.status(200).send({
     "type": "message",
	 "text": "An error occurred: " + error
   })
 } else {
   res.status(200).send()
   return
 }
})
```

### (Optionally) Update the card

Once the event has been completely processed, you may have the need to update the contents of the card to reflect a change in status. This can be done by use the [`readGlipPost`](https://developers.ringcentral.com/api-reference/Posts/readGlipPost) and the [`updateGlipPost`](https://developers.ringcentral.com/api-reference/Posts/patchGlipPost) operations to post a new version of the card. 



