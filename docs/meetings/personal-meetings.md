# Finding your personal meeting ID

??? warning "This is for RingCentral Video. Looking for the RingCentral Meetings API?"
     This Quick Start is designed for **RingCentral Video**, RingCentral's built-from-the-ground-up meetings platform. If you are looking to get started using our older RingCentral Meetings API, we have just the [RingCentral Meetings guide for you](../../rcm/create-meeting/). 

Every RingCentral Video account holder has a "Personal Meeting ID." This personal meeting ID is a persistent location in which to hold meetings. It is often used for having a quick ad-hoc meeting with a group of people. Developers may need to find a user's personal meeting ID when building user flows that allow users to schedule meetings -- often you may want to ask, "use your personal meeting ID?"

To retrieve your person meeting ID formulate a request like the following:

    GET /rcvideo/v1/bridges?default=true

Which returns something like this:

```json
{
    "id": "sjc01-c04-ndb11111111164f6fbb1503cb",
    "participantCode": "202111145",
    "hostCode": "991111383",
    "allowJoinBeforeHost": true,
    "uri": "/restapi/v1.0/conferencing/bridge/sjc01-c04-ndb111111164f6fbb1503cb",
    "shortId": "202111145",
    "meetingUri": "/join/202111145",
    "joinUri": "https://v.ringcentral.com/join/202111145",
    "name": "Luke Skywalker's RingCentral Video meeting",
    "type": 0,
    "muteAudio": false,
    "muteVideo": false,
    "announceOnEnter": true,
    "countOnEnter": true,
    "enterExitTonesMode": 1,
    "musicEnabled": true,
    "isMeetingSecret": false,
    "accountId": "37439510",
    "extensionId": "557601020"
}
```