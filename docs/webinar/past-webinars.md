# Analyzing and processing past webinars

After a webinar is over, much of the real work can begin for companies looking to better understand how successful the webinar was at engaging attendees, driving the success of a campaign, or in helping to acquire new leads or customers. 

## Obtaining a list of attendees and absentees

A key facet of analyzing the success of any webinar lies in understand who was there, and who may still benefit from the webinar's content. To obtain a list of webinar attendees, one can use the [list session registrants](https://developers.ringcentral.com/api-reference/Registrants/rcwRegListRegistrants) operation. In the paginated list that is returned one can look at each individual registrant record, and if a `participantId` property is present and has a value, then that registrant attended the webinar. Consequently, if the `participantId` property is absent or lacks a value, then it is safe to conclude that the corresponding registrant did not attend the webinar. 

Each attendee and absentee may need to be processed differently. For example, you may wish to look up a lead record and update the corresponding opportunity in your CRM (using the `externalId` property, see "[creating registrants](../registrants/)") for each attendee. Then for each absentee you may wish to send them an email inviting them to watch a recording of the webinar, or to invite them to an alternative session. 

### Attendees of an all-hands webinar

If the webinar in question was for an internal all-hands meeting, then every registrant will also be considered an attendee since they will all join the webinar using the same link. Each attendee should store with RingCentral their first and last names, helping you to disambiguate between individual attendees. Determining who was absent from the webinar though will require additional analysis by comparing the list of attendees with the list of employees who was sent an invite. 

## Processing webinar recordings

Each webinar session that has been recorded will have those recordings made available through the [list company webinar recordings](https://developers.ringcentral.com/api-reference/Historical-Recordings/rcwHistoryAdminListRecordings) operation. This operation will only return a list of recordings, the status of each, and the duration of each. The list can be filtered by time frame, status and other properties to make it easier to find the specific recording of interest to you. Keep in mind that two endpoints exist for obtaining a list of recordings - one to retrieve a list of webinar recordings for a [specific host](https://developers.ringcentral.com/api-reference/Historical-Recordings/rcwHistoryListRecordings) and one to retrieve a list of all webinar recordings in [an account](https://developers.ringcentral.com/api-reference/Historical-Recordings/rcwHistoryAdminListRecordings). To retrieve a list of all webinar recordings for an account, the authenticated user must be a webinar admin. 

Recordings and their metadata can also be retrieved using the following operations:

* [Get webinar session](https://developers.ringcentral.com/api-reference/Webinars-and-Sessions/rcwConfigGetSession)
* [List past webinar sessions](https://developers.ringcentral.com/api-reference/Historical-Webinars/rcwHistoryListAllSessions)

### Retrieving the webinar recording media file

After obtaining a list of webinar recordings, one can use the `recordingId` associated with a recording to retrieve the actual media file or content using the [get webinar recording](https://developers.ringcentral.com/api-reference/Historical-Recordings/rcwHistoryGetRecording) operation. 

### Sharing a recording with attendees

If `recordingSharingEnabled` has been set to true when [creating or updating a webinar](../creation/), then you will find that a webinar session will also possess the `recodingSharedUri` property which will contain the URL at which attendees can view the session's recording. Shared recordings can also be set to expire, prevents attendees from watching a webinar recording after a certain time has elapsed. 

If you wish to download and host the recording on your own website, hosts are free to do so. 
