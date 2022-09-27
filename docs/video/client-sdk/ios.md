### Check prerequisites

Ensure you have the pre-requisites:

1. [Xcode 13](https://developer.apple.com/xcode/)
2. iOS device or simulator running iOS 10.0+

!!! warning "iOS Simulator limitations"
    The iOS simulator may have limited functionality with respect to evideo and audio. Additionally, the project may not build on Macs using the Apple M1 CPU due to a dependency.

### Install the RingCentral iOS SDK in your application

- Download the [iOS SDK]() and unzip it to a directory where you will do development.

- The RingCentral iOS SDK needs to be integrated in an existing application of yours. For our demo purpose, we will use the Sample App called "RCVSample" located under the "samples" directory.

### Get the access token

- Follow this [guide](app-create-auth.md) to create or use your existing application and get the "access_token", we will need that in next step.

### Build the example app

Run the following steps to build the example app.

1. Open Xcode
1. Open a project by clicking `File` > `Open`, select the `samples/RCVSample` folder, and click `Open`
1. Ensure your Apple Developer "Team" is pupated under "Signing & Capabilities"
1. Edit the file `samples/RCVSample/RCVSample/AppInfo.swift` and enter your `ClientID`, `ClientSecret` and `AccessToken`.
1. Ensure your iPhone is connected if you are building on a physical device
1. Select your target device.
1. Click the "Build" (aka right triangle) button

### Run the example app

Running the RingCentral Video SDK requires you sign in as a RC Video User.

1. Create a meeting and note the meeting Id. This can be done using the REST API or the RC App. Using the REST API, use the [Create Meeting Bridge API](../api/create-meeting) and note the `shortId` in the response.
2. Enter the `shortId` in the Meeting Field. If you did not enter an access token in the `AppDelegate.swift` file, enter a token or the user password.
3. Sign in and participate in the meeting.

### Troubleshooting

If you receive an error related to iOS provisioning, please make sure you are using an active and valid Apple developer account setup. In addition, make sure the "Bundle Identifier" string you are using is unique for your app. 
