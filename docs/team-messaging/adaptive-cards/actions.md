# Handling interactivity in Adaptive Cards

## Common action parameters

When defining the actions associated with a card, each action defined will contain the following parameters. Then depending upon the action, additional parameters as described below.


| Parameter | Description | 
|-|-|
| `title` | Label for button or link that represents this action. |
| `iconUrl` | Optional icon to be shown on the action in conjunction with the title. Supports data URI in version 1.2+ |
| `style` | Controls the style of an Action, which influences how the action is displayed, spoken, etc. |
| `fallback` | Describes what to do when an unknown element is encountered or the requires of this or any children can't be met. |

## Opening URLs

You can trigger RingCentral to open a URL of your choice with the action of type "Action.OpenUrl." When triggered RingCentral will open the designated URL in an external web browser. 

| Parameter | Description |
|-|-|
| `type` | Must be set to "Action.OpenUrl". |
| `url` | The URL to open. |

## Displaying cards

Defines an AdaptiveCard which is shown to the user when the button or link is clicked.

| Parameter | Description |
|-|-|
| `type` | Must be set to "Action.ShowCard". |
| `card` | The Adaptive Card to show. Inputs in ShowCards will not be submitted if the submit button is located on a parent card. See https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/input-validation for more details. |

## Processing form input

Gathers input fields, merges with optional data field, and sends an event to the client. It is up to the client to determine how this data is processed. For example: With BotFramework bots, the client would send an activity through the messaging medium to the bot. The inputs that are gathered are those on the current card, and in the case of a show card those on any parent cards. See https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/input-validation for more details.

| Parameter | Description |
|-|-|
| `type` | Must be set to "Action.Submit". |
| `data` | Initial data that input fields will be combined with. These are essentially ‘hidden’ properties. |
| `associatedInputs` | Controls which inputs are associated with the submit action. Default is "auto." |

## Toggle the visibility of card elements

An action that toggles the visibility of associated card elements.

| Parameter | Description |
|-|-|
| `type` | Must be set to "Action.ToggleVisibility". |
| `targetElements` | The array of TargetElements. It is not recommended to include Input elements with validation under Action.Toggle due to confusion that can arise from invalid inputs that are not currently visible. See https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/input-validation for more information. |

### Target elements

To toggle the visibility of one or more elements, compose an array of target elements as described below. For each target element specify the ID and visibility for the associated element.

| Parameter | Description |
|-|-|
| `type` | Must be set to "TargetElement" |
| `elementId` | The ID of the element to toggle |
| `isVisible` | If `true`, always show target element. If `false`, always hide target element. If not supplied, toggle target element's visibility. |

