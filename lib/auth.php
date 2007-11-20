<?php
if (!isset($_SERVER['PHP_AUTH_USER']) || isset($_GET['force'])) {
    header('WWW-Authenticate: Basic realm="Auth Test - login as test:test"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Unauthorized';
    exit;
} else {
    echo "User: {$_SERVER['PHP_AUTH_USER']} Password: {$_SERVER['PHP_AUTH_PW']}";
}
?>
