<?php
$NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
$WEBHOOK_URL = $NGROK_ADDRESS . "/webhook";
conversation_summary();

/*
* Summarize the conversations
*/
function conversation_summary()
{
  global $platform, $WEBHOOK_URL;
  try {
    $bodyParams = array (
                'summaryType' => "All",
                'utterances' => array (
                    array (
                        "end" => 8.96,
                        "speakerId" => "0",
                        "start" => 3.72,
                        "text" => "Good evening, thank you for calling electronics or this is Rachel. How may I assist you?"
                    ),array (
                        "end" => 14.280000000000001,
                        "speakerId" => "1",
                        "start" => 8.96,
                        "text" => "Hi, Rachel. I would like to know how to use this car. Bluetooth headset I recently purchased from your store."
                    ),array (
                        "end" => 21.36,
                        "speakerId" => "0",
                        "start" => 14.280000000000001,
                        "text" => "Sure, ma'am, I can help you out with that, but before anything else, I have your name so that I can address you properly."
                    ),array (
                        "end" => 23.58,
                        "speakerId" => "1",
                        "start" => 21.36,
                        "text" => "Yes, this is Meredith Blake."
                    ),array (
                        "end" => 29.72,
                        "speakerId" => "0",
                        "start" => 23.9,
                        "text" => "Okay, thank you for that, Mrs. Plague, what exactly do you want done with your headset?"
                    ),array (
                        "end" => 31.939999999999998,
                        "speakerId" => "1",
                        "start" => 29.72,
                        "text" => "I want to know how to use it."
                    ),array (
                        "end" => 39.08,
                        "speakerId" => "0",
                        "start" => 31.939999999999998,
                        "text" => "Okay, ma'am, I may get your headsets, modal name and number as well as that of your phone."
                    ),array (
                        "end" => 45.18,
                        "speakerId" => "1",
                        "start" => 39.08,
                        "text" => "I bought a Plantronics Mark 2m165, and I use an iphone for S."
                    ),array (
                        "end" => 51.4,
                        "speakerId" => "0",
                        "start" => 45.34,
                        "text" => "Okay, ma'am, so have you tried fairly pairing it with your headset with your phone?"
                    ),array (
                        "end" => 52.74,
                        "speakerId" => "1",
                        "start" => 51.4,
                        "text" => "Yes, I have."
                    ),array (
                        "end" => 60.24,
                        "speakerId" => "0",
                        "start" => 53.22,
                        "text" => "Okay, first, I need you to unpair your device with your phone."
                    ),array (
                        "end" => 61.42,
                        "speakerId" => "1",
                        "start" => 60.24,
                        "text" => "I am, okay?"
                    ),array (
                        "end" => 63.1,
                        "speakerId" => "0",
                        "start" => 61.62,
                        "text" => "Yes, ma'am."
                    ),array (
                        "end" => 65.46,
                        "speakerId" => "1",
                        "start" => 63.42,
                        "text" => "OK, done."
                    ),array (
                        "end" => 72.64,
                        "speakerId" => "0",
                        "start" => 65.74,
                        "text" => "Now, please switch off your phone, then turn it on again after around 5 s."
                    ),array (
                        "end" => 74.34,
                        "speakerId" => "1",
                        "start" => 72.64,
                        "text" => "Switch it off and on."
                    ),array (
                        "end" => 75.78,
                        "speakerId" => "0",
                        "start" => 74.46,
                        "text" => "Yes, please."
                    ),array (
                        "end" => 77.78,
                        "speakerId" => "1",
                        "start" => 75.98,
                        "text" => "Done now what?"
                    ),array (
                        "end" => 80.74,
                        "speakerId" => "0",
                        "start" => 77.82,
                        "text" => "Okay, please parry it with your phone."
                    ),array (
                        "end" => 84.26,
                        "speakerId" => "1",
                        "start" => 81.74,
                        "text" => "Okay, now what."
                    ),array (
                        "end" => 88.19999999999999,
                        "speakerId" => "0",
                        "start" => 84.7,
                        "text" => "Ma'am, is your headset working now? That's."
                    ),array (
                        "end" => 95.12,
                        "speakerId" => "1",
                        "start" => 88.19999999999999,
                        "text" => "Just it I want to know how it works. I already told you that I have paired the device with my phone, but I am not sure if you get what I mean. I."
                    ),array (
                        "end" => 101.7,
                        "speakerId" => "0",
                        "start" => 95.12,
                        "text" => "Well, yes, ma'am, I understand where you are coming from, that is why I am trying to help you, okay?"
                    ),array (
                        "end" => 107.7,
                        "speakerId" => "1",
                        "start" => 102.22,
                        "text" => "Well, we have already done that. I only ask a simple question. Why can't you seem to get that?"
                    ),array (
                        "end" => 114.2,
                        "speakerId" => "0",
                        "start" => 108.14,
                        "text" => "Yes, ma'am, I understand where you are coming from. That is why I am trying to help."
                    ),array (
                        "end" => 123.8,
                        "speakerId" => "1",
                        "start" => 114.2,
                        "text" => "You know what, no 1 I do not think you do. We have been at this for over 30 min going around in circles. I would like to speak to your supervisor. I obviously will not get any help from you."
                    )
                  )
                );
    $endpoint = "/ai/text/v1/async/summarize?webhook=" . urlencode($WEBHOOK_URL);
    $resp = $platform->post($endpoint, $bodyParams);
    $jsonObj = $resp->json();
    if ($resp->response()->getStatusCode() == 202) {
      print_r ("Job ID: " . $jsonObj->jobId . PHP_EOL);
      print_r("Ready to receive response at: " . $WEBHOOK_URL . PHP_EOL);
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print_r ('HTTP Error: ' . $e->getMessage() . PHP_EOL);
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print_r ('Unable to call the summarize API. ' . $e->apiResponse->response()->error() . PHP_EOL);
  }
}
?>
