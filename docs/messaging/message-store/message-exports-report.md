# Message Store Exports

The message store exports API set allows you to archive message store data prior to it being deleted according to the enforcement of RingCentral’s data storage policy and compliance. The data includes message metadata and the actual content (attachments) of instant messaging, fax and voicemail.

RingCentral message store data retention rule is based on the account's setting:

#### Account Data Retention for Non-HIPAA Accounts

| Data | Duration | Count/Size |
|---|---|---|
| Inbox (Fax / Voice Messages) | -- | 200 messages |
| Sent (Fax Messages) | 30 days | -- |
| Outbox (Fax Messages) | n/a | n/a |
| Text Messages (SMS/MMS) | No limit | 5,000 messages per folder, per User (Inbox, Outbox, Sent, Deleted) |
||||

#### Account Data Retention for HIPAA enabled Accounts

| Data | Duration | Count/Size |
|---|---|---|
| Inbox (Fax / Voice Messages) | 30 days | 200 messages |
| Sent (Fax Messages) | 30 days | -- |
| Outbox (Fax Messages) | n/a | n/a |
| Text Messages (SMS/MMS) | No limit | 5,000 messages per folder, per User (Inbox, Outbox, Sent, Deleted) |
||||

!!! Important
    The message store exports APIs run at the account level. This means that only users with the admin role would be able to call these APIs and export the message store of all extensions in the entire account.

## Message Store Exports APIs set

| API | path |
|-----|------|
| Create Message Store Report | `/restapi/v1.0/account/~/message-store-report` |
| Get Message Store Report Task | `/restapi/v1.0/account/~/message-store-report/taskId` |
| Get Message Store Report Archive | `/restapi/v1.0/account/~/message-store-report/taskId/archive` |
| Get Message Store Report Archive Content | `/restapi/v1.0/account/~/message-store-report/taskId/archive/archiveId` |
|||

## How to archive the message store data

There are 4 steps to archive your company message store using the APIs set:

#### 1. Create a message store report task

To create a message store report task:

* Define the period of time for the archive. The period of time is specified by the `dateFrom` and `dateTo` parameters in the body of the POST request.

* Make a POST request to the `/restapi/v1.0/account/~/message-store-report` endpoint.

Required permission(s):  ReadMessages

Upon successful API call completion, the response contains the id (taskId) and the status of the newly created task.

```json hl_lines="3 4"
{
  uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/message-store-report/178009004-178009004-25464a39df3f4b4390801d80e5e13a01',
  id: '178009004-178009004-25464a39df3f4b4390801d80e5e13a01',
  status: 'Accepted',
  startTime: '2019-07-31T20:01:58Z',
  accountId: '178009004',
  dateFrom: '2019-01-01T00:00:00Z',
  dateTo: '2019-03-31T23:59:59.999Z'
}
```

#### 2. Check the status of a task identified by the taskId

To archive a large message store report (for a long period of time or for an account with a large number of extensions), the report creation process may take several minutes to complete. Therefore, you should check the status of a task to ensure it is marked as “Completed” before you can proceed to get the report.
The status of a task can be any of the following values:

_Accepted - Pending - InProgress - AttemptFailed - Failed - Completed - Cancelled_

To check the status of a task, make a GET request to `/restapi/v1.0/account/~/message-store-report/[taskId]` endpoint. Where the `taskId` is the value of the `id` returned in the previous step.

If the report is ready, the task status is marked as “Completed”.

Upon successful API call completion, the response contains the id (taskId) and the status of the newly created task.
```json hl_lines="3 4"
{
  uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/message-store-report/178009004-178009004-25464a39df3f4b4390801d80e5e13a01',
  id: '178009004-178009004-25464a39df3f4b4390801d80e5e13a01',
  status: 'Completed',
  startTime: '2019-07-31T20:01:58Z',
  finishTime: '2019-07-31T20:02:11Z',
  accountId: '178009004',
  dateFrom: '2019-01-01T00:00:00Z',
  dateTo: '2019-03-31T23:59:59.999Z' }
```

#### 3. Get the archive file URI.

When a task is created successfully and completed, make a GET request to the `/restapi/v1.0/account/~/message-store-report/[taskId]/archive` endpoint. Where the `taskId` is the value of the `id` returned in the previous step.

Upon successful API call completion, the response is a list of records. Each record contains the URI of the archival file and the size of that file.
```json hl_lines="4 5"
{
  records: [
  {
    size: 14167,
    uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/message-store-report/178009004-178009004-ed6a473f3aea40819d761242fa6fa331/archive/0'
  },
  {
    size: 2152395,
    uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/message-store-report/178009004-178009004-ed6a473f3aea40819d761242fa6fa331/archive/1'
  } ]
}
```

#### 4. Download the archive files.

The archival files are .zip compression files. To download the file, append a valid access token to the URI and make an HTTP GET request to the URI.

```http
GET https://platform.devtest.ringcentral.com/restapi/v1.0/account/178009004/message-store-report/[taskId]]/archive/0
Authorization: Bearer [access_token]
```

The archival report is consisted of two main parts; the archived message metadata and the archived message attachments. If the size of the archived message attachments file is greater than 1GB, the system will generate multiple URIs for message attachment archival files, each file size is max 1GB.

The archived file at the index zero (archive/0) is always a .zip file containing message-store.json files. The files are organized under a folder structure which resembles the message store path to message metadata in RingCentral system:

*/account/[accountId]/extension/[extensionId]/*

<img class="img-fluid" src="../../../img/archive0.png" style="max-width: 450px">

The archived file at index one (archive/1) is a .zip file containing attachments of MMS or Fax messages, or voicemail binary file. The files are organized under a folder structure which resembles the message store path to message attachment in RingCentral system:

*/account/[accountId]/extension/[extensionId]/message-store/content/[messageId]*

<img class="img-fluid" src="../../../img/archive1.png" style="max-width: 450px">

## Sample code to archive message store data

The following code sample shows how to call the Message Store Export APIs to export the message store data and save it to a local machine.

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/message-store-export.js !}
    ```

=== "Python"

    ```python
    {!> code-samples/messaging/message-store-export.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/message-store-export.php !}
    ```

=== "C#"

    ```c#
    {!> code-samples/messaging/message-store-export.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/Export_MessageStore.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/message-store-export.rb !}
    ```    

## Relevant APIs for Further Reading

* [Get Message List](https://developers.ringcentral.com/api-reference/Message-Store/listMessages)
* [Get Message Attachment](https://developers.ringcentral.com/api-reference/Message-Store/readMessageContent)
* [Delete Message(s)](https://developers.ringcentral.com/api-reference/Message-Store/deleteMessage)
* [Sync Messages](https://developers.ringcentral.com/api-reference/Message-Store/syncMessages)
