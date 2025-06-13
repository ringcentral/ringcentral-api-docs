# Scheduling and creating a meeting bridge

{! mdx_includes/video-beta-notice.md !}

## What is difference between a meeting and a bridge?

Some may notice that the name of the endpoint to create a meeting makes reference to a "bridge." A meeting bridge is, for all intents and purposes, a virtual meeting room. These virtual meeting rooms, just like a meeting room in real-life, can be re-used for different meetings and different groups of people. Unlike a physical meetings room, however, a bridge can also be used once and then thrown away for maximum security and privacy. 

A "meeting" on the other hand is created the moment a person connects to a bridge. That same meeting ends when the last person disconnects from the bridge, and the virtual meeting room is once again empty. 

This means that when you "create a meeting," what you are really creating is a bridge in which that meeting will take place. 

## How do you create a meeting bridge via the API?

The following Javascript code can be used to create a RingCentral Video meeting bridge. Our [Video Quick Start guide](quick-start.md) include a more complete code sample (with authentication for example) than the one shown below. The code sample below also showcases a wide array of configuration options, not all of which are required. 

```js
{! code-samples/video/create-meeting.js [ln:22-49] !}
```

#### Setting the bridge's type

The `type` parameter can take one of three values and impacts the longevity and behavior of the bridge after it is created. 

| Type | Description | 
|-|-|
| `Instant` | A value of "Instant" means the bridge will be used only once and deleted after the meeting ends. This is the default value. |
| `Scheduled` | A value of "Scheduled" means that the birdge will persist for a long time and can be used more than once. Bridges of type "Scheduled" will be deleted after a prolonged period of inactivity. |
| `PMI` | A value of "PMI" will result in the bridge utilizing the associated user's personal bridge ID. |

#### Setting the bridge's security parameters

The `security` parameter takes a number of key/value pairs to govern the bridge's security.

| Parameter           | Type    | Description                                                                                                                      |
|---------------------|---------|----------------------------------------------------------------------------------------------------------------------------------|
| `passwordProtected` | boolean | Set to true if the bridge requires a password to enter.                                                                          |
| `password`          | string  | The desired password for the bridge. If omitted and passwordProtected is true, a password will be auto-generated.                |
| `noGuests`          | boolean | Set to true if attendees are required to authenticate before joining.                                                            |
| `sameAccount`       | boolean | Set to true if only attendees from the same account are allowed to join a bridge. This is useful when creating private meetings. |
| `e2ee`              | boolean | Set to true to enable end-to-end encryption for the meeting.                                                                     |

#### Setting the bridge's preferences

The `preferences` parameter takes a number of key/value pairs to govern the bridge's general behavior.

| Parameter                      | Type    | Description |
|--------------------------------|---------|-------------|
| `join`                         | hashmap | A set of key/value pairs.             |
| `join.audioMuted`              | boolean | Set to true if an attendee's audio is muted by default.            |
| `join.videoMuted`              | boolean | Set to true to disable an attendee's video by default.            |
| `join.waitingRoomRequired`     | string  | Set to "Nobody" to eliminate waiting room (this is the default when bridge type is "Instant" or "Scheduled"). Set to "Everybody" if everyone is required to wait until host arrives. Set to "GuestsOnly" to require unauthenticated users to wait before host arrives. Set to "OtherAccount" if only users from another account are required to wait until host arrives (this is the default value when bridge type is "PMI").              |
| `join.pstn`                    | hashmap | A set of key/value pairs.            |
| `join.pstn.promptAnnouncement` | boolean | Set to true to play the "announce yourself" prompt.            |
| `join.pstn.promptParticipants` | boolean | Set to true to play the "there are n participants" prompt.            |
| `playTones`                    | string  | Set to "On" to turn on enter and exit tones. Set to "Off" to disable tones. Set to "ExitOnly" to play exit tone. Set to "EnterOnly" to play tone on entrance.            |
| `musicOnHold`                  | boolean | Set to true to play music when only one person is waiting.            |
| `joinBeforeHost`               | boolean | Set to true to allow participants to join before host arrives.             |
| `screenSharing`                | boolean | Set to true if participants are allowed to share their screen.            |
| `recordingsMode`               | string  | Set to "Auto" to automatically record meeting. Set to "ForceAuto" if an admin has overridden recording preference and requires recordings to be made. Set to "User" to allow users to toggle recordings on and off.            |
| `recordings.everyoneCanControl` | object | Determines if meetings in the bridge can be recorded, and who can turn on/off recordings. |
| `recordings.autoShared` | object | Determines if the recordings in the bridge can be shared. |
| `transcriptionsMode`           | string  | Set to "Auto" to automatically transcribe meeting. Set to "ForceAuto" if an admin has overridden transcription preference and requires transcriptions to be made. Set to "User" to allow users to toggle transcriptions on and off.            |

### How do you schedule a meeting on behalf of someone else?

See [scheduling on behalf of another](meeting-delegates.md).

### Setting and retrieving the join URL

The URL used by participants to join a meeting is found in the response, using the `discovery` element returned. 

### How do you set the time and date for a meeting?

RingCentral Video approaches meetings differently than other platforms. We do not store time, date and location information for a meeting. We instead defer to the user's calendaring system as the source of record for when and where meetings are going to occur. This approach eliminates the need for data synchronization, and makes compliance easier to maintain. 

### What is the difference between host pin and the participant pin?

When a meeting is created, RingCentral will return a meeting object within which you will observe a pstn pin for participants and hosts. These codes are only used within the context of PTSN (accessing a meeting over the phone) and are used to allow hosts and participants to "login" via their keypad.

When used to login to a meeting over the phone, the `hostCode` is intended to be used by the host only, and gives that individual additional controls over the meeting. 

## How to fetch the details relating to a bridge

The details relating to a bridge can be retrieved via the following methods and endpoints:

* `GET /rcvideo/v2/bridges/{bridgeId}`
* `GET /rcvideo/v2/bridges/pin/web/{pin}`
* `GET /rcvideo/v2/bridges/pin/pstn/{pin}`

## How to update and delete a bridge

A bridge can be updated via the following method and endpoint, and by using the schema documented above.

`PATCH /rcvideo/v2/bridges/{bridgeId}`

A bridge can be deleted via the following method and endpoint:

`DELETE /rcvideo/v2/bridges/{bridgeId}`
