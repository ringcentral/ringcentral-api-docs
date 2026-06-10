<?php
list_messages();

/*
  Read thread messages
*/
function list_messages() {
    global $platform;
    try {
        $queryParams = [
            // 'threadStatus' => 'Open',
            // 'threadId' => '...',
            // 'ownerExtensionIds' => ['...'],
            // 'messageIds' => ['...'],
            // 'creationTimeFrom' => '...',
            // 'creationTimeTo' => '...',
            'perPage' => 10
        ];

        $endpoint = '/restapi/v1.0/account/~/message-threads/messages';
        $response = $platform->get($endpoint, $queryParams);
        $jsonObj = $response->json();

        foreach ($jsonObj->records as $msg) {
            // Parse and handle the message data

            // Check if this message has attachment(s)
            if (!empty($msg->attachments)) {
                get_message_attachments($msg->attachments);
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

/*
 Download attachment(s) and save to a local file
*/
function get_message_attachments($attachments) {
  global $platform;
  try {
    foreach ($attachments as $attachment){
      $res = $platform->get($attachment->contentUri);
      file_put_contents($attachment->filename, $res->raw());
    }
  }catch (ApiException $e) {
    $message = $e->getMessage();
    print 'Expected HTTP Error: ' . $message . PHP_EOL;
  }
}
?>
