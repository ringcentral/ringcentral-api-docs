# Introduction to the RingCentral Video API

!!! warning "Want to develop for the RingCentral Video API?"
     The RingCentral Video API is currently available to select partners and developers. If you are interested in building a RingCentral Video integration, please [request access today](https://forms.gle/Pk7pNMwky8di5LCR8)!

<div class="jumbotron pt-1">
  <h3 class="h3 display-5">See the RingCentral Video API in action!</h3>
  <p class="lead">The RingCentral Video API gives developers the ability to create and schedule meetings, as well as to access meeting history and recordings.</p>
  <p>We invite all developers to check out the RingCentral Video API by looking at a simple app to schedule a meeting in almost no time at all. Get started using a Quick Start in any of the following languages:</p>
  <a href="quick-start/node/" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="quick-start/php/" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="quick-start/python/" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="quick-start/ruby/" class="btn btn-light qs-link">Ruby &raquo;</a>
  <a href="quick-start/java/" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="quick-start/c-sharp/" class="btn btn-light qs-link">C# &raquo;</a>
</div>

## How do I schedule a meeting?

The primary purpose of the Meetings API is to enable developers to create and schedule meetings with others. The sequence of creating a meeting and inviting others would be as follows:

1. Create meeting using the [Create Meeting API](https://developers.ringcentral.com/api-reference/Meeting-Management/createMeeting)
2. [Get the Meeting Service Info](https://developers.ringcentral.com/api-reference/Meeting-Configuration/readMeetingServiceInfo) in order to compose an invitation with all the necessary connection information.
3. Send your invitation to desired attendees.

* [Create a meeting using a Quick Start Guide](./quick-start/)

## How do I invite people to attend a meeting?

RingCentral meetings can be attended by anyone who has a link, so there is no API needed in order to add participants. Just create the meeting, obtain the meeting URL, and send it to whomever needs to attend. 