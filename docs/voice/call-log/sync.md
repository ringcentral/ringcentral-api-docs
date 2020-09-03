# Call Log Synchronization

## Sychronization Flow

The API allows synchronizing local call log representation with the server. The implementation provides the following functionality:

- Initial retrieval of call log records that can be limited by number and filtered within the sync frame.

- Subsequent retrieval of new call log records.

- Extending sync frame by requesting some number of records older than already synchronized.

- Filtering 'Missed'/'All' calls.

Let's consider the basic steps of synchronization scenario:

1. Initial sync (FSync) returns a number of records sorted by time in descending order and provides the client with a syncToken. The syncToken plays the role of a "changeset number" - it is used for subsequent sync requests. This request also sets up the so-called syncFrame, which limits records the client is interested in by date-time interval. As usual the client is interested in records since a particular time moment, however, closed time intervals are also supported.

2. Subsequent sync(s) (ISync) that return the call records update and require the previously issued syncToken to be passed along with the request. The responses contain incremental updates for the client and a new value for syncToken.

3. Extension of sync frame by datetime/record count. This allows the client to get records older than the available syncFrame, either specifying the required date-time interval, or specifying the number of additional records to be retrieved. The server also informs the user when no records are left to be retrieved with sync frame extension.

4. Sporadic resync. From time to time the server may require client to do FSync in response for ISync requires. This may happen if there are too many changes since last ISync, or some changes in ISync implementation which do not allow the server to execute ISync request as usual.

## Terminology

First of all let's describe some basic terms.

**Sync Frame** - the range of messages (possibly restricted by some filters) which are synchronized between client and server.

**Sync Type** - type of synchronization action, one of the following:

**Full Sync (FSync)** – retrieval of all messages satisfying client criteria (i.e. all incoming SMS messages within the last day). FSYNC request defines the initial Sync Frame and produces the first Sync Token (see below) for subsequent flow.

**Incremental Sync (ISync)** – retrieval of messages which have been changed since last Full or Incremental Sync. Client has to provide previously returned Sync Token which contains all the information about Sync Frame.

**Sync Token** – special token which is included in FSYNC/ISYNC response and has to be included in next ISYNC request. It allows the server to understand which call log state is currently known to the client and respond with changes accordingly. The Sync Token is generated according to the following principles:

- it includes the datetime of last synchronization;

- it includes the definition of current Sync Frame (set of filters);

- it does not include record count;

- it is encrypted in some way to hide implementation details from the client.

## Synchronization Strategy

Let's consider the regular way to perform call log synchronization.

**Step 1.** Start each call log synchronization process with the FSync request. In response you will get the call log records up to the current moment. The number of records is limited by the query parameter `recordCount` which is mandatory and should be specified in request. The maximum possible value is 250. If you specify the `dateFrom` parameter, then the returned records will be also time-limited — from this date to the present.

**Step 2.** To synchronise the call log records further and get all the fresh records, you should perform the ISync request, having specified the `syncToken` retrieved in the initial FSync request.

The maximum number of records that can be returned in this request is limited to 250. Thus if the number of records for this time between FSync and ISync is 251 and greater, the server will return the following error message: "Parameter [syncToken] is invalid [max sync record number limit is exceeded]". In this case you should return to Step 1 and perform the FSync request again.

If you enter the `recordCount` parameter for the ISync request, it specifies the number of records from the past (returned for the last FSync request) that will also be returned in response. The value of this parameter is limited to the 250. Please note that despite of the `recordCount` value, the entire number of records returned will not exceed 250, and the fresh records have priority over the old ones. For example, the `recordCount` value is 40, and the number of new records is 230 (between FSync and ISync), this means the server will return 230 fresh and 20 old records.

## Full Sync

Initial synchronization is performed when the client requests FSync. The request is sent with the following parameters:

- `syncType` - (mandatory) type of call log synchronization, 'FSync' in case of initial sync request.

- `dateFrom` - the date from which the server will start synchronization, if not specified then the current moment is the default value.

- `recordCount` - (mandatory) for 'FSync' it limits the number of records to be returned in response.

- `statusGroup` - the two possible values are 'Missed' or 'All'. The default value is 'All'.

Let's consider the example:

