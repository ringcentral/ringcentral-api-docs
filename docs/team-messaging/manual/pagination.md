# REST API Pagination in Team Messaging

If when calling the team messaging API to fetch a list of items, two elements are always returned:

* The `records` element is an array of items to be iterated over.
* The `navigation` element contains page tokens to assist developers in iterating forward and backward through the total record set. 

## Navigation Element

When more records exist than could be returned in a single response, the system will return page tokens in the `navigation` element. These page tokens can be presented in subsequent requests to fetch the corresponding set of records in the result set. 

```json
"navigation": {
    "nextPageToken": "RTdv9AAAA..xxxxx",
    "prevPageToken": "H4sIAAAAA..xxxxx"
}
```

If the result set has been filtered in some way by a query parameter, it is not necessary to pass those parameters again. The page tokens are in that way stateful in that they not only act like a cursor pointing at your current location in the result set, but also the parameters used that produced that result set in the first place. 

## Pagination query parameters

When making a call to a team messaging REST API that returns a list, the following query parameters can be used.

| Parameter | Description |
|-|-|
| `recordCount` | The number of records to return in the result set. The default is 30. The maximum value is 250. |
| `pageToken` | The page to return. This is the value of either `nextPageToken` or `prevPageToken` returned in the `navigation` element. | 

## Example

The following code sample shows how to iterate over a large list returned by the [teams endpoint](https://developers.ringcentral.com/api-reference/Teams/listGlipTeams).

=== "Javascript"

    ```js
    {!> code-samples/team-messaging/get-chats-paginated.js !}
    ```
