# Using RingCentral Video with Embeddable

[RingCentral Embeddable](https://developers.ringcentral.com/embeddable-voice.html) provides built-in support for both RingCentral Meetings and RingCentral Video. Most features of these two products are supported, including:

* Schedule, start, and join meetings
* Check meeting and meeting recording list
* Log meetings and recording links 

The following shows click-to-schedule, the main meeting tab, and the meeting/recording log.

<img class="img-fluid" src="../hubspot-video.png" style="max-width:550px">

## Compatible with RingCentral Meetings and RingCentral Video

The RingCentral Embeddable product is compatible with both our newer RingCentral Video product, as well as our legacy RingCentral Meetings product. Embeddable will automatically create and schedule meetings in the right product based on the current user's account configuration. 

Developers creating their own RingCentral embeddable app using their own client ID and secret will need to contact support to add both the "Video" and "Meetings" application scope to their application in order to call the necessary APIs. 

## Javascript code samples

### Schedule a meeting

Click-to-schedule a meeting an be implemented by posting a `rc-adapter-message-request` message with the `/schedule-meeting` path. By ssending the meeting details, the widget will automatically pre-populate thee create meeting field with the correct info which can be reviewed and modified by the user before submisssion.

```javascript
{!> code-samples/embeddable/create-meeting.js !}
```

To learn more about the RingCentral Embeddable interfaces for creating meetings consult our [SDK docs for schedule a meeting](https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/control-widget.md#schedule-a-meeting).

### Listen and respond to a schedule meeting event

To receive a schedule meeting result event, you can subscribe to events using `window.addEventListner` and filtering on `rc-adapter-message-response` message type.

```javascript
{!> code-samples/embeddable/schedule-meeting-result.js !}
```

### Listen and respond to a meeting status event

Get meeting status and permission:

```javascript
{!> code-samples/embeddable/meeting-status.js !}
```

### Navigate to the Meetings tab in Embeddable

To open the Embeddable width and navigate to the meetings tab, call `window.postMessage` with message type `rc-adapter-navigate-to` and the `/meeting` path.

```javascript
{!> code-samples/embeddable/meetings-tab.js !}
```

### Sync meeting logs and recordings to remote system

You can sync meeting log records and recordings to your app by enabling the log button on the meeting history page. This will display a log button beside each historical meeting to initiate sync process. Full documentation on how to do this is available on [the Embeddable repo](https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/third-party-service-in-widget.md#log-ringcentral-video-meeting-into-your-service). 
