#### Check prerequisites

Check to make sure you have all of the following prerequisites:

- Android Studio 4.2.+
- Physical Android device (Phone and Tablet) with Android OS 7.0+

#### Clone the Video Client SDK sample application repository

```shell
% git clone https://github.com/ringcentral/ringcentral-videosdk-android-samples.git
```

#### Edit `strings.xml`

Navigate to the strings folder:

```shell
% cd ringcentral-videosdk-android-samples/blob/main/samples/QuickStart/app/src/main/res/values
```

Then edit `strings.xml`, and edit the following string values using the values you obtained above:

```xml
<string name="clientId"></string>
<string name="clientSecret"></string>
<string name="personalJwt"></string>
```

#### Edit `build.gradle`

Add the following to your project's `build.gradle` file:

```
allprojects {
    repositories {
        ...
        maven { url 'https://s01.oss.sonatype.org/content/repositories/releases' }
    }
    dependencies {
        ...
        implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.5.20"
        implementation 'com.pubnub:pubnub-gson:4.29.2'
        implementation 'com.ringcentral.video:ringcentral-video-sdk:version'
    }
    ...
}
```

#### Build and run the sample application

1. In Android Studio open the `samples/QuickStart` folder found in the SDK.
1. Let gradle download and sync the dependencies for the project.
1. From Android Studio's menu bar, click on "Build > Clean Project." Confirm there are no errors and then select your Android Device or AVD and click "Run app." 
1. Give time for the sample application to launch on your device, then tap on "Start."
1. Invite a friend or colleague to join the meeting you created. 

<img src="../android-app-screenshot.png" style="max-width: 200px">





