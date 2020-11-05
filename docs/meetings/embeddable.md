# Using RingCentral Video with Embeddable

RingCentral Embeddable provides built-in support for RingCentral Video. Most of the features of RingCentral Video in RC App are supported:

* Schedule, start, and join meetings
* Check meeting and meeting recording list
* Log meetings and recording links to app

The following shows click-to-schedule, the main meeting tab, and the meeting/recording log.

<img class="img-fluid" width="80%" src="../hubspot-video.png">

## Schedule a meeting

Click-to-schedule a meeting an be implemented by posting a `rc-adapter-message-request` message with the `/schedule-meeting` path. By ssending the meeting details, the widget will automatically pre-populate thee create meeting field with the correct info which can be reviewed and modified by the user before submisssion.

=== "Javascript"
    ```javascript
    Schedule a meeting
    // meeting info
    const meetingBody = {
      topic: "Embbnux Ji's Meeting",
      meetingType: "Scheduled",
      password: "",
      schedule: {
        startTime: 1583312400368,
        durationInMinutes: 60,
        timeZone: {
          id: "1"
        }
      },
      allowJoinBeforeHost: false,
      startHostVideo: false,
      startParticipantsVideo: false,
      audioOptions: [
        "Phone",
        "ComputerAudio"
      ]
    };

    // send a request to schedule meeting
    const requestId = Date.now().toString();
    document.querySelector("#rc-widget-adapter-frame").contentWindow.postMessage({
      type: 'rc-adapter-message-request',
      requestId: requestId,
      path: '/schedule-meeting',
      body: meetingBody,
    }, '*');
    ```

This is also covered in the [SDK docs for schedule a meeting](https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/control-widget.md#schedule-a-meeting).

### Listen schedule meeting result

To receive a schedule meeting result event, you can subscribe to events using `window.addEventListner` and filtering on `rc-adapter-message-response` message type.

=== "Javascript"
    ```javascript
    // listen response
    window.addEventListener('message', function (e) {
      var data = e.data;
      if (data && data.type === 'rc-adapter-message-response') {
        if (data.responseId === requestId) {
          console.log(data.response);
        }
      }
    });
    ```

## Meeting status event

Get meeting status and permission:

=== "Javascript"
    ```javascript
    window.addEventListener('message', (e) => {
      const data = e.data;
      if (data) {
        switch (data.type) {
          case 'rc-meeting-status-notify':
            // get meeting status and permission from widget
            console.log('rc-meeting-status-notify:', data.ready, data.permission);
            break;
          default:
            break;
        }
      }
    });
    ```

## Navigate to Meetings Tab

To open the Embeddable width and navigate to the meetings tab, call `window.postMessage` with message type `rc-adapter-navigate-to` and the `/meeting` path.

=== "Javascript"
    ```javascript
    document.querySelector("#rc-widget-adapter-frame").contentWindow.postMessage({
      type: 'rc-adapter-navigate-to',
      path: '/meeting', // '/messages', '/dialer', '/history', '/settings'
    }, '*');
    ```

## Sync Meeting Logs and Recordings

You can sync meeting log records and recordings to your app by enabling the log button on the meeting history page. This will display a log button beside each historical meeting to initiate sync process. Full documentation on how to do this is available on [the Embeddable repo](https://github.com/ringcentral/ringcentral-embeddable/blob/master/docs/third-party-service-in-widget.md#log-ringcentral-video-meeting-into-your-service). 
