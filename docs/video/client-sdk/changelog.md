## API Changelog

### June 2022 API Changes

| **Category** | **Class ** | **API ** | **Path ** | **Description ** | **Status** |
|---|---|---|---|---|---|
| Engine Core | RcvEngine | startInstantMeeting(1/2) | MeetingController startInstantMeeting() | Starts an instant meeting with default meeting settings. A successful call of startInstantMeeting triggers the onMeetingJoin callback. | Modified |
| Engine Core | RcvEngine | startInstantMeeting(2/2) | MeetingController startInstantMeeting(InstantMeetingSettings settings, MeetingOptions options) | Starts an instant meeting with customized meeting-level settings for the participants and user-level meeting options. A successful call of startInstantMeeting triggers the **onMeetingJoin** callback. InstantMeetingSettings:  meetingName: string; allowJoinBeforeHost: bool; (Default is true) muteAudioForParticipant: bool; (Default is false) muteVideoForParticipant: bool; (Default is true) requirePassword: bool; (Default is true) meetingPassword: string; isWaitingRoomEnabled: bool; (Default is false) waitingRoomMode: MeetingWaitingRoomMode { everyone, onlyAuthUser, onlyCoworkers }; (Default is everyone) allowScreenSharing: bool; (Default is true) onlyAuthUserCanJoin: bool; (Default is false) onlyCoworkersCanJoin: bool; (Default is false) enableE2ee: bool; (Default is false) | New |
| Engine Core | RcvEngine | joinMeeting | MeetingController joinMeeting(String meetingId, JoinMeetingOptions options) | Joins a meeting with a particular meeting id or custom meeting options.  If the user is the meeting host, by joining the meeting, if the participants are not allowed "join before host" or the waiting room is enabled, the meeting will be started and the user will be granted the host role automatically.  A successful call of joinMeeting triggers the **onMeetingJoin** callback for the local user, and the remote user will retrieve the **onUserJoined** callback.  Parameters: String meetingId - the meeting short id MeetingOptions options - the user-level meeting options, it only applied if the user is the meeting host | Modified |
| Engine Core | RcvEngine | getMeetingController | MeetingController getMeetingController(String meetingId) | Get an active meeting controller with a particular meeting id. | Modified |
| Engine Core | RcvEngine | setAuthToken | int setAuthToken(String tokenPair, bool autoRefresh) | Set token pair string in the SDK. This method must be called after creating RcvEngine right away, the access token and refresh token pair must be both included.  Parameters: String tokenPair - the access token and refresh token pair JSON string boolean autoRefresh - default value is TRUE. If it's TRUE, the access token will be refreshed automatically once it expired and the new token pair will be returned by the onAuthTokenRenew callback, otherwise, an error will be returned by the corresponding API event callback. | New |
| Engine Core | RcvEngine | renewAuthToken | int renewAuthToken(String refreshToken) | Refreshes the auth token pair immediately. A successful call of renewAuthToken triggers the **onAuthTokenRenew** callback which includes the new token pair. | New |
| Video Management | VideoController | switchCamera | int switchCamera() | Switches between the front and rear cameras on the mobile device. By default, the front camera will be the primary source. | New |
| Meeting Events | MeetingEventHandler | onActiveSpeakerUserChanged | void onActiveSpeakerUserChanged(IParticipant participant) | Occurs when the active speaker user is changed. | New |


### May 2022 API Changes

