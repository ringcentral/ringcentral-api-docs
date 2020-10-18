# Using RingCentral Video with Embeddable

RingCentral Embeddable provides built-in support for RingCentral Video. Most of the features of RingCentral Video in RC App are supported:

* Schedule, start, and join meetings
* Check meeting and meeting recording list
* Log meetings and recording links to app

The following shows click-to-schedule, the main meeting tab, and the meeting/recording log.

<img class="img-fluid" width="80%" src="../hubspot-video.png">

## Navigate to the Meetings Tab

You can use `rc-adapter-navigate-to` to bring the Meetings tab to the foreground in the app. This is useful if you want to implment functionality like clicking to schedule a meeting from your  web app.

=== "Javascript"
    ```javascript
    document.querySelector("#rc-widget-adapter-frame").contentWindow.postMessage({
      type: 'rc-adapter-navigate-to',
      path: '/meeting', // '/messages', '/dialer', '//history', '/settings'
    }, '*');
    ```

## Schedule a meeting

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

## Listen schedule meeting result

To receive a schedule meeting result event, you can subscribe to events using `window.addEventListner` filtering on `rc-adapter-message-response`.

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
