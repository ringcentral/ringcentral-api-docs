<?php
if (isset($_SERVER['HTTP_VALIDATION_TOKEN'])) { 
    header("Validation-Token:: " . $_SERVER['HTTP_VALIDATION_TOKEN']);
}
            
$jsonStr = file_get_contents('php://input');
$jsonObj = json_decode($jsonStr, TRUE);
var_dump($jsonObj);
?>
