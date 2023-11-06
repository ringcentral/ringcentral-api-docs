# Extension Info Event

*Since 1.0.15 (Release 7.0)*

Event filter /restapi/v1.0/account/{accountId}/extension/{extensionId} enables notifications in case of the current extension changes:

* addition/removal of extensions to/from account
* contact info (first/last name; company name; email; business phone; business address)
* status
* regional settings (timezone, home country, language, greeting language, formatting locale, time format)
* permissions (administrator permission, international calling)
* phone numbers (assign/unassign)
* departments (added to/removed from)
* service features (for the current extension only) - *SMS/SMSReceiving*, *Pager/PagerReceiving*, *Fax/FaxReceiving*, *Voicemail*, *EncryptionAtRest*, *BlockedMessageForwarding*, *DnD*, *RingOut*, *InternationalCalling*, *Presence*, *Conferencing*, *VoIPCalling*, *CallPark*, *OnDemandCallRecording*

If the client is subscribed to the current event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}` then notifications will be sent whenever any extension information change occurs. The `hints` property value returned in notification body helps to distinguish what type of change was actually made; each hint is mapped to the corresponding API method that can be called to get the required change. Please consider the 'Hints' table at the bottom of this page.

The full updated extension data is accessible by calling the [Get Extension Info](https://developers.ringcentral.com/api-reference#User-Settings-loadExtensionInfo) method.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Extension Info Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |
| `eventType` | 'Update' or 'Delete' | Type of a change |
| `hints` | Collection of Hints | Returned for 'Update' event type only. See the list of supported hints and the corresponding APIs in the table below|

### Hints

| Hint | Target API |
|-----------|------|
| `AccountSettings` | `account/~` |
| `AccountStatus` | `account/~` |
| `AnsweringRules` | `account/~/extension/~`|
| `CompanyNumbers` | `account/~/extension/~/phone-number` |
| `DialingPlan` | `account/~/dialing-plan` |
| `ExtensionInfo` | `account/~/extension/~/` |
| `Features` | `account/~/extension/~/features` |
| `Limits` | `account/~/extension/~/features` |
| `Permissions` | `account/~/extension/~/features` |
| `ProfileImage` | `/account/~/extension/~/profile-image` |
| `VideoConfiguration`| `account/~/extension`, `account/~/extension/~/` |
| `CallQueueMembersChange` | `account/~/extension/~/call-queues`, `account/~/call-queues/~/bulk-assign` |


## Example

```json
{
   "uuid":"ed1cf00c-0420-4bf5-a0ae-e659cc9f77e0",
   "event":"/restapi/v1.0/account/~/extension/8475874957",
   "timestamp": "2013-06-14T12:00:00.000Z",
   "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
   "ownerId": "8475874957",
   "body":{
        "extensionId": "8475874957",
        "eventType": "Update",
        "hints": [ "ExtensionInfo", "CompanyNumbers"]
   }
}
```

