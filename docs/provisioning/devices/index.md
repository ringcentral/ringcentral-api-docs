# RingCentral Phone Devices

A phone device is a communication endpoint that enables users to make and receive calls. A device can be a **hard phone** — typically a SIP phone, such as a Poly desk phone — or a **soft phone**, such as a RingCentral (RC) native desktop (Windows and Mac) app or a browser-based web app.

## Hard Phones (SIP phone)

A SIP phone uses the Session Initiation Protocol (SIP) to make and receive voice calls over an IP network. Most commonly, it's a dedicated desk handset — like a Poly or Yealink device with physical buttons for hold, transfer, record etcetera: the classic "real phone" experience for a desk or shared station.

Before a hard phone (SIP desk phone) can make or receive calls, it must be:

- Provisioned: Configured with its line identity, network settings, SIP server information, and other required parameters.
- Assigned a Digital Line: Provided with a dedicated phone number.
- Assigned to an extension: Associated with a user extension, limited extension, or shared line group.

This will enable the phone to be used for:

- Making outbound calls to any PSTN number
- Receiving inbound calls from any PSTN number

For detailed setup instructions, see [SIP phone provisioning](https://support.ringcentral.com/article-v2/Manual-Provisioning-How-get-SIP-Settings.html?brand=RC_US&product=RingEX&language=en_US).

SIP isn't limited to physical hardware, though — it can also run as a software client with no device at all, giving AI voice agents, IVR systems, or bots a native SIP endpoint to place and receive calls. RingCentral developers can implement their own SIP phone by using the [RingCentral SIP phone SDK](https://github.com/ringcentral/ringcentral-softphone-ts).

## Soft Phones (WebRTC phone)

A WebRTC phone (a.k.a Web phone) lets users make and receive real-time voice calls directly through a web browser or app, turning any desktop, laptop, tablet, or phone into a business line the moment they log in. There's no hardware and no provisioning required — just full portability for remote work, travel.

To use it, the user extension simply needs to authenticate (log in) to the soft phone app.

Please refer to [this article](https://support.ringcentral.com/article-v2/Intro-to-the-RingCentral-app.html?brand=RingCentral&product=RingEX&language=en_US) for detailed information on RingCentral app features..

RingCentral developers can implement their own WebRTC phone by using the [RingCentral Web Phone SDK](https://github.com/ringcentral/ringcentral-web-phone).

## Typical Use Cases

| Scenario | Device Type | License Needed | What They Can Do |
|---|---|---|---|
| Office receptionist | Hard phone (SIP desk phone) | RingEX | Handle high-volume inbound calls, transfer internally, no computer/app required |
| Full-time employee | Soft phone (RC app) | RingEX | Log in from anywhere using laptop/phone to make outbound calls to prospects' PSTN numbers |
| Part-time/limited-license staff | Soft phone (RC app) | None | Receive inbound calls and message teammates, but can't dial external numbers |
| Hot-desking office | Hard phone (shared) | RingEX | Multiple employees log into shared provisioned phones with their own credentials |
| CRM click-to-call | Soft phone (integrated)<br>Desk phone | RingEX | Initiate outbound PSTN calls directly from a CRM contact record (e.g., Salesforce) |
