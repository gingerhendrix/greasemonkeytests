<?php
  require "config/environment.php";
  
  $filename = $_GET['content'];
  $suiteArray = array_slice(explode("/", $filename), 1, -1);
  if(sizeof($suiteArray)>0){
    $suite = $suiteArray[0];
  }else{
    $suite = '*';
  }
	$namespace = "http://gandrew.com/projects/GreasemonkeyTests/";
  
  $testHarness = $testHarness . "?suite=$suite";
  $header = <<<END
// Tests for Greasemonkey
// version 0.2
// 2008-04-12
// Copyright (c) 2007-2008 Gareth Andrew
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//

END;
  header('Content-type: text/javascript');
  
  $userscript = get_include_contents($filename);
  echo $userscript;
    
  function get_include_contents($filename) {
	  global $namespace;
    global $testHarness;
    global $header;
    
	   if (is_file($filename)) {
	       ob_start();
	       include $filename;
	       $contents = ob_get_contents();
	       ob_end_clean();
	       return $contents;
	   }else{
   		return false;
	   }
	}

?>
