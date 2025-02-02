<?php
if (isset($_REQUEST['webhook'])){
    $jsonStr = file_get_contents('php://input');
    $jsonObj = json_decode($jsonStr, TRUE);
    print_r ($jsonObj);
    file_put_contents("response.json", $jsonStr);
}else{
  echo ("Ignore this");
}
?>
