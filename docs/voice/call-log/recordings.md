# Call Recordings

Developers who wish to either download/backup or create an interface for users to listen to call recordings may do so using the Call Recording Metadata and Call Recording actions of the Call Log API resource.

If you do not already have a call recording created in your Sandbox account, you can do this manually.

!!! info "Enabling Call Recording: Automatic vs On-Demand"
    RingCentral supports both Automatic Call Recording (ACR) and On-Demand Call Recording. Information on how to initiate Automatic and On-Demand Call Recording is available in [KB Article 3171](http://success.ringcentral.com/articles/RC_Knowledge_Article/How-to-Initiate-On-Demand-Call-Recordings). Using WebRTC, it's also possible to programmatically initiate and stop recording per the [WebRTC documentation](https://github.com/ringcentral/ringcentral-web-phone).

## Creating a Call Recording

For simplicity, we are going to step you through using the RingCentral Soft Phone (in Direct Dial Mode) to create an outbound call, and record that call.

1. Open the RingCentral Soft Phone on your Desktop
2. Set your RingCentral Soft Phone in Sandbox Mode by clicking Cntrl+F2 (for Mac Fn+Command+F2). Select 'Sandbox' in the pop-up menu and sign in with your sandbox credentials. For details please refer to [our guide on using soft phones in sandbox](../../../../basics/your-rc-phone).
3. Click the Settings Icon, and choose `Calling` from the menu
4. In the `Calling Mode` section, set the value to `Direct Dial`
5. Close the settings dialog window
6. Open the dial pad of your RingCentral Soft Phone, and dial your cellular device (or another outside number not associated with your RingCentral account)
7. Answer the call when it is received on your outside line
8. In the RingCentral Soft Phone, click the `Record` button. You will hear a notification that the call is being recorded
9. Talk to yourself for the next 35 seconds. This is important as RingCentral does not retain recordings shorter than 30 seconds.
10. Click the `Record` button a second time to stop recording, and then hangup the call to end it.

## Obtaining Call Recording Metadata

If you have followed all the steps above, you should now have at least one (more if you have done this before) call with a recording listed in the [Sandbox Online Account Portal - Call Log View](https://service.devtest.ringcentral.com/settings/calls.html#simple). If you do not see this record in the Sandbox Online Account Portal, wait a few minutes and check again...occasionally there is some latency.

Next, use the [Call Log API](../reading-call-log) to obtain a list of calls in your account. 

In the response from the Call Log API, any call with a recording will have a metadata `recording` property associated with it that looks similar to the following:

```json
"recording": {
    "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/ACCOUNT_ID/recording/RECORDING_ID",
    "id": "RECORDING_ID",
    "type": "OnDemand",
    "contentUri": "https://media.devtest.ringcentral.com:443/restapi/v1.0/account/ACCOUNT_ID/recording/RECORDING_ID/content"
}
```

Of course, you can use the `recordings[item].uri` property to obtain the Call Recording Metadata as well, but that is redundant.

## Obtaining Recording Content

You can now use the `contentUri` (notice that the subdomain is different in some cases as `media...` instead of `platform...`) to obtain the Call Recording Content.

## Embedding Call Recordings in a Web Page

If you would like, you can use HTML5 supported browsers and the `<audio>` tag in a web page, and set the `src` property of the `<audio>` tag to the `recordings[item].contentUri` value (make sure to include the access_token query parameter with a valid access_token), and play back the recording in the browser.


