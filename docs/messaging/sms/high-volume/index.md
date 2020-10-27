# High Volume SMS

<div class="jumbotron pt-1">
  <h3 class="display-5">Getting Started with High Volume SMS!</h3>
  <p class="lead">RingCentral's High Volume SMS API allows you to send large numbers of SMS texts from a single number using a single API request with phone numbers that meet the wireless industry guidelines for commerical SMS. This can be used for popular use cases such as appointment reminders, marketing campaigns, password resets, and more.</p>

<hr class="my-4">
  <p>The following guides have been created to assist developers in getting started quickly:</p>

  <ul>
    <li><a href="./sending-highvolume-sms">Sending High Volume SMS</a></li>
    <li><a href="./message-store">Reading High Volume SMS</a></li>
    <li><a href="./opt-out">Using opt-in and opt-out handling</a></li>
    <li><a href="./handling-errors">Using detailed message status</a></li>
  </ul>
  <hr class="my-4">
  <p><a class="btn btn-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfAFq6eJWohYqb-4yr6n3FeJGx0DXySel-WxE29Tc_rblZ4zA/viewform?usp=sf_link">Sign up now &raquo;</a></p>
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
    * Scheduling

    If you need to send files, communicate with a group, or send to international destinations, please consider our [standard SMS API](../../).
