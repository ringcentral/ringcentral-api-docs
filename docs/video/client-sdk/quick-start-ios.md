### Check prerequisites

Check to make sure you have all of the following prerequisites:

1. [Xcode 13](https://developer.apple.com/xcode/)
1. iOS device or simulator running iOS 10.0+
1. Confirm that your iPhone is connected to your development machine if you are building on a physical device

!!! warning "iOS Simulator limitations"
    The iOS simulator may have limited functionality with respect to video and audio. Additionally, the project may not build on Macs using the Apple M1 CPU.

### Edit the sample application config file

1. Unpack the SDK you downloaded in the steps above. 
1. Navigate to `RingCentral_Video_iOS_Client_SDK_<version>/samples/RcvSwiftSample1v1meeting/RcvSwiftSample1v1meeting/`
1. Edit `AppInfo.swift`
1. Enter in values for the following variables:
    * `ClientID`
	* `ClientSecret`
	* `JWTCredential`

### Build and run the sample application

The Video Client SDK you downloaded above, comes with a number of sample applications. Follow these steps to build the sample app.

1. Open Xcode
1. Open the sample app by clicking "File" > "Open." Then, open the `samples/RcvSwiftSample1v1meeting` folder
1. Ensure your Apple Developer "Team" is populated under "Signing & Capabilities"
1. Select your target device (if you don't see your device, make sure it is physically connected to your development machine)
1. Click the "Build" button (the right triangle)
1. After the app has successfully started, join a meeting. To do that, enter the web pin of the meeting bridge you created in a previous step.
1. Sign in and participate in the meeting.

### Troubleshooting

!!! tip "Dealing with an iOS provisioning error"
    If you receive an error related to iOS provisioning, please make sure you are using an active and valid Apple developer account setup. In addition, make sure the "Bundle Identifier" string you are using is unique for your app. 
