# High Volume SMS

!!! info "Important:Please read [RingCentral's SMS content and messaging policies](../../sms-content-policy/)"

<div class="jumbotron pt-1">
  <h3 class="display-5">Getting Started with High Volume SMS!</h3>
  <p class="lead">RingCentral's High Volume SMS API allows you to send up to 250,000 texts per day and 10,000 texts per API request from a single number that meets the wireless industry guidelines for commercial SMS. This can be used for popular use cases such as appointment reminders, marketing campaigns, password resets, and more.</p>

<hr class="my-4">
  <p>The following guides have been created to assist developers in getting started quickly:</p>

  <ul>
    <li><a href="./toll-free-sms-vs-local-numbers#ordering-and-provisioning-high-volume-sms-numbers">Provision and validate High Volume SMS numbers</a></li>
    <li><a href="./sending-highvolume-sms">Sending High Volume SMS</a></li>
    <li><a href="./message-store">Reading High Volume SMS</a></li>
    <li><a href="./opt-out">Using opt-in and opt-out handling</a></li>
    <li><a href="./handling-errors">Using detailed message status</a></li>
  </ul>
  <hr class="my-4">
  <p><a class="btn btn-primary" href="https://ringcentral.github.io/releases/high-volume-sms-beta-signup.html">Enroll in High Volume SMS beta &raquo;</a></p> <p><a class="btn btn-primary" href="https://developers.ringcentral.com/api-products/sms#pricing">See pricing &raquo;</a></p>
</div>

## Key SMS Features

RingCentral High Volume SMS supports the following key features:

* [Sending at high volumes per phone number](./sending-highvolume-sms)
* [Opt-in / Opt-out Handling](./opt-out)
* [Event Notifications](./events)
* [Detailed Error Codes](./handling-errors)
* [Approved for high volume usage with mobile carriers](./toll-free-sms-vs-local-numbers/#carrier-approval)
* [Support for local and toll-free numbers](./toll-free-sms-vs-local-numbers)
* [Support for United States and Canada](./toll-free-sms-vs-local-numbers/#supported-countries)

!!! warning "Limitations of High Volume SMS"
    High Volume SMS does not currently support the following:

    * Sending images, vcards and other files (MMS)
    * Group messaging (MMS)
    * International SMS messaging
    * Numbers outside the US and Canada
    * Scheduling SMS in advance
    * Developer sandbox

    If you need to send files, communicate with a group, or send to international destinations, please consider our [standard SMS API](../../).
