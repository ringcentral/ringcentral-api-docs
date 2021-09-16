# Postings notes

Notes in RingCentral give teams the ability to post, collaboritively edit and share simple text files with one another. They provide a perfect way to collect and share meeting agendas and minutes, ideas for an upcoming product, todo lists and action items, and you name it. 

<img src="../note.png" class="img-fluid" style="max-width: 800px">

## Posting a note via the REST API

Select your preferred language below.

=== "Javascript"

    ```JavaScript
    {!> code-samples/team-messaging/post-note.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/team-messaging/post-note.py !}
    ```

=== "PHP"

    ```PHP
    {!> code-samples/team-messaging/post-note.php !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/team-messaging/post-note.rb !}
    ```

## Notes Schema

Please consult our [API Reference for creating a note](https://developers.ringcentral.com/api-reference/Notes/createChatNote) to learn more about the request and response schemas. 

## Publishing your draft notes

Upon creating a note, the status of the note defaults to "Draft." Therefore, if you intend to make the note immediately available to members of the chat, you will need to subseuently call the [publish note API reference](https://developers.ringcentral.com/api-reference/Notes/publishNote). 

## Keep learning

Using the Notes API you can accomplish a number of tasks relating to the creation, and sharing of notes.

* [Listing notes in a chat](https://developers.ringcentral.com/api-reference/Notes/listChatNotes)
* [Update](https://developers.ringcentral.com/api-reference/Notes/patchNote) and [delete](https://developers.ringcentral.com/api-reference/Notes/deleteNote) notes
* [Lock](https://developers.ringcentral.com/api-reference/Notes/lockNote) and [unlock](https://developers.ringcentral.com/api-reference/Notes/unlockNote) notes
* [Publish notes](https://developers.ringcentral.com/api-reference/Notes/publishNote)
