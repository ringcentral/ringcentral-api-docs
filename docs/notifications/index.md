# Push Notifications

There are two strategies of client-service interaction providing data renewal: poll and push. Polling implies that the client periodically queries the server in order to get the updated data. Pushing implies that the server immediately sends notifications to the client on any data update. RingCentral API supports both types of data renewal. However in case of rarely changing data push notifications are evidently more effective, as they reduce client-server traffic, server load and improve user experience by notifying client applications on-the-fly with a minimal delay about important events.

For example, for getting new messages the client application can periodically poll the server in order to get updates via incremental synchronization. However push notifications delivered immediately when the new messages appear are much more convenient. To start receiving push notifications the client application should subscribe for the required events; in this case, for the new messages.

The RingCentral API supports receiving push notifications for its clients of any type, including but not limited to mobile applications (smartphones and tablets running Android/iOS), desktop applications (for example, softphone for Windows/Mac), server-side applications hosted in a cloud, HTML5 applications, etc.

The RingCentral API supporst two types of push notifications:

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Pub/Sub via PubNub</h5>
        <p class="card-text">The client creates and maintains an open connection to receive new events, or "push notifications." This is useful for client apps such as mobile apps and client-only web apps.</p>
        <a href="./pubsub" class="btn btn-primary">Learn more</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Webhooks</h5>
        <p class="card-text">A server is notified by an HTTP POST from RingCentral. Servers may subscribe and unsubscribe to webhooks programatically. This is the most common form of notification.</p>
        <a href="./webhooks" class="btn btn-primary">Learn more</a>
      </div>
    </div>
  </div>
</div>

