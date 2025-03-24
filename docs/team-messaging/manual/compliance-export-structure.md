# Team Messaging Compliance Export File Structure

!!! note "Need help generating an export file?"
    This document describes the structure of a Compliance Export. To generate this file please consult our documentation on the [Compliance Export API](compliance-export.md).

When you download a compliance export, you will receive a zip file that contains a number of files and folders that contain all of the data associated with your data export.

| File | Description |
|-|-|
| `request_info.json` | A summary of the request that generated the associated content |
| `chats/` | A folder containing all chat data |
| `members/` | A folder containing all chat participant data |
| `guests/` | A folder containing all the guest/external participant data |
| `posts/` | A folder containing all posts made across all chats |
| `events/` | A folder containing all events |
| `tasks/` | A folder containing all tasks |
| `notes/` | A folder containing all notes |
| `files/` | A folder containing all files |

Each file contained in the folders above contain a maximum of 10,000 data elements. If there are more than 10,000 associated data elements in an export, then multiple files will be found in the folder, utilizing the following simple naming convention:

* `posts/posts_1.json`
* `posts/posts_2.json`
* `posts/posts_3.json`
* and so forth

Below are the individual specifications for each file contained in the export. 

### request_info.json

```json
{
  "timeFrom": datetime,
  "timeTo": datetime,
  "contacts": [{ "id": string },{ "email": string }],
  "chatIds": [ set<string> ]
}
```

### chats/chat_n.json

```json
{
  "records": [{
      "id": string,
      "accountId": string,
      "creationTime": datetime,
      "lastModifiedTime": datetime,
      "Type": Personal |
              Direct |
              Group |
              Team |
              Everyone,
      "name": string,
      "description": string,
      "public": boolean,
      "status": Active |
                Archived,
      "totalMemberCount": integer,
      "memberIds": [ set<string> ],
      "totalGuestCount": integer,
      "guestIds": [ set<string> ],
      "deleted": boolean
  }]
}
```

### members/members_n.json

```json
{
  "records": [{
      "id": string,
      "accountId": string,
      "creationTime": datetime,
      "lastModifiedTime": datetime,
      "firstName": string,
      "lastName": string,
      "email": string,
      "jobTitle": string,
      "profileImage": { "uri": string },
      "deactivated": boolean,
  }]
}
```

### guests/guests_n.json

```json
{
  "records": [{
      "id": string,
      "accountId": string,
      "firstName": string,
      "lastName": string,
      "email": string,
      "jobTitle": string,
      "profileImage": { "uri": string },
      "deactivated": boolean,
  }]
}
```

### posts/posts_n.json

```json
{
  "records": [{
      "id": string,
      "creationTime": datetime,
      "lastModifiedTime": datetime,
      "creator": { "id": string },
      "chatId": string,
      "chainId": string,
      "text": string,
      "attachments": [{
          "id": string,
          "type": Event |
                  File |
                  Note |
                  Task |
                  Unknown // e.g. Card, Link
      }],
      "mentions": [{
          "id": string,
          "type": Contact |
                  Team |
                  Event |
                  Everyone |
                  File |
                  Note |
                  Task |
                  Unknown // e.g. Card, Link
      }],
      "deleted": boolean
  }]
}
```

### events/events_n.json

```json
{
  "records": [{
      "id": string,
      "creationTime": datetime,
      "lastModifiedTime": datetime,
      "type": "Event",
      "creator": { "id": string },
      "chatIds": [ set<string> ],
      "subject": string,
      "startTime": datetime,
      "endTime": datetime,
      "color": Black |
               Red |
               Orange |
               Yellow |
               Green |
               Blue |
               Indigo |
               Violet,
      "location": string,
      "description": string,
      "recurrence": {
        "schedule": None |
                    Daily |
                    Weekdays |
                    Weekly |
                    Monthly |
                    Yearly,
        "endingCondition": None |
                           Count |
                           Date,
        "endingAfter": integer,
        "endingOn": datetime
      },
      "deleted": boolean
  }]
}
```

### files/files_n.json

```json
{
  "records": [{
      "id": string,
      "creationTime": datetime,
      "lastModifiedTime": datetime,
      "type": "File",
      "creator": { "id": string },
      "lastModifiedBy": { "id": string },
      "chatIds": [ set<string> ],
      "name": string,
      "size": integer,
      "contentUri": string,
      "deleted": boolean
  }]
}
```

### notes/notes_n.json

```json
{
  "records": [{
      "id": string,
      "creationTime": datetime,
      "lastModifiedTime": datetime,
      "type": "Note",
      "creator": { "id": string },
      "lastModifiedBy": { "id": string },
      "lockedBy": { "id": string },
      "chatIds": [ set<string> ],
      "status": Draft |
                Active,
      "title": string,
      "body": string,
      "deleted": boolean
  }]
}
```

### tasks/tasks_n.json

```json
{
  "records": [{
      "id": string,
      "creationTime": datetime,
      "lastModifiedTime": datetime,
      "type": "Task",
      "creator": { "id": string },
      "chatIds": [ set<string> ],
      "status": Pending |
                InProgress |
                Completed,
      "subject": string,
      "assignees": [{
          "id": string,
          "status": Pending |
                    Completed,
      }],
      "completenessCondition": Simple |
                               AllAssignees |
                               Percentage,
      "completenessPercentage": integer,
      "startDate": datetime,
      "dueDate": datetime,
      "color": Black |
               Red |
               Orange |
               Yellow |
               Green |
               Blue |
               Indigo |
               Violet,
      "section": string,
      "description": string,
      "recurrence": {
        "schedule": None |
                    Daily |
                    Weekdays |
                    Weekly |
                    Monthly |
                    Yearly,
        "endingCondition": None |
                           Count |
                           Date,
        "endingAfter": integer,
        "endingOn": datetime
      }
      "attachments": [{
          "id": string,
          "type": "File",
          "contentUri": string,
          "name": string
      }],
      "deleted": boolean
  }]
}
```
