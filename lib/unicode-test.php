<?php
  $charset = $_GET['charset'] ? $_GET['charset'] : "UTF-8";
	header ('Content-Type: text/plain; charset='.$charset);
  iconv_set_encoding("internal_encoding", "UTF-8");
  iconv_set_encoding("external_encoding", charset);
  
  $utf8String = "これはテストである";
  
  $encoded = iconv("utf-8", $charset, $utf8String);
  
  echo $encoded;   
?>
