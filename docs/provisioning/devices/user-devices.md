# User Phone Devices

A RingCentral user extension can be assigned one or more phone devices for making and receiving voice calls.

In some scenarios, multiple devices may be assigned to a single extension. For example, a user might have one desk phone at their primary office and another at their home office. The user may also install and sign in to the RingCentral app, using it as an additional device for making and receiving calls.

## List extension devices

To retrieve the devices assigned to an extension, call the [List Extension Devices](https://developers.ringcentral.com/api-reference/Devices/listExtensionDevices) API, provide the extension ID in the endpoint path, and set any additional filter parameters as needed.

The device information returned by the API can support various use cases. For example, you can retrieve a desk phone’s device ID, check if its status is **Online** and use it with the Call Control APIs to programmatically initiate an outbound call through the [/callout](https://developers.ringcentral.com/api-reference/Call-Control/createCallOutCallSession) endpoint or answer an incoming call on that specific device through the [/answer](https://developers.ringcentral.com/api-reference/Call-Control/answerCallParty) endpoint.

!!! important
    - The **SoftPhone** device type is deprecated and retained only for backward compatibility!
    - Specify the **WebRTC** device type to retrieve WebRTC device information. This device type is present only when the user extension has been provisioned with the RingCentral app through the account administration portal. It indicates that the user has a digital line and might not require a physical phone.
    - In the returned **WebRTC** device information, the device ID is a placeholder and the status is always Offline. To retrieve the valid WebRTC device ID and current status, see the [next section](#list_user_web_phone_devices)!



## List user web phone (a.k.a WebRTC) devices

Unlike a hard phone, which is provisioned and managed as a persistent device, or the RingCentral Softphone (now deprecated), which was provisioned as a persistent software client, a WebRTC phone is a software-based client that is dynamically instantiated when a user authenticates and establishes a WebRTC session.

A user can sign in to multiple WebRTC clients simultaneously, such as the RingCentral desktop application, the RingCentral web application, or a custom application built with the RingCentral Web Phone SDK. Each client instance is represented by its own device instance and device ID, which are associated with a specific client session. These device instances are temporary in nature and may be invalidated when the session ends, the user signs out, or the client becomes inactive for an extended period.

Because WebRTC client sessions are dynamically created and destroyed, their associated device IDs are not intended to be stored permanently by the platform and cannot be retrieved using the [List Extension Devices API](#list_extension_hard_phones).

To address this use case, RingCentral provides a dedicated API that allows developers to discover WebRTC device instances and their associated device IDs. Developers can then use these device IDs with supported Call Control APIs to control voice calls from their applications or integrations.

To retrieve the WebRTC device IDs being created for a user extension, authenticate the user and call the [List User Web Phone Devices](https://developers.ringcentral.com/api-reference/Devices/listWebAppDevices) API:

```http
GET /restapi/v1.0/account/~/extension/~/webapp-devices
```

The API returns a maximum of 10 device objects. Each device object contains information similar to the following:

```json
{
  "id": "TheDeviceId",
  "type": "WebPhone",
  "name": "WebPhone",
  "serial": "Name_of_a_Web_App_Instance",
  "status": "Online",
  "expiresIn": 1782489457
}
```

A Web phone device is considered **Online** when the user is signed in to the corresponding Web app. When the user signs out of the Web app, the device status changes to **Offline**.

!!! warning "Due to server cache algorithm, the device status may not immediately change to **Offline** after the user signs out!""

By default, the serial value is a randomly generated identifier, such as `41dbccd2-74a8-4a7d-8315-794971859f6c`. To make a RingCentral app instance easier to identify, the user can sign in to the RingCentral application and assign a meaningful device name through the phone settings.

<img class="img-fluid" src="../../../img/webphone-settings.png">
<br><br>
Applications and integrations can display the app instance name(s) to help users identify the specific Web phone instance that should be used with the integration.

If a device's status is **Online**, its device ID can be used with Call Control APIs that require a device ID to identify the Web phone on which the call is connected.

## Use case scenario

### Click-to-Dial

Click-to-dial allows an integration application to programmatically place outbound calls on behalf of an authenticated RingCentral user. When the user clicks a phone number within the integration, the application uses RingCentral Call Control APIs to instruct one of the user's registered phone devices to initiate the call. The user can then continue the conversation using their selected phone device while remaining within the integration workflow.

Assume that a user has one laptop and two desktop computers—one located at home and the other in the office. The user has installed the RingCentral application on both desktop computers, signed in to each instance, and assigned the instance names "Home-RC-Phone" and "Office-RC-Phone", respectively. The user has also signed in to the RingCentral web application from the laptop and assigned that WebRTC client the instance name "Portable-RC-Phone".

To implement a click-to-dial feature for this user, the integration application must first retrieve the user's available phone devices. In this example, the integration is configured to allow outbound calls only through RingCentral Web phones. Therefore, the application only needs to call the GET `/restapi/v1.0/account/~/extension/~/webapp-devices` API to retrieve the user's Web phone instances.

The returned device list includes the device ID, instance name (serial), and current status (**Online** or **Offline**) for each WebRTC client. The integration can present this information to the user, allowing them to choose the device from which outbound calls should be placed. When the user initiates a click-to-dial action, the selected device ID is passed to the appropriate call control API to establish the call on the chosen WebRTC client.

#### Example code

```javascript
async function listUserWebappDevices() {
  try{
    let endpoint = `/restapi/v1.0/account/~/extension/~/webapp-devices`
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  }catch(e){
    console.log(e.message)
  }
}
```

#### Sample response

```json
"records": [
    {
      "id": "602494570016",
      "type": "WebPhone",
      "name": "WebPhone",
      "serial": "Home-RC-phone",
      "status": "Online",
      "expiresIn": 1782417981
    },
    {
      "id": "602533550016",
      "type": "WebPhone",
      "name": "WebPhone",
      "serial": "Office-RC-phone",
      "status": "Online",
      "expiresIn": 1782417955
    },
    {
      "id": "602533570016",
      "type": "WebPhone",
      "name": "WebPhone",
      "serial": "c7576ada-3642-4fbd-8c61-1fc69c65713b",
      "status": "Offline"
    },
    {
      "id": "602552194016",
      "type": "WebPhone",
      "name": "WebPhone",
      "serial": "Portable-RC-Phone",
      "status": "Online",
      "expiresIn": 1782417342
    },
    {...}
  ]
```
<br>
After the user selects a device, call the following API and specify the selected device ID to initiate an outbound call from the chosen WebRTC client.

```javascript
async function makeCallout(deviceId){
  try {
    var params = {
      from: { deviceId: deviceId },
      to: { phoneNumber: "DialedNumber" }
    }
    resp = await platform.post('/restapi/v1.0/account/~/telephony/call-out', params)
    jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj))
  }catch(e){
    console.log(e.message)
  }
}
```
<br>
To provide a better user experience, the integration application can allow the user to select a preferred WebRTC app instance once and save the corresponding app instance name (serial) as a user preference. The application can then use the saved app instance name, detect the app instance dynamic device ID and its status for all subsequent click-to-dial actions, eliminating the need for the user to select a device each time they place a call.

For example, when the user is working in the office, they can select "Office-RC-Phone" as their preferred device. All outbound calls initiated from the integration will then be placed through the RingCentral application running on the office desktop computer. Likewise, if the user is traveling and selects "Portable-RC-Phone", subsequent click-to-dial actions will automatically use the RingCentral web application running on the laptop.

The integration should periodically verify that the preferred device is still available and has an **Online** status. If the preferred device is offline or no longer exists, the application should prompt the user to select another available WebRTC device.
