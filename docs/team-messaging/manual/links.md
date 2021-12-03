# Deep-linking into RingCentral app

Listed below is a catalog of URI schemes for linking directly into RingCentral app. Each URI below should be prepended with the proper base URL corresponding to the environment you are operating in:

| Env | Base URL |
|-|-|
| Sandbox | `https://app.devtest.ringcentral.com/` |
| Production | `https://app.ringcentral.com/` |

## Chat invites

**URI**

`/invitation/r?inviter_group_id=<string>&inviter_email=<string>`

**Query parameters**

| Parameter | Description |
|-|-|
| `inviter_group_id` | The chat ID the recipient is being invited to join. |
| `inviter_email` | The email of the person sending the invite. |

## Chat

**URI**
`
/chat/r?groupid=<groupid>`

**Query parameters**

| Parameter | Description |
|-|-|
| `group_id` | The chat ID you want to open. |

## Sign-in

**URI**

`rcapp://r/signin`

## Join a meeting

**URI**

`https://v.ringcentral.com/join/<meeting_id>[?pw=<password>]`

**Query parameters**

| Parameter | Description |
|-|-|
| `pw` | The meeting password to automatically enter prior to joining. |

## Initiate a phone call

**URI**
`/r/call?number=<phone number>`

**Query parameters**

| Parameter | Description |
|-|-|
| `number` | The phone number to call. |

## Open the dialer

**URI**

`/r/dialer[?number=<phone number>]`

**Query parameters**

| Parameter | Description |
|-|-|
| `number` | The phone number to open the dialer to call. |

## Send an SMS

**URI**

`/r/sms?type=new`

URI: `/r/sms?type=new&number=<phone number>`

URI: `/r/sms?type=new&number=<phone number>&content=<content>`

**Query parameters**

| Parameter | Description |
|-|-|
| `type` | Set type equal to "new". |
| `number` | The recipient of the SMS, a phone number. |
| `content` | The message to send. |

## Send a fax

**URI**

`/r/fax?type=new`

**Query parameters**

| Parameter | Description |
|-|-|
| `type` | Set type equal to "new". |
| `number` | The recipient of the fax, a phone number. |

 
