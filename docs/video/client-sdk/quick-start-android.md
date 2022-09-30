### Check prerequisites

Check to make sure you have all of the following prerequisites:

- Android Studio 4.2.+
- Physical Android device (Phone and Tablet) with Android OS 7.0+

### Edit the sample application config file

1. Unpack the SDK you downloaded in the steps above. 
1. Navigate to `RingCentral_Video_Android_Client_SDK_<version>/samples/RcvAndroidSample1v1meeting/app/src/main/res/values/`
1. Edit `strings.xml`
1. Look for the following `<string>` elements and enter the appropriate values for each of the following:
    * `<string name="clientId"></string>`
	* `<string name="clientSecret"></string>`
	* `<string name="jwt"></string>`

### Build and run the sample application

1. In Android Studio open the `samples/RcvAndroidSample1v1meeting` folder found in the SDK.
1. Let gradle download and sync the dependencies for the project.
1. Copy the AAR package `libs/rcv-client-sdk-<version>.aar` to the `libs` directory found in the sample app in Android Studio. 
1. From Android Studio's menu bar, click on "Build > Clean Project." Confirm there are no errors and then select your Android Device or AVD and click "Run app." 
1. Give time for the sample application to launch on your device, then tap on "Start."
1. Invite a friend or colleague to join the meeting you created. 

<img src="../android-app-screenshot.png" style="max-width: 200px">





