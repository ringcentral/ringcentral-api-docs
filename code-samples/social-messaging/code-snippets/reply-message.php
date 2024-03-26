<?php
reply_message("A-Valid-Message-Id");

/*
  Reply to a message
*/
function reply_message($messageId){
  global $platform;
  try {
    $bodyParams = array (
      'inReplyToContentId' => $messageId,
      'body' => "Thank you for your message! PHP",
      'autoSubmitted' => True,
      'public' => False
    );

    $endpoint = "/cx/social-messaging/v1/contents";

    $resp = $platform->post($endpoint, $bodyParams);
    $jsonObj = $resp->json();
    print_r (json_encode($jsonObj, JSON_PRETTY_PRINT) . PHP_EOL);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to reply to this messages. Error message:" . $e->getMessage() . PHP_EOL);
  }
}
?>
