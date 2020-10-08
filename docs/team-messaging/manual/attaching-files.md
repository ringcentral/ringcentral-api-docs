# Posting a file to a chat

An important part of communication within the context of collaboration is the sharing of files and images with teammates. Sharing and displaying an image or a file is done by posting the file's contents to a designated endpoint. The code below shows how to post a file to a chat, assuming you already know the chat ID. 

=== "JavaScript" 

    ```javascript
    {!> code-samples/team-messaging/upload-file.js [ln:18-] !}
    ```

This simple script will result in a file being uploaded, and a message being posted to the associated team. It will appear as follows:

<img src="../simple-file.png" class="img-fluid">

## Uploading a File

To upload a file, one conducts an HTTP POST to the following URI, using the file's contents as the post body. Developers must be sure to set the content-type properly. They should also post the following parameters in the query string:

| Parameter | Description |
|-|-|
| **name** | The name of the file. |
| **groupId** | The RingCentral chat in which to post this file. |

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

**See Also**

* [Working with Media Content](../../../basics/media/)

