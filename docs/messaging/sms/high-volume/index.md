# High Volume SMS

!!! info "Developers should familiarize themselves with [RingCentral's SMS content and messaging policies](https://www.ringcentral.com/legal/sms-mms-content-policies.html)"

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
  <p><a class="btn btn-primary" href="https://gamechanging.dev/sms">Enroll in High Volume SMS beta &raquo;</a></p> <p><a class="btn btn-primary" href="https://www.ringcentral.com/office/plansandpricing.html">See pricing &raquo;</a></p>
</div>

## Key SMS Features

RingCentral High Volume SMS supports the following key features:

* [Sending at high volumes per phone number](sending-highvolume-sms.md)
* [Opt-in / Opt-out Handling](opt-out.md)
* [Event Notifications](events.md)
* [Detailed Error Codes](handling-errors.md)
* [Approved for high volume usage with mobile carriers](toll-free-sms-vs-local-numbers.md#carrier-approval)
* [Support for local and toll-free numbers](toll-free-sms-vs-local-numbers.md)
* [Support for United States and Canada](toll-free-sms-vs-local-numbers.md#supported-countries)

!!! warning "Limitations of High Volume SMS"
    High Volume SMS does not currently support the following:

    * Sending images, vcards and other files (MMS)
    * Group messaging (MMS)
    * International SMS messaging from US numbers
    * SMS originating from numbers outside of the US and Canada
    * Sending SMSes between US and Canada from 10DLC numbers is not supported (It's supported for Toll Free numbers)
    * Scheduling SMS in advance

    If you need to send files, communicate with a group, or send to international destinations, please consider our [Enhanced Business SMS API](../../index.md).
