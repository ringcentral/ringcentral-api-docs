<?php
read_call_monitoring_groups();

/*
* Read all call monitoring groups
*/
function read_call_monitoring_groups(){
  global $platform;
  try{
    $endpoint = "/restapi/v1.0/account/~/call-monitoring-groups";
  	$resp = $platform->get($endpoint);
  	$jsonObj = $resp->json();
  	foreach ($jsonObj->records as $group){
      print ("Call monitoring group name: " . $group->name . "/" . $group->id . PHP_EOL);
      read_call_monitoring_group_members($group->id);
  	}
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to call list call monitoring groups. " . $e->getMessage() . PHP_EOL);
  }
}

/*
* Read a call monitoring group members
*/
function read_call_monitoring_group_members($groupId){
  global $platform;
  try {
    $endpoint = "/restapi/v1.0/account/~/call-monitoring-groups/" . $groupId ."/members";
  	$resp = $platform->get($endpoint);
  	$jsonObj = $resp->json();
    print ("Call monitoring group members:" . PHP_EOL);
  	foreach ($jsonObj->records as $member){
      print (json_encode($member, JSON_PRETTY_PRINT) . PHP_EOL);
  	}
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to read members of this call monitoring group. " . $e->getMessage() . PHP_EOL);
  }
}
?>
