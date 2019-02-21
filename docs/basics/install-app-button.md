# Creating an Install App Button

It is sometimes useful to assist users and/or developers in the creation of an app. Some private applications from our community for example require organizations to host an application themselves, and any user of the app to create an application in their organization configured specifically for their environment. As we have found with our own sample applications we provide to developers, if the applications people setup are not configured precisely, they may not work as expected.

So address this, we have a simple URL pragma for creating applications. When a user follows one of these URLs, they will be taken into their Developer Console to a form with all of the application's settings preset for the developer. Then all the developer has to do is click "Save" and they are done.

This document describes how to create such a button. 

## Sample Button

```html
<a class="btn btn-primary" href="https://developer.ringcentral.com/new-app?name=SMS+Quick+Start+App&desc=A+simple+app+to+demo+sending+an+SMS+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS,ReadMessages&redirectUri=">
  Button Text
</a>
```

With a little CSS magic (our site used [Bootstrap](https://getbootstrap.com/)), the above will produce the following button link:

<a class="btn btn-primary" target="_new" href="https://developer.ringcentral.com/new-app?name=SMS+Quick+Start+App&desc=A+simple+app+to+demo+sending+an+SMS+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS,ReadMessages&redirectUri=">Button Text</a>

## Query String Parameters

| Field Name | Query Parameter | Possible Values | Notes |
|-|-|-|-|
| Application Name | name | Any text | Max Length: 64 |
| Description | desc | Any text | Max length: 256 | 
| Application Type | public | "true" or "false" | Read-only to developers if pre-defined |
| Platform Type | type | See Platform Type Enumeration | Read-only to developers if pre-defined |
| Carrier | carriers | See Carrier Enumeration | Multiple values should be separated by commas. Effective when the Application Type is Public. |
| Permissions Needed | permission | See Permission Enumeration | Multiple values should be separated by commas. Read-only to developers if pre-defined. |
| OAuth Redirect URI | redirectUri | Any valid URI | Multiple values should be separated by commas. Duplicated values will be dropped. The value should not contain wildcards. Max count: 10 |

### Platform Type Enumeration

| Value | Equivalent |
|-|-|
| `MobileIOS` | Mobile/iOS |
| `MobileAndroid` | Mobile/Android |
| `MobileOther` | Mobile/Other |
| `DesktopWindows` | Desktop/Windows |
| `DesktopMac` | Desktop/Mac |
| `DesktopOther` | Desktop/Other |
| `BrowserBased` | Browser-based |
| `ServerWeb` | Server/Web |
| `ServerBot` | Server/Bot |
| `ServerOther` | Server-only (No UI) |

### Carrier Enumeration

| Value | Carrier |
|-|-|
| 3420 | AT&T |
| 7310 | TELUS |
| 7710 | BT |

### Permission Enumeration

| Value | Equivalent |
|-|-|
| `Contacts` | Make changes Contacts |
| `EditExtensions` | Edit Extensions |
| `EditMessages` | Edit Messages |
| `EditPresence` | Change a user's Presence |
| `Faxes` | Send faxes |
| `Glip` | Post messages to a Glip group |
| `InternalMessages` | Internal Messages |
| `Meetings` | Create and schedule meetings |
| `ReadAccounts` | Read Accounts |
| `ReadCallLog` | Read Call Log |
| `ReadCallRecording` | Read Call Recording |
| `ReadContacts` | Access contact info within your account |
| `ReadMessages` | Read Messages |
| `ReadPresence` | Read Presence |
| `RingOut` | Placing calls via Ring Out |
| `SMS` | Sending SMS Messages |
| `SubscriptionWebhook` | Webhook Subscriptions |
| `VoipCalling` | VoIP Calling |