| **Category** | **Class ** | **API ** | **Path ** | **Description ** | **Status** |
|---|---|---|---|---|---|
| Engine Core  | RcvEngine  | create  | RcvEngine create(String clientId, String clientSecret)  | Creates a RcvEngine instance.  | Modified |
| Engine Core  | RcvEngine  | instance  | RcvEngine instance()  | Returns the RcvEngine singleton instance.  | Modified |
| Engine Core  | RcvEngine  | destroy  | void destroy()  | Destroys the RcvEngine instance and releases all resources used by the RCV client SDK.  | Modified |
| Engine Core  | RcvEngine  | startInstantMeeting()  | int startInstantMeeting()  | Starts an instant meeting with default meeting settings.  | Modified |
| Engine Core  | RcvEngine  | joinMeeting  | int joinMeeting(String meetingId, JoinMeetingOptions options)  | Joins a meeting with a particular meeting id or custom meeting options.  | Modified |
| Engine Core  | RcvEngine  | getMeetingController  | MeetingController getMeetingController(String meetingId)  | Get an active meeting controller with a particular meeting id.  | Modified |
| Engine Core  | RcvEngine  | registerEventHandler  | void registerEventHandler(EngineEventHandler handler)  | Set the event handler of RcvEngine.  | Modified |
| Engine Core  | RcvEngine  | setLocalAudioProcessor  | int setLocalAudioProcessor(AudioProcessor processor)  | Set local audio processor.  | New |
| Engine Core  | RcvEngine  | setLocalVideoProcessor  | int setLocalVideoProcessor(VideoProcessor processor)  | Set local video processor, for local video processing.  | New |
| Meeting Management  | MeetingController  | registerMeetingEventHandler  | void registerMeetingEventHandler(MeetingEventHandler handler)  | Set the meeting event handler.  | Modified |
| Meeting Management  | MeetingController  | leaveMeeting  | int leaveMeeting()  | Leaves a meeting.  | Modified |
| Meeting Management  | MeetingController  | endMeeting  | int endMeeting()  | Ends a meeting.  | New |
| Meeting Management  | MeetingController  | lockMeeting  | int lockMeeting(bool lock)  | Lock or unlock meetings.  | New |
| Meeting Management  | MeetingController  | isMeetingLocked  | bool isMeetingLocked()  | Indicates whether the meeting is locked.  | New |
| Meeting User Management  | UserController  | admitUser  | int admitUser(int64 uid)  | Admits a particular user into the meeting (must have the host or moderator permission).  | New |
| Meeting User Management  | UserController  | denyUser  | int denyUser(int64 uid)  | Deny a user in the waiting room from joining the meeting (must have the host or moderator permission).  | New |
| Meeting User Management  | UserController  | admitAll  | int admitAll()  | Admits all users who are currently in the waiting room into the meeting (must have the host or moderator permission).  | New |
| Meeting User Management  | UserController  | putUserInWaitingRoom  | int putUserInWaitingRoom(int64 uid)  | Removes a particular attendee from the current meeting session and puts this user in the waiting room (must have the host or moderator permission).  | New |
| Meeting User Management  | UserController  | getMeetingUsers  | Map<int64 uid, IParticipant participant> getMeetingUsers()  | Get the user list of an active meeting.  | New |
| Meeting User Management  | UserController  | getMeetingUserById  | IParticipant getMeetingUserById(int64 uid)  | Get a user object by id.  | New |
| Meeting User Management  | UserController  | getMyself  | IParticipant getMyself()  | Get the current user object.  | New |
| Meeting Recording Management  | RecordingController  | startRecording  | int startRecording()  | Starts/Resume the recording in an active meeting.  | New |
| Meeting Recording Management  | RecordingController  | pauseRecording  | int pauseRecording()  | Pause the recording of an active meeting.  | New |
| Meeting Recording Management  | RecordingController  | getRecordingState  | RecordingState getRecordingState()  | Get current meeting recording state. - RcvRecordingState.UNACTIVATED - RcvRecordingState.RUNNING - RcvRecordingState.PAUSED  | New |
| Meeting Recording Management  | RecordingController  | isRecordingAllowed  | bool isRecordingAllowed()  | Indicates whether the meeting recording is allowed and the user must have the host or moderator's permission.  | New |
| Meeting Recording Management  | RecordingController  | getRecordingDuration  | int64 getRecordingDuration()  | Returns the current recording duration (seconds)  | New |
| Engine Core Events  | EngineEventHandler  | onMeetingJoin  | void onMeetingJoin(String meetingId, int64 errorCode)  | Occurs when joining a meeting action is finished, error code is 0: success, non 0: fail  | New |
| Engine Core Events  | EngineEventHandler  | onMeetingLeave  | void onMeetingLeave(String meetingId, int64 errorCode, LeaveReason reason)  | Occurs when leaving a meeting action is finished, error code is 0: success, non 0: fail. - LeaveReason.END_BY_HOST: Host or moderator ends the meeting. - LeaveReason.END_BY_SDK_CONNECTION_BROKEN: Meeting ends for SDK disconnects. - LeaveReason.END_BY_SELF: User leaves meeting. - LeaveReason.END_FOR_EXCEED_MAX_DURATION: Meeting ends when the maxium duration is over. - LeaveReason.END_FOR_NOATEENDEE: Meeting ends for there is no attendee comes in. - LeaveReason.REMOVE_BY_HOST: Remove from the meeting by host or moderator  | New |
| Engine Core Events  | EngineEventHandler  | onMeetingStateChanged  | void onMeetingStateChanged(String meetingId, MeetingState state)  | Occurs when the meeting state is changed. - RcvMeetingState.MEETING_STATE_CONNECTING - RcvMeetingState.MEETING_STATE_DISCONNECTING - RcvMeetingState.MEETING_STATE_FAILED - RcvMeetingState.MEETING_STATE_INWAITINGROOM - RcvMeetingState.MEETING_STATE_INMEETING - RcvMeetingState.MEETING_STATE_RECONNECTING - RcvMeetingState.MEETING_STATE_WAITINGFORHOST - RcvMeetingState.MEETING_STATE_UNKNOWN  | New |
| Meeting Events  | MeetingEventHandler  | onUserUpdated  | void onUserUpdated(IParticipant participant)  | Occurs when a user's state changed.  | New |
| Meeting Events  | MeetingEventHandler  | onRecordingStateChanged  | void onRecordingStateChanged(RecordingState state)  | Occurs when the meeting recording state is changed. - RcvRecordingState.UNACTIVATED - RcvRecordingState.RUNNING - RcvRecordingState.PAUSED  | New |
| Audio Management  | AudioController  | enableAudio  | int enableAudio()  | Enable the audio session.  | Modified |
| Audio Management  | AudioController  | disableAudio  | int disableAudio()  | Disable the audio session.  | Modified |
| Audio Management  | AudioController  | registerAudioEventHandler  | void registerMeetingAudioEventHandler(AudioEventHandler handler)  | Set the audio event handler.  | New |
| Audio Management  | AudioController  | muteLocalAudioStream  | int muteLocalAudioStream(bool mute)  | Stops/Resumes publishing the local audio stream.  | New |
| Audio Management  | AudioController  | muteRemoteAudioStream  | int muteRemoteAudioStream(int64 uid, bool mute)  | Mute/unmute remote audio stream of a specified user (must have the host or moderator permission).  | New |
| Video Management  | VideoController  | setupLocalVideo  | int setupLocalVideo(VideoCanvas canvas)  | Initializes the local video view.  | New |
| Video Management  | VideoController  | setupRemoteVideo  | int setupRemoteVideo(VideoCanvas canvas)  | Initializes the remote video view.  | New |
| Video Management  | VideoController  | removeLocalVideo  | int removeLocalVideo(VideoCanvas canvas)  | Removes the local video view.  | New |
| Video Management  | VideoController  | removeRemoteVideo  | int removeRemoteVideo(VideoCanvas canvas)  | Removes the remote video view.  | New |
| Video Management  | VideoController  | registerVideoEventHandler  | void registerMeetingVideoEventHandler(VideoEventHandler handler)  | Set the video event handler.  | New |
| Video Management  | VideoController  | muteLocalVideoStream  | int muteLocalVideoStream(bool mute)  | Starts/Stops publishing the local video stream.  | New |
| Video Management  | VideoController  | muteRemoteVideoStream  | int muteRemoteVideoStream(int64 uid, bool mute)  | Stops/Resumes subscribing to the video stream of a specified user (must have the host or moderator permission).  | New |
| Video Management  | VideoController  | muteAllRemoteVideoStreams  | int muteAllRemoteVideoStreams()  | Stops/Resumes subscribing to the video stream of all users (must have the host or moderator permission).  | New |
| Audio Media Events  | AudioEventHandler  | onLocalAudioMuteChanged  | void onLocalAudioMuteChanged(bool muted)  | Occurs when the local audio state changes.  | New |
| Audio Media Events  | AudioEventHandler  | onRemoteAudioMuteChanged  | void onRemoteAudioStreamMuteChanged(int64uid, bool muted)  | Occurs when the remote audio mute changes.  | New |
| Audio Media Events  | AudioEventHandler  | onAudioUnmuteDemand  | void onAudioUnmuteDemand()  | Occurs when the host or moderator wants you to unmute your audio. This is a demand request, the app can decide whether to unmute.  | New |
| Video Media Events  | VideoEventHandler  | onLocalVideoMuteChanged  | void onLocalVideoMuteChanged(bool muted)  | Occurs when the local video state changes.  | New |
| Video Media Events  | VideoEventHandler  | onRemoteVideoMuteChanged  | void onRemoteVideoMuteChanged(bool muted)  | Occurs when the remote video mute changes.  | New |
| Video Media Events  | VideoEventHandler  | onVideoUnmuteDemand  | void onVideoUnmuteDemand()  | Occurs when the host or moderator wants you to unmute your video. This is a demand request, the app can decide whether to unmute.  | New |
|  |  |  |  |  |  |