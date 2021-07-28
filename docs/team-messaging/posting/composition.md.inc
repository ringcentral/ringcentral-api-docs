## How to compose a message and card in JSON

!!! info "Supported message formats"
    RingCentral supports three different message formats for composing messages in JSON. These include Adaptive Cards, an open standard used by RingCentral and Microsoft Teams, and two older proprietary format created by RingCentral. You can learn more about these formats in our [cards and attachments section](../attachments/). The examples below will utilize Adaptive Card formats. 

A message has a very simple structure. It contains a message in the `text` field, and a set of attachmemts. An attachment can be an image, a file, an event, or a card. The following example shows a sample message with a single card as an attachment.

!!! danger "TODO - update example to use adaptive cards"

```json
{
  "activity": "Force Alerts",
  "iconUri": "https://example.com/force.png",
  "title": "1 force alert",
  "text": "Be mindful of the force",
  "attachments": [
    {
      "type": "Card",
      "fallback": "Something bad happened",
      "color": "#00ff2a",
      "intro": "There was a disturbance in the force.",
      "author": {
        "name": "Ben Kenobi",
        "uri": "https://en.wikipedia.org/wiki/Obi-Wan_Kenobi",
        "iconUri": "https://imgur.com/eaL6deH",
      },
      "title": "I felt something...",
      "body": "...as if millions of voices suddenly cried out in terror and were suddenly silenced.",
      "fields": [
        {
          "title": "Where",
          "value": "Alderaan",
          "style": "Short"
        },
        {
          "title": "What",
          "value": "Giant explosion",
          "style": "Short"
        },
      ]
    }
  ]
}
```

Posting the above JSON to an incoming webhook or the REST API will result in a message that appears as follows:

!!! danger "TODO - update screenshot to use adaptive cards"

<img src="../webhook-posting.png" class="img-fluid" style="max-width: 600px">

