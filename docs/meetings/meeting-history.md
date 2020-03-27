# Generate a list of past meetings

??? warning "This is for RingCentral Video. Looking for the RingCentral Meetings API?"
     This Quick Start is designed for **RingCentral Video**, RingCentral's built-from-the-ground-up meetings platform. If you are looking to get started using our older RingCentral Meetings API, we have just the [RingCentral Meetings guide for you](../../rcm/create-meeting/). 

```js tab="Javascript"
const RC = require('ringcentral')
 
RINGCENTRAL_CLIENTID = 'ENTER YOUR CLIENT ID'
RINGCENTRAL_CLIENTSECRET = 'ENTER YOUR CLIENT SECRET'
RINGCENTRAL_SERVER = 'https://platform.ringcentral.com'
  
RINGCENTRAL_USERNAME = 'YOUR MAIN COMPANY PHONE NUMBER'
RINGCENTRAL_PASSWORD = 'YOUR PASSWORD'
RINGCENTRAL_EXTENSION = '101' // Enter your extension, usually "101"
 
var rcsdk = new RC({
    server: RINGCENTRAL_SERVER,
    appKey: RINGCENTRAL_CLIENTID,
    appSecret: RINGCENTRAL_CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    username: RINGCENTRAL_USERNAME,
    password: RINGCENTRAL_PASSWORD,
    extension: RINGCENTRAL_EXTENSION
    })
    .then(function(resp) {
        platform.get('/rcvideo/v1/history/meetings', {
    })
    .then(function (resp) {
        console.log( resp.json() )
    });
});
```

Example Response

```json
{
     "meetings": [
         {
             "bridgeId": "sjc01-c04-ndb329afde09417012806524d87",
             "chatId": "5e3b1523eed6853cbbe76e04-public",
             "displayName": "Test Meeting",
             "duration": 59,
             "hostInfo": {
                 "accountId": "1933605021",
                 "displayName": "Dev Partner 8",
                 "extensionId": "1933605021"
             },
             "id": "sjc01-c04-ndb329afde09417012806524d87_1580930339210!sjc01",
             "participants": [
                 {
                     "accountId": "37439510",
                     "displayName": "Byrne Reese",
                     "extensionId": "1589010021",
                     "id": "b2ac_770",
                     "type": "Leave"
                 }
             ],
             "recordings": [],
             "shortId": "353654295",
             "startTime": "2020-02-05T19:18:59.521Z",
             "status": "Done",
             "type": "Meeting"
         },
          {
             "bridgeId": "sjc01-c04-ndb3169847a4d17012f7ca2fdeb",
             "chatId": "5e3a1b8eeed6853cbb1af0a7-public",
             "displayName": "Test Meeting",
             "duration": 41,
             "hostInfo": {
                 "accountId": "1933605021",
                 "displayName": "Dev Partner 8",
                 "extensionId": "1933605021"
             },
             "id": "sjc01-c04-ndb3169847a4d17012f7ca2fdeb_1580866446424!sjc01",
             "participants": [
                 {
                     "accountId": "37439510",
                     "displayName": "Byrne Reese",
                     "extensionId": "1589010021",
                     "id": "ae3c_6343",
                     "type": "Leave"
                 }
             ],
             "recordings": [],
             "shortId": "844040574",
             "startTime": "2020-02-05T01:34:06.488Z",
             "status": "Done",
             "type": "Meeting"
         }
     ],
     "paging": {
         "currentPageToken": "ewogICJ0IiA6IDE1ODA5MzAzMzk1MjEsCiAgIm0iIDogInNqYzAxLWMwNC1uZGIzMjlhZmRlMDk0MTcwMTI4MDY1MjRkODdfMTU4MDkzMDMzOTIxMCFzamMwMSIKfQ=="
     }
 }
```