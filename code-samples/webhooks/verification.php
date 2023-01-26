<?php
// Get validation token
$v = isset($_SERVER['HTTP_VALIDATION_TOKEN']) ? $_SERVER['HTTP_VALIDATION_TOKEN'] : '';
// Return validation token as header
if (strlen($v) > 0) {
  header("Validation-Token: {$v}");
}
?>
