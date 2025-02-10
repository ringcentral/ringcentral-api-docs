---
title: RingCentral Voice API
---
# Introduction to RingCentral's Voice API

<div class="qs-hero" markdown>
## Get started by placing a RingOut call

The RingCentral Voice API enables developers to place and manage calls seamlessly within their applications. In addition to call management, it provides access to the RingCentral Call Log, an authoritative source for an organization’s call history, recordings, and more.

### Ready to explore?
Try out our Call Management API by building a simple app that places a call using the RingOut API. You can get started quickly with a Quick Start guide available in multiple programming languages:

<div class="grid cards" markdown>

- :material-language-javascript: [__JavaScript__](quick-start.md#javascript)
- :material-language-php: [__PHP__](quick-start.md#php)
- :material-language-python: [__Python__](quick-start.md#python) 
- :material-language-ruby: [__Ruby__](quick-start.md#ruby)
- :material-language-java: [__Java__](quick-start.md#java) 
- :material-language-csharp: [__.NET__](quick-start.md#c)

</div>
</div>

## Overview

Before diving into the Voice API, it’s helpful to see how it fits within the broader RingCentral API ecosystem. Think of these APIs as interconnected tools, each playing a unique role in managing an organization’s telephony network:

* **Provisioning API**: Handles the setup of an organization’s telephony infrastructure, including extensions, devices, and phone configurations. It lays the foundation for a functional network.
* **Call Management API**: Governs how incoming calls are routed through the network. It applies rules and logic to ensure calls reach the right individuals or agents efficiently.
* **Voice API**: Once a call is successfully connected via the Call Management API, the Voice API takes over. It enables developers to manage live calls, including actions like placing, controlling, and monitoring them.

Understanding how these APIs work together will give you a stronger foundation as you begin working with the Voice API.

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
