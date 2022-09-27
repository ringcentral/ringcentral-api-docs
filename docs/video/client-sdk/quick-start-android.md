### Check prerequisites

- Android Studio 4.2.+
- Physical Android device (Phone and Tablet) with Android OS 7.0+
- [RingCentral Video Account](https://developers.ringcentral.com)

### Install the RingCentral Android SDK in your application

- Navigate to and open the directory where the SDK is located
- The RingCentral Android SDK needs to be integrated in an existing application of yours. For our demo purpose, we will use the existing, so open Android Studio and then open `RCVSample` located under the "samples" folder. Open Once open, let "gradle" sync the dependencies for the project.
- Copy the AAR package "rcv-sdk-22.2.20.2-beta.aar" located in the "libs" directory to the "libs" directory of the sample app in Android Studio. 

### Get the access token

- Follow this [guide](app-create-auth.md) to create or use your existing application and get the "access_token".

### Edit and run the Android App to start/join the meeting session

1. Switch to Android Studio and paste the `access_token` inside of `app/src/main/res/values/strings.xml` -> `<string name="ringcentral_video_access_token"></string>` and paste the accessToken you got in the previous step.

2. from the menu bar, click on `Build -> Clean Project` and make sure there are no errors. Select your Android Device or AVD and click “Run app”. 

3. The sample application should launch in your device and tap on `Start Meeting` to start the meeting as a host.

![Android](../images/android-app-screenshot.png)

4. To join the meeting, you will need `Meeting ID` and optionally `Meeting Usename`, `Meeting Password` that you can obtain from the host and then tap tap on `Join Meeting` button to enter the meeting as attendee.





