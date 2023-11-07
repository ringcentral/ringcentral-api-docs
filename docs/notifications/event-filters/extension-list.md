# Extension List Event

*Since 1.0.15 (Release 7.0)*

Event filter `/restapi/v1.0/account/{accountId}/extension` enables notifications in case of extension list changes:

* addition/removal of extensions to/from account
* contact info (first/last name; company name; email; business phone; business address)
* status
* regional settings (timezone, home country, language, greeting language, formatting locale, time format)
* permissions (administrator permission, international calling)
* phone numbers (assign/unassign)
* departments (added to/removed from)
* service features (for the current extension only) - *SMS/SMSReceiving*, *Pager/PagerReceiving*, *Fax/FaxReceiving*, *Voicemail*, *EncryptionAtRest*, *BlockedMessageForwarding*, *DnD*, *RingOut*, *InternationalCalling*, *Presence*, *Conferencing*, *VoIPCalling*, *CallPark*, *OnDemandCallRecording*

The updated extension data is accessible by calling the methods [Get Extension List](https://developers.ringcentral.com/api-reference#Account-Provisioning-listExtensions) and/or [Get Extension Info](https://developers.ringcentral.com/api-reference#User-Settings-loadExtensionInfo).

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |
| `eventType` | 'Create' or 'Update' or 'Delete' | Type of change |
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


## Example

```json
{!> code-samples/events/extension-list.json !}
```

