<?php
$NGROK = "NGROK-TUNNEL-ADDRESS";
$WEBHOOK_URL = $NGROK . "/webhook";
punctuation();

/*
* Add punctuation to text paragraphs
*/
function punctuation()
{
  global $platform, $WEBHOOK_URL;
  try{
    $bodyParams = array (
        'texts' => array (
            "so its more fluid than it is and you know its not the best kind of feedback right",
            "and you know that the best way to ask for customer feedback is to reach out to each of your customer and interview them separately",
            "however interviewing each individual customer to get their feedback is not scalable if you have thousands of customers to be interviewed"
        )
    );
    $endpoint = "/ai/text/v1/async/punctuate?webhook=" . urlencode($WEBHOOK_URL);
    $resp = $platform->post($endpoint, $bodyParams);
    $jsonObj = $resp->json();
    if ($resp->response()->getStatusCode() == 202) {
      print_r ("Job ID: " . $jsonObj->jobId . PHP_EOL);
      print_r("Ready to receive response at: " . $WEBHOOK_URL . PHP_EOL);
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Unable to call punctuation API. ' . $e->getMessage() . PHP_EOL);
  }
}
?>
