contributors: CraigCo,PacoVu,tylerlong,embbnux,grokify,Leonard-Wang-2000,dibyenduroy,howie-chen
no_breadcrumb:true

<!--
!!! hint "[Join the RingCentral Video Client SDK beta](https://forms.gle/H3QxfhqAhujkktXa6)"
    The RingCentral [Video Client SDK](./video/client-sdk/) is a product to help developers build fully customized and branded video experiences. Quickly deploy custom branded meetings for your company, ideal for healthcare providers and educators. 
-->

# RingCentral MVP™ Developer Guide

{! docs/carousel.md !}

## Popular use cases

<div class="row row-cols-1 row-cols-md-3 mb-3">
  <div class="col">

  <div class="card bg-light bg-gradient h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h3 card-title">Send and receive SMS messages</h5>
      <h6 class="h4 card-subtitle mt-0 mb-2">Stay connected and engaged with customers at scale through messaging automation.</h6>
      <p class="card-text">Use RingCentral to send and receive SMS, and access your SMS message history.</p>
      <ul class="pl-0 ml-4 pb-2">
        <li><a href="./messaging/sms/sending-sms/" class="card-link">Send an SMS</a></li>
        <li><a href="./messaging/sms/sending-images/" class="card-link">Send images over SMS</a></li>
        <li><a href="./messaging/sms/high-volume/sending-highvolume-sms" class="card-link">Send High Volume SMS</a></li>
      </ul>
    </div>
  </div>

  </div>
  <div class="col">

  <div class="card bg-light bg-gradient h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h3 card-title">Synchronize call history</h5>
      <h6 class="h4 card-subtitle mt-0 mb-2">Download and process your entire company's call history for compliance and analytics.</h6>
      <p class="card-text">Learn how to access your company's communication history:</p>
      <ul class="pl-0 ml-4 pb-2">
        <li><a href="./voice/call-log/details" class="card-link">Trace calls flowing across the network</a></li>
        <li><a href="./voice/call-log/recordings" class="card-link">Access call recordings</a></li>
        <li><a href="./voice/call-log/archival" class="card-link">Archive call histories</a></li>
      </ul>
    </div>
  </div>

  </div>
  <div class="col">

  <div class="card bg-light bg-gradient h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h3 card-title">Analyze call and meeting recordings</h5>
      <h6 class="h4 card-subtitle mt-0 mb-2">Archive and extract key data and insights from call recordings</h6>
      <p class="card-text">RingCentral securely stores all media you generate and makes it available to you through an API.</p>
      <ul class="pl-0 ml-4 pb-2">
        <li><a href="./voice/call-log/recordings/" class="card-link">Access call recordings</a></li>
        <li><a href="./video/api/meeting-history/" class="card-link">Access meeting recordings</a></li>
        <li><a href="./messaging/message-store/working-with-message-store/" class="card-link">Access voicemails</a></li>
      </ul>
    </div>
  </div>

  </div>
</div>

## Check out these popular developer topics

<div class="row row-cols-1 row-cols-md-2 mb-3">
  <div class="col">

  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Authentication</h5>
      <p class="card-text">Every app needs to authenticate to the RingCentral platform. Learn what auth method is best for your app.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./authentication/jwt/quick-start/" class="card-link">JWT is great for server-to-server apps</a></li>
      <li><a href="./authentication/quick-start/" class="card-link">OAuth is ideal for apps with a user interface</a></li>
      <li><a href="./authentication/refresh-tokens/" class="card-link">Refresh tokens keep sessions active</a></li>
      </ul>
    </div>
  </div>

  </div>
  <div class="col">

  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Webhooks and events</h5>
      <p class="card-text">Get notified when key events occur so that your app can respond to events in real-time.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./notifications/webhooks/creating-webhooks/" class="card-link">Create a webhook</a></li>
      <li><a href="./notifications/push-notifications/pubnub/" class="card-link">Push notifications are great for pure client-side apps</a></li>
      <li><a href="https://developers.ringcentral.com/api-reference/Account-Presence-Event" class="card-link">See a list of events you can subscribe to</a></li>
      </ul>
    </div>
  </div>

  </div>
</div>

## Explore our APIs

