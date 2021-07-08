# Outbound webhooks to enable interactive messages

Messages posted RingCentral add-ins can optionally contain interactive elements such as buttons, and forms. When users engage with these interactive elements, RingCentral will transmit a message to your add-in via the outgoing webhook URL associated with your app. Your application can then take the corresponding action, and respond to RingCentral in order to inform RingCentral if the action was successful or not. This will give your application the means of providing some feedback directly to the user who took action on a message your add-in posted. 

In the sections that follow, we will walk you through this interaction model so that your add-in can effectively respond to button clicks, form submissions and other interactive message events. 

## Outgoing webhook event

When a user engages with an interactive message, RingCentral will transmit to your add-in's outgoing webhook URL a message that looks similar to the following:

```json

```

## Responding to an outgoing webhook event

### Action

* title - Label for button or link that represents this action.
* iconUrl - Optional icon to be shown on the action in conjunction with the title. Supports data URI in version 1.2+
* style - Controls the style of an Action, which influences how the action is displayed, spoken, etc.
* fallback - Describes what to do when an unknown element is encountered or the requires of this or any children can't be met.


### Action.openUrl

When invoked, show the given url either by launching it in an external web browser or showing within an embedded web browser.

* type := 'Action.openUrl'
* url := <url to open>

### Action.ShowCard

Defines an AdaptiveCard which is shown to the user when the button or link is clicked.

### Action.Submit

Gathers input fields, merges with optional data field, and sends an event to the client. It is up to the client to determine how this data is processed. For example: With BotFramework bots, the client would send an activity through the messaging medium to the bot. The inputs that are gathered are those on the current card, and in the case of a show card those on any parent cards. See https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/input-validation for more details.

### Action.ToggleVisibility

An action that toggles the visibility of associated card elements.

### Action.ISelectAction



