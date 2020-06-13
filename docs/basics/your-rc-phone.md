# Using Phones in Sandbox

Every sandbox account is provisioned a different main company phone number and user that is different than ones used in production. Additional phone numbers and users can also be configured in your sandbox account. Some use cases supported by these communication apps include:

* RingOut - to receive calls at a sandbox phone number.
* Voicemail - to retrieve, listen to, and delete voicemails.
* Call Control - to hang-up, hold, flip, forward calls placed to sandbox numbers. 

You can use several phone with your sandbox account to make and receive calls.

1. [RingCentral Phone](https://www.ringcentral.com/apps/rc-phone) available in our App Gallery. This is a full-featured, production application with many features, including making/receiving calls, accessing voicemail, call control, SMS, etc.
1. [Embeddable Widget](https://ringcentral.github.io/ringcentral-embeddable/). This is a full-featured, production read web developer tool that can be used to integrate RingCentral functionality with your web app.
1. [WebRTC Demo App](https://ringcentral.github.io/ringcentral-web-phone/). This is a WebRTC voice endpoint that implements inbound and outbound calls with various call controls.

More information is available below on using and configuring these endpoints to work in Sandbox and to configure your app if needed.

## 1) RingCentral Phone and Sandbox Environment

Every new install of the RingCentral Phone is configured to work in production. To switch your phone to the sandbox environment, followi these steps:

1. Launch RingCentral Phone.

2. Once logged in, press ++ctrl+f2++ (for Mac ++fn+cmd+f2++), to bring up a menu to select your preferred environment.
   
      <img src="../../img/rc-phone-toggle.png" class="img-fluid">
   
3. Select 'Sandbox' in the pop-up menu and sign in with your sandbox account credentials.

## 2) Embeddable Web Widget and Sandbox Environmnets.


## 3) WebRTC Demo App and Sandbox Environmnets.

To use the WebRTC Demo App that comess with the RingCentral WebRTC SDK, you can use the hosted demo or run your own instance of the demo.

The demo is located in the WebRTC SDK (`github.com/ringcentral/ringcentral-web-phone`).

When ussing the online demo, use the following steps:

1. Create an application with the proper permissions.
1. Enter the OAuth 2.0 redirect URL as:`http://ringcentral.github.io/ringcentral-web-phone/callback.html` 
1. Navigate to [http://ringcentral.github.io/ringcentral-web-phone/](http://ringcentral.github.io/ringcentral-web-phone/)
