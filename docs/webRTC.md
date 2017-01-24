Being able to make and receive voice calls directly from within the browser is growing in demand by [RingCentral Developers](https://developer.ringcentral.com).

This guide provides developers the foundation information needed to begin Developing with RingCentral WebRTC to enable peer-to-peer business voice communications in your browser-based applications.

## What is WebRTC?
[WebRTC](https://webrtc.org) is an acronym which stands for web real time communications. WebRTC is a free, open project supported by Google, Apple, Mozilla, Opera, and other majjor internet companies that provides browsers and mobile applications with Real Time Communications capabilities via simple APIs. The WebRTC components have been optimized to best serve this purpose.

* Acronym for: Web Real-Time Communication
* Upcoming standard aims to enable peer-to-peer RTC in browsers
* No plugins required
* Official Website: https://webrtc.org/ 
* Enables browser-to-browser (aka: peer-to-peer) applications with:
    * Voice (only type supported by RingCentral currently)
    * Data
    * Video

WebRTC is used for browser-to-browser (also known as peer-to-peer) communications with SIP to handle signaling.

In the wild, WebRTC is supported by several browsers, but Ring Central officially supports WebRTC with Google Chrome and Mozilla Firefox. [View complete browser support for WebRTC protocol](http://caniuse.com/#feat=rtcpeerconnection).

## RingCentral-Flavored WebRTC

* Currently only supports RTC Voice (no data or video...yet)
* Enterprise-grade WebRTC Voice
* Protected with RingCentral OAuth2 (Authorization Flow)
* Call Recording is available
* Follows same rules as RingOut, but is one-legged dial rather than two-legged
* Developers gain all the additional functionalities RingCentral offers!
* Requires Extension with a Digital Line to authenticate and use

RingCentral is dog-fooding our WebRTC offering and in production we have used it with our [Google for Work Application](https://developers.ringcentral.com/app-gallery.html) (available in the RingCentral App Gallery), and within [Glip](https://glip.com)

## RingCentral WebPhone Client Library

This open source code repository contains the official library developers can use in their client-side application code to test, and enable RingCentral WebRTC in their browser-based applciations.

* [RingCentral WebPhone Client Library on Github](https://github.com/ringcentral/ringcentral-web-phone)
* Provides easy to use framework
* Uses the [RingCentral JS SDK](https://github.com/ringcentral/ringcentral-js)
* Contains complete [Demo Phone App](https://github.com/ringcentral/ringcentral-web-phone/tree/master/demo)
* Officially Supported by RingCentral
* [Complete Usage Documentation on Github](https://github.com/ringcentral/ringcentral-web-phone#usage)
* [Wrapper API to SIP.js](https://github.com/ringcentral/ringcentral-web-phone#api) providing full call controls to developers

## Defining a WebRTC Application

To use the Web Phone client library (or to create your own custom application) you will need to define a new application in the Ring Central Developer Portal.

* Login to the [Developer Portal](https://developers.ringcentral.com)
* Create a new app - provide a useful name/description
* **Application Type:** Private
* **Platform Type:** Browser-Based (required)
* **Authorization Flows:** Authorization Flow + Refresh
* **Permissions Needed:** VOIP Calling + any others you desire
* **Redirect URI:** Your web server RingCentral redirect handler

## Troubleshooting

* Authentication Issues
    * 3 - legged OAuth flow and redirect URI has to be setup correctly for the application
    * VoIP permission has to be added to your application
    * Should have digital line attached to the extension the application is logging through
    * Application type should be set to “Browser-based” 
* Microphone and audio o/p device permission 
    * Browser should be able to detect microphone
    * Browser should allow permission to access microphone and audio o/p device
