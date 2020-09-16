# Launching apps: RingCentral URI schemes

Periodically developers need to launch RingCentral apps in order to place calls, join meetings, or link to a team in Team Messaging. The table below shows the various URI schemes RingCentral supports, and the apps they launch.

| Scheme | Application | Usage |
|-|-|-|
| `tel://` | RingCentral Phone | Use this scheme with a phone number to initiate a phone call on the desktop/web. **Deprecated** |
| `glip://` | RingCentral App | Launch the RingCentral App. **Deprecated** |
| `rcmobile://` | RingCentral Mobile Phone | Use this scheme with a phone number to initiate a phone call on a mobile device. | 
| `rcapp://` | RingCentral App | Launch the RingCentral App. |
| `rcapp://r/{phone number}` | RingCentral App | Launch the RingCentral App, and initiate a phone call to the phone number provided. |
| `zoomrc://` | RingCentral Meetings | Launch a RingCentral meeting. |

## See also

* [Voice URI Schemes](../../voice/uri-scheme/)
