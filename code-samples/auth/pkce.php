<?php
function base64url_encode($plainText)
{	    
    $base64 = base64_encode($plainText);
    $base64 = trim($base64, "=");
    $base64url = strtr($base64, '+/', '-_');
    return ($base64url);
}
$random = bin2hex(openssl_random_pseudo_bytes(32));
$verifier = base64url_encode(pack('H*', $random));
$challenge = base64url_encode(pack('H*', hash('sha256', $verifier)));
?>