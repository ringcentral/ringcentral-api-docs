# Registering attendees for a webinar

{! docs/webinar/beta-notice.md !}

The registration process and the corresponding set of API endpoints exists to not only help facilitate people attending your webinar, but also in helping you to manage the end-to-end pre-webinar experience of your attendees, including: signing up to attend, cancelling one's registration, and even the process of joining the webinar. 

### All-hands vs marketing webinars

Webinar registration and the use of related webinar registrant API endpoints is only intended for "marketing webinars" in which attendees are coming largely from outside your organization. If you are hosting an internal webinar, for example for a large all-hands company meeting, there is no need for attendees register beforehand. 

One can disable/enable registration via the `registrationEnabled` webinar setting specified when the [webinar is created](../creation/).

## Registering a person for a webinar

To register a person for a webinar, one would need to create the webinar registrant via the Webinar API. The code and logic for this is relatively straight-forward and is done by calling the [create registrant](https://developers.ringcentral.com/api-reference/Registrants/rcwRegCreateRegistrant) operation shown below. 

=== "Javascript"

    ```js
    {!> code-samples/webinar/inviting.js !}
    ```

### Using the `externalId` property to correlate a registrant within an external system

The `externalId` parameter is intended to be used to help correlate a registrant for a webinar with an identity stored in a third-party identity provider. For example you may wish to store the ID of a contact, lead or opportunity in your CRM so that the registrant/attendee can easily be associated with a record in that system. Using this field effectively can help you more efficiently perform follow up tasks when a webinar has concluded, such as updating lead records, or triggering marketing campaigns managed by a third-party. 

There are few constraints on the value of the `externalId` field, meaning it is actually possible to store multiple values in the `externalId` field. For example, one may encode multiple key value pairs in the `externalId` using a simple query string syntax. Consider for example that you need to store two different values, like a contact ID and an opportunity ID. One can encode these values in the following way:

1. Consider have a lead ID of "123" and an opportunity ID of "4@56"
2. Convert these values into a set of key/value pairs, e.g. "lid=123" and "oid=4@56"
3. Encode these values into a single query string, e.g. "lid=123&iod=4%4056"
4. Then set the `externalId` to this encoded value. 

Then [reverse the process](https://measureschool.com/how-to-use-query-strings/) to access the individual values again. 

See "Correlating a registrant with an external namespace" below, and our documentation on [analyzing past webinars](../past-webinars/). 

### Hosting a custom webinar registration page

Webinar hosts wishing to host their own sign-up page for a webinar can do so easily by capturing sign-ups via their own web form, and then invoking the Webinar APIs to register attendees via backend code and logic. Processing registrations in this manner gives webinar hosts complete control over the entire end-to-end user experience including:

* Sending emails to attendees to confirm registration
* Sending emails to remind attendees of an upcoming webinar
* Processing cancellations
* Facilitating the join process for a webinar

### On-demand versus advanced registration

There is no limitation on when a person can register for a webinar. Some users for example may be part of an email campaign in which they are invited to attend a webinar that is happening at some point in time in the future. These users may very well follow a link found in an email they received to a sign-up page. Other users may only learn of the webinar the day of, or even moments before the event. These users will also need to register, but the flow might be much more fluid. For example, a user might:

* Arrive to a company's website and see a promotion for a webinar already in progress
* The user clicks a "join webinar" button 
* The user is directed to provide their name and email address
* The user is then directed straight into the live webinar

Regardless of how far in advance an attendees learns of a webinar, all attendees must first register for the webinar prior to being permitted to join or watch the webinar. The registration process helps developers with the following:

* Tracking who specifically is in attendance
* Track from where a user may have heard of a webinar
* Provide each attendee with a unique join URL
* Correlate an attendee of a webinar to an identity in some external system

## Managing your registration preferences

The RingCentral Webinar client application can be used to easily edit and manage webinars, sessions and their settings. However, those same settings can also be managed programmatically via the [update registration session](https://developers.ringcentral.com/api-reference/Registration-Management/rcwRegUpdateSession) preferences operation. Here are some of the registration preferences you can manage in this way:

* Turn on/off registration via the `registrationStatus` preference
* Obtain a quick summary of how many people have registered via the `registrantCount` property
* Determine if the webinar session has any "real" registrants (non-test registrants)
* Cause registration to close after a certain number of registrants via the `autoCloseLimit` preference
* Suppress RingCentral from sending any registration emails via the `suppressEmails` preference
* Enable/prevent attendees from joining from multiple devices using the `preventMultipleDeviceJoins` preference

## Hosting a custom join webinar or cancel registration page

Webinar hosts wishing to create a more customized end-user experience and design for their webinar often want to host the web pages used by attendees to cancel or join a webinar on their own website. In this case, hosts are empowered to host these pages themselves, and then to record the URLs for these pages along with the registrant they create through the API. These URLs can be specified using the following registrant parameters:

* `joinUri`
* `cancellationUri`

These URLs, once stored, will be shown to attendees and registrants in prefence over their RingCentral-hosted counterparts. 

This however does create the responsibility for third-party developers to fulfill the intents of these links themselves using their own application and server logic. Let's consider the following flow as an example:

1. Company hosts a registration page at https://acme.com/webinar/1234/join
2. A person comes to the registration page and registers for the webinar. 
3. Company receives request for person to join the webinar, and calls the Webinar API to create a registrant. The registrant is assigned an ID of "5678" by RingCentral.
4. Company, when creating a registrant, also specifies the URL the customer will access to join the webinar, and/or cancel their registration. These URLs identify not only the webinar by its ID (e.g. 1234), but also the registrant by their ID (e.g. 5678). These URLs might look like this:
     * https://acme.com/webinar/1234/join?id=5678
     * https://acme.com/webinar/1234/cancel?id=5678
5. Subsequently, the user wishes to cancel their registration and visits the corresponding URL above.
6. Company receives cancellation request and calls the Webinar API to cancel the registrant associated with id "5678."

## Tracking webinar registrants

Those hosting a marketing webinar often have the need to track who was invited, who attended, and who was absent. The RingCentral Webinar API should make tracking users through the webinar attendance funnel a bit easier. 

### Disambiguating between those who attended the webinar and those who did not

Each registrant for a webinar will automatically be assigned a unique registrant `id`. When a registrant joins a webinar, they will automatically be assigned a `participantId` that is tied to that specific webinar. Using these two fields it becomes a relatively simple process to determine who attended and who didn't. If, for example, a registrant record has both an `id` and `participantId` then you can safely infer that the corresponding person attended the webinar. If on the other hand the registrant lacks a `participantId` then they never clicked their `joinUri` and thus never attended the webinar. 

One can also track attendance by [subscribing to a webinar webhook](../events/) pertaining to a state change in a registrant's status. Doing so in this manner will give you greater visibility into the exact time that they registered, joined and left a webinar session. 

### Tracking the source campaign of a registration

The `source` attribute for a registrant can be used to specify and record the campaign from which a registrant originated. For example, perhaps your organization sent all of your customers an email promoting the webinar and also posted an advertisement via search. As people followed links to register, your system could record in the `source` attribute whether the attendee came via the `customer-invite` campaign or the `search-ad` campaign. 

### Correlating a registrant with an external namespace

You are also free to correlate any given registrant to an external identity source. For example, let's say that you were using a third-party marketing automation system to send invites to a set of leads you have stored there. You may therefore need to correlate the registrant and attendee to the lead ID in the third-party marketing automation system. That way you have the ability to easily go back and indicate whether each lead that received an email attended or not. Developers can use the `extenralId` attribute to input any arbitrary string that can later be used to correlate an attendee with an external identity provider. 
