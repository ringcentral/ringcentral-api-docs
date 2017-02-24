## Call Recordings

Developers who wish to either download/backup or create an interface for users to listen to call recordings may do so using the Call Recording Metadata and Call Recording actions of the Call Log API resource.

If you do not already have a call recording created in your Sandbox account, you can either do this manually.

To manually create a call recording, you can use: your RingCentral Soft Phone (either directly, or by using RingOut: tutorial: TODO), RingCentral WebRTC (tutorial: TODO).

For simplicity, we are just going to step you through using the RingCentral Soft Phone (in Direct Dial Mode) to create an outbound call, and record that call.

1. Open the RingCentral Soft Phone on your Desktop
2. Set your RingCentral Soft Phone in Sandbox Mode by clicking Cntrl+F2 (for Mac Fn+Command+F2). Select 'Sandbox' in the pop-up menu and sign in with your [sandbox credentials](https://developers.ringcentral.com/my-account.html#/application-credentials/).
3. Click the Settings Icon, and choose `Calling` from the menu
4. In the `Calling Mode` section, set the value to `Direct Dial`
5. Close the settings dialog window
6. Open the dial pad of your RingCentral Soft Phone, and dial your cellular device (or another outside number not associated with your RingCentral account)
7. Answer the call when it is received on your outside line
8. In the RingCentral Soft Phone, click the `Record` button. You will hear a notification that the call is being recorded
9. Talk to yourself for the next 35 seconds (this is always the worst part of doing this process...hearing yourself on the phone)
10. Click the `Record` button a second time to stop recording, and then hangup the call to end it.

### How to Obtain Call Recording Metadata and Content

If you have followed all the steps above, you should now have at least one (more if you have done this before) call with a recording listed in the [Sandbox Online Account Portal - Call Log View](https://service.devtest.ringcentral.com/settings/calls.html#simple). If you do not see this record in the Sandbox Online Account Portal, wait a few minutes and check again...occasionally there is some latency.

1. Obtain a new RingCentral access_token using the credentials for the user you logged into the RingCentral Soft Phone with to create the recording.

```
POST /restapi/oauth/token HTTP/1.1
Host: platform.devtest.ringcentral.com
Authorization: Basic YOUR_BASE_64_ENCODED_API_KEYS_SEPARATED_BY_A_COLON
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Cache-Control: no-cache

grant_type=password&username=RC_USERNAME_WITHOUT_PLUS_SYMBOL&password=YOUR_RC_PASSWORD_URL_ENCODED&extension=YOUR_RC_EXTENSION
```

2. Fetch the list of Call Logs for the currently authenticated user

```
GET /restapi/v1.0/account/~/extension/~/call-log HTTP/1.1
Host: platform.devtest.ringcentral.com
Content-Type: application/json
Accept: application/json
Authorization: Bearer YOUR_VALID_ACCESS_TOKEN
Cache-Control: no-cache
```

This should return a list of call logs.

3. The Call Recording Metadata is actually contained within the `recordings` property of the response body JSON. It should have a format similar to the following:

```
"recording": {
    "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/ACCOUNT_ID/recording/RECORDING_ID",
    "id": "RECORDING_ID",
    "type": "OnDemand",
    "contentUri": "https://media.devtest.ringcentral.com:443/restapi/v1.0/account/ACCOUNT_ID/recording/RECORDING_ID/content"
}
```

Of course, you can use the `recordings[item].uri` property to obtain the Call Recording Metadata as well, but that is redundant.

4. You can now use the `contentUri` (notice that the subdomain is different in some cases as `media...` instead of `platform...`) to obtain the Call Recording Content.

5. If you would like, you can use HTML5 supported browsers and the `<audio>` tag in a web page, and set the `src` property of the `<audio>` tag to the `recordings[item].contentUri` value (make sure to include the access_token query parameter with a valid access_token), and play back the recording in the browser.
