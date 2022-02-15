# Launching apps: RingCentral URI schemes

Periodically developers need to launch RingCentral apps in order to place calls, join meetings, or link to a team in Team Messaging. The table below shows the various URI schemes RingCentral supports, and the apps they launch.

| Scheme | Application | Usage |
|-|-|-|
| `tel://` | RingCentral Phone | Use this scheme with a phone number to initiate a phone call on the desktop/web. **Deprecated** |
| `glip://` | RingCentral App | Launch the RingCentral Classic. **Deprecated** |
| `rcmobile://` | RingCentral Mobile Phone | Use this scheme with a phone number to initiate a phone call on a mobile device. | 
| `rcapp://` | RingCentral App | Launch the RingCentral App. |

## RingCentral App schemes

| Scheme | Usage |
| `rcapp://` | Launch the RingCentral App. |
| `rcapp://r/signin` | Force a user to sign-in to the RingCentral App. |
| `rcapp://r/call?number=<phone number>` | Place a phone call with RingCentral App. |
| `rcapp://r/dialer` | Open the dialpad in the RingCentral App. | 
| `rcapp://r/dialer?number=<phone number>` | Open the dialpad in the RingCentral App, with a number pre-populated. |
| `rcapp://chat/r?groupid=<chat id>` | Open RingCentral App to a specific chat, e.g. team, group chat or private chat. | 
| `rcapp://r/fax/<recipient number>` | Initiate sending a fax to a phone number. |
| `rcvdt://join/<meeting id>?pw=<meeting password>` | Open RingCentral Video desktop to join a meeting. |

<!---
| `rcapp://phone/sms?action=create[&number=<number>][&content=<content>]` | Compose an SMS message. | 
| `rcapp://l?t=<token>` | Login prompt for RingCentral App. Can optionally take a login token (for internal-use only). |
| `rcapp://auth` | |
| `zoomrc://rcm.ringcentral.com/join?action=join&confno=1234567890&confid=confid` | |
| `rcapp://phone/privatepark?id=<telephonySessionId>&fromTag=<fromTag>&toTag=<toTag>&displayName=<displayName>&destinationNumber=<destinationNumber>&parkLocationId=<parkLocationId>` | |
| `rcapp://phone/parklocations` | | 
| `rcapp://phone/publicpark?destinationNumber=<destinationNumber>` | Park a call. |
-->

## See also

* [Voice URI Schemes](../../voice/uri-scheme/)