<div class="row row-cols-1 row-cols-md-4 mb-3">
  <div class="col">

  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Artificial intelligence</h5>
      <p class="card-text">Generate transcripts and extract conversion insights from any media file.</p>
      <ul class="pl-0 ml-4">
        <li><a href="./ai/speech-to-text/" class="card-link">Create a transcript</a></li>
        <li><a href="./ai/speaker-diarization/" class="card-link">Know who spoke and when</a></li>
        <li><a href="./ai/text-summary/" class="card-link">Generate a summary of a conversation</a></li>
      </ul>
    </div>
  </div>

  </div>
  <div class="col">

  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Team messaging</h5>
      <p class="card-text">Use RingCentral to post interactive messages so users can get more work done without leaving RingCentral.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./team-messaging/add-ins/creation/" class="card-link">Build an add-in</a></li>
      <li><a href="./team-messaging/adaptive-cards/" class="card-link">Learn about Adaptive Cards</a></li>
      </ul>
    </div>
  </div>

  </div>
  <div class="col">

  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Voice and telephony</h5>
      <p class="card-text">Use RingCentral to enable a "click-to-dial" experience, and to manage calls in progress.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./voice/ringout/" class="card-link">Place a call with RingOut</a></li>
      <li><a href="./voice/call-control/" class="card-link">Manipulate active calls</a></li>
      <li><a href="./voice/call-log/recordings/" class="card-link">Access call recordings</a></li>
      </ul>
    </div>
  </div>
  
  </div>
  <div class="col">
  
  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Fax</h5>
      <p class="card-text">Use RingCentral to manage the faxes your company sends and receives.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./messaging/fax/sending-faxes/" class="card-link">Send a fax</a></li>
      <li><a href="./messaging/fax/receiving-faxes/" class="card-link">Receive a fax</a></li>
      </ul>
    </div>
  </div>
  
  </div>
</div>

<div class="row row-cols-1 row-cols-md-4 mb-3">
  <div class="col">

  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Meetings and video</h5>
      <p class="card-text">Schedule meetings and access meeting history and recordings.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./meetings/quick-start/" class="card-link">Schedule a meeting</a></li>
      <li><a href="https://developers.ringcentral.com/api-reference/Meeting-Recordings/listAccountMeetingRecordings" class="card-link">Access meeting recordings</a></li>
      </ul>
    </div>
  </div>

  </div>
  <div class="col">

  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Analytics</h5>
      <p class="card-text">Extract meaning insights into one's usage of the RingCentral communications platform.</p>
      <ul class="pl-0 ml-4">
      <li><a href="./analytics/aggregate" class="card-link">See the number of calls made, and time spent on the phone</a></li>
      <li><a href="./analytics/timeline" class="card-link">See call analytics broken down by time</a></li>
      </ul>
    </div>
  </div>

  </div>
  <div class="col">

  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Webinar</h5>
      <p class="card-text">Automate webinar messaging and integrate with your CRM.</p>
      <ul class="pl-0 ml-4">
        <li><a href="./webinar/quick-start/" class="card-link">Get started</a></li>
      </ul>
    </div>
  </div>

  </div>
  <div class="col">
  
  <div class="card h-100">
    <div class="card-body pt-0 pb-0">
      <h5 class="h5 card-title">Call handling</h5>
      <p class="card-text">Manage active calls as they are happening in real-time</p>
      <ul class="pl-0 ml-4">
      <li><a href="./voice/call-routing" class="card-link">Route calls to the right place</a></li>
      <li><a href="./voice/call-routing/manual/call-queues" class="card-link">Manage call queues</a></li>
      <li><a href="./voice/call-control" class="card-link">Manipulate active calls</a></li>
      <li><a href="./voice/supervision" class="card-link">Supervise calls</a></li>
      </ul>
    </div>
  </div>
  
  </div>
</div>

## Getting Help

If on your way to building your first RingCentral application you encounter difficulty or need help, we are here to assist. Here are our most popular support resources available to you:

* [Developer Forums](https://devcommunity.ringcentral.com/) - post a question to our support community.
* [StackOverflow](http://stackoverflow.com/questions/tagged/ringcentral) - seek help from one of the Internet's most popular Q&A sites for developers.
* [Live Chat](https://developer.ringcentral.com/community.html) - post your question to our public Glip Team for live, real-time support during business hours.

## Resources

<div class="row row-cols-1 row-cols-md-2 mb-3">
  <div class="col">

  <div class="card h-100">
    <div class="card-body">
      <h5 class="h5 card-title">API Reference</h5>
      <p class="card-text">Consult our exhaustive API Reference Guide, and make API call using ZERO CODE.</p>
      <a href="https://developer.ringcentral.com/api-reference" class="btn btn-primary">Learn more</a>
    </div>
  </div>
  
  </div>
  <div class="col">
  
  <div class="card h-100">
    <div class="card-body">
      <h5 class="h5 card-title">SDKs</h5>
      <p class="card-text">We offer development libraries in a number of languages (C#, Java, Python, PHP, Javascript and more) to made building apps easier.</p>
      <a href="https://developer.ringcentral.com/library/sdks.html" class="btn btn-primary">Learn more</a>
    </div>
  </div>
  
  </div>
</div>

## About RingCentral

RingCentral is a leading provider of global enterprise cloud communications and collaboration solutions. More flexible and cost-effective than legacy on-premises systems, RingCentral empowers modern mobile and distributed workforces to communicate, collaborate, and connect from any location, on any device and via any mode. RingCentral provides unified voice, video, team messaging and collaboration, conferencing, online meetings, digital customer engagement and integrated contact center solutions for enterprises globally. RingCentral’s open platform integrates with leading business apps and enables customers to easily customize business workflows.
