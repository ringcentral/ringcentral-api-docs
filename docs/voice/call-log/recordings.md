# Call Recordings

Developers who wish to either download/backup or create an interface for users to listen to call recordings may do so using the call recording metadata and call recording actions of the Call Log API resource.

If you do not already have a call recording in your account, you can do this manually by making a call and clicking the "Record" button in your RingCentral dialer.

!!! info "Enabling call recording: automatic vs on-demand"
    RingCentral supports both automatic call recording (ACR) and on-demand call recording. Information on how to initiate automatic and on-demand call recording is available in [KB Article 3171](http://success.ringcentral.com/articles/RC_Knowledge_Article/How-to-Initiate-On-Demand-Call-Recordings). Using WebRTC, it's also possible to programmatically initiate and stop recording per the [WebRTC documentation](https://github.com/ringcentral/ringcentral-web-phone).

## How to create a call recording for testing

For simplicity, we are going to step you through using the RingCentral unified app via the web to create an outbound call, and record that call.

1. Open the RingCentral [unified app](https://app.ringcentral.com/) via the web
2. Click the Settings Icon, and choose `Calling` from the menu
3. In the `Calling Mode` section, set the value to `Direct Dial`
4. Close the settings dialog window
5. Open the dial pad of your RingCentral phone, and dial your cellular device (or another outside number not associated with your RingCentral account)
6. Answer the call when it is received on your outside line
7. In the RingCentral phone, click the `Record` button. You will hear a notification that the call is being recorded
8. Talk to yourself for the next 35 seconds. This is important as RingCentral does not retain recordings shorter than 30 seconds.
9. Click the `Record` button a second time to stop recording, and then hangup the call to end it.

## Obtaining the call recording's metadata

If you have followed all the steps above, you should now have at least one (more if you have done this before) call with a recording listed in the [Admin Portal's call log view](https://service.ringcentral.com/settings/calls.html#simple). If you do not see this record in the Admin Portal, wait a few minutes and check again as occasionally there is a small latency.

Next, use the [Call Log API](index.md) to obtain a list of calls in your account. 

In the response from the Call Log API, any call with a recording will have a metadata `recording` property associated with it that looks similar to the following:

```json
"recording": {
    "uri": "https://platform.ringcentral.com/restapi/v1.0/account/ACCOUNT_ID/recording/RECORDING_ID",
    "id": "RECORDING_ID",
    "type": "OnDemand",
    "contentUri": "https://media.ringcentral.com:443/restapi/v1.0/account/ACCOUNT_ID/recording/RECORDING_ID/content"
}
```

Of course, you can use the `recordings[item].uri` property to obtain the Call Recording Metadata as well, but that is redundant.

## Obtaining the recordings content

You can now use the `contentUri` (notice that the subdomain is different in some cases as `media...` instead of `platform...`) to obtain the Call Recording Content.

!!! note "Rate Limits"
    Please note that media resources may have different rate limit plans. Retrieving call recordings using the API is subject to throttling so please analyze the `X-Rate-Limit-Group` header to understand the limit to the call recording you are trying to retrieve.

## Embedding call recordings in a web page

If you would like, you can use HTML5 supported browsers and the `<audio>` tag in a web page, and set the `src` property of the `<audio>` tag to the `recordings[item].contentUri` value (make sure to include the access_token query parameter with a valid access_token), and play back the recording in the browser.


