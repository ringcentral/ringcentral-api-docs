<?php
create_call_monitoring_group("Demo Group - PHP");

/*
* Read all call monitoring groups
*/
function create_call_monitoring_group($groupName){
  global $platform;
  try{
    $bodyParams = array (
      'name' => $groupName
    );
    $endpoint = "/restapi/v1.0/account/~/call-monitoring-groups";
  	$resp = $platform->post($endpoint, $bodyParams);
  	$jsonObj = $resp->json();
  	print ("Call monitoring group created." . PHP_EOL);
    add_call_monitoring_group_members($jsonObj->id);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to create a call monitoring group. " . $e->getMessage() . PHP_EOL);
  }
}

/*
* Add members to a call monitoring group
*/
function add_call_monitoring_group_members($groupId){
  global $platform;
  try {
    $newMembersList = read_account_extensions();
    $bodyParams = array (
      'addedExtensions' => $newMembersList
    );
    $endpoint = "/restapi/v1.0/account/~/call-monitoring-groups/" . $groupId ."/bulk-assign";
  	$resp = $platform->post($endpoint, $bodyParams);
    print ("Members added." . PHP_EOL);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to add members to this call monitoring group. " . $e->getMessage() . PHP_EOL);
  }
}

/*
* Read the account user extensions and create a list of supervisors and agents based on their role.
*/
function read_account_extensions(){
  global $platform;
  try {
    $queryParams = array (
      'type' => array ('User'),
      'status' => "Enabled"
    );
    $endpoint = "/restapi/v1.0/account/~/extension";
  	$resp = $platform->get($endpoint, $queryParams);
  	$jsonObj = $resp->json();
    $extensionList = [];
  	foreach ($jsonObj->records as $user){
      $extension = array (
        'id' => $user->id,
        'permissions' => []
      );
      if ($user->permissions->admin->enabled == true)
        array_push($extension['permissions'], "Monitoring");
      else
        array_push($extension['permissions'], "Monitored");
      array_push($extensionList, $extension);
    }
    return $extensionList;
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print ("Unable to read account extensions." .$e->getMessage . PHP_EOL);
  }
}

/*
* Delete a call monitoring group
*/
function delete_call_monitoring_group($groupId){
  global $platform;
  try {
    $endpoint = "/restapi/v1.0/account/~/call-monitoring-groups/" . $groupId;
  	$resp = $platform->delete($endpoint);
    print ("Call monitoring group is deleted." . PHP_EOL);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to delete this call monitoring group. " . $e->getMessage() . PHP_EOL);
  }
}
?>
