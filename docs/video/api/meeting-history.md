# Generate a list of past meetings

{! mdx_includes/video-beta-notice.md !}

The RingCentral Video API makes it possible to fetch the meeting history across the entire account, or the history associated with the user in the current authentication context. In the list of meetings that are returned, you can gain access to:

* a recording if one is available
* the meeting's public chat (private chat is NOT available through the API)
* a list of partipants

The sample code below will help you construct a call to access this meeting history for the currently logged-in user.. 

=== "Javascript"

    ```js
    {!> code-samples/video/history.js !}
    ```

### Example meeting history response

The typical response to retrieve meeting histories will look something like the following:

```json
{!> code-samples/video/history.json !}
```

## Searching meeting history 

One can search one's meeting history using one or more of the following:

* **Date range**. Specify a `startTime` and `endTime` parameter expressed in Unix EPOCH time to constrain search results to a time range. 
* **Keyword**. Specify a `text` parameter to search meeting names by the provided keyword or phrase.
* **Type**. Specify the type of meeting to search by. Supported values are `None` (default), `All`, `My`, `Deleted`, `Shared`. 

## Accessing the meeting history across an entire account

```js
platform.get('/rcvideo/v1/history/account/~/meetings')
.then(function (resp) {
    console.log( resp.json() )
});
```

## Accessing the history of a single meeting

If you know the meeting ID, a single meeting can be retrieved by passing it into the Meeting History endpoint as shown below. This is a good way to poll a single meeting while you wait for a recording to be ready, or for the meeting to end. 

```js
platform.get('/rcvideo/v1/history/meetings/0fd2ae49-xxxx-7461!us-11-pdx10@us-11')
.then(function (resp) {
    console.log( resp.json() )
});
```

## Accessing meeting recordings

When a meeting is recorded, it automatically enables AI subroutines to help summarize meeting content within the meeting history. Associated with each recording record returned by the History API is a `metadata` element that contains a `shortSummary` and `keywords`. These values are generated for you to help you understand the content of the meeting. 

```json
"recordings": [
{
    "id": "554d06ea-5d44-498a-93e9-0978bfa73ecd",
    "availabilityStatus": "Alive",
    "startTime": 1643242400003,
    "mediaURL": "/rcvideo/v1/recordings/7tSq3ol_xxxx_7LvUNdf7KQfgfFyX_j0YUA==",
    "url": "https://media.ringcentral.com/rcvideo/v1/recordings/7tSq3ol_xxx_j0YUA==",
    "metadata": {
        "duration": 1638,
        "fileSize": 66484597
    },
    "status": "Processed",
    "longSummary": "",
    "shortSummary": "The participants are looking for an opportunity in aha \
	                 that is associated with an account.",
    "keywords": ["multiple deals", "potential revenue", "logic", "sales force",
	             "opportunity", "account", "customer", "stage menu", 
				 "specific status"]
}]
```

### How to download meeting recordings via the API

The downloading of meetings recordings is protected by an authentication layer to protect and secure meeting recordings.

Meeting recordings reside behind RingCentral's media domain. To learn more about accessing protected media content, and other issues relating to the access of large media files, see the [Media content under "Using the API"](https://developers.ringcentral.com/guide/basics/media).

### What is RingCentral's meeting recording retention policy ?

RingCentral Video recordings are stored for 1 year from the time they are created.

They are automatically deleted at the 1 year mark. Users will receive an email notification if the Recording is deleted option is enabled their preferences.

### When are multiple recording returned?

When fetching meeting histories, you will see that an array of recordings is return. Multiple recordings may appear for the following reasons:

1. If there is an unplanned disruption to the recording, due to a problem on the backend, two files may appear.
2. In the future we plan to implement an option to limit recording file sizes. In this scenario, recordings will automatically be partitioned into multiple files.

Of note, starting, stopping and starting recording again will NOT result in multiple files.

Most of the time recordings should contain a single mono-channel audio and video stream.

### Paginating through results

When requesting a meeting history, if there are multiple pages in the result set you will see a `paging` element similar to:

```json
"paging": {
    "currentPageToken": "ewogXXXICJ0IiA6I==",
    "nextPageToken": "hjdgfXXXXXX28fhjs=="
}
```

To fetch the next page, specify the page token using the `pageToken` request parameter like so:

```http
GET /rcvideo/v1/history/meetings?pageToken=hjdgfXXXXXX28fhjs%3D%3D
```

