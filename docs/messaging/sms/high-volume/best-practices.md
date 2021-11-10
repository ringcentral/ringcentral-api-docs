# High Volume SMS Best Practices and Guidelines

!!! note "First time sending an SMS?"
    If you are new to RingCentral and are trying to send an SMS for the first time, we recommend you to check our [SMS content policies](../sms-content-policy/). 

Spam message blockages and invalid phone numbers are the most common causes of having low message deliverability - the SMS performance which you aim to reach as high as possible.

Sending text messages to invalid phone numbers is a waste of resources and money. Apparently, it decreases your message delivery rate.

Unsolicited and harmful messages are classified as spam, and will be blocked by most wireless carriers. Sending spam messages to many recipients would trigger a carrier to block your phone number. Consequently, any message sent from that phone number will be blocked, even if the message is innocuous.

Different wireless carriers apply different anti-spam filtering techniques, to protect their subscribers from receiving unwanted messages. Spam detection is complicated and some carriers are stricter than others. The boundary between spam and non-spam messages is fuzzy, and the criteria may change over time.

There is no magic or trick to fool spam detections. So the only way to avoid getting your messages blocked is not to send spam messages.

Following are some best practices and guidelines which would help you increase your SMS performance.

* Get recipient's permission and attention
* Increase and maintain response rate
* Include opt-out instructions
* Segment your recipient lists
* Segment your messages
* Do not send messages to opted-out recipients
* Avoid sending messages to invalid numbers
* Use single domain links
* Common sense


## Get recipient's permission

Get recipient's opt-in consent before sending messages to their number. This is not only helping you avoid getting customer complaints causing future messages emanating from your number to be filtered out by their carrier, but also protecting your business from violating text messaging regulations, which may cost your business a fortune. Especially when you send marketing or other non-essential messages.

For an implied consent, meaning that when an individual gives you their mobile phone number for some business purpose, but has not explicitly stated that they want to receive marketing text messages from you. In this case, send your first message as a request for an opt-in option. Explicitly ask the recipient to reply “Yes” to opt-in before sending your sales or promo marketing messages. If there is no reply from the recipient, consider it as an opted-out number and stop sending text messages to that phone number.

## Increase and maintain response rate

High response rate is the good health of your phone number. It would help wireless carriers identify that your message is expected and welcomed by the recipient. This is important especially, when you start using your high volume SMS phone number, as high response rate would help warm up your phone number reputation.

Start your text messaging campaign by sending a brief message to introduce yourself or your business, and ask if your customers would like to learn more about your sales or your promo. E.g. 'Reply YES for more info'. Treat the first message as an opt-in or opt-out choice for your customers.

## Include opt-out instructions

Always provide clear opt-out instructions. Messages without opt-out instructions are likely to get marked as spam. Including opt-out instructions also ensures compliance with consumer data protection regulations. For example, add this text at the end of each message 'Text STOP to unsubscribe'.

You don't need to add the opt-out instructions to every message sent out to your recipient. Just the first message and once in a while if you repeatedly send messages to the same recipient, would be sufficient.

## Segment your recipient lists

Avoid sending the same message to mass recipients. Segment your recipient lists based on customer preferences, demographics and other characteristics. Then, send relevant messages to each group to vary your content.

## Personalize and optimized messages

Sending a message to customers should provide a good customer experience. The message should be correctly punctuated and conveys useful information in a short and summarized manner which can be read by the recipients on-the-go. Messages that encourage recipients to respond are very effective, as they demonstrate value that you are delivering to the customer.

If you know the recipient’s name, greet the recipient by name. For example, consider sending this message “Hi Rob, our records indicate that ...”, instead of “Our records indicate that …”.

Excessively capitalized SMS messages look like spam, and aggressive language often leads to complaints. Also avoid using hyperbole like '100% GUARANTEED', 'COMPLETELY FREE', or 'NO CHARGE' as they tend to be filtered.

## Segment your messages

SMS differs from email in that the messages are very short. Do not make your SMS message an email! Sending a very long text message to mass recipients looks like spam. So, break your long message into multi-section messages, then send a brief message with response choices to receive the next messages. As a bonus, this will usually improve your response rates, too.

**Consider this long message:**

    These arm bands will surely come in handy on your next run! Shop the deals now!

    Today's Trending Products: this and that and the others ...

    Recommended For You: this and that and that one too ...

    Click https://www.easyshopping.com to shop now or refer friends https://www.easyshopping.com/invite?utm_campaign to earn up to $100!

Replaced with multi-section messages

    Hi, EasyShopping.com provides fun and easy way to shop online. Reply 1 to get deals, or 2 to get more info.

    Reply STOP to unsubscribe

If your customer replies 1, send the next message with current deals

    Thank you for your interest!

    Today's Trending Products: this and that and the others ...

If your customer replies 2, send the next message with more information

    Thank you for your interest!

    Recommended For You: this and that and that one too ...

    Visit https://www.easyshopping.com/deals to shop now or refer friends https://www.easyshopping.com/invite?utm_campaign to earn up to $100!

## Do not send messages to opted-out recipients

Regularly, [read opted-out](../opt-out#read-opted-out-phone-numbers) phone numbers and remove them from your recipient list. If you receive this error code `SMS-CAR-413` after sending a message to your recipient. Take serious action to remove the recipient number from your recipient list.

Sending a text message to an opted-out recipient is violating the text messaging compliance laws, and consequently, a recipient's carrier will block your message. Keep sending text messages to an opted-out recipient may trigger the recipient's carrier to block your phone number permanently.

## Avoid sending messages to invalid numbers

When exporting your customer phone numbers from your contact list or your CRM system, make sure that you select the mobile number type if applicable.

To avoid invalid phone number problems, you can use phone number validation services to detect valid mobile phone numbers. For example, using the  following services to ensure the phone number type is not a landline number:

Numverify (free): https://numverify.com

Ekata (250 free lookups): https://ekata.com

However, not all invalid numbers are detectable until a wireless carrier reports it as invalid. Read your [message store](../message-store#read-high-volume-message-store), preferably after sending a batch of messages, and look for messages with the “SendingFailed” or “DeliveryFailed” status with these error codes `SMS-UP-410` , `SMS-CAR-411`, `SMS-CAR-412`, check the recipient number and remove it from your recipient list.

## Use single domain links

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

## Common sense

A good rule of thumb is to put yourself in your recipient’s shoes and write a message in a way that would be compelling for you.

What is your reaction when you receive an unsolicited message so frequently from an unknown sender? Accept it, block it or report it to your carrier?

Are you going to click on this kind of link http://bit.ly/aX123d in a message sent by an unknown sender and expect you will win a big gift? Do you care what that link will take you to?