```
GET /restapi/v1.0/account/~/extension/~/call-log-sync?syncType=FSync&statusGroup=All&recordCount=5 HTTP/1.1
Accept: application/json
Authorization: Bearer U0pDMDFQMDFKV1MwMnxP3hoMRwMfRUcddWnqi3yz4UuxSg   

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 1811
{
  "uri" : "https:.../account/400151109008/extension/400151111008/call-log-sync?statusGroup=All&syncType=FSync&recordCount=3",
  "records" : [ {
    "uri" : "https:.../account/400151109008/extension/400151111008/call-log/IVWtSyis720zMEA",
    "id" : "IVWtSyis720zMEA",
    "startTime" : "2013-06-03T15:16:58.000Z",
    "duration" : 0,
    "type" : "Voice",
    "direction" : "Outbound",
    "action" : "VoIP Call",
    "result" : "Unknown",
    "to" : {
      "phoneNumber" : "+2055551234"
    },
    "from" : {
      "name" : "Steven"
    }
  }, {
    "uri" : "https:.../account/400151109008/extension/400151111008/call-log/IVWtTIvyZ8q9MGA",
    "id" : "IVWtTIvyZ8q9MGA",
     "startTime" : "2013-06-03T15:16:52.000Z",
    "duration" : 22,
    "type" : "Voice",
    "direction" : "Outbound",
    "action" : "VoIP Call",
    "result" : "Call connected",
    "to" : {
      "phoneNumber" : "12055550010",
      "name" : "Allen",
      "location" : "Alabaster, AL"
    },
    "from" : {
      "name" : "Steven Existing Phone"
    }
  }, {
    "uri" : "https:.../account/400151109008/extension/400151111008/call-log/IVWtT1J9WIXRMSQ",
    "id" : "IVWtT1J9WIXRMSQ",
    "startTime" : "2013-06-03T15:14:56.000Z",
    "duration" : 18,
    "direction" : "Outbound",
    "type": "Voice", 
    "action" : "VoIP Call",
    "result" : "Call connected",
    "to" : {
      "phoneNumber" : "12055550010",
      "name" : "Allen",
      "location" : "Alabaster, AL"
    },
    "from" : {
      "name" : "Steven Existing Phone"
    }
  } ],
  "syncInfo" : {
    "syncType" : "FSync",
    "syncToken" : "FAsDAwAAAT8KnL6gBAAAAT8KpCkQCAAAAF0q3WVgCQEKAQwAAAAeDQAAAF3UKlK4Y1WS_Q",
    "syncTime" : "2013-06-03T15:24:59.716Z"
  }
}
```
  
## Incremental Sync

Subsequent synchronization requests are performed when the client requests ISync. The request is sent with the following parameters:

- `syncType` - (mandatory) type of call log synchronization, 'ISync' in case of subsequent sync request.

- `syncToken` - (mandatory) synchronization token, that is taken from the previous request.

- `recordCount` - for 'ISync' it specifies with how many records to extend sync frame to the past and how many new records should be returned.

Let's consider the example:

```
GET /restapi/v1.0/account/~/extension/~/call-log-sync?syncType=ISync&syncToken=FAsDAwAAAT8KmvmABAAAAT8KnB54CAAAAF0q3WVgCQEKAQwAAAAeDQAAAF3UKkrownkpOg HTTP/1.1
Accept: application/json
Authorization: Bearer U0pDMDFQMDFKV1MwMnxP3hoMRwMfRUcddWnqi3yz4UuxS

HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Type: application/json
Content-Length: 936
{
  "uri" : "https:.../account/400151109008/extension/400151111008/call-log-sync?syncType=ISync&syncToken=FAsDAwAAAT8KmvmABAAAAT8KnB54CAAAAF0q3WVgCQEKAQwAAAAeDQAAAF3UKkrownkpOg",
  "records" : [ {
    "uri" : "https:.../account/400151109008/extension/400151111008/call-log/IVWtT1J9WIXRMSQ",
    "id" : "IVWtT1J9WIXRMSQ",
    "startTime" : "2013-06-03T15:17:25.000Z",
    "duration" : 18,
    "direction" : "Outbound",
    "type": "Voice",
    "action" : "VoIP Call",
    "result" : "Call connected",
    "to" : {
      "phoneNumber" : "12055550010",
      "name" : "Allen",
      "location" : "Alabaster, AL"
    },
    "from" : {
      "name" : "Steven Existing Phone"
    }
  } ],
  "syncInfo" : {
    "syncType" : "ISync",
    "syncToken" : "FAsDAwAAAT8KmvmABAAAAT8KnvzYCAAAAF0q3WVgCQEKAQwAAAAeDQAAAF3UKkro3cUvcA",
    "syncTime" : "2013-06-03T15:19:20.411Z"
  }
}
```