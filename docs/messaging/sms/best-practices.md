# Best practices for sending SMS via an API

!!! note "First time sending an SMS?"
    If you are new to RingCentral and are trying to send an SMS for the first time, we recommend you try our [SMS Quick Start Guide](../../quick-start/) available in multiple languages, but be sure to read the following best practices as well.

## Familiarize yourself with RingCentral's messaging policies

As a participating TCR CSP, RingCentral is dedicated to providing the highest quality of service, while working to eliminate spam, phishing, and fraudulent messages across our network. As such, RingCentral maintains [strict policies governing the use of our API to send SMS messages](https://www.ringcentral.com/legal/sms-mms-content-policies.html).

## When processing errors, check API error status codes

If you are receiving errors from the RingCentral API when sending multiple messages, be sure to check the HTTP response status code. If the status code is `429` that indicates your app is being throttled for sending too many responses. If you run into this, slow down your app requests. Approaches include:

* waiting the number of seconds specified in thee `Retry-After` header wheen a 429 status is encountered.
* checking the `X-Rate-Limit-Remaining` header and waiting the number of seconds specified in thee `X-Rate-Limit-Window` header.
* you can combine the above two approaches by checking `X-Rate-Limit-Remaining` and handling `429` errors.

Learn more about [how to deal with rate limiting errors](../../basics/rate-limits/). 

## Use single-domain links when transmitting URLs

If you transmit URLs in the messages you send, please keep in mind the following to avoid your messages being mis-identified as spam.

* Use links associated with a single hostname per message.

* Use domains that you own, and use full domains when possible.

* When using URL shorteners, avoid public or shared link shortening domains. Use a shortened domain that you own. 

## Avoid public link shorteners

Hosted link shorteners are easy to set up and use, however you should not use a public/shared link shortener as the same domains are often used by attackers to mask phishing and other URLs.
    
If you wish to use one for text messages, check to see the service supports using your own domain, sometimes called custom domains or vanity URLs.

Some common public/shared domain shorteners to avoid include:

- bit.ly
- goo.gl
- tinyurl.com
- Tiny.cc
- bc.vc
- budurl.com
- Clicky.me
- is.gd
- lc.chat
- soo.gd
- s2r.co

## Verify that your recipient phone numbers are SMS-enabled

Sending an SMS to a landline number will get rejected, therefore it is useful to check the numbers you are sending to before hand. 

Some services that can be used for this include the following: 

* [Numverify](https://numverify.com/) (free)
* [Ekata](https://ekata.com/developer/documentation/api-overview/#tag/Phone-Intelligence-API/paths/~13.0~1phone_intel/get) (comes with 250 free look ups)

When checking the recipient's phone number, ensure the phone number line type is not `landline`.
