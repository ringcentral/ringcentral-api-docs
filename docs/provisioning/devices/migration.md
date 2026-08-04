# Migrate Click-to-Dial from RingCentral Softphone to the RingCentral app

If your integration implements Click-to-Dial by sending outbound calls to RingCentral Softphone, the feature will no longer work after RingCentral Softphone is deprecated. Update the integration to identify a RingCentral web phone app instance and use its valid device ID when initiating calls.

The migration requires changing both device discovery:

- Stop searching for devices of type SoftPhone.
- Retrieve the user’s available web phone instances.
- Select the intended instance by its unique name.
- Verify that the instance is available (online).
- Use its valid device ID when initiating the outbound call.

## Example scenario

For this example, assume that:

- The user previously used RingCentral Softphone for Click-to-Dial.
- The user has installed and signed in to the RingCentral app.
- The RingCentral app instance has been assigned the unique name "Laptop-RC-App".

If the user is signed in to the RingCentral app on multiple computers, each signed-in session represents a separate web phone instance. Assigning each instance a unique name enables the integration to route calls to the correct computer.

### Deprecated implementation

The previous implementation searches for a SoftPhone device, save the device Id and uses it to initiate the call:

```JavaScript
// Deprecated: RingCentral Softphone is no longer supported.

async function readUserSoftPhoneDevices(){
  try {
    let queryParams = { 'type': [ "SoftPhone"] }
    let resp = await platform.post('/restapi/v1.0/account/~/extension/~/device', queryParams)
    let jsonObj = await resp.json()
    // Assume that the user has provisioned only 1 soft phone
    return jsonObj.records[0].id
  }catch(e){
    console.log(e.message)
  }
}

async function initiateOutboundCall(dialNumber){
  try {
    let softphone = await readUserSoftPhoneDevices()

    if (softphone.status == "Online"){
      let bodyParams = {
        'from': { 'deviceId': softphone.id },
        'to': { 'phoneNumber': dialedNumber }
      }
      // make an outbound call
      await platform.post('/restapi/v1.0/account/~/telephony/call-out', bodyParams)
    }else{
      console.log('User soft phone is offline.');
    }
  }catch(e){
    console.log(e.message)
  }
}
```

This approach must be replaced because the SoftPhone device type is deprecated and retained only for backward compatibility.

### New implementation

The updated implementation retrieves the user’s web phone instances, selects the instance named "Laptop-RC-App", validates its status, and uses its valid device ID:

```JavaScript
async function detectWebphoneDeviceAndStatus(){
  try {    
    let resp = await platform.post('/restapi/v1.0/account/~/extension/~/webapp-devices')
    let jsonObj = await resp.json()
    for (let device of jsonObj.records){
      if (device.serial == "Laptop_RC_App" && device.status == "Online")
        return device.id
    }
    return null
  }catch(e){
    console.log(e.message)
  }
}

async function initiateOutboundCall(dialNumber){
  try {
    // Detect Webphone device Id and its status
    let deviceId = await detectWebphoneDeviceAndStatus()
    if (deviceId){
      let bodyParams= {
        'from': { 'deviceId': deviceId },
        'to': { 'phoneNumber': dialedNumber }
      }
      // make an outbound call
      await platform.post('/restapi/v1.0/account/~/telephony/call-out', bodyParams)
    }else{
      console.log('Web phone instance "Laptop-RC-App" was not found.');
    }
  }catch(e){
    console.log(e.message)
  }
}
```

The function and property names in these examples are illustrative. Map them to the corresponding fields and endpoints in your integration.

## Migration steps

1. Ensure that the user has installed and signed in to the RingCentral app.
2. Assign each RingCentral app instance a unique, recognizable name, such as Laptop-RC-App.
3. Remove logic that searches for devices of type SoftPhone.
4. Retrieve the user’s web phone instances using the appropriate API.
5. Locate the intended instance by its unique name.
6. Confirm that the selected instance is currently available.
7. Pass its valid device ID to the outbound-call API.
8. Add error handling for missing, offline, or duplicate instances.
9. Test Click-to-Dial when the user is signed in on one and multiple computers.

!!! important "Do not use the placeholder WebRTC device ID returned by the List Extension Devices API. Retrieve the valid device ID and current status from the API that lists the user’s active web phone instances."
