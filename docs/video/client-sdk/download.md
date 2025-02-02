# Download the RingCentral Video Client SDK

{! mdx_includes/video-beta-notice.md !}

## Prerequisites

In order to use the Video Client SDK during the private beta, please make sure you have done all of the following first:

1. Create a RingCentral account with access to video in production. 
     * If you are an existing RingCentral customer of one of our paid plans, then you can use your main account. 
     * If do not yet have a RingCentral account, or if you currently use our standard free developer account, you will need to create a [free RingCentral Video Pro account](https://www.ringcentral.com/office/plansandpricing.html#video).
2. [Register your application](../../getting-started/register-app.md) and make note of your app's Client ID. Be sure to add the Video Internal app scope so that it can be approved for your app. 

## Download

### Web SDK (Javascript)

The Video Client SDK for the web can be [found on npm](https://www.npmjs.com/package/@ringcentral/video-sdk). One can install the SDK via a command line as well. 

```shell
% npm install @ringcentral/video-sdk
```

#### React UI components

React UI components are also [available via npm](https://www.npmjs.com/package/@ringcentral/video-sdk-react), and can be installed via the command line as well.

```shell
% npm install @ringcentral/video-sdk-react
```

#### React Native

React Native components are also [available via npm](https://www.npmjs.com/package/@ringcentral/rcv-react-native-sdk), and can be installed via the command line as well.

```shell
% npm install @ringcentral/rcv-react-native-sdk
```

### Native iOS

The Video Client SDK for native iOS applications is available via CocoaPods. One can link their iOS project to the Client SDK bhy adding the following to their `Podfile`:

```
pod 'Ringcentral-Video-SDK', '~> 0.9.0'
```

Then from your project directory run the following command:

```shell
% pod install
```

### Native Android

The Video Client SDK for native Android applications is available via Maven. One can automatically download and install the SDK by making the following changes to your `build.gradle` project file. First, add the following to your maven `respositories`:

```js
allprojects {
    repositories {
        ...
        maven { url 'https://s01.oss.sonatype.org/content/repositories/releases' }
    }
}
```

Then, add the following `dependencies` to your gradle file:

```js
implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.5.20"
implementation 'com.pubnub:pubnub-gson:4.29.2'
implementation 'com.ringcentral.video:ringcentral-video-sdk:version'
```
