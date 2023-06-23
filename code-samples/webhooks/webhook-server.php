<?php
$v = isset($_SERVER['HTTP_VALIDATION_TOKEN']) ? $_SERVER['HTTP_VALIDATION_TOKEN'] : '';
if (strlen($v) > 0) {
    header("Validation-Token: {$v}");
}

$jsonStr = file_get_contents('php://input');
$jsonObj = json_decode($jsonStr, TRUE);
var_dump($jsonObj);
?>
