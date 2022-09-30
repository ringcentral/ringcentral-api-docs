no_breadcrumb:true

# Introduction to the RingCentral Video API

!!! warning "RingCentral Video REST API and Video SDKs are in beta"
    The RingCentral Video REST API and Client SDKs are currently in beta. Developers should be aware of the following:
	
       * Their feature sets are not reflective of the planned scope.
       * Backwards compatibility is not guaranteed from one release to the next.

!!! tip "What you need to know before you begin"

    Use the following quick steps to get started.

    #### 1. If you are not an existing RingCentral customer, create a free RingCentral Video Pro account 

    To build with the RingCentral Video API, you need a RingCentral Video Pro account, as our more standard "free developer account" does not support RingCentral Video. If you do not have one, [create a free RingCentral account](https://app.ringcentral.com/signup) now.

    #### 2. Create an application

    Login to the [Developer Console](https://developers.ringcentral.com/login.html#/) and create an app with at least the "Meeting" permission, or click the button below:
    
    <a target="_new" href="https://developer.ringcentral.com/new-app?name=Video+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+video+meeting+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Meetings&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Video App</a>

    #### 3. Contact us to graduate your app to production

    RingCentral applications need to be graduated before they can be used in the production environment. During this phase of our beta program, there is no developer sandbox support for RingCentral Video. Therefore, all development will be done in production. To obtain production credentials, request graduation below:
    
    <a target="_new" class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfwFYQLx2wTidwcGt3ZEkfnwvUIcrIdshEcH2EYQwTbZUeWyA/viewform?usp=sf_link">Request app graduation</a>

<div class="jumbotron pt-1">
  <h3 class="h3 display-5">See the RingCentral Video REST API in action!</h3>
  <p class="lead">The RingCentral Video API gives developers the ability to create and schedule meetings, as well as to access meeting history and recordings.</p>
  <p>We invite all developers to check out the RingCentral Video API by looking at a simple app to schedule a meeting in almost no time at all. Get started using a Quick Start in any of the following languages:</p>
  <a href="quick-start/#Javascript" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="quick-start/#PHP" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="quick-start/#Python" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="quick-start/#Ruby" class="btn btn-light qs-link">Ruby &raquo;</a>
  <a href="quick-start/#Java" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="https://god.postman.co/run-collection/e021788b7335a0ba15ec?action=collection%2Fimport#?env%5BRC%20PasswordFlow%20(Sharable)%5D=W3sia2V5IjoiUkNfU0VSVkVSX0hPU1ROQU1FIiwidmFsdWUiOiJwbGF0Zm9ybS5yaW5nY2VudHJhbC5jb20iLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6InBsYXRmb3JtLnJpbmdjZW50cmFsLmNvbSIsInNlc3Npb25JbmRleCI6MH0seyJrZXkiOiJSQ19BUFBfS0VZIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6MX0seyJrZXkiOiJSQ19BUFBfU0VDUkVUIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6Mn0seyJrZXkiOiJSQ19VU0VSTkFNRSIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjN9LHsia2V5IjoiUkNfRVhURU5TSU9OIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6NH0seyJrZXkiOiJSQ19QQVNTV09SRCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjV9LHsia2V5IjoibXlfYWNjZXNzX3Rva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoidGV4dCIsInNlc3Npb25WYWx1ZSI6IiIsInNlc3Npb25JbmRleCI6Nn0seyJrZXkiOiJiYXNpY19hdXRoX2hlYWRlciIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6InRleHQiLCJzZXNzaW9uVmFsdWUiOiIiLCJzZXNzaW9uSW5kZXgiOjd9XQ==" class="btn btn-light qs-link">Postman &raquo;</a>
</div>

<div class="card-deck">
  <div class="card" style="width: 18rem;">
    <div class="card-body pt-0 pb-0">
      <h5 class="card-title">Call the REST API</h5>
      <p class="card-text">Use RingCentral REST APIs to schedule meetings and retrieve meeting history with recordings and summaries.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./create-meetings/" class="card-link">Creating Meetings</a></li>
      <li><a href="./meeting-history/" class="card-link">Get Recordings</a></li>
      </ul>
    </div>
  </div>
  <div class="card" style="width: 18rem;">
    <div class="card-body pt-0 pb-0">
      <h5 class="card-title">Embed video in your app</h5>
      <p class="card-text">Use our client SDKs to create your own custom video experiences powered by RingCentral Video.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./client-sdk/quick-start/#Android" class="card-link">Getting started with Android</a></li>
      <li><a href="./client-sdk/quick-start/#iOS" class="card-link">Getting started on iOS</a></li>
      <li><a href="./client-sdk/quick-start/#Javascript" class="card-link">Getting started with Javascript</a></li>
      </ul>
    </div>
  </div>
</div>

## RingCentral Video concepts

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
