<?php
  if( $_GET['redirect'] == 'true'){
    header('Location: http://'.$_SERVER['HTTP_HOST'].$_SERVER['SCRIPT_NAME'].'?redirected=true');
    return;
  }
  if( $_GET['custom-header'] ){
     header('Custom-Header: '.$_GET['custom-header']);
  }
  if( $_GET['show-headers'] ){
    print_r($_SERVER);
    echo "Accept: ". $_SERVER['HTTP_ACCEPT'] ."\n";
    echo "Accept-Charset: ". $_SERVER['HTTP_ACCEPT_CHARSET'] ."\n";
    echo "Accept-Encoding: ". $_SERVER['HTTP_ACCEPT_ENCODING'] ."\n";
    echo "Accept-Language: ". $_SERVER['HTTP_ACCEPT_LANGUAGE'] ."\n";
    echo "Connection: ". $_SERVER['HTTP_CONNECTION'] ."\n";
    echo "Referer: ". $_SERVER['HTTP_REFERER'] ."\n";
    echo "Host: ". $_SERVER['HTTP_HOST'] ."\n";
    echo "User-Agent: ". $_SERVER['HTTP_USER_AGENT'] ."\n";
    echo "Custom-Header: ". $_SERVER['CUSTOM_HEADER'] ."\n";
    return;
  }
  if( $_GET['echo-data'] ){
    echo $HTTP_RAW_POST_DATA;
    return;
  }
  echo $_SERVER['REQUEST_METHOD']." OK";
?>
