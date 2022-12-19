// meeting info
const meetingBody = {
    topic: "Embbnux Ji's Meeting",
    meetingType: "Scheduled",
    password: "",
    schedule: {
        startTime: 1583312400368,
        durationInMinutes: 60,
        timeZone: {
            id: "1"
        }
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: [
        "Phone",
        "ComputerAudio"
    ]
};

// send a request to schedule meeting
const requestId = Date.now().toString();
document.querySelector("#rc-widget-adapter-frame").contentWindow.postMessage({
    type: 'rc-adapter-message-request',
    requestId: requestId,
    path: '/schedule-meeting',
    body: meetingBody,
}, '*';)
