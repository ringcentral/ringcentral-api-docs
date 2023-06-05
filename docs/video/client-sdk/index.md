# Introduction to the RingCentral Video Client SDKs

{! docs/video/beta-notice.md !}

??? info "RingCentral Video Client SDK will be a paid product"
    During the beta and/or during development of your application, the RingCentral Client SDK is free to use. However, once the product is GA, the RCV Client SDK will be a paid product. Developers will be charged on a participant minute basis. In addition, the RCV Client SDK makes use of RingCentral's Artificial Intelligence APIs which may have costs of their own. If you have any questions, please reach out to us via [rcv-partners@ringcentral.com](mailto:rcv-partners@ringcentral.com). 
	
<div class="jumbotron pt-1">
  <h3 class="h3 display-5">Build highly customized meeting and video applications!</h3>
  <p class="lead">The RingCentral Video Client SDKs are designed to help developers in creating applications that utilize RingCentral Video in highly customized and deeply integrated video and other real-time commuication experiences. The following Video Client SDKs are available in the following languages:</p>
  <ul>
  <li>Javascript</li>
  <li>Native iOS</li>
  <li>Native Android</li>
  </ul>
  <a href="./download/" class="btn btn-primary qs-link">Download the Video Client SDK</a>
</div>

## Currently supported features

The RingCentral Video Client SDK is currently in beta. The latest version supports the following features:

<div class="table">
  <table class="table table-striped text-successtable-border border-light">
    <thead class="border-light">
      <tr>
        <th scope="col">Feature</th>
        <th scope="col"><strong>Mobile availability</strong></th>
        <th scope="col"><strong>Web availability</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Start and/or join a meeting</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Toggle a user's video/camera on and off</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Mute and unmute a user's microphone</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Select or modify the video device currently being used</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Obtain a participant or participant list</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Receive and/or display active video and audio streams</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Toggle cloud recording on and off</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Meeting started, joined and leave callbacks</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Participant joined and left callbacks</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Audio mute/unmute/enabled/disabled callbacks</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Video enabled/disabled callbacks</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">HIPPA compliance</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">GDPR compliance</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Noise cancellation</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">PSTN dial-in support</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Toggle end-to-end encryption on/off</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Access to a live transcription of the meeting</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Closed captioning</th>
        <td class="text-success ps-5">✓</td>
        <td class="text-success ps-5">✓</td>
      </tr>
      <tr>
        <th scope="row">Access to the screen sharing annotations data feed</th>
        <td class="text-success ps-5">✓</td>
        <td>Coming soon to future beta build</td>
      </tr>
    </tbody>
  </table>
</div>

## Known issues and limitations

* RingCentral Video does not currently support mobile web browsers, including mobile Safari and Chrome. Therefore the Video Client Javascript SDK is not currently supported on mobile devices. However, apps built using the iOS and Android SDKs are supported. If you require mobile web support, please [cast your vote in our Ideas Portal](https://ideas.ringcentral.com/ideas/CUSTCOM-I-402).

