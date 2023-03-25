# Detecting User Presence

Understanding a user's availability is an essential component when considering who to forward calls to, who can attend an ad-hoc meeting, or even where people are (depending upon their status message). As an all-in-one communication platform, the Presence API gives apps visibility into a user's availability across the entire platform: are they on the phone? are they in a meeting? are they available, but their status is set to "Do Not Disturb" etc.

Apps can determine one's availability by looking at an aggregated status the platform computes automatically, or can look at each presence state independently and make other informed decisions.

## Presence Response

Below is a sample response from the Presence API to illustrate the visibility it can provide. The aggregated/computed status is highlighted below.

```json hl_lines="10"
{
  "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/248xxx004/extension/248xxx004/presence",
  "extension": {
    "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/248xxx004/extension/248xxx004",
    "id": 248111004,
    "extensionNumber": "101"
  },
  "presenceStatus": "Available",
  "telephonyStatus": "NoCall",
  "userStatus": "Available",
  "dndStatus": "TakeAllCalls",
  "allowSeeMyPresence": true,
  "ringOnMonitoredCall": false,
  "pickUpCallsOnHold": false
}
```

## Sample Code to Get Started with Presence

=== "JavaScript"

    ```js
    {!> code-samples/account/presence.js !} 
    ```

=== "Python"

    ```python
    {!> code-samples/account/presence.py !} 
    ```

=== "PHP"
	
    ```php
    {!> code-samples/account/presence.php !} 
    ```

=== "C#"

    ```c#
    {!> code-samples/account/presence.cs !} 
    ```

=== "Java"

    ```java
    {!> code-samples/account/presence.java !} 
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/account/presence.rb !} 
    ```

## Required Permissions

Apps requesting to read presence information require the `ReadPresence` permission.

## Presence APIs

The following APIs are often used in reading and updating user presence information:

* [Get User Status](https://developers.ringcentral.com/api-reference#Presence-getPresenceStatus)
* [Update User Status](https://developers.ringcentral.com/api-reference#Presence-updatePresenceStatus)
* [Get Users Presence Statuses](https://developers.ringcentral.com/api-reference#Presence-accountPresence)
