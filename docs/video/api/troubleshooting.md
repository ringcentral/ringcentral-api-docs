# Frequently asked questions & common problems for RingCentral Video developers

{! mdx_includes/video-beta-notice.md !}

### Is a RingCentral developer account free?

Yes, there is no charge for creating developer account and deploying applications on RingCentral platform. However, for RingCentral Video, developers will need to sign-up for [free RingCentral Video Pro account](https://www.ringcentral.com/signup.html) as opposed to our standard free developer account.

### Is RingCentral Video Free, how do I get an account ?

It depends on your plan, RingCentral Video comes in both free and paid plans. Please refer to this [page for more information.](https://www.ringcentral.com/office/plansandpricing.html#office). For testing purpose, you're welcome to create a free [RingCentral Video Pro account](https://www.ringcentral.com/signup.html).

### I receive an error message about a ThirdPartyAppAccess permission

If you receive the following error:

> In order to call this API endpoint, one of the following permissions [ThirdPartyAppAccess] have to be granted to the authorized user.

Then, that is an indication that you are using our standard free developer account that is restricted from being used in production. To fix this error, you will need to create a [free RingCentral Video Pro account](https://www.ringcentral.com/signup.html) and create your application within this account. 

### I receive a "403 Forbidden" error when creating a meeting

A common cause for this message is when a developer is attempting to set the host of a meeting, but the designated host has not assigned the calling user to be a meeting delegate. To fix this problem, please consult our [create meeting](../create-meetings/) documentation. 

### I receive an error when calling the API in the sandbox environment...

The RingCentral Video API is not currently available in our sandbox. We ask developers to do their development in production. To gain access to production, please contact [rcv-partners@ringcentral.com](mailto:rcv-partners@ringcentral.com) for assistance. Please include the Client ID of the app you need promoted to production so that the team can assist you more quickly.

### I keep receiving the error "The call has ended" and the meeting ends if no one else joins

When you create a meeting, be sure to specify the meeting type of "0" (which corresponds to a "meeting" type). The default value is "1" or "call" which creates a meeting bridge that is more transient and will disconnect users if no one arrives in the room, or answers the call so to speak.

### I am receiving the error message, "In order to call this API endpoint, user needs to have [MeetingsRecordings] permission"

This indicates that the user the API is calling on behalf of lacks the proper permissions in Service Web. The remedy for this is to assign a role with [the "Meetings Reports" permission](https://support.ringcentral.com/s/article/RingCentral-Meetings-Permissions-List) to the associated user.

### How do I notify / get permission from users ahead of time that meeting will be recorded ?

There is no API way to notify or get user permission ahead of time. You will have to request user consent during the meeting.


