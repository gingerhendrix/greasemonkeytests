<?php
$timeout = $_GET['timeout'] ? $_GET['timeout'] : 30;
$content = $_GET['content'];
set_time_limit($timeout + 5);
sleep($timeout);
if($content){
  include($content);
}else{
  echo "Loaded";  
}
?>
