<?php
/*
  Subscribe for the user instant message event notification
*/
function subscribe_for_instant_messages_notification(){
  global $rcsdk;
  $websocket = $rcsdk->initWebSocket();
  $websocket->connect();
  $subscription = $rcsdk->createSubscription();
  $subscription->addEvents(array('/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'));

  /*
    Receive inbound messages from WebSocket subscription event notification
  */
  $subscription->addListener(Subscription::EVENT_NOTIFICATION, function (NotificationEvent $event) {
      // send_reply($event->payload()['body']);
      $attachments = $event->payload()['body']['attachments'];
      download_mms_attachments($attachments);

  });
  $subscription->register();
}

/*
  Download an MMS message attachments
*/
function download_mms_attachments($attachments){
  global $platform;
  refresh_token();
  foreach($attachments as $attachment){
    $fileName = $attachment['id'];
    if ($attachment['type'] == "MmsAttachment"){
      $fileNameExt = preg_split("/[\/]/", $attachment['contentType'], -1);
      $fileName .= "." . $fileNameExt[1];
      try {
        $res = $platform->get($attachment['uri']);
        file_put_contents($fileName, $res->raw());
      }catch (ApiException $e) {
        $message = $e->getMessage();
        print 'Expected HTTP Error: ' . $message . PHP_EOL;
      }
    }
  }
}
?>
