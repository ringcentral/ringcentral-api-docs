# Release Notes for Video Client SDKs

### v.0.1.0.003

#### What’s New (June 2022) :

- Apple M1 chip architecture now is supported
- Starts an instant meeting with customized settings now is supported
- The switch camera functionality now is supported
- An automatic refresh auth token mechanism now is supported
- Active speaker event callback now is provided

### v.0.1.0.002

#### What’s New (May 2022) :

- Meeting Recording APIs are now available.
- The waiting room functionality is now supported.
- The join before host functionality is now supported.
- Local audio/video processors are now provided.
    - By customizing/implementing the local audio/video processor, the application can receive media raw data from the client SDK and can apply processing algorithm on its own, for instance, noise cancellation, adding the virtual background, etc, and then pass it back to the SDK.
- Host/moderator can mute/unmute participants’ audio & video.
- Host/moderator can lock/unlock meetings while in the middle of the meeting.


### Sample App Enhancement

As the meeting host, users can do lock/unlock meetings, start/pause/resume recordings, admit user/all and mute/unmute participants' audio/video actions in the new sample iOS and Android application.

### Known Issues

N/A

---
### Previous Releases

### v.0.1.0001

#### First Release is out. 

### Known Issues are as follows:

- Only a small number of interfaces are supported in the beta version
- Waiting Room is not supported
- Join before host is not supported
- Authentication via SDK is not supported

