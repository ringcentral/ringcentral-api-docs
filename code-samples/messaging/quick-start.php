<?php
// Remember to modify the path to where you installed the RingCentral SDK and saved your .env file!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// For the purpose of testing the code, we put the SMS recipient number in the environment variable.
// Feel free to set the SMS recipient directly.
$RECIPIENT    = $_ENV['SMS_RECIPIENT'];

# Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

// Authenticate a user using a personal JWT token
try {
  $platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );
  read_extension_phone_number_detect_sms_feature();
} catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->message . PHP_EOL);
}

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the SMS capability
*/
function read_extension_phone_number_detect_sms_feature(){
  global $platform;
  $endpoint = "/restapi/v1.0/account/~/extension/~/phone-number";
  $resp = $platform->get($endpoint);
  $jsonObj = $resp->json();
  foreach ($resp->json()->records as $record){
    foreach ($record->features as $feature){
      if ($feature == "SmsSender"){
        // If a user has multiple phone numbers, check and decide which number
        // to be used for sending SMS message.
        return send_sms($record->phoneNumber);
      }
    }
  }
  if (count($jsonObj->records) == 0){
    exit("This user does not own a phone number!");
  }else{
    exit("None of this user's phone number(s) has the SMS capability!");
  }
}

/*
 Send a text message from a user own phone number to a recipient number
*/
function send_sms($fromNumber){
  global $platform, $RECIPIENT;
  try {
    $requestBody = array(
       'from' => array ('phoneNumber' => $fromNumber),
       'to' => array( array('phoneNumber' => $RECIPIENT) ),
       // To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
       /*
       'to' => array(
          array('phoneNumber' => $RECIPIENT),
          array('phoneNumber' => 'Recipient-Phone-Number')
        ),
       */
       'text' => 'Hello World!'
    );
    $endpoint = "/account/~/extension/~/sms";
    $resp = $platform->post($endpoint, $requestBody);
    $jsonObj = $resp->json();
    print("SMS sent. Message id: " . $jsonObj->id . PHP_EOL);
    check_message_status($jsonObj->id);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Error message: " . $e->message . PHP_EOL);
  }
}

/*
 Check the sending message status until it's out of the queued status
*/
function check_message_status($messageId){
    global $platform;
    try {
        $endpoint = "/restapi/v1.0/account/~/extension/~/message-store/".$messageId;
        $resp = $platform->get($endpoint);
        $jsonObj = $resp->json();
        print("Message status: " . $jsonObj->messageStatus . PHP_EOL);
        if ($jsonObj->messageStatus == "Queued"){
          sleep(2);
          check_message_status($jsonObj->id);
        }
    } catch (\RingCentral\SDK\Http\ApiException $e) {
      exit("Error message: " . $e->message . PHP_EOL);
    }
}
?>


<?php
/**********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
$RECIPIENT2    = $_ENV['SMS_RECIPIENT2'];
boostrap_test_function();
function boostrap_test_function(){
  /*
  print_r ("Test reading number features". PHP_EOL);
  sleep(2);
  include_once (__DIR__ .'/code-snippets/number-features.php');

  return
  print_r ("Test sending MMS". PHP_EOL);
  sleep(2);
  include_once (__DIR__ .'/code-snippets/send-mms.php');

  print_r ("Test sending Fax". PHP_EOL);
  sleep(2);
  include_once (__DIR__ .'/code-snippets/send-fax.php');

  print_r ("Test reading message store". PHP_EOL);
  sleep(2);
  include_once (__DIR__ .'/code-snippets/message-store.php');

  print_r ("Test export message store". PHP_EOL);
  sleep(2);
  include_once (__DIR__ .'/code-snippets/message-store-export.php');
  */

  print_r ("Test sending a2p SMS". PHP_EOL);
  sleep(2);
  include_once (__DIR__ .'/code-snippets/send-a2p-sms.php');
}
?>
