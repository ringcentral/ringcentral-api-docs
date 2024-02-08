# Inviting people to cohost a webinar

{! mdx_includes/webinar-beta-notice.md !}

The invitiation process for webinars facilitates the recruitment and signup of hosts, cohosts and panelists for a webinar. The process helps to not only register the user for the webinar, but also assigns the appropriate role to those registrants. Those invited through this process will be sent a special join URL to be used exclusively by those who will be helpng to facilitate the webinar session. The join URL will allow invitees to access the webinar's bridge, which enables them to broadcast their video and audio, as well as share their screen with webinar attendees. 

## Inviting people to attend a webinar

Those people you hope will attend a webinar, and not help facilitate the webinar, must be invited or asked to attend via other means. This requires webinar hosts to perform their own independent outreach to attendees to [register for the webinar](registrants.md).

## Inviting hosts, cohosts and other active contributors 

There is one primary endpoint used to manage all invitees. That endpoint allows a developer to both add, invite and delete invitees in a single operation or API call, reducing the likelihood of being rate limited while managing your set of webinar collaborators. The code sample below shows how one can invite multiple people, while also deleting an invitee and updating another. 

=== "Javascript"

    ```js
    {!> code-samples/webinar/inviting.js !}
    ```

!!! tip "Assigning the 'Attendee' role to an invitee"
    The invitation process exists to facilitate the collaboration between hosts, cohosts, panelist and other active contributors to a webinar. Therefore, specifying the `Attendee` role when creating an invite should result in an error. 

### Sending a custom invitation email to invitees

By default RingCentral will compose and transmit an email to all new invitees. However, some may wish to compose and send an invitation to hosts and cohosts of a webinar through a third-party system in order to exercise more control and oversight over that onboarding experience. To support this, when creating invitees for a webinar, one can set the `sendInvite` property associated with each invitee to `false`. 

After registering the invitees with the webinar, the response will include for each new invitee a unique `joinUri` parameter which can be sent to the invitee via your own email system. 

### Inviting hosts and cohosts from your own company

If you wish to invite someone to help host an internal webinar, then you can invite them by their user ID, rather than specifying their email. To do so, one would invite them using the `linkedUser` property. For example:

```js
'addedInvitees': [
	{
		linkedUser: {
			'accountId': '<YOUR ACCOUNT ID>',
			'userId': '<USERS EXTENSION ID>',
			'domain': 'pbx'
		}
	}
]
```

