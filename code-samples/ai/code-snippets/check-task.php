<?php
check_task_status("1cb4eb26-0159-11ee-b349-0050568c5fe3");

/*
* Check speech to text job status
*/
function check_task_status($jobId)
{
  global $platform;
  try{
    $endpoint = "/ai/status/v1/jobs/" . $jobId;
    $resp = $platform->get($endpoint);
    print_r (json_encode($resp->json(), JSON_PRETTY_PRINT));
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Unable to get speech to text job status. ' . $e->getMessage() . PHP_EOL);
  }
}
?>
