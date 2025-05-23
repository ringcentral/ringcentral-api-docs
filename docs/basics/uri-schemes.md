
# RingCentral URI Scheme Reference

## What is a URI Scheme?

A URI (Uniform Resource Identifier) scheme defines a method for referencing resources using a specific format. In the context of applications, URI schemes allow developers to create links that launch specific actions or screens within a mobile or web app.

## What is a Deep Link?

A **deep link** is a URL or URI that navigates a user to a specific screen or action within an application, bypassing the generic homepage. For example, a deep link might take a user directly to a particular chat thread or initiate a phone call in the RingCentral app.

## Example Usage

```text
rcmobile://sms?number=15551234567
```

This URI opens a new SMS draft to the number `+1 (555) 123-4567` in the RingCentral mobile app.

```text
https://app.ringcentral.com/chat/r?groupid=abc123
```

This deep link opens a specific team chat identified by `abc123` in the RingCentral web app.

## Catalog of RingCentral URI Schemes

| **URI Scheme / Path**                                  | **Description**                                                                                     |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `rcmobile://call?number={phoneNumber}`                 | Initiates a phone call in the RingCentral mobile app.                                              |
| `rcmobile://sms?number={phoneNumber}`                  | Opens a new SMS message draft in the mobile app.                                                   |
| `rcmobile://conference`                                | Opens the audio conference dialer.                                                                 |
| `rcmobile://meeting`                                   | Launches the RingCentral Meetings or Video interface.                                              |
| `rcmobile://contacts`                                  | Opens the contacts screen.                                                                         |
| `rcmobile://voicemail`                                 | Opens voicemail inbox.                                                                             |
| `rcmobile://history`                                   | Shows the call history screen.                                                                     |
| `rcmobile://glip/team?id={teamId}`                     | Opens a specific team chat.                                                                        |
| `rcmobile://glip/chat?id={userId}`                     | Opens a direct message with a specified user.                                                      |
| `rcmobile://glip/post?id={postId}`                     | Opens a specific post in a conversation.                                                           |
| `rcmobile://glip/file?id={fileId}`                     | Opens a file shared in a conversation.                                                             |
| `rcmobile://glip/task?id={taskId}`                     | Opens a specific task.                                                                             |
| `rcmobile://glip/event?id={eventId}`                   | Opens a calendar event.                                                                            |
| `rcapp://r/signin`                                     | Launches the RingCentral app sign-in screen.                                                       |
| `tel:{phoneNumber}`                                    | Initiates a phone call using the default phone app.                                                |
| `sms:{phoneNumber}`                                    | Opens default SMS app with prefilled number.                                                       |
| `https://app.ringcentral.com/chat/r?groupid={groupId}` | Opens a team chat in the RingCentral web app.                                                      |
| `https://app.ringcentral.com/invitation/r?inviter_group_id={groupId}&inviter_email={email}` | Invitation to a chat from a specified user.                                     |
| `https://app.ringcentral.com/group/{groupId}`          | Opens a group chat.                                                                                |
| `https://app.ringcentral.com/message/{messageId}`      | Opens a specific message thread.                                                                   |
| `https://app.ringcentral.com/chat/{chatId}`            | Opens a chat with a user or team.                                                                  |
| `https://app.ringcentral.com/message?teamId={teamId}&messageId={messageId}` | Opens a message within a specific team chat.                                   |
| `https://app.ringcentral.com/tasks/{taskId}`           | Opens a task in Team Messaging.                                                                    |
| `https://app.ringcentral.com/files/{fileId}`           | Opens a shared file.                                                                               |
| `https://app.ringcentral.com/events/{eventId}`         | Opens a calendar event.                                                                            |
| `/r/call?number={phoneNumber}`                         | Initiates a call in-app from RingCentral desktop.                                                  |
| `/r/dialer`                                            | Opens the in-app dialer.                                                                           |
| `/r/dialer?number={phoneNumber}`                       | Opens the dialer with a pre-filled number.                                                         |
| `/r/sms?type=new`                                      | Opens the SMS composer.                                                                            |
| `/r/sms?type=new&number={phoneNumber}`                 | Opens SMS composer with recipient pre-filled.                                                      |
| `/r/sms?type=new&number={phoneNumber}&content={text}`  | Opens SMS composer with recipient and pre-filled message.                                          |
| `/r/fax?type=new`                                      | Opens the fax composer screen.                                                                     |
| `https://v.ringcentral.com/join/{meeting_id}`          | Opens RingCentral Video meeting.                                                                   |
| `https://v.ringcentral.com/join/{meeting_id}?pw={password}` | Opens a meeting with the password prefilled.                                                 |

## Environment Base URLs

| Environment | Base URL                      |
|-------------|-------------------------------|
| Production  | `https://app.ringcentral.com/` |
