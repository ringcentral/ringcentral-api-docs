# Spawning modal dialogs in Team Messaging

Modal dialogs are windows that developers can cause to be opened and that float above a conversation. While a modal dialog is open, users cannot interact with any part of the team messaging interface. Dialogs can be forcibly closed by the end user, or be closed naturally following a successful interaction with a dialog's contents.

## Responding to an interactive messaging event

Dialogs can only be spawned (or opened) in response to an [interactive messaging event](../events/interactive-messages.md), or more specifically when a user clicks an adaptive card button with the action type of `Action.Submit`. Do remember that Dialogs cannot be opened via the REST API!

To spawn a dialog, have your application respond to a RingCentral outbound webhook with a `200` HTTP status code, return a Content-type of `application/json` and finally, set the contents of the response to one of the dialog payloads below.

??? info "Code walkthrough: open dialog"
    The example Javascript below is an expansion to the [Walkthrough example ](../bots/posting-cards.md) to demonstrate a simple Add-in app which opens a dialog in response to a user's submit event.

    ```js
    {!> code-samples/team-messaging/open-dialog.js !}
    ```

## Dialog payloads

The response to an interactive messaging event contains the following elements:

| Parameter | Description |
|-|-|
| `title` | The title that will be displayed in the header of the dialog. |
| `size` | small/medium/large. The size of a model dialog. |
| `iconURL` | The icon that will be displayed in the header of the dialog. |
| `card` or `iframeURL` | The contents of the dialog. Either an adaptive card or an iframe respectively. |

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

The above payload will produce a dialog that appears as follows:

<img src="../dialog-iframe-medium.png" class="img-fluid" style="max-width: 500px" />


#### Approving iFrame URLs in Developer Console

For security purposes, all iFrame URLs used within modal dialogs must be specifically approved by the developer. Wildcards can be used in the formation of these URLs to make their configuration easier.

<img src="../dialog-url-whitelist.png" class="img-fluid" style="max-width: 500px" />

**Examples**

| URL | Description |
|-|-|
| `www.somedomain.com` | Approve all URLs from www.somedomain.com |
| `*.somedomain.com` | Approve all subdomans from somedomain.com |

## Passing data from an adaptive card to a dialog

To trigger a dialog to appear, one must issue a response to an incoming interactive messaging event (as described above), which itself is triggered by a user clicking a button associated with the `Action.Submit` action. Given that there could be any number of buttons associated with the `Action.Submit` action, how does a developer identify the button clicked, and how does a developer optionally transmit other key information associated with that button click?

Data is transmitted to an add-in via an incoming message event. The data that is transmitted comes from one of two sources:

* Input form elements contained within the card, e.g. `Input.Text`, `Input.Date`, `Input.Time`, `Input.Number`, `Input.ChoiceSet` and `Input.Toggle`.
* Values contained within the `data` element that is a sibling of the `Action.Submit` element.

For example, the following card will transmit two key/value pairs in the payload of the incoming interactive messaging event:

```js
{!> code-samples/team-messaging/adaptive-cards/transmit-data.json !}
```

The two key/value pairs will be:

* `staticValue` = "foo"
* `textField` = <determined by user>

Consult our documentation on [input and interactivity](actions.md) to better understand the payload of an interactive messaging event and how to access the data that is transmitted to your add-in.

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
