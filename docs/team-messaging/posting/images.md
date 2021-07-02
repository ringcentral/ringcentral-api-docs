# Posting an image via a Card

One can use a card to post an image to a chat as well. This method allows you to associate additional text and metadata with an image you are posting. The following is an example message containing a single image and some basic captioning. 

```json
{
  "attachments": [
    {
      "type": "Card",
      "fallback": "Attachment fallback text",
      "color": "#00ff2a",
      "intro": "Attachment intro appears before the attachment block",
      "text": "This would be a good place for a caption",
      "imageUri": "https://www.animalleague.org/wp-content/uploads/2019/07/cats_playing.jpg"
    }
  ]
}
```

Posting the contents above will result in a message that appears as follows:

<img src="../simple-image-card-message.png" class="img-fluid">

