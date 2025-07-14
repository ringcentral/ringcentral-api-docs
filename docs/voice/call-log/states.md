# Understanding Call Log States

In call management and analytics, accurately determining the **definitive end of a call** is crucial. However, a "disconnection" event doesn't always signify the termination of the entire call session, especially in scenarios involving transfers. This chapter will guide you through interpreting various call status events to precisely identify when a call has truly concluded for a specific party or the overall session.

## Detecting the Definitive End of a Call

The challenge in identifying a definitive call end lies in differentiating between a simple hang-up and a call transfer, both of which can initially present as a "Disconnected" status. By examining additional event attributes, you can accurately disambiguate these scenarios.

### Direct call hang-up (definitive end)

When a call is directly terminated by one of the participants without being transferred, you will typically observe a single, unambiguous event.

  * **Key Event Attributes:**
      * `status.code`: `"Disconnected"`
      * `status.rcc`: `false` (This indicates it's not a RingCentral Call Controller related disconnection, which can sometimes occur for internal system reasons).
  * **Participant Context:**
      * The `to` object in the event payload will represent your current number and `extensionId`. This confirms the event pertains to the call session on your direct line.

**Example Event Snippet (illustrative):**

```json
{
  "status": {
    "code": "Disconnected",
    "rcc": false
  },
  "to": {
    "phoneNumber": "+16504223279",
    "name": "Test User",
    "extensionId": "62264425016",
    "deviceId": "802398804016"
  }
  // ... other event details
}
```

**Interpretation:** This combination of `status.code: "Disconnected"` without a `reason` and with the `to` number matching your extension definitively indicates that your segment of the call has ended and was not transferred.

### Call transferred (not a definitive end for the session)

When a call is transferred, your system will receive a series of events. The initial "Disconnected" event for your leg of the call will contain a specific `reason` that distinguishes it from a direct hang-up.

  * **Key Event Attributes (First Event of a Transfer Sequence):**
      * `status.code`: `"Disconnected"`
      * `status.reason`: `"BlindTransfer"` (or similar transfer-related reason, depending on the transfer type).
      * `status.rcc`: `false`
  * **Participant Context (First Event of a Transfer Sequence):**
      * The `to` object in this initial event will still represent *your* number and `extensionId`, indicating that this specific disconnection applies to your involvement in the call.
  * **Subsequent Events:** Following this initial event, you will receive additional events where the `to` number will reflect the number the call was transferred *to*. These subsequent events signify the continuation of the overall call session with the new party.

**Example Event Snippet (First Event in a Transfer - illustrative):**

```json
{
  "status": {
    "code": "Disconnected",
    "reason": "BlindTransfer",
    "rcc": false
  },
  "to": {
    "phoneNumber": "+16504223279",
    "name": "Test User",
    "extensionId": "62264425016",
    "deviceId": "802398804016"
  }
  // ... other event details, potentially a 'sessionId' that links to the new leg
}
```

**Interpretation:** The presence of a `status.reason` like `"BlindTransfer"` clearly indicates that while your direct connection to the call has ended, the call session itself is continuing with a new recipient. You must anticipate further events related to the transferred leg.

## Summary and detection logic

To reliably determine if a call has definitively ended for your extension or if it has been transferred, focus on the `status` object within the event payload:

  * **Check for `status.reason`:** The presence of a `status.reason` (e.g., `"BlindTransfer"`) is the primary indicator of a transfer rather than a final disconnection for the entire call session.
  * **Verify `to` Number:** Always cross-reference the `to` number in the event with your current extension's number. This confirms whether the event pertains to your specific call leg.

By applying this logic, you can accurately distinguish between a true call termination and a call transfer, enabling more precise tracking and management of call sessions in your application. Future sections of this documentation will delve into other call log statuses and their implications.
