<?php
read_extension_message_store();

/*
  Read the current authenticated user's message store.
*/
function read_extension_message_store(){
  global $platform;
  try {
    $queryParams = array (
      'dateFrom' => '2023-01-01T00:00:00.000Z',
      'dateTo' => '2023-01-31T23:59:59.999Z',
      'messageType' => array ("SMS", "Fax"),
      'perPage' => 1000
    );

    $endpoint = "/restapi/v1.0/account/~/extension/~/message-store";

    $resp = $platform->get($endpoint, $queryParams);
    $jsonObj = $resp->json();
    foreach ($resp->json()->records as $record){
      print_r (json_encode($record, JSON_PRETTY_PRINT) . PHP_EOL);
    }
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'Expected HTTP Error: ' . $e;
    print ("Error message: " . $e->apiResponse->response()->error() . PHP_EOL);
  }
}
?>
