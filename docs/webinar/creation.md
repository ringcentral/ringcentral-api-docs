# Creating webinars using the API

{! mdx_includes/webinar-beta-notice.md !}

Webinars can be created using the REST API, which can be helpful when integrating RingCentral Webinar with third-party systems like CRMs, and marketing tools in which campaigns are created an managed. For example, your company may have a standardized go-to-market process for introducing new products in which when a campaign is created in your CRM for a quarterly customer communication, you want to automatically create a webinar to correspond with that campaign.

When creating a webinar via the API, you will need to specify the webinar's title and description, along with any number of settings you wish the webinar to obey.

## Webinar settings

The following selection of settings are some of the most commonly used by developers. For a complete list of all available settings, please consult the [API Reference](https://developers.ringcentral.com/api-reference/webinar).

| Setting                  | Description                                                                                                                     |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `recordingEnabled`       | Enables recording for the webinar. If set to `false` all other recording settings cannot be set.                                |
| `autoRecord`             | Starts the recording automatically when the webinar goes live.                                                                  |
| `panelistWaitingRoom`    | Indicates if Panelists should be places to waiting room after joining                                                           |
| `attendeeAuthentication` | Indicates if attendees have to be authenticated users. Values can include `Guest`, `AuthenticatedUser`, `AuthenticatedCoworker` |
| `password`               | A password used by attendees to gain entrance to a webinar.                                                                     |
| `qnaEnabled`             | Turns on/off Q&A for a webinar.                                                                                                 |
| `pollsEnabled`           | Turns on/off polls for a webinar.                                                                                               |
| `registrationEnabled`    | Turns on/off registration for a webinar. Set to `false` for internal webinars, and set to `true` for marketing webinars.        |
| `postWebinarRedirectUri` | Sets the URL to redirect webinar attendees to when the webinar comes to an end.                                                 |

Remember, for a complete list of all webinar settings and preferences, please consult the [RingCentral API Reference](https://developers.ringcentral.com/api-reference/webinar).

### When to require registration for a webinar

The `registrationEnabled` setting is especially important depending upon your [use case](use-cases.md). For example, internal webinars such as a large internal company meeting should have registration disabled. When registration is disabled, a single join URL will be provided and shared across all attendees. Upon clicking this shared join URL each attendee will be prompted to enter their first and last name, but all other registration functions (i.e. registration questions) will be bypassed. This makes it a lot easier for you to share the webinar with your staff via a single email or a calendar invite. 

If you are hosting an external or "marketing webinar," it is best to set `registrationEnabled` to true. Doing so will provide each individual attendee a unique join URL for enhanced tracking and analytics. However, this also means that there is more overhead in managing attendees as a separate email/calendar invite must be sent to each individual attendee. 

## Creating a webinar session

{! mdx_includes/webinar-session-limits.md !}

Once the webinar is created, it is time to schedule a webinar session. A webinar session is associated with a date and time, is what hosts, cohosts and panelists are invited to help facilitate, and is for which attendees will register. 

### Example code

=== "Javascript"

    ```js
	{!> code-samples/webinar/create-session.js !}
	```

## Inviting hosts, cohosts, panelists and attendees

Once a webinar sessions has been scheduled you can begin the process of inviting and recruiting people to help you facilitate the webinar. This is done through an [invitation process](invitees.md). Those who accept your invitation will be given additional privileges during the webinar allowing them to share their video, screens and audtio. 

Attendees of your webinar will be required to register prior to joining the webinar session. Registration can be done well in advance via a web-form, or can be handled just-in-time and on-demand. It is through the [registration process](registrants.md) that an attendee will obtain a unique join link to track their attendance. 
