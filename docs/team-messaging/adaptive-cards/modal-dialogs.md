# Spawning modal dialogs in Team Messaging

Modal dialogs are windows that developers can cause to be opened and that float above a conversation. While a modal dialog is open, users cannot interact with any part of the team messaging interface. Dialogs can be forcibly closed by the end user, or be closed naturally following a successful interaction with a dialog's contents. 

## Responding to an interactive messaging event

Dialogs can only be spawned (or opened) in response to an [interactive messaging event](../../events/interactive-messages/), or more specifically when a user clicks an adaptive card button with the action type of `Action.Submit`. Dialogs cannot be openned via the REST API. 

To spawn a dialog, have your application respond to a RingCentral outbound webhook with a `200` HTTP status code, return a Content-type of `application/json` and finally, set the contents of the response to one of the dialog payloads below. 

The example Javascript below will demonstrate a simple express app opening a dialog in response to every webhook it receives. 

```js
{!> code-samples/team-messaging/open-dialog.js !}
```

## Dialog payloads

The response to an interactive messaging event contains the following elements:

| Parameter | Description |
|-|-|
| `title` | The title that will be displayed in the header of the dialog. | 
| `iconUrl` | The icon that will be displayed in the header of the dialog. |
| `card` or `iframeUrl` | The contents of the dialog. Either an adaptive card or an iframe respectively. |

### Adaptive card dialogs

```js
{!> code-samples/team-messaging/simple-adaptive-card-dialog.json !}
```

The above payload will produce a dialog that appears as follows:

<img src="../dialog-hello-medium.png" class="img-fluid" style="max-width: 500px" />

### iFrame dialogs

```js
{!> code-samples/team-messaging/simple-iframe-dialog.json !}
```

#### Approving iFrame URLs in Developer Console

For security puroses, all iFrame URLs used within modal dialogs must be specifically approved by the developer. Wildcards can be used in the formation of these URLs to make their configuration easier. 

<img src="../dialog-url-whitelist.png" class="img-fluid" style="max-width: 500px" />

**Examples**

| URL | Description |
|-|-|
| `https://www.somedomain.com` | Approve all URLs from www.somedomain.com | 
| `https://*.somedomain.com` | Approve all subdomans from somedomain.com | 

## Dialog attributes

### Title and icon

The title and icon of the dialog are required fields. The ic

### Sizes

#### Small Dialog

<img src="../dialog-hello-small.png" class="img-fluid" style="max-width: 500px" />

#### Medium Dialog

<img src="../dialog-hello-medium.png" class="img-fluid" style="max-width: 500px" />

#### Large Dialog

<img src="../dialog-hello-large.png" class="img-fluid" style="max-width: 500px" />

<!--
## Errors

| Error Code | Meaning               |
|------------|-----------------------|
| `403`      | Invalid iframe URL    |
| `422`      | Invalid adaptive card |
-->	
