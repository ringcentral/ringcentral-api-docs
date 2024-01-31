# Introduction to RingCentral's Voice API

<div class="jumbotron pt-1">
  <h3 class="h3 display-5">Getting Started with the Voice API</h3>
  <p class="lead">The RingCentral Voice API is used by developers to place calls, and to manage calls that are in-progress on the network. Futhermore, the Voice API also gives developers access to the RingCentral Call Log - an authoritative source of an organization's call history, call recordings and more.</p>
  <p>We invite all developers to try out our Call Management API by writing a simple app that will place a call using the RingOut API. Get started using a Quick Start in any of the following languages:</p>
  <a href="quick-start/#Javascript" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="quick-start/#PHP" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="quick-start/#Python" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="quick-start/#Ruby" class="btn btn-light qs-link">Ruby &raquo;</a>
  <a href="quick-start/#Java" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="quick-start/#C#" class="btn btn-light qs-link">C# &raquo;</a>
</div>

<p class="h2">Overview</p>

Before you dive into the Voice API, it can be helpful to understand how it fits into a larger picture of APIs. There are three RingCentral APIs that in some respects are all siblings on one another. They are:

1. **Provisioning API** - Provisioning is the process by which a network is setup with all of the extensions and phones that comprise an organization's telephony network.

2. **Call Management API** - Call Management refers to the process and ecosystem of rules that govern how incoming calls are routed through to the network so that can be connected with an individual/agents.

3. **Voice API** - Finally, the Voice API is what is used to manage calls once the Call Management layer has successfully connected a caller and a recipient. 

## What can you do with the Voice API?

The RingCentral Voice API is the primary way developers interface with, manage, and manipulate active calls on the network. Below are the major functional areas of this API. 

### Make a phone call

RingCentral's [Call Management API](call-routing/index.md) provides a number of a facilities for controlling and routing incoming calls. The Voice API provides developers with some means for placing calls programmatically - mainly RingOut.

Alternatively, developers can help users place calls via WebRTC or our [RingCentral Embeddable](https://developers.ringcentral.com/embeddable-voice.html) product. 

* [Learn how to use the RingOut API](ringout.md)
* [RingCentral Embeddable](https://developers.ringcentral.com/embeddable-voice.html)
* [Initiate a RingOut call from your soft phone](https://support.ringcentral.com/article-v2/3963.html?brand=RC_US&product=RingCentral_MVP&language=en_US)

### Intercept incoming calls

Before a call is connected with a user/extension, and while it is ringing, the Voice API gives the developer one last chance to route the call in someway. These ways are:

* Forward call to another extension
* Forward call to voicemail
* Reject the call

* Learn more about intercepting incoming calls using the [Call Control API](call-control.md)

### Manipulate and control active phone calls

Once a call has been connected to an extension or user, the Voice API allows a developer to manipulate that call while it is progress. The Voice API enables developers to do the following to active calls:

* Stop/start call recording
* Mute/unmute a participant
* Hold/resume a call
* Transfer a call
* Park a call
* Supervise or monitor a call
* Flip the call to another number
* Terminate or hang-up a call

* Learn more about manipulating active calls using the [Call Control API](call-control.md)

## What is the Call Log API?

The RingCentral Call Log is an authoritative record of all the calls that were conducted across the network. It is a useful tool in performing call analytics, and in accessing call histories for the purposes of reporting, compliance, or some other record-keeping use case. Call logs can make available to developers the following information about a call:

* Participants
* Start and end times
* Result of the call (answered, rejected, voicemail, etc)
* Call direction (inbound, outbound)
* Duration

### Download call recordings

In addition to providing metadata about a call that took place on the network, the Call Log API also makes available to developers a URL from which the audio of a recorded call can be downloaded.

* [Learn about reading data from the Call Log](call-log/quick-start.md/)
* [Learn how to download recorded call data](call-log/recordings.md)

## How do I control my status and availability?

Finally, the Voice API gives developers access to the availability, or "presence" of a user within the network through the [Presence API](../account/presence.md). The Presence API shows the following for each user one inquires about:

* Is the user on a call?
* Is the user in a meeting?
* Has the user set their "Do Not Disturb" status?

Together one can assess whether a user is available to receive a call or not. 
