no_breadcrumb:true

# Introduction to the RingCentral Video Platform

{! mdx_includes/video-beta-notice.md !}

The RingCentral Video platform is available to RingCentral MVP customers, ISVs building apps for RingCentral customers, and third-party developers building apps designed for their customers. The video platform is made up of a number of products that can help developers:

* Create and schedule meetings
* Analyze and report on meeting histories
* Download and store meeting recordings
* Build unique meeting experiences powered by RingCentral Video

## Which RingCentral Video product is right for you?

<div class="row row-cols-1 row-cols-md-2 mb-3">
  <div class="col">

  <div class="card bg-light h-100">
    <div class="card-body pt-0 pb-0">
      <h4 class="card-title">Embed custom RingCentral Video meetings in your app</h4>
      <p class="card-text">Use our client SDKs to create your own custom video experiences powered by RingCentral Video. Our SDKs are available in the following languages:</p>
      <ul class="pl-0 ml-4">
      <li><a href="./client-sdk/quick-start/#Android" class="card-link">Android</a></li>
      <li><a href="./client-sdk/quick-start/#iOS" class="card-link">iOS</a></li>
      <li><a href="./client-sdk/quick-start/#Javascript" class="card-link">Javascript</a></li>
      </ul>
	  <a class="btn btn-primary mb-3" href="https://forms.gle/H3QxfhqAhujkktXa6">Join the Client SDK beta &raquo;</a><br>
	  <a class="btn-link mb-3" role="button" href="./client-sdk/">Learn more about the Client SDK &raquo;</a>
    </div>
  </div>
  
  </div>
  <div class="col">
  
  <div class="card bg-light h-100">
    <div class="card-body pt-0 pb-0">
      <h4 class="card-title">Manage RingCentral Video meetings, history and data</h4>
      <p class="card-text">Use RingCentral Video REST APIs to schedule meetings and retrieve meeting history with recordings and summaries.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./api/create-meetings/" class="card-link">Create and schedule meetings</a></li>
      <li><a href="./api/meeting-history/" class="card-link">Access and download recordings</a></li>
      </ul>
	  <a class="btn btn-primary" href="./api/quick-start/">Try out the REST API &raquo;</a>
    </div>
  </div>

  </div>
</div>

## Learn more about key RingCentral Video concepts

### What is a "meeting bridge?"

A meeting bridge, or "bridge" for short," is a virtual meeting room in which meetings take place. A bridge comes with a dedicated URL and dial-in information to allow people to easily join the meeting via a web browser, or call in using their phone. 

### What is a "meeting?"

A meeting is created by the system the moment someone enters a bridge. When the bridge is empty again, the meeting is considered to be over.

In this way, a bridge can actually host many meetings, which is reflected in the "Meeting History API."

### Where do you specify the time and place of a meeting?

RingCentral Video embraces the practical reality of modern meetings and defers completely to a person's calendar (Google, Outlook, etc.) for a meeting time and place. This is because the calendar is ultimately the more reliable source of record for this information. Consider for a moment the following scenario where meeting software can become out of sync with a calendar.

> Jasmine schedules a meeting for next Monday at 10:00am, and invites Robert using her calendar, pasting the meeting details into her invite. On Friday, Robert tells Jasmine that he has a prior engagement at that time and asks to reschedule to 2:00pm. Jasmine then goes to her calendar, changes the time and sends out an update.

As far as the meeting software is concerned, the meeting is still taking place at 10:00am, but everyone's calendar now says 2:00pm. In this way you can see how the meeting software and the calendar can easily get out-of-sync.

RingCentral Video is able to display upcoming meetings by querying the connected calendar for the current user. Therefore, the moment someone changes their calendar, RingCentral Video is able to display an accurate and up-to-date schedule of upcoming meetings. 

### How do I invite people to attend a meeting?

RingCentral Video meetings can be attended by anyone who has a link, so there is no API needed in order to add participants. Just create the meeting, obtain the meeting URL, and send it to whomever needs to attend. 

### How do I control who has permission to join a meeting?

When you create a bridge, there are a number of settings that give you the ability to more tightly control who can join a meeting and how. These features should help:

* Protect meetings with a password
* Only allow people from the same account to join a meeting
* Send outside guests to a waiting room
