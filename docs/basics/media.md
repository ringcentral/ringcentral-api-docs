# Working with Media Content

A number of RingCentral APIs make available to developers access to media files that one may want to download, stream or embed somewhere. Here are a few examples of such media files:

* Call Recordings
* Voicemails
* Fax Documents
* MMS attachments
* Greetings

## Media/Download URLs

All media files can be accessed via a URL returned via an API Call. For example, the following shows a response payload from the RingCentral Message Store which refers to a received fax document that a developer can download. *It has been truncated for brevity*. 

```json hl_lines="21 22"
{
  "uri" : "https://platform.ringcentral.com/restapi/v1.0\
    /account/230919004/extension/230919004/message-store\
    ?messageType=Fax&availability=Alive&dateFrom=2018-10-07T09:19:00.000Z\
    &page=1&perPage=100",
  "records" : [ ... ,
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0\
        /account/230919004/extension/230919004/message-store/5209304004",
      "id": 5209304004,
      "from": {
        "phoneNumber": "+15555287464"
      },
      "type": "Fax",
      "creationTime": "2018-10-08T09:17:27.000Z",
      "readStatus": "Unread",
      "priority": "Normal",
      "attachments": [
        {
          "id": 5209304004,
          "uri": "https://media.ringcentral.com/restapi/v1.0\
            /account/230919004/extension/230919004/message-store/5209304004/content/5209304004",
          "type": "RenderedDocument",
          "contentType": "application/pdf"
        }
      ],
      "direction": "Inbound",
      "availability": "Alive",
      "subject": "+15556009976",
      "messageStatus": "Received",
      "faxResolution": "High",
      "faxPageCount": 1,
      "lastModifiedTime": "2018-10-08T09:17:27.227Z"
    },
  ... ],
  "paging" : {
    // snipped
  },
  "navigation" : {
    // snipped
  }  
```

!!! note "Building media content URLs"
    While media content URLs all end predictably in `/content`, developers should not build these URLs manually. Content URLs should be fetched a response payload directly as they are subject to change. 

## Downloading Partial Content

There are times you may need to download large files in pieces. Perhaps your HTTP client has an aggressive timeout, or it would be a more efficient use of resources. Regardless, one can download any media resource within RingCentral in pieces by passing [HTTP Range headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) in their request.


```http
GET /account/230919004/extension/230919004/message-store/5209304004/content/5209304004 HTTP/1.1
Host: media.ringcentral.com
Range: bytes=0-1023
```

### HTTP 206 Partial

Developers should also be aware of the potential that the server may respond with a 206 Partial response code indicating that only part of the file is being returned. In the event you received this header, you will need to download the file in chunks according to the [standard](https://tools.ietf.org/html/rfc7233). 