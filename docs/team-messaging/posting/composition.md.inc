## How to compose a message and card in JSON

!!! info "Supported message formats"
    RingCentral supports three different message formats for composing messages in JSON. These include Adaptive Cards, an open standard used by RingCentral and Microsoft Teams, and two older proprietary format created by RingCentral. You can learn more about these formats in our [cards and attachments section](../attachments/). The examples below will utilize Adaptive Card formats. 

A message has a very simple structure. It contains a message in the `text` field, and a set of attachmemts. An attachment can be an image, a file, an event, or a card. The following example shows a sample message with a single card as an attachment.

```json
{!> code-samples/team-messaging/adaptive-cards/simple-card.json !}
```

Posting the above JSON to an incoming webhook or the REST API will result in a message that appears as follows:

<img src="../../incoming-webhooks/sample-adaptive-card.png" class="img-fluid" style="max-width: 600px">

