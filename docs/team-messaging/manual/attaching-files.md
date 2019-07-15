# Attaching Files to Glip Message

An important part of communication within the context of collaboration is the sharing of files and images with teammates. Sharing and displaying an image or a file in a Glip message is a two-step process.

<img src="../glip-upload.png" class="img-fluid">

Attaching files to a Glip message is a two-step process.

1. First, a file is uploaded. This adds the file automatically to the Glip team's sidebar. When a file is uploaded, it is given a File ID.

2. Next, a post is created and the File ID of the uploaded file is specified as the Glip post's attachment.

Posts created in this way will result in images being displayed automatically, and other non-renderable files will be displayed as a link to download the file.

## Uploading a File

To upload a file, one conducts an HTTP POST to the following URI, using the file's contents as the post body. Developers must be sure to set the content-type properly. They should also post the following parameters in the query string:

| Parameter | Description |
|-|-|
| **name** | The name of the file. |
| **groupId** | The Glip Group to post this file to. |

**Sample Request**

```http
POST /restapi/v1.0/glip/files?name="My file"&groupId=101500
Content-Type: audio/wav
Accept: application/json
Authorization: Bearer {access_token}

/// Binary content
```

The response will include the file's ID and the URL at which the file can be accessed.

**Sample Response**

```json
[
    {
        "id": "100500",
        "contentUri": "http://somestorage.com/somefile.wav",
        "name": "My_music"
    }
]
```

It is important to make note of the file's ID as it will be used when including the file in a Glip message. See below. 

**See Also**

* [Working with Media Content](../../../basics/media/)

## Attaching a File to a Post

Once this file has been uploaded using the process above, the file can be attached to a Glip message. To do so, reference the file's ID in the `attachments` field of the post message endpoint.

```http
POST /restapi/v1.0/glip/chats/{chatId}/posts
Accept: application/json
Authorization: Bearer {access_token}

{
  "text": "Hello World",
  "attachments": [ {
    "id": <id>,
    "type": "File"
  } ]
}
```

If the file referenced by `id` is an image, then Glip will automatically render the image in-line. 
