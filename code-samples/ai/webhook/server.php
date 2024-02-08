<?php
if (isset($_REQUEST['webhook'])){
    $jsonStr = file_get_contents('php://input');
    file_put_contents("response.json", $jsonStr);
}else{
  echo ("Ignore this");
}
?>
