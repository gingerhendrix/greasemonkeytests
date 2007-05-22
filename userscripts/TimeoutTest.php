<?php
$timeout = $_GET['timeout'] ? $_GET['timeout'] : 30; 
set_time_limit($timeout);
sleep($timeout);

?>

This is the timeout test text.