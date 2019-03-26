# Creating an Install App Button

It is sometimes useful to assist users and/or developers in the creation of an app. Some private applications from our community for example require organizations to host an application themselves, and any user of the app to create an application in their organization configured specifically for their environment. As we have found with our own sample applications we provide to developers, if the applications people setup are not configured precisely, they may not work as expected.

So address this, we have a simple URL pragma for creating applications. When a user follows one of these URLs, they will be taken into their Developer Console to a form with all of the application's settings preset for the developer. Then all the developer has to do is click "Save" and they are done.

This document describes how to create such a button. 

## Sample Button

```html
<a class="btn btn-primary" href="https://developer.ringcentral.com/new-app?name=Install+App+Button+Demo&desc=An+app+created+when+you+were+reading+the+documentation+about+the+install+app+button.&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadMessages&redirectUri=">
  Button Text
</a>
```

With a little CSS (our site uses [Bootstrap](https://getbootstrap.com/)), the above will produce the following button link:

<a class="btn btn-primary" target="_new" href="https://developer.ringcentral.com/new-app?name=SMS+Quick+Start+App&desc=A+simple+app+to+demo+sending+an+SMS+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS,ReadMessages&redirectUri=">Button Text</a>

## Query String Parameters

| Field Name | Parameter | Notes | 
|-|-|-|
| Application Name | `name` | Any text. Max length is 64. |
| Description | `desc` | Any text. Max length is 256. | 
| Application Type | `public` | May be "true" or "false." Sets the field to read-only if specified. |
| Platform Type | `type` | See Platform Type Enumeration below. Sets the field to read-only if specified. |
| Carrier | `carriers` | See Carrier Enumeration. Multiple values should be separated by commas. Only effective when the Application Type is Public. |
| Permissions Needed | `permission` | See Permission Enumeration. Multiple values should be separated by commas. Sets the field to read-only if specified. |
| OAuth Redirect URI | `redirectUri` | Any valid URI. Multiple values should be separated by commas. Duplicated values will be dropped. The value should not contain wildcards. Max count is 10. |

### Platform Type Enumeration

| Value | Description | 
|-|-|
| `MobileIOS` | Native and hybrid mobile apps for iOS. |
| `MobileAndroid` | Native and hybrid mobile apps for Android. |
| `MobileOther` | Native and hybrid mobile apps for other mobile platforms. |
| `DesktopWindows` | Installable desktop apps for Windows. |
| `DesktopMac` | Installable desktop apps for Macs. |
| `DesktopOther` | Installable desktop apps, including Chrome apps. |
| `BrowserBased` | In-browser, client-side apps that communicate with RingCentral APIs on the client, e.g. client-side JavaScript |
| `ServerWeb` | Web-based apps that communicate with RingCentral APIs from the server, e.g. Node.js, PHP, Ruby on Rails, etc. |
| `ServerBot` | Chat bot apps built for Glip that communicate with RingCentral APIs from the server side and can be running on your private or public network. |
| `ServerOther` | For apps that do not have a UI, and thus have no end-user touch points. |

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
