# Working with Call Logs

Developing with the [RingCentral Call Log API resource](https://developers.ringcentral.com/api-docs/latest/index.html#!#RefCallLogInfo.html) is one of the most popular topics among [RingCentral Developers](https://developer.ringcentral.com).

The RingCentral Call Log is the source of truth for how extensions within your [RingCentral Account](https://service.ringcentral.com) have used RingCentral for making and receiving: Voice Calls, SMS messages, and Fax messages. Every inbound and outbound call, SMS, or fax attempted using RingCentral is recorded at the **Extension** level into RingCentral data stores, and is accessible at either the **Account** level (meaning they are recorded for each user extension in your RingCentral account, and accessible specifically for a particular Extension or in aggregate at the account level by an account administrator).

<div class="card-deck">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Overview</h5>
        <p class="card-text">Get acquainted with high level aspects of the API, including permissions, rate limits, data retention and more.</p>
        <a href="./overview" class="btn btn-primary">Learn more</a>
      </div>
    </div>
</div>

<div class="card-deck">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">API Basics</h5>
        <p class="card-text">Review the high-level capabilities of the Call Log API, e.g. viewing list of active calls, accessing call log records, and more. </p>
        <a href="./api" class="btn btn-primary">Learn more</a>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Call Recordings</h5>
        <p class="card-text">Access call recording metadata and content.</p>
        <a href="./recordings" class="btn btn-primary">Learn more</a>
      </div>
    </div>
</div>

<div class="card-deck">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Synchronization</h5>
        <p class="card-text">Learn how to synchronize your locally stored call log data using two methods: incremental and full sync.</p>
        <a href="./sync" class="btn btn-primary">Learn more</a>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Detailed Call Log Data</h5>
        <p class="card-text">Access detailed call log data beyond what is made available when fetching call log data via a list.</p>
        <a href="./details" class="btn btn-primary">Learn more</a>
      </div>
    </div>
</div>

<div class="card-deck">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Best Practices</h5>
        <p class="card-text">Learn about API throttling, and compliance (HIPPA) considerations.</p>
        <a href="./best-practices" class="btn btn-primary">Learn more</a>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Access Control</h5>
        <p class="card-text">Learn how to protect call log data via our API permissions framework and how to troubleshoot issues arising from access controls.</p>
        <a href="./access" class="btn btn-primary">Learn more</a>
      </div>
    </div>
<!--
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
        <a href="./" class="btn btn-primary">Learn more</a>
      </div>
    </div>
-->
</div>

