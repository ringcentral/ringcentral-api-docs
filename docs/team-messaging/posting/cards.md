# Postings cards

Cards provide developers with the means to design and create responsive, richly detailed, and well crafted messages. RingCentral's card system is powered by the [open-source community and framework](http://adaptivecards.io) known as [Adaptive Cards](../../adaptive-cards/). Using this framework and its many tools, developers and designers are free to create the experiences they want, rather than the ones hemmed in by a multitude of constraints. 

<img class="img-fluid figure-img" src="../../adaptive-cards/itinerary.png" style="max-width: 400px">

!!! tip "RingCentral uses Adaptive Cards"
    While RingCentral continues to support our [proprietary format](../../incoming-webhooks/legacy-format/), we encourage developers to adopt the more robust and modern [Adaptive Cards framework](../../adaptive-cards/) for composing cards and messages.

Adaptive cards are posted via a dedicated set of endpoints that allow developers to list, create, update and deletes cards posted to a specific chat. The format of an adaptive card is covered in detail [elsewhere in our documentation](../../adaptive-cards/). Here we will discuss the endpoints used for posting adaptive cards. 

<br clear="all">

## Posting a card via the REST API

Select your preferred language below.

=== "Javascript"

    ```JavaScript
    {!> code-samples/team-messaging/post-card.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/team-messaging/post-card.py !}
    ```

=== "PHP"

    ```PHP
    {!> code-samples/team-messaging/post-card.php !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/team-messaging/post-card.rb !}
    ```

The code samples above will all result in posting an adaptive card similar to the following:

<img src="../hello-world.png" class="img-fluid" style="max-width: 600px">

## Using fallback text

Fallback text is a very useful way to communicate more specifically the contents of a card in a highly abbreviated manner. Specifying fallback text is especially useful when determining what text is displayed inside of a mobile phone alert or notification when a card is posted. If no fallback text is specified, the system will default to displaying the following generic alert: "New Card Sent." 

<img src="../new-card-sent.png" class="img-fluid" style="max-width: 600px">

There is no doubt that a more descriptive alert would be more useful to users. For example, a Github add-in may wish to set the fallback text to, "Jane Doe has sent a pull request," or a Docusign add-in may wish to set the fallback to, "John Smith has requested your signative on SalesDeal.pdf." 

To set the fallback text, add `fallbackText` to your adaptive card payload, as demonstrated below:

```json
{!> code-samples/team-messaging/adaptive-cards/fallback-text.json !}
```

## Keep learning

Dedicated endpoints also exist for:

* [Listing cards in a chat](https://developers.ringcentral.com/api-reference/Adaptive-Cards/getGlipAdaptiveCard)
* [Update card](https://developers.ringcentral.com/api-reference/Adaptive-Cards/updateGlipAdaptiveCard)
* [Delete card](https://developers.ringcentral.com/api-reference/Adaptive-Cards/deleteGlipAdaptiveCard)
