style: quick-start

# Social Messaging Quick Start

!!! hint "**Calling the RingCentral API for the first time?** We recommend you try out [getting started experience](./../getting-started/index.md)."

In this quick start, we are going to help you register an application and build your app to list all social messaging contents belong to the authenticated agent.

## Create an app and obtain credentials

The first thing we need to do is create an app in the RingCentral Developer Console. This can be done quickly by clicking the "Create Social Messaging App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Social+Messaging+Quick+Start+App&desc=A+simple+app+to+demo+listing+agent+social+messaging+contents&grantType=PersonalJWT&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Social-Messaging&redirectUri=&utm_source=devguide&utm_medium=button&utm_campaign=quickstart" class="btn btn-primary">Create Social Messaging App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "REST API App" under "What type of app are you creating?" Click "Next."</li>
<li>Under "Auth" select "JWT auth flow."
<li>Under "Security" add the following permissions:
  <ul>
    <li>Social Messaging</li>
  </ul>
</li>
<li>Under "Security" select "This app is private and will only be callable using credentials from the same RingCentral account."</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Download and edit a `.env` file

Follow the instructions found in our guide to [running Developer Guide code samples](./../basics/code-samples.md). Or:

1. Download our [env-template](https://raw.githubusercontent.com/ringcentral/ringcentral-api-docs/main/code-samples/env-template) and save it as a file named `.env`.
2. Edit your newly downloaded `.env` file, setting its variables with the proper values for the app you created above, paying close attention to the following:
     * `RC_APP_CLIENT_ID` - set to the Client ID of the app you created above
     * `RC_APP_CLIENT_SECRET` - set to the Client Secret of the app you created above
     * `RC_USER_JWT` - set to the [JWT credential you created](./../getting-started/create-credential.md) for yourself

## List agent's contents


=== "JavaScript"

    ```javascript
    {!> code-samples/social-messaging/quick-start.js [ln:1-61] !}
    ```

=== "Python"

    ```python
    {!> code-samples/social-messaging/quick-start.py [ln:1-50] !}
    ```

=== "PHP"

    ```php
    {!> code-samples/social-messaging/quick-start.php [ln:1-56] !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/social-messaging/quick-start.rb [ln:1-54] !}
    ```

## Sample response

```json
{
  "records": [
    {
      "id": "65d69849a330900007d1c6d7",
      "creationTime": "2024-02-22T00:41:45Z",
      "lastModifiedTime": "2024-02-22T00:41:45Z",
      "authorIdentityId": "65c3fe3e729ae3000785aac1",
      "body": "Server alive and well!",
      "bodyInputFormat": "Text",
      "categoryIds": [],
      "creatorId": "63317565004",
      "interventionId": null,
      "language": "En",
      "remotelyDeleted": false,
      "sourceId": "65c3fdd9527bf900079cefcb",
      "sourceUri": null,
      "synchronizationStatus": "Success",
      "status": "UserReply",
      "threadId": "65c40163c092e4000768f688",
      "inReplyToContentId": "65d684cc2796550007054f17",
      "inReplyToAuthorIdentityId": "65c40163c092e4000768f685",
      "attachments": [],
      "autoSubmitted": false,
      "identityGroupId": "65c3fe3e729ae3000785aac2",
      "bodyFormatted": {
        "Text": "Server alive and well!",
        "Html": "<p>Server alive and well!</p>"
      },
      "contextData": null,
      "createdFrom": "Api",
      "public": false,
      "published": true,
      "sourceType": "WhatsApp",
      "structuredContentSupported": true,
      "type": "Message",
      "synchronizationError": null,
      "capabilitiesSupported": [
        "template",
        "list"
      ]
    },
    {
      "id": "65d684cc2796550007054f17",
      "creationTime": "2024-02-21T23:18:34Z",
      "lastModifiedTime": "2024-02-22T00:41:45Z",
      "authorIdentityId": "65c40163c092e4000768f685",
      "body": "Great 👍. Sending attachment now to you.",
      "bodyInputFormat": "Text",
      "categoryIds": [],
      "creatorId": null,
      "interventionId": null,
      "language": "En",
      "remotelyDeleted": false,
      "sourceId": "65c3fdd9527bf900079cefcb",
      "sourceUri": null,
      "synchronizationStatus": "Success",
      "status": "Replied",
      "threadId": "65c40163c092e4000768f688",
      "inReplyToContentId": null,
      "inReplyToAuthorIdentityId": "65c3fe3e729ae3000785aac1",
      "attachments": [
        {
          "id": "65d684cc2796550007054f19",
          "creationTime": "2024-02-21T23:18:37Z",
          "lastModifiedTime": "2024-02-21T23:18:37Z",
          "contentType": "image/jpeg",
          "filename": "1511912166322685.jpeg",
          "size": 326705,
          "videoMetadata": [],
          "embedded": false,
          "public": false,
          "attachableId": "65d684cc2796550007054f17",
          "attachableType": "Content",
          "uri": "https://advanced-messaging-demo-1.digital.ringcentral.com/attachments/65d684cc2796550007054f19?xxx"
        }
      ],
      "autoSubmitted": false,
      "identityGroupId": "65c40163c092e4000768f686",
      "bodyFormatted": {
        "Text": "Great 👍. Sending attachment now to you.",
        "Html": "<p>Great 👍. Sending attachment now to you.</p>"
      },
      "contextData": null,
      "createdFrom": "Synchronizer",
      "public": false,
      "published": true,
      "sourceType": "WhatsApp",
      "structuredContentSupported": true,
      "type": "Message",
      "synchronizationError": null,
      "capabilitiesSupported": [
        "template",
        "list"
      ]
    },
    {
      "id": "65d6848c8be02f00072f35f2",
      "creationTime": "2024-02-21T23:17:33Z",
      "lastModifiedTime": "2024-02-21T23:17:44Z",
      "authorIdentityId": "65c3fe3e729ae3000785aac1",
      "body": "Thanks for your message!",
      "bodyInputFormat": "Text",
      "categoryIds": [],
      "creatorId": "63317565004",
      "interventionId": null,
      "language": "En",
      "remotelyDeleted": false,
      "sourceId": "65c3fdd9527bf900079cefcb",
      "sourceUri": null,
      "synchronizationStatus": "Success",
      "status": "UserReply",
      "threadId": "65c40163c092e4000768f688",
      "inReplyToContentId": "65d683cee26da1000789ad3f",
      "inReplyToAuthorIdentityId": "65c40163c092e4000768f685",
      "attachments": [],
      "autoSubmitted": false,
      "identityGroupId": "65c3fe3e729ae3000785aac2",
      "bodyFormatted": {
        "Text": "Thanks for your message!",
        "Html": "<p>Thanks for your message!</p>"
      },
      "contextData": null,
      "createdFrom": "Api",
      "public": false,
      "published": true,
      "sourceType": "WhatsApp",
      "structuredContentSupported": true,
      "type": "Message",
      "synchronizationError": null,
      "capabilitiesSupported": [
        "template",
        "list"
      ]
    }
  ],
  "paging": {
    "pageToken": "eyJ2YWx1ZSI6MTcwODU2MjUwNS44MDgsIm...",
    "perPage": 20,
    "nextPageToken": "eyJ2YWx1ZSI6MTcwNzM0NDIyNi4wLCJmaWVsZ..."
  }
}
```
