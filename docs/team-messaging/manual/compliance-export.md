# RingCentral Team Messaging Compliance Exports

Compliance Exports is a special capability specifically built for companies and regulated industries, such as financial services and health care, with compliance requirements for using electronic communication in the workplace. This feature is also a fail-safe way of preserving business communications for compliance and legal discovery or internal review.

??? important "Admin priveleges are required to call the Compliance Export APIs"
    The Compliance Export APIs run at the account level. This means that only users with the admin role are permitted to call these APIs in order to export the data of all users in the entire account.

    The Compliance Exports feature must be turned on from the RingCentral App in the Administration settings.

## RingCentral's Data Retention Policy

The Compliance Export API allows any data retention practices to be automated and is essential for regulated industries because RingCentral does not retain customer data indefinitely. Our data retention policy is as follows, depending upon whether your account is "HIPAA enabled" (please consult your account representative or support to inquire about your account settings).

| Account | Data Retention Rule |
|-|-|
| **Non-HIPAA** | The account admin can set the retention policy to one of the following: 30, 60 and 90 days. Once a policy is set, on a nightly basis all content older than the specified number of days will be deleted permanently. |
| **HIPAA enabled** | All data will be deleted after 30 days. |

### Changing your data retention policy

The RingCentral App provides admins with a way of modifying your account's data retention policy. Login to RingCentral App, and navigate to the Settings area. Then select "Administration." There you will see "Manage data retention policy."

<img class="img-fluid" src="../manage-data-retention-1.png">

## Team Messaging Data Export Process

Team Messaging Exports can take some time to compile and make available for download. Therefore, the process is an asynchronous one that follows this simple 3-step flow:

1. Developer creates an "Export Report" task.
2. Developer polls to check the status of the created "Export Report" task.
3. When the task is complete, developer downloads the generated file.

What follows is a more detailed walk-through of this process.

### Creating an Export Report Task

A compliance export task can be created by administrators inside of the RingCentral client under the Administration section.

<img class="img-fluid" src="../compliance-exports-ui.png" style="max-width: 450px">

This is helpful to human beings, but is difficult to automate. To create an export task via the API one would need to:

* Specify the period of time for the archive via the `timeFrom` and `timeTo` parameters.
* Specify a list of users whose data you would like to export via the `contacts` parameter. A `contact` is an object and can be specified by an id number or an email address.
* Specify a list of teams/conversations to export via the `chatIds` parameter.
* Finally, make a POST request to the `/team-messaging/v1/data-export` endpoint.

!!! hint "How to find IDs to filter by"
    Valid `chatIds` can be retrieved using the [Get Chats API](https://developers.ringcentral.com/api-reference/Chats/listGlipChats) to read all teams/chats/conversations.

Required permission(s):  Team Messaging

If successful, the response will contain the task ID and the status of the newly created task as shown below.

```json hl_lines="3"
{
  "uri":"https://platform.ringcentral.com/team-messaging/v1/data-export/809646016-xx-yy",
  "id":"809646016-xx-yy",
  "creationTime":"2020-01-16T22:12:55Z",
  "lastModifiedTime":"2020-01-16T22:12:55Z",
  "status":"Accepted",
  "creator": {
    "id":"62288329016",
    "firstName":"Paco",
    "lastName":"Vu"},
  "specific": {
    "timeFrom":"2020-01-14T00:00:00Z",
    "timeTo":"2020-01-16T22:12:55Z"
  }
}
```

### Polling the Status of the Export Task

To archive a large data export report (for a long period of time or for an account with a large number of extensions), the report creation process may take several minutes to complete. Therefore, you will need to periodically check the status of a task. When its status is marked as "Completed" you can proceed to get the report. The status of a task can be any of the following values:

* Accepted
* Pending
* InProgress
* AttemptFailed
* Failed
* Completed
* Cancelled

To check the status of a task, make a GET request to `/team-messaging/v1/data-export/[taskId]` endpoint. Where the `taskId` is the value of the `id` returned in the previous step. If the report is ready, the task status is marked as "Completed."

When successful, the response will contain the id (taskId) and the status of the newly created task.

```json hl_lines="3 6"
{
  "uri":"https://platform.ringcentral.com/team-messaging/v1/data-export/809646016-xx-yy",
  "id":"809646016-xx-yy",
  "creationTime":"2020-01-16T22:12:55Z",
  "lastModifiedTime":"2020-01-16T22:12:55Z",
  "status":"Completed",
  "creator": {
    "id":"62288329016",
    "firstName":"Paco",
    "lastName":"Vu"},
  "specific": {
    "timeFrom":"2020-01-14T00:00:00Z",
    "timeTo":"2020-01-16T22:12:55Z"
    },
  "datasets":[
    {
      "id":"1",
      "size":3434,
      "uri":"https://media.ringcentral.com/team-messaging/v1/data-export/809646016-xx-yy/datasets/1"
    }]
}
```

!!! tip "Authentication and file downloads"

    When an export task has completed successfully, make a GET request to the `uri` parameter returned in the response as described in the previous step, and pass your access key via an Authorization header or access_token query parameter as described in [Accessing protected content](../../../basics/media/) on *Working with media content*.

## Sample Code: Export Team Messaging Data

The following code sample shows how to call the Compliance Export API to export the team messaging data and save it to a local machine.

=== "JavaScript" 
    ```javascript
    {!> code-samples/team-messaging/compliance-export.js !}
    ```
    
=== "Python"
    ```python
    {!> code-samples/team-messaging/compliance-export.py !}
    ```

=== "PHP"
    ```php
    {!> code-samples/team-messaging/compliance-export.php !}
    ```

=== "C#"
    ```c#
    {!> code-samples/team-messaging/compliance-export.cs !}
    ```

=== "Java"
    ```java
    {!> code-samples/java-samples/src/main/java/com/ringcentral/ComplianceDataExport.java !}
    ```

=== "Ruby"
    ```ruby
    {!> code-samples/team-messaging/compliance-export.rb !}
    ```
