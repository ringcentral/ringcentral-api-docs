# RingCentral Office API Reference Index

Welcome to a simple index of RingCentral Office API endpoints, provided as a convenience for those who need a quick way to find a specific endpoint. For a complete reference, check out RingCentral's [complete and interactive Office API Reference](https://developer.ringcentral.com/api-reference).


### A

* [activateGlipWebhook](https://developers.ringcentral.com/api-reference/Glip-Webhooks/activateGlipWebhook)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/webhooks/{webhookId}/activate

    Activate Webhook

* [addGlipTeamMembers](https://developers.ringcentral.com/api-reference/Teams/addGlipTeamMembers)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/add

    Add Team Members

* [answerCallParty](https://developers.ringcentral.com/api-reference/Call-Control/answerCallParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/answer

    Answer Call Party

* [archiveGlipTeam](https://developers.ringcentral.com/api-reference/Teams/archiveGlipTeam)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/archive

    Archive Team

* [assignGlipGroupMembers](https://developers.ringcentral.com/api-reference/Chats/assignGlipGroupMembers)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/bulk-assign

    Edit Group Members

* [assignMultipleAutomaticaLocationUpdatesUsers](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/assignMultipleAutomaticaLocationUpdatesUsers)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/users/bulk-assign

    Enable Automatic Location Updates for Users

* [assignMultipleCallQueueMembers](https://developers.ringcentral.com/api-reference/Call-Queues/assignMultipleCallQueueMembers)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-queues/{groupId}/bulk-assign

    Assign Multiple Call Queue Members

* [assignMultipleDepartmentMembers](https://developers.ringcentral.com/api-reference/Call-Queues/assignMultipleDepartmentMembers)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/department/bulk-assign

    Assign Multiple Department Members

* [assignMultipleDevicesAutomaticLocationUpdates](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/assignMultipleDevicesAutomaticLocationUpdates)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/devices/bulk-assign

    Enable Automatic Location Updates for Devices

* [assignMultiplePagingGroupUsersDevices](https://developers.ringcentral.com/api-reference/Paging-Only-Groups/assignMultiplePagingGroupUsersDevices)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/paging-only-groups/{pagingOnlyGroupId}/bulk-assign

    Assign Paging Group Users and Devices

* [authorize](https://developers.ringcentral.com/api-reference/OAuth-2.0/authorize)

    GET https://platform.ringcentral.com/restapi/oauth/authorize

    Authorize


### B

* [bridgeCallParty](https://developers.ringcentral.com/api-reference/Call-Control/bridgeCallParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/bridge

    Bridge Call Party


### C

* [callFlipParty](https://developers.ringcentral.com/api-reference/Call-Control/callFlipParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/flip

    Call Flip on Party

* [callParkParty](https://developers.ringcentral.com/api-reference/Call-Control/callParkParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/park

    Call Park

* [checkHealth](https://developers.ringcentral.com/api-reference/SCIM/checkHealth)

    GET https://platform.ringcentral.com/scim/health

    Check Health

* [checkHealth2](https://developers.ringcentral.com/api-reference/SCIM/checkHealth2)

    GET https://platform.ringcentral.com/scim/v2/health

    Check Health

* [checkUserPermission](https://developers.ringcentral.com/api-reference/User-Permissions/checkUserPermission)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/authz-profile/check

    Check User Permission

* [completeTask](https://developers.ringcentral.com/api-reference/Tasks/completeTask)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/tasks/{taskId}/complete

    Complete Task

* [createAnsweringRule](https://developers.ringcentral.com/api-reference/Rule-Management/createAnsweringRule)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule

    Create Call Handling Rule

* [createBlockedAllowedNumber](https://developers.ringcentral.com/api-reference/Call-Blocking/createBlockedAllowedNumber)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers

    Add Blocked/Allowed Number

* [createCallMonitoringGroup](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/createCallMonitoringGroup)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups

    Create Call Monitoring Group

* [createCallOutCallSession](https://developers.ringcentral.com/api-reference/Call-Control/createCallOutCallSession)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/call-out

    Make CallOut

* [createChatNote](https://developers.ringcentral.com/api-reference/Notes/createChatNote)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/notes

    Create Note

* [createCompanyAnsweringRule](https://developers.ringcentral.com/api-reference/Rule-Management/createCompanyAnsweringRule)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule

    Create Company Call Handling Rule

* [createCompanyGreeting](https://developers.ringcentral.com/api-reference/Rule-Management/createCompanyGreeting)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/greeting

    Create Company Greeting

* [createContact](https://developers.ringcentral.com/api-reference/External-Contacts/createContact)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact

    Create Contact

* [createCustomField](https://developers.ringcentral.com/api-reference/Custom-Fields/createCustomField)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/custom-fields

    Create Custom Field

* [createCustomUserGreeting](https://developers.ringcentral.com/api-reference/Rule-Management/createCustomUserGreeting)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/greeting

    Create Custom User Greeting

* [createDataExportTask](https://developers.ringcentral.com/api-reference/Glip-Compliance-Exports/createDataExportTask)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/data-export

    Create Data Export Task

* [createEmergencyLocation](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createEmergencyLocation)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-locations

    Add Emergency Location

* [createEvent](https://developers.ringcentral.com/api-reference/Calendar-Events/createEvent)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/events

    Create Event

* [createEventbyGroupId](https://developers.ringcentral.com/api-reference/Calendar-Events/createEventbyGroupId)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/events

    Create Event by Group ID

* [createExtension](https://developers.ringcentral.com/api-reference/Extensions/createExtension)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension

    Create Extension

* [createFaxMessage](https://developers.ringcentral.com/api-reference/Fax/createFaxMessage)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/fax

    Create Fax Message

* [createForwardingNumber](https://developers.ringcentral.com/api-reference/Call-Forwarding/createForwardingNumber)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number

    Create Forwarding Number

* [createGlipCard](https://developers.ringcentral.com/api-reference/Posts/createGlipCard)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/cards

    Create Card

* [createGlipConversation](https://developers.ringcentral.com/api-reference/Conversations/createGlipConversation)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/conversations

    Create/Open Conversation

* [createGlipGroup](https://developers.ringcentral.com/api-reference/Chats/createGlipGroup)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/groups

    Create Group

* [createGlipGroupPost](https://developers.ringcentral.com/api-reference/Posts/createGlipGroupPost)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/posts

    Create Post in Group

* [createGlipGroupWebhook](https://developers.ringcentral.com/api-reference/Glip-Webhooks/createGlipGroupWebhook)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/webhooks

    Create Webhook in Group

* [createGlipPost](https://developers.ringcentral.com/api-reference/Posts/createGlipPost)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts

    Create Post

* [createGlipTeam](https://developers.ringcentral.com/api-reference/Teams/createGlipTeam)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/teams

    Create Team

* [createInternalTextMessage](https://developers.ringcentral.com/api-reference/Pager-Messages/createInternalTextMessage)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/company-pager

    Create Internal Text Message

* [createIVRMenu](https://developers.ringcentral.com/api-reference/Call-Routing/createIVRMenu)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-menus

    Create IVR Menu

* [createIVRPrompt](https://developers.ringcentral.com/api-reference/Call-Routing/createIVRPrompt)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts

    Create IVR Prompts

* [createMeeting](https://developers.ringcentral.com/api-reference/Meeting-Management/createMeeting)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting

    Create Meeting

* [createMessageStoreReport](https://developers.ringcentral.com/api-reference/Message-Exports/createMessageStoreReport)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-report

    Create Message Store Report

* [createMMS](https://developers.ringcentral.com/api-reference/MMS/createMMS)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/mms

    Create MMS Message

* [createMultipleSwitches](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createMultipleSwitches)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches-bulk-create

    Create Multiple Switches

* [createMultipleWirelessPoints](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createMultipleWirelessPoints)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points-bulk-create

    Create Multiple Wireless Points

* [createNetwork](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createNetwork)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks

    Create Network

* [createPost](https://developers.ringcentral.com/api-reference/Posts/createPost)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/posts

    Create Post

* [createRingOutCall](https://developers.ringcentral.com/api-reference/RingOut/createRingOutCall)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ring-out

    Make RingOut Call

* [createRingOutCallDeprecated](https://developers.ringcentral.com/api-reference/RingOut/createRingOutCallDeprecated)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ringout

    Make RingOut Call

* [createSIPRegistration](https://developers.ringcentral.com/api-reference/SIP/createSIPRegistration)

    POST https://platform.ringcentral.com/restapi/v1.0/client-info/sip-provision

    Register SIP Device

* [createSMSMessage](https://developers.ringcentral.com/api-reference/SMS/createSMSMessage)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/sms

    Send SMS

* [createSubscription](https://developers.ringcentral.com/api-reference/Subscriptions/createSubscription)

    POST https://platform.ringcentral.com/restapi/v1.0/subscription

    Create Subscription

* [createSwitch](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createSwitch)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches

    Create Switch

* [createTask](https://developers.ringcentral.com/api-reference/Tasks/createTask)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/tasks

    Create Task

* [createUser](https://developers.ringcentral.com/api-reference/SCIM/createUser)

    POST https://platform.ringcentral.com/scim/Users

    Create User

* [createUser2](https://developers.ringcentral.com/api-reference/SCIM/createUser2)

    POST https://platform.ringcentral.com/scim/v2/Users

    Create User

* [createUserProfileImage](https://developers.ringcentral.com/api-reference/User-Settings/createUserProfileImage)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/profile-image

    Upload User Profile Image

* [createWirelessPoint](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createWirelessPoint)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points

    Create Wireless Point


### D

* [deleteAnsweringRule](https://developers.ringcentral.com/api-reference/Rule-Management/deleteAnsweringRule)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule/{ruleId}

    Delete Call Handling Rule

* [deleteBlockedAllowedNumber](https://developers.ringcentral.com/api-reference/Call-Blocking/deleteBlockedAllowedNumber)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers/{blockedNumberId}

    Delete Blocked/Allowed Number

* [deleteCallMonitoringGroup](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/deleteCallMonitoringGroup)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}

    Delete Call Monitoring Group

* [deleteCallParty](https://developers.ringcentral.com/api-reference/Call-Control/deleteCallParty)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}

    Delete Call Party

* [deleteCallRecordingCustomGreeting](https://developers.ringcentral.com/api-reference/Rule-Management/deleteCallRecordingCustomGreeting)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/custom-greetings/{greetingId}

    Delete Call Recording Custom Greeting

* [deleteCallRecordingCustomGreetingList](https://developers.ringcentral.com/api-reference/Rule-Management/deleteCallRecordingCustomGreetingList)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/custom-greetings

    Delete Call Recording Custom Greeting List

* [deleteCallSession](https://developers.ringcentral.com/api-reference/Call-Control/deleteCallSession)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}

    Drop Call Session

* [deleteCompanyAnsweringRule](https://developers.ringcentral.com/api-reference/Rule-Management/deleteCompanyAnsweringRule)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule/{ruleId}

    Delete Company Call Handling Rule

* [deleteContact](https://developers.ringcentral.com/api-reference/External-Contacts/deleteContact)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact/{contactId}

    Delete Contact

* [deleteCustomField](https://developers.ringcentral.com/api-reference/Custom-Fields/deleteCustomField)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/custom-fields/{fieldId}

    Delete Custom Field

* [deleteEvent](https://developers.ringcentral.com/api-reference/Calendar-Events/deleteEvent)

    DELETE https://platform.ringcentral.com/restapi/v1.0/glip/events/{eventId}

    Delete Event

* [deleteExtension](https://developers.ringcentral.com/api-reference/User-Settings/deleteExtension)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}

    Delete Extension

* [deleteForwardingNumber](https://developers.ringcentral.com/api-reference/Call-Forwarding/deleteForwardingNumber)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/{forwardingNumberId}

    Delete Forwarding Number

* [deleteGlipCard](https://developers.ringcentral.com/api-reference/Posts/deleteGlipCard)

    DELETE https://platform.ringcentral.com/restapi/v1.0/glip/cards/{cardId}

    Delete Card

* [deleteGlipPost](https://developers.ringcentral.com/api-reference/Posts/deleteGlipPost)

    DELETE https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts/{postId}

    Delete Post

* [deleteGlipTeam](https://developers.ringcentral.com/api-reference/Teams/deleteGlipTeam)

    DELETE https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}

    Delete Team

* [deleteGlipWebhook](https://developers.ringcentral.com/api-reference/Glip-Webhooks/deleteGlipWebhook)

    DELETE https://platform.ringcentral.com/restapi/v1.0/glip/webhooks/{webhookId}

    Delete Webhook

* [deleteIVRPrompt](https://developers.ringcentral.com/api-reference/Call-Routing/deleteIVRPrompt)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts/{promptId}

    Delete IVR Prompt

* [deleteMeeting](https://developers.ringcentral.com/api-reference/Meeting-Management/deleteMeeting)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/{meetingId}

    Delete Meeting

* [deleteMessage](https://developers.ringcentral.com/api-reference/Message-Store/deleteMessage)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/{messageId}

    Delete Message

* [deleteMessageByFilter](https://developers.ringcentral.com/api-reference/Message-Store/deleteMessageByFilter)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store

    Delete Conversation

* [deleteNetwork](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/deleteNetwork)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks/{networkId}

    Delete Network

* [deleteNote](https://developers.ringcentral.com/api-reference/Notes/deleteNote)

    DELETE https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}

    Delete Note

* [deleteRingOutCall](https://developers.ringcentral.com/api-reference/RingOut/deleteRingOutCall)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ring-out/{ringoutId}

    Cancel RingOut Call

* [deleteRingOutCallDeprecated](https://developers.ringcentral.com/api-reference/RingOut/deleteRingOutCallDeprecated)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ringout/{ringoutId}

    Cancel RingOut Call

* [deleteSubscription](https://developers.ringcentral.com/api-reference/Subscriptions/deleteSubscription)

    DELETE https://platform.ringcentral.com/restapi/v1.0/subscription/{subscriptionId}

    Cancel Subscription

* [deleteSwitch](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/deleteSwitch)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches/{switchId}

    Delete Switch

* [deleteTask](https://developers.ringcentral.com/api-reference/Tasks/deleteTask)

    DELETE https://platform.ringcentral.com/restapi/v1.0/glip/tasks/{taskId}

    Delete Task

* [deleteUser2](https://developers.ringcentral.com/api-reference/SCIM/deleteUser2)

    DELETE https://platform.ringcentral.com/scim/v2/Users/{id}

    Delete User

* [deleteUserCallLog](https://developers.ringcentral.com/api-reference/Call-Log/deleteUserCallLog)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log

    Delete User Call Log

* [deleteWirelessPoint](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/deleteWirelessPoint)

    DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points/{pointId}

    Delete Wireless Point


### E

* [endMeeting](https://developers.ringcentral.com/api-reference/Meeting-Management/endMeeting)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/{meetingId}/end

    End Meeting


### F

* [favoriteGlipChat](https://developers.ringcentral.com/api-reference/Chats/favoriteGlipChat)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/favorite

    Add Chat to Favorites

* [forwardCallParty](https://developers.ringcentral.com/api-reference/Call-Control/forwardCallParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/forward

    Forward Call Party


### G

* [GetUserSetting](https://developers.ringcentral.com/api-reference/Meeting-Management/GetUserSetting)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/user-settings

    Get Meeting User Settings


### H

* [holdCallParty](https://developers.ringcentral.com/api-reference/Call-Control/holdCallParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/hold

    Hold Call Party


### I

* [ignoreCallInQueue](https://developers.ringcentral.com/api-reference/Call-Control/ignoreCallInQueue)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/ignore

    Ignore Call in Queue


### J

* [joinGlipTeam](https://developers.ringcentral.com/api-reference/Teams/joinGlipTeam)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/join

    Join Team


### L

* [leaveGlipTeam](https://developers.ringcentral.com/api-reference/Teams/leaveGlipTeam)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/leave

    Leave Team

* [listAccountMeetingRecordings](https://developers.ringcentral.com/api-reference/Meeting-Recordings/listAccountMeetingRecordings)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/meeting-recordings

    Get Account Meeting Recordings List

* [listAccountPhoneNumbers](https://developers.ringcentral.com/api-reference/Phone-Numbers/listAccountPhoneNumbers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/phone-number

    Get Company Phone Number List

* [listAccountSwitches](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listAccountSwitches)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches

    Get Account Switch List

* [listAnsweringRules](https://developers.ringcentral.com/api-reference/Rule-Management/listAnsweringRules)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule

    Get Call Handling Rules

* [listAutomaticLocationUpdatesUsers](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listAutomaticLocationUpdatesUsers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/users

    Get User List

* [listBlockedAllowedNumbers](https://developers.ringcentral.com/api-reference/Call-Blocking/listBlockedAllowedNumbers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers

    Get Blocked/Allowed Phone Numbers

* [listCallMonitoringGroupMembers](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/listCallMonitoringGroupMembers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}/members

    Get Call Monitoring Group Member List

* [listCallMonitoringGroups](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/listCallMonitoringGroups)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups

    Get Call Monitoring Groups List

* [listCallQueueMembers](https://developers.ringcentral.com/api-reference/Call-Queues/listCallQueueMembers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-queues/{groupId}/members

    Get Call Queue Members

* [listCallQueues](https://developers.ringcentral.com/api-reference/Call-Queues/listCallQueues)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-queues

    Get Call Queue List

* [listCallRecordingCustomGreetings](https://developers.ringcentral.com/api-reference/Rule-Management/listCallRecordingCustomGreetings)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/custom-greetings

    Get Call Recording Custom Greeting List

* [listCallRecordingData](https://developers.ringcentral.com/api-reference/Call-Recordings/listCallRecordingData)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/recording/{recordingId}/content

    Get Call Recordings Data

* [listCallRecordingExtensions](https://developers.ringcentral.com/api-reference/Rule-Management/listCallRecordingExtensions)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/extensions

    Get Call Recording Extension List

* [listChatNotes](https://developers.ringcentral.com/api-reference/Notes/listChatNotes)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/notes

    Get Chat Notes

* [listChatTasks](https://developers.ringcentral.com/api-reference/Tasks/listChatTasks)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/tasks

    Get Chat Tasks

* [listCompanyActiveCalls](https://developers.ringcentral.com/api-reference/Call-Log/listCompanyActiveCalls)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/active-calls

    Get Company Active Calls

* [listCompanyAnsweringRules](https://developers.ringcentral.com/api-reference/Rule-Management/listCompanyAnsweringRules)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule

    Get Company Call Handling Rule List

* [listContacts](https://developers.ringcentral.com/api-reference/External-Contacts/listContacts)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact

    Get Contact List

* [listCountries](https://developers.ringcentral.com/api-reference/Regional-Settings/listCountries)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/country

    Get Country List

* [listCustomFields](https://developers.ringcentral.com/api-reference/Custom-Fields/listCustomFields)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/custom-fields

    Get Custom Field List

* [listDataExportTasks](https://developers.ringcentral.com/api-reference/Glip-Compliance-Exports/listDataExportTasks)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/data-export

    Get Data Export Task List

* [listDepartmentMembers](https://developers.ringcentral.com/api-reference/Call-Queues/listDepartmentMembers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/department/{departmentId}/members

    Get Department Member List

* [listDevicesAutomaticLocationUpdates](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listDevicesAutomaticLocationUpdates)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/devices

    Get Device List

* [listDirectoryEntries](https://developers.ringcentral.com/api-reference/Internal-Contacts/listDirectoryEntries)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/directory/entries

    Get Company Directory Entries

* [listEmergencyLocations](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listEmergencyLocations)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-locations

    Get Emergency Location List

* [listExtensionActiveCalls](https://developers.ringcentral.com/api-reference/Call-Log/listExtensionActiveCalls)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/active-calls

    Get User Active Calls

* [listExtensionDevices](https://developers.ringcentral.com/api-reference/Devices/listExtensionDevices)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/device

    Get Extension Device List

* [listExtensionGrants](https://developers.ringcentral.com/api-reference/User-Settings/listExtensionGrants)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/grant

    Get Extension Grant List

* [listExtensionPhoneNumbers](https://developers.ringcentral.com/api-reference/Phone-Numbers/listExtensionPhoneNumbers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/phone-number

    Get Extension Phone Number List

* [listExtensions](https://developers.ringcentral.com/api-reference/Extensions/listExtensions)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension

    Get Extension List

* [listFavoriteChats](https://developers.ringcentral.com/api-reference/Chats/listFavoriteChats)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/favorites

    Get Favorite Chats

* [listFavoriteContacts](https://developers.ringcentral.com/api-reference/External-Contacts/listFavoriteContacts)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite

    Get Favorite Contact List

* [listFaxCoverPages](https://developers.ringcentral.com/api-reference/Fax/listFaxCoverPages)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/fax-cover-page

    Get Fax Cover Page List

* [listForwardingNumbers](https://developers.ringcentral.com/api-reference/Call-Forwarding/listForwardingNumbers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number

    Get Forwarding Number List

* [listGlipChats](https://developers.ringcentral.com/api-reference/Chats/listGlipChats)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/chats

    Get Chats

* [listGlipConversations](https://developers.ringcentral.com/api-reference/Conversations/listGlipConversations)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/conversations

    Get Conversations

* [listGlipGroupPosts](https://developers.ringcentral.com/api-reference/Posts/listGlipGroupPosts)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/posts

    Get Group Posts

* [listGlipGroups](https://developers.ringcentral.com/api-reference/Chats/listGlipGroups)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/groups

    Get User Groups

* [listGlipGroupWebhooks](https://developers.ringcentral.com/api-reference/Glip-Webhooks/listGlipGroupWebhooks)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/webhooks

    Get Webhooks in Group

* [listGlipPosts](https://developers.ringcentral.com/api-reference/Posts/listGlipPosts)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/posts

    Get Posts

* [listGlipTeams](https://developers.ringcentral.com/api-reference/Teams/listGlipTeams)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/teams

    Get Teams

* [listGlipWebhooks](https://developers.ringcentral.com/api-reference/Glip-Webhooks/listGlipWebhooks)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/webhooks

    Get Webhooks

* [listGroupEvents](https://developers.ringcentral.com/api-reference/Calendar-Events/listGroupEvents)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/events

    Get Group Events

* [listIVRPrompts](https://developers.ringcentral.com/api-reference/Call-Routing/listIVRPrompts)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts

    Get IVR Prompt List

* [listLanguages](https://developers.ringcentral.com/api-reference/Regional-Settings/listLanguages)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/language

    Get Language List

* [listLocations](https://developers.ringcentral.com/api-reference/Regional-Settings/listLocations)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/location

    Get Location List

* [listMeetings](https://developers.ringcentral.com/api-reference/Meeting-Management/listMeetings)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting

    Get Scheduled Meetings

* [listMessages](https://developers.ringcentral.com/api-reference/Message-Store/listMessages)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store

    Get Message List

* [listNetworks](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listNetworks)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks

    Get Network Map

* [listPagingGroupDevices](https://developers.ringcentral.com/api-reference/Paging-Only-Groups/listPagingGroupDevices)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/paging-only-groups/{pagingOnlyGroupId}/devices

    Get Paging Group Devices

* [listPagingGroupUsers](https://developers.ringcentral.com/api-reference/Paging-Only-Groups/listPagingGroupUsers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/paging-only-groups/{pagingOnlyGroupId}/users

    Get Paging Group Users

* [listRecentChats](https://developers.ringcentral.com/api-reference/Chats/listRecentChats)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/recent/chats

    Get Recent Chats

* [listStandardGreetings](https://developers.ringcentral.com/api-reference/Rule-Management/listStandardGreetings)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting

    Get Standard Greeting List

* [listStates](https://developers.ringcentral.com/api-reference/Regional-Settings/listStates)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/state

    Get States List

* [listSubscriptions](https://developers.ringcentral.com/api-reference/Subscriptions/listSubscriptions)

    GET https://platform.ringcentral.com/restapi/v1.0/subscription

    Get Subscriptions

* [listTimezones](https://developers.ringcentral.com/api-reference/Regional-Settings/listTimezones)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/timezone

    Get Timezone List

* [listUserMeetingRecordings](https://developers.ringcentral.com/api-reference/Meeting-Recordings/listUserMeetingRecordings)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting-recordings

    Get User Meeting Recordings List

* [listUserTemplates](https://developers.ringcentral.com/api-reference/Extensions/listUserTemplates)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/templates

    Get User Template List

* [listWirelessPoints](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listWirelessPoints)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points

    Get Wireless Point List

* [lockNote](https://developers.ringcentral.com/api-reference/Notes/lockNote)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}/lock

    Lock Note


### M

* [markChatRead](https://developers.ringcentral.com/api-reference/Chats/markChatRead)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/read

    Mark Chat as Read

* [markChatUnread](https://developers.ringcentral.com/api-reference/Chats/markChatUnread)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/unread

    Mark Chat as Unread


### P

* [parsePhoneNumber](https://developers.ringcentral.com/api-reference/Phone-Numbers/parsePhoneNumber)

    POST https://platform.ringcentral.com/restapi/v1.0/number-parser/parse

    Parse Phone Number

* [patchGlipEveryone](https://developers.ringcentral.com/api-reference/Teams/patchGlipEveryone)

    PATCH https://platform.ringcentral.com/restapi/v1.0/glip/everyone

    Update Everyone Сhat

* [patchGlipPost](https://developers.ringcentral.com/api-reference/Posts/patchGlipPost)

    PATCH https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts/{postId}

    Update Post

* [patchGlipTeam](https://developers.ringcentral.com/api-reference/Teams/patchGlipTeam)

    PATCH https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}

    Update Team

* [patchNote](https://developers.ringcentral.com/api-reference/Notes/patchNote)

    PATCH https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}

    Update Note

* [patchTask](https://developers.ringcentral.com/api-reference/Tasks/patchTask)

    PATCH https://platform.ringcentral.com/restapi/v1.0/glip/tasks/{taskId}

    Patch Task

* [patchUser2](https://developers.ringcentral.com/api-reference/SCIM/patchUser2)

    PATCH https://platform.ringcentral.com/scim/v2/Users/{id}

    Update/Patch User

* [pauseResumeCallRecording](https://developers.ringcentral.com/api-reference/Call-Control/pauseResumeCallRecording)

    PATCH https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/recordings/{recordingId}

    Pause/Resume Recording

* [pickupCallParty](https://developers.ringcentral.com/api-reference/Call-Control/pickupCallParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/pickup

    Pickup Call

* [publishNote](https://developers.ringcentral.com/api-reference/Notes/publishNote)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}/publish

    Publish Note


### R

* [readAccountBusinessAddress](https://developers.ringcentral.com/api-reference/Company/readAccountBusinessAddress)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/business-address

    Get Account Business Address

* [readAccountFederation](https://developers.ringcentral.com/api-reference/Internal-Contacts/readAccountFederation)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/directory/federation

    Get Account Federation

* [readAccountInfo](https://developers.ringcentral.com/api-reference/Company/readAccountInfo)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}

    Get Account Info

* [readAccountPhoneNumber](https://developers.ringcentral.com/api-reference/Phone-Numbers/readAccountPhoneNumber)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/phone-number/{phoneNumberId}

    Get Phone Number

* [readAccountPresence](https://developers.ringcentral.com/api-reference/Presence/readAccountPresence)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/presence

    Get User Presence Status List

* [readAccountServiceInfo](https://developers.ringcentral.com/api-reference/Company/readAccountServiceInfo)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/service-info

    Get Account Service Info

* [readAnsweringRule](https://developers.ringcentral.com/api-reference/Rule-Management/readAnsweringRule)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule/{ruleId}

    Get Call Handling Rule

* [readAPIStatus](https://developers.ringcentral.com/api-reference/API-Info/readAPIStatus)

    GET https://platform.ringcentral.com/restapi/v1.0/status

    Get Service Status

* [readAPIVersion](https://developers.ringcentral.com/api-reference/API-Info/readAPIVersion)

    GET https://platform.ringcentral.com/restapi/{apiVersion}

    Get Version Info

* [readAPIVersions](https://developers.ringcentral.com/api-reference/API-Info/readAPIVersions)

    GET https://platform.ringcentral.com/restapi

    Get API Versions

* [readAssistants](https://developers.ringcentral.com/api-reference/Meeting-Configuration/readAssistants)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meetings-configuration/assistants

    Get Assistants

* [readAssistedUsers](https://developers.ringcentral.com/api-reference/Meeting-Configuration/readAssistedUsers)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meetings-configuration/assisted

    Get Assisted Users

* [readAuthorizationProfile](https://developers.ringcentral.com/api-reference/User-Permissions/readAuthorizationProfile)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/authz-profile

    Get Authorization Profile

* [readAutomaticLocationUpdatesTask](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readAutomaticLocationUpdatesTask)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/tasks/{taskId}

    Get Emergency Map Configuration Task

* [readBlockedAllowedNumber](https://developers.ringcentral.com/api-reference/Call-Blocking/readBlockedAllowedNumber)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers/{blockedNumberId}

    Get Blocked/Allowed Number

* [readCallerBlockingSettings](https://developers.ringcentral.com/api-reference/Call-Blocking/readCallerBlockingSettings)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking

    Get Caller Blocking Settings

* [readCallPartyStatus](https://developers.ringcentral.com/api-reference/Call-Control/readCallPartyStatus)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}

    Get Call Party Status

* [readCallRecording](https://developers.ringcentral.com/api-reference/Call-Recordings/readCallRecording)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/recording/{recordingId}

    Get Call Recording

* [readCallRecordingSettings](https://developers.ringcentral.com/api-reference/Rule-Management/readCallRecordingSettings)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording

    Get Call Recording Settings

* [readCallSessionStatus](https://developers.ringcentral.com/api-reference/Call-Control/readCallSessionStatus)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}

    Get Call Session Status

* [readCompanyAnsweringRule](https://developers.ringcentral.com/api-reference/Rule-Management/readCompanyAnsweringRule)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule/{ruleId}

    Get Company Call Handling Rule

* [readCompanyBusinessHours](https://developers.ringcentral.com/api-reference/Business-Hours/readCompanyBusinessHours)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/business-hours

    Get Company Business Hours

* [readCompanyCallLog](https://developers.ringcentral.com/api-reference/Call-Log/readCompanyCallLog)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-log

    Get Company Call Log Records

* [readCompanyCallRecord](https://developers.ringcentral.com/api-reference/Call-Log/readCompanyCallRecord)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-log/{callRecordId}

    Get Company Call Log Record(s)

* [readConferencingSettings](https://developers.ringcentral.com/api-reference/User-Settings/readConferencingSettings)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/conferencing

    Get User Conferencing Settings

* [readContact](https://developers.ringcentral.com/api-reference/External-Contacts/readContact)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact/{contactId}

    Get Contact

* [readCountry](https://developers.ringcentral.com/api-reference/Regional-Settings/readCountry)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/country/{countryId}

    Get Country

* [readCustomGreeting](https://developers.ringcentral.com/api-reference/Rule-Management/readCustomGreeting)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/greeting/{greetingId}

    Get Custom Greeting

* [readDataExportTask](https://developers.ringcentral.com/api-reference/Glip-Compliance-Exports/readDataExportTask)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/data-export/{taskId}

    Get Data Export Task

* [readDataExportTaskDataset](https://developers.ringcentral.com/api-reference/Glip-Compliance-Exports/readDataExportTaskDataset)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/data-export/{taskId}/datasets/{datasetId}

    Get Data Export Task Dataset

* [readDevice](https://developers.ringcentral.com/api-reference/Devices/readDevice)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/device/{deviceId}

    Get Device

* [readDirectoryEntry](https://developers.ringcentral.com/api-reference/Internal-Contacts/readDirectoryEntry)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/directory/entries/{entryId}

    Get Corporate Directory Entry

* [readEmergencyLocation](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readEmergencyLocation)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-locations/{locationId}

    Get Emergency Location

* [readEvent](https://developers.ringcentral.com/api-reference/Calendar-Events/readEvent)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/events/{eventId}

    Get Event

* [readExtension](https://developers.ringcentral.com/api-reference/User-Settings/readExtension)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}

    Get Extension

* [readExtensionCallerId](https://developers.ringcentral.com/api-reference/User-Settings/readExtensionCallerId)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-id

    Get Extension Caller ID

* [readForwardingNumber](https://developers.ringcentral.com/api-reference/Call-Forwarding/readForwardingNumber)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/{forwardingNumberId}

    Get Forwarding Number

* [readGlipCard](https://developers.ringcentral.com/api-reference/Posts/readGlipCard)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/cards/{cardId}

    Get Card

* [readGlipChat](https://developers.ringcentral.com/api-reference/Chats/readGlipChat)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}

    Get Chat

* [readGlipCompany](https://developers.ringcentral.com/api-reference/Glip-Profile/readGlipCompany)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/companies/{companyId}

    Get Company Info

* [readGlipConversation](https://developers.ringcentral.com/api-reference/Conversations/readGlipConversation)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/conversations/{chatId}

    Get Conversation

* [readGlipEvents](https://developers.ringcentral.com/api-reference/Calendar-Events/readGlipEvents)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/events

    Get User Events List

* [readGlipEveryone](https://developers.ringcentral.com/api-reference/Teams/readGlipEveryone)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/everyone

    Get Everyone Chat

* [readGlipGroup](https://developers.ringcentral.com/api-reference/Chats/readGlipGroup)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}

    Get Group

* [readGlipPerson](https://developers.ringcentral.com/api-reference/Glip-Profile/readGlipPerson)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/persons/{personId}

    Get Person

* [readGlipPost](https://developers.ringcentral.com/api-reference/Posts/readGlipPost)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts/{postId}

    Get Post

* [readGlipPosts](https://developers.ringcentral.com/api-reference/Posts/readGlipPosts)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts

    Get Posts

* [readGlipPreferences](https://developers.ringcentral.com/api-reference/Glip-Profile/readGlipPreferences)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/preferences

    Get Preferences

* [readGlipTeam](https://developers.ringcentral.com/api-reference/Teams/readGlipTeam)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}

    Get Team

* [readGlipWebhook](https://developers.ringcentral.com/api-reference/Glip-Webhooks/readGlipWebhook)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/webhooks/{webhookId}

    Get Webhook

* [readIVRMenu](https://developers.ringcentral.com/api-reference/Call-Routing/readIVRMenu)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-menus/{ivrMenuId}

    Get IVR Menu

* [readIVRPrompt](https://developers.ringcentral.com/api-reference/Call-Routing/readIVRPrompt)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts/{promptId}

    Get IVR Prompt

* [readIVRPromptContent](https://developers.ringcentral.com/api-reference/Call-Routing/readIVRPromptContent)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts/{promptId}/content

    Get IVR Prompt Content

* [readLanguage](https://developers.ringcentral.com/api-reference/Regional-Settings/readLanguage)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/language/{languageId}

    Get Language

* [readMeeting](https://developers.ringcentral.com/api-reference/Meeting-Management/readMeeting)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/{meetingId}

    Get Meeting Info

* [readMeetingServiceInfo](https://developers.ringcentral.com/api-reference/Meeting-Configuration/readMeetingServiceInfo)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/service-info

    Get Meeting Service Info

* [readMessage](https://developers.ringcentral.com/api-reference/Message-Store/readMessage)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/{messageId}

    Get Message

* [readMessageContent](https://developers.ringcentral.com/api-reference/Message-Store/readMessageContent)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/{messageId}/content/{attachmentId}

    Get Message Content

* [readMessageStoreConfiguration](https://developers.ringcentral.com/api-reference/Message-Store/readMessageStoreConfiguration)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-configuration

    Get Message Store Configuration

* [readMessageStoreReportArchive](https://developers.ringcentral.com/api-reference/Message-Exports/readMessageStoreReportArchive)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-report/{taskId}/archive

    Get Message Store Report Archive

* [readMessageStoreReportArchiveContent](https://developers.ringcentral.com/api-reference/Message-Exports/readMessageStoreReportArchiveContent)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-report/{taskId}/archive/{archiveId}

    Get Message Store Report Archive Content

* [readMessageStoreReportTask](https://developers.ringcentral.com/api-reference/Message-Exports/readMessageStoreReportTask)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-report/{taskId}

    Get Message Store Report Task

* [readNetwork](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readNetwork)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks/{networkId}

    Get Network

* [readNotificationSettings](https://developers.ringcentral.com/api-reference/User-Settings/readNotificationSettings)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/notification-settings

    Get Notification Settings

* [readRingOutCallStatus](https://developers.ringcentral.com/api-reference/RingOut/readRingOutCallStatus)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ring-out/{ringoutId}

    Get RingOut Call Status

* [readRingOutCallStatusDeprecated](https://developers.ringcentral.com/api-reference/RingOut/readRingOutCallStatusDeprecated)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ringout/{ringoutId}

    Get RingOut Call Status

* [readScaledPofileImage](https://developers.ringcentral.com/api-reference/User-Settings/readScaledPofileImage)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/profile-image/{scaleSize}

    Get Scaled User Profile Image

* [readServiceProviderConfig](https://developers.ringcentral.com/api-reference/SCIM/readServiceProviderConfig)

    GET https://platform.ringcentral.com/scim/ServiceProviderConfig

    Get Service Provider Config

* [readServiceProviderConfig2](https://developers.ringcentral.com/api-reference/SCIM/readServiceProviderConfig2)

    GET https://platform.ringcentral.com/scim/v2/ServiceProviderConfig

    Get Service Provider Config

* [readStandardGreeting](https://developers.ringcentral.com/api-reference/Rule-Management/readStandardGreeting)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting/{greetingId}

    Get Standard Greeting

* [readState](https://developers.ringcentral.com/api-reference/Regional-Settings/readState)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/state/{stateId}

    Get State

* [readSubscription](https://developers.ringcentral.com/api-reference/Subscriptions/readSubscription)

    GET https://platform.ringcentral.com/restapi/v1.0/subscription/{subscriptionId}

    Get Subscription

* [readSwitch](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readSwitch)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches/{switchId}

    Get Switch

* [readTask](https://developers.ringcentral.com/api-reference/Tasks/readTask)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/tasks/{taskId}

    Get Task

* [readTimezone](https://developers.ringcentral.com/api-reference/Regional-Settings/readTimezone)

    GET https://platform.ringcentral.com/restapi/v1.0/dictionary/timezone/{timezoneId}

    Get Timezone

* [readUnifiedPresence](https://developers.ringcentral.com/api-reference/Presence/readUnifiedPresence)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/unified-presence

    Get Unified Presence

* [readUser2](https://developers.ringcentral.com/api-reference/SCIM/readUser2)

    GET https://platform.ringcentral.com/scim/v2/Users/{id}

    Get User

* [readUserBusinessHours](https://developers.ringcentral.com/api-reference/Business-Hours/readUserBusinessHours)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/business-hours

    Get User Business Hours

* [readUserCallLog](https://developers.ringcentral.com/api-reference/Call-Log/readUserCallLog)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log

    Get User Call Log Records

* [readUserCallRecord](https://developers.ringcentral.com/api-reference/Call-Log/readUserCallRecord)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log/{callRecordId}

    Get User Call Record

* [readUserFeatures](https://developers.ringcentral.com/api-reference/Features/readUserFeatures)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/features

    Get User Features

* [readUserNote](https://developers.ringcentral.com/api-reference/Notes/readUserNote)

    GET https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}

    Get Note

* [readUserPresenceStatus](https://developers.ringcentral.com/api-reference/Presence/readUserPresenceStatus)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence

    Get User Presence Status

* [readUserProfileImage](https://developers.ringcentral.com/api-reference/User-Settings/readUserProfileImage)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/profile-image

    Get User Profile Image

* [readUserTemplate](https://developers.ringcentral.com/api-reference/Extensions/readUserTemplate)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/templates/{templateId}

    Get User Template

* [readUserVideoConfiguration](https://developers.ringcentral.com/api-reference/Video-Configuration/readUserVideoConfiguration)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/video-configuration

    Get User Video Configuration

* [readWirelessPoint](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readWirelessPoint)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points/{pointId}

    Get Wireless Point

* [rejectParty](https://developers.ringcentral.com/api-reference/Call-Control/rejectParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/reject

    Reject Call Party

* [removeGlipTeamMembers](https://developers.ringcentral.com/api-reference/Teams/removeGlipTeamMembers)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/remove

    Remove Team Members

* [renewSubscription](https://developers.ringcentral.com/api-reference/Subscriptions/renewSubscription)

    POST https://platform.ringcentral.com/restapi/v1.0/subscription/{subscriptionId}/renew

    Renew Subscription

* [replaceUser2](https://developers.ringcentral.com/api-reference/SCIM/replaceUser2)

    PUT https://platform.ringcentral.com/scim/v2/Users/{id}

    Update/Replace User

* [replyParty](https://developers.ringcentral.com/api-reference/Call-Control/replyParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/reply

    Reply with Text

* [revokeToken](https://developers.ringcentral.com/api-reference/OAuth-2.0/revokeToken)

    POST https://platform.ringcentral.com/restapi/oauth/revoke

    Revoke Token


### S

* [searchDirectoryEntries](https://developers.ringcentral.com/api-reference/Internal-Contacts/searchDirectoryEntries)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/directory/entries/search

    Search Company Directory Entries

* [searchViaGet](https://developers.ringcentral.com/api-reference/SCIM/searchViaGet)

    GET https://platform.ringcentral.com/scim/Users

    Search/List Users

* [searchViaGet2](https://developers.ringcentral.com/api-reference/SCIM/searchViaGet2)

    GET https://platform.ringcentral.com/scim/v2/Users

    Search/List Users

* [searchViaPost2](https://developers.ringcentral.com/api-reference/SCIM/searchViaPost2)

    POST https://platform.ringcentral.com/scim/v2/Users/.search

    Search/List Users

* [startCallRecording](https://developers.ringcentral.com/api-reference/Call-Control/startCallRecording)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/recordings

    Create Recording

* [superviseCallParty](https://developers.ringcentral.com/api-reference/Call-Control/superviseCallParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/supervise

    Supervise Call Party

* [superviseCallSession](https://developers.ringcentral.com/api-reference/Call-Control/superviseCallSession)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/supervise

    Supervise Call Session

* [suspendGlipWebhook](https://developers.ringcentral.com/api-reference/Glip-Webhooks/suspendGlipWebhook)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/webhooks/{webhookId}/suspend

    Suspend Webhook

* [syncAccountCallLog](https://developers.ringcentral.com/api-reference/Call-Log/syncAccountCallLog)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-log-sync

    Sync Company Call Log

* [syncAddressBook](https://developers.ringcentral.com/api-reference/External-Contacts/syncAddressBook)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book-sync

    Address Book Synchronization

* [syncMessages](https://developers.ringcentral.com/api-reference/Message-Store/syncMessages)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-sync

    Sync Messages

* [syncUserCallLog](https://developers.ringcentral.com/api-reference/Call-Log/syncUserCallLog)

    GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log-sync

    Sync User Call Log


### T

* [transferCallParty](https://developers.ringcentral.com/api-reference/Call-Control/transferCallParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/transfer

    Transfer Call Party


### U

* [unarchiveGlipTeam](https://developers.ringcentral.com/api-reference/Teams/unarchiveGlipTeam)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/unarchive

    Unarchive Team

* [unfavoriteGlipChat](https://developers.ringcentral.com/api-reference/Chats/unfavoriteGlipChat)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/unfavorite

    Remove Chat from Favorites

* [unholdCallParty](https://developers.ringcentral.com/api-reference/Call-Control/unholdCallParty)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/unhold

    Unhold Call Party

* [unlockNote](https://developers.ringcentral.com/api-reference/Notes/unlockNote)

    POST https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}/unlock

    Unlock Note

* [updateAccountBusinessAddress](https://developers.ringcentral.com/api-reference/Company/updateAccountBusinessAddress)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/business-address

    Update Company Business Address

* [updateAnsweringRule](https://developers.ringcentral.com/api-reference/Rule-Management/updateAnsweringRule)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule/{ruleId}

    Update Call Handling Rule

* [updateBlockedAllowedNumber](https://developers.ringcentral.com/api-reference/Call-Blocking/updateBlockedAllowedNumber)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers/{blockedNumberId}

    Update Blocked/Allowed Number

* [updateCallerBlockingSettings](https://developers.ringcentral.com/api-reference/Call-Blocking/updateCallerBlockingSettings)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking

    Update Caller Blocking Settings

* [updateCallMonitoringGroup](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/updateCallMonitoringGroup)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}

    Updates Call Monitoring Group

* [updateCallMonitoringGroupList](https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/updateCallMonitoringGroupList)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}/bulk-assign

    Update Call Monitoring Group List

* [updateCallParty](https://developers.ringcentral.com/api-reference/Call-Control/updateCallParty)

    PATCH https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}

    Update Call Party

* [updateCallRecordingExtensionList](https://developers.ringcentral.com/api-reference/Rule-Management/updateCallRecordingExtensionList)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/bulk-assign

    Update Call Recording Extension List

* [updateCallRecordingSettings](https://developers.ringcentral.com/api-reference/Rule-Management/updateCallRecordingSettings)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording

    Update Call Recording Settings

* [updateCompanyAnsweringRule](https://developers.ringcentral.com/api-reference/Rule-Management/updateCompanyAnsweringRule)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule/{ruleId}

    Update Company Call Handling Rule

* [updateCompanyBusinessHours](https://developers.ringcentral.com/api-reference/Business-Hours/updateCompanyBusinessHours)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/business-hours

    Update Company Business Hours

* [updateConferencingSettings](https://developers.ringcentral.com/api-reference/User-Settings/updateConferencingSettings)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/conferencing

    Update User Conferencing Settings

* [updateContact](https://developers.ringcentral.com/api-reference/External-Contacts/updateContact)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact/{contactId}

    Update Contact

* [updateCustomField](https://developers.ringcentral.com/api-reference/Custom-Fields/updateCustomField)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/custom-fields/{fieldId}

    Update Сustom Field

* [updateDevice](https://developers.ringcentral.com/api-reference/Devices/updateDevice)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/device/{deviceId}

    Update Device

* [updateEmergencyLocation](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateEmergencyLocation)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-locations/{locationId}

    Update Emergency Location

* [updateEvent](https://developers.ringcentral.com/api-reference/Calendar-Events/updateEvent)

    PUT https://platform.ringcentral.com/restapi/v1.0/glip/events/{eventId}

    Update Event

* [updateExtension](https://developers.ringcentral.com/api-reference/User-Settings/updateExtension)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}

    Update Extension

* [updateExtensionCallerId](https://developers.ringcentral.com/api-reference/User-Settings/updateExtensionCallerId)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-id

    Update Extension Caller ID

* [updateFavoriteContactList](https://developers.ringcentral.com/api-reference/External-Contacts/updateFavoriteContactList)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite

    Update Favorite Contact List

* [updateForwardingNumber](https://developers.ringcentral.com/api-reference/Call-Forwarding/updateForwardingNumber)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/{forwardingNumberId}

    Update Forwarding Number

* [updateGlipCard](https://developers.ringcentral.com/api-reference/Posts/updateGlipCard)

    PUT https://platform.ringcentral.com/restapi/v1.0/glip/cards/{cardId}

    Update Card

* [updateGlipPostText](https://developers.ringcentral.com/api-reference/Posts/updateGlipPostText)

    PUT https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/posts/{postId}/text

    Update Post

* [updateIVRMenu](https://developers.ringcentral.com/api-reference/Call-Routing/updateIVRMenu)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-menus/{ivrMenuId}

    Update IVR Menu

* [updateIVRPrompt](https://developers.ringcentral.com/api-reference/Call-Routing/updateIVRPrompt)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts/{promptId}

    Update IVR Prompt

* [updateMeeting](https://developers.ringcentral.com/api-reference/Meeting-Management/updateMeeting)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/{meetingId}

    Update Meeting

* [updateMeetingServiceInfo](https://developers.ringcentral.com/api-reference/Meeting-Configuration/updateMeetingServiceInfo)

    PATCH https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/service-info

    Update Meeting Service Info

* [updateMessage](https://developers.ringcentral.com/api-reference/Message-Store/updateMessage)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/{messageId}

    Update Message List

* [updateMessageStoreConfiguration](https://developers.ringcentral.com/api-reference/Message-Store/updateMessageStoreConfiguration)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-configuration

    Update Message Store Configuration

* [updateMultipleSwitches](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateMultipleSwitches)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches-bulk-update

    Update Multiple Switches

* [updateMultipleWirelessPoints](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateMultipleWirelessPoints)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points-bulk-update

    Update Multiple Wireless Points

* [updateNetwork](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateNetwork)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks/{networkId}

    Update Network

* [updateNotificationSettings](https://developers.ringcentral.com/api-reference/User-Settings/updateNotificationSettings)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/notification-settings

    Update Notification Settings

* [updateSubscription](https://developers.ringcentral.com/api-reference/Subscriptions/updateSubscription)

    PUT https://platform.ringcentral.com/restapi/v1.0/subscription/{subscriptionId}

    Renew Subscription / Update Event Filters

* [updateSwitch](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateSwitch)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches/{switchId}

    Update Switch

* [updateUnifiedPresence](https://developers.ringcentral.com/api-reference/Presence/updateUnifiedPresence)

    PATCH https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/unified-presence

    Update Unified Presence

* [updateUserBusinessHours](https://developers.ringcentral.com/api-reference/Business-Hours/updateUserBusinessHours)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/business-hours

    Update User Business Hours

* [updateUserCallQueues](https://developers.ringcentral.com/api-reference/Call-Queues/updateUserCallQueues)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-queues

    Update User Call Queues

* [updateUserPresenceStatus](https://developers.ringcentral.com/api-reference/Presence/updateUserPresenceStatus)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence

    Update User Presence Status

* [updateUserProfileImage](https://developers.ringcentral.com/api-reference/User-Settings/updateUserProfileImage)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/profile-image

    Update User Profile Image

* [updateUserVideoConfiguration](https://developers.ringcentral.com/api-reference/Video-Configuration/updateUserVideoConfiguration)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/video-configuration

    Update User Video Configuration

* [updateWirelessPoint](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateWirelessPoint)

    PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points/{pointId}

    Update Wireless Point


### V

* [validateMultipleSwitches](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/validateMultipleSwitches)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches-bulk-validate

    Validate Multiple Switches

* [validateMultipleWirelessPoints](https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/validateMultipleWirelessPoints)

    POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points-bulk-validate

    Validate Multiple Wireless Points

