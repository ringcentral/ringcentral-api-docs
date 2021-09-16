# Postings cards

!!! tip "Adaptive Cards"
    While RingCentral continues to support our [proprietary format](../../incoming-webhooks/legacy-format/), we encourage developers to adopt the more robust and modern [Adaptive Cards framework](../../adaptive-cards/) for composing cards and messages.

Adaptive cards are posted via a dedicated set of endpoints that allow developers to list, create, update and deletes cards posted to a specific chat. The format of an adaptive card is covered in detail [elsewhere in our documentation](../../adaptive-cards/). Here we will discuss the endpoints used for posting adaptive cards. 

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

## Keep learning

Dedicated endpoints also exist for:

* [Listing cards in a chat](https://developers.ringcentral.com/api-reference/Adaptive-Cards/listCards)
* [Update card](https://developers.ringcentral.com/api-reference/Adaptive-Cards/updateCard)
* [Delete card](https://developers.ringcentral.com/api-reference/Adaptive-Cards/deleteCard)
