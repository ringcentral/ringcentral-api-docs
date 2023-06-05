<?php
if (isset($_REQUEST['webhook'])){
    echo ("Notifications?");
    if (array_key_exists('HTTP_VALIDATION_TOKEN', $_SERVER)) {
       header("Content-type: application/json");
       return header("Validation-Token: {$_SERVER['HTTP_VALIDATION_TOKEN']}");
    }else{
      $jsonStr = file_get_contents('php://input');
      print_r ($jsonStr);
      $jsonObj = json_decode($jsonStr, TRUE);
      print_r($jsonObj);
    }
}
?>
