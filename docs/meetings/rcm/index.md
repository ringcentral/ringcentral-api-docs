# Introduction to the RingCentral Meetings API

!!! warning "Want to develop for the RingCentral Video API?"
     The RingCentral Meetings API is different from our newer RingCentral Video API. The RingCentral Meetings API is built on top of our classic meetings solution, while RingCentral Video is a built-from-the-ground-up, next generation meetings platform.
     
     The RingCentral Video API is currently available to select partners and developers. If you are interested in building a RingCentral Video integration, please [request access today](https://forms.gle/Pk7pNMwky8di5LCR8)!

## How do I schedule a meeting?

The primary purpose of the Meetings API is to enable developers to create and schedule meetings with others. The sequence of creating a meeting and inviting others would be as follows:

1. Create meeting using the [Create Meeting API](https://developers.ringcentral.com/api-reference/Meeting-Management/createMeeting)
2. [Get the Meeting Service Info](https://developers.ringcentral.com/api-reference/Meeting-Configuration/readMeetingServiceInfo) in order to compose an invitation with all the necessary connection information.
3. Send your invitation to desired attendees.

* [Create a meeting using a Quick Start Guide](./quick-start/)

## How do I invite people to attend a meeting?

RingCentral meetings can be attended by anyone who has a link, so there is no API needed in order to add participants. Just create the meeting, obtain the meeting URL, and send it to whomever needs to attend. 