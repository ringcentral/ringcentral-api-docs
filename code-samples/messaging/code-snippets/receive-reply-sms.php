<?php
subscribe_for_instant_messages_notification();

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
      send_reply($event->payload()['body']);
  });

  $subscription->register();
}

/*
*  Send a reply message to a client number
*/
function send_reply($body){
  global $platform;
  try {
    $textMessage = "Hi";
    if (isset($body['from']['name']))
        $textMessage .= " " . $body['from']['name'];
    $textMessage .= "\nThank you for your message. I’m currently on vacation and will be available after August 15th.";
    $bodyParams = array(
      'from' => array( 'phoneNumber' => $body['to'][0]['phoneNumber'] ),
      'to'   => array( array('phoneNumber' => $body['from']['phoneNumber'])),
      'text' => $textMessage
    );

    $endpoint = "/restapi/v1.0/account/~/extension/~/mms";
    refresh_token();
    $resp = $platform->post($endpoint, $bodyParams);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'Expected HTTP Error: ' . $e->message . PHP_EOL;
  }
}

function refresh_token(){
  global $platform;
  if (!$platform->loggedIn()){
    print "Both tokens expired => Relogin using the user JWT" . PHP_EOL;
    $platform->login( [ "jwt" => "RC_USER_JWT" ] );
  }else{
    print "Token valid" . PHP_EOL;
  }
}
?>
