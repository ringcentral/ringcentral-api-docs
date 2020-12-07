# SMS Best Practices Guide

!!! note "First time sending an SMS?"
    If you are new to RingCentral and are trying to send an SMS for the first time, we recommend you try our [SMS Quick Start Guide](../../quick-start/) available in multiple languages, but be sure to read the following best practices as well.

* Check API Error Status Code
* Use Single Domain Links
* Verify Recipient Numbers are SMS Enabled

## Check API Error Status Code

If you are receiving errors from the RingCentral API when sending multiple messages, be sure to check the HTTP response status code. If the status code is `429` that indicates your app is being throttled for sending too many responses. If you run into this, slow down your app requests. Approaches include:

* waiting the number of seconds specified in thee `Retry-After` header wheen a 429 status is encountered.
* checking the `X-Rate-Limit-Remaining` header and waiting the number of seconds specified in thee `X-Rate-Limit-Window` header.
* you can combine the above two approaches by checking `X-Rate-Limit-Remaining` and handling `429` errors.

## Use Single Domain Links

If you use URLs in your message, the following are important considerations are necessary to use them successfully.

* Use links associated with a single hostname per message
* Full domains are preferred. Link shorteners can be used but use a link shortener domain that you own.

!!! warning "Avoid public / shared link shortener domains"
    Hosted link shorteners are easy to set up and use, however you should not use a public / shared link shortener domain as the same domains are often used by attackers to mask phishing and other URLs.
    
    If you wish to use one for text messages, check to see the service supports using your own domain, sometimes called custom domains or vanity URLs.

    Some common public / shared domain shorteners to avoid include:
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

## Verify Recipient Numbers are SMS Enabled

Sending a SMS text to a landline number will get rejected so it's useful to check the numbers you are sending to before hand. 

Some services that can be used for this include the following. Ensure the phone number line type is not `landline`.

* Numverify (free): https://numverify.com/
* Ekata (250 free lookups): [https://ekata.com](https://ekata.com/developer/documentation/api-overview/#tag/Phone-Intelligence-API/paths/~13.0~1phone_intel/get)
