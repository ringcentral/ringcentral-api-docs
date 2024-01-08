<?php
$supervisorDeviceId = "TEST-SUPERVISOR-DEVICEID";
$agentExtensionId = "TEST-AGENT-EXTENSIONID";

read_agent_active_calls($agentExtensionId, $supervisorDeviceId);

/*
* Read agent active calls
*/
function read_agent_active_calls($agentExtensionId, $supervisorDeviceId){
  global $platform;
  try{
    $endpoint = "/restapi/v1.0/account/~/extension/".$agentExtensionId."/active-calls";
    $resp = $platform->get($endpoint);
    $jsonObj = $resp->json();
    foreach ($jsonObj->records as $record){
      if ($record->result == "In Progress"){
        submit_call_supervise_request($record->telephonySessionId, $agentExtensionId, $supervisorDeviceId);
        break;
      }
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to read agent's active calls. " . $e->getMessage() . PHP_EOL);
  }
}

/*
* Supervise an active call session
*/
function submit_call_supervise_request($telephonySessionId, $agentExtensionId, $supervisorDeviceId)
{
  global $platform;
  try{
    $endpoint = "/restapi/v1.0/account/~/telephony/sessions/" . $telephonySessionId . "/supervise";
    $bodyParams = array (
            'mode' => 'Listen',
            'supervisorDeviceId' => $supervisorDeviceId,
            'agentExtensionId' => $agentExtensionId
          );
    $resp = $platform->post($endpoint, $bodyParams);
    print_r (json_encode($resp->json(), JSON_PRETTY_PRINT));
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Unable to supervise this call. ' . $e->getMessage() . PHP_EOL);
  }
}
?>
