no_breadcrumb:true

# web-sdk - v0.0.3-beta.4

## Table of contents

### Enumerations

- [AttendeeStatus](enums/AttendeeStatus.md)
- [AudioDeviceManagerEvent](enums/AudioDeviceManagerEvent.md)
- [AudioEvent](enums/AudioEvent.md)
- [EngineEvent](enums/EngineEvent.md)
- [ErrorCodeType](enums/ErrorCodeType.md)
- [LeaveReason](enums/LeaveReason.md)
- [LogLevel](enums/LogLevel.md)
- [MediaStatus](enums/MediaStatus.md)
- [MeetingEvent](enums/MeetingEvent.md)
- [NqiStatus](enums/NqiStatus.md)
- [RcvMeetingState](enums/RcvMeetingState.md)
- [StreamEvent](enums/StreamEvent.md)
- [UserEvent](enums/UserEvent.md)
- [VideoDeviceManagerEvent](enums/VideoDeviceManagerEvent.md)
- [VideoEvent](enums/VideoEvent.md)
- [WaitingRoomMode](enums/WaitingRoomMode.md)

### Classes

- [AudioController](classes/AudioController.md)
- [AudioDeviceManager](classes/AudioDeviceManager.md)
- [MeetingController](classes/MeetingController.md)
- [RcvEngine](classes/RcvEngine.md)
- [StreamManager](classes/StreamManager.md)
- [UserController](classes/UserController.md)
- [VideoController](classes/VideoController.md)
- [VideoDeviceManager](classes/VideoDeviceManager.md)

### Interfaces

- [EngineInitConfig](interfaces/EngineInitConfig.md)
- [ICountry](interfaces/ICountry.md)
- [IDialInfo](interfaces/IDialInfo.md)
- [IMeetingInfo](interfaces/IMeetingInfo.md)
- [IParticipant](interfaces/IParticipant.md)
- [IPassword](interfaces/IPassword.md)
- [ISip](interfaces/ISip.md)
- [IStream](interfaces/IStream.md)
- [InstantMeetingSettings](interfaces/InstantMeetingSettings.md)
- [MeetingOptions](interfaces/MeetingOptions.md)

### Type Aliases

- [HttpClient](README.md#httpclient)
- [SendOptions](README.md#sendoptions)
- [TEventCB](README.md#teventcb)
- [TUnsubscribeFunction](README.md#tunsubscribefunction)

## Type Aliases

### HttpClient

Ƭ **HttpClient**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | `string` | origin of http client |
| `send` | (`options`: [`SendOptions`](README.md#sendoptions)) => `Promise`<`Response`\> | send request just the same as sdk.platform().send for more information, pls check https://github.com/ringcentral/ringcentral-js/tree/master/sdk#api-calls |

___

### SendOptions

Ƭ **SendOptions**: `Object`

options of http client send method

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `body?` | `string` \| `object` | body of request |
| `handleRateLimit?` | `boolean` \| `number` | - |
| `headers?` | `object` | headers of request |
| `method?` | `string` | method of request, 'GET' \| 'POST', default 'GET' |
| `query?` | `object` | query of request |
| `retry?` | `boolean` | - |
| `skipAuthCheck?` | `boolean` | - |
| `skipDiscoveryCheck?` | `boolean` | - |
| `url` | `string` | url of send request |
| `userAgent?` | `string` | - |

___

### TEventCB

Ƭ **TEventCB**: (...`args`: `any`[]) => `void`

#### Type declaration

▸ (...`args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`void`

___

### TUnsubscribeFunction

Ƭ **TUnsubscribeFunction**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`
