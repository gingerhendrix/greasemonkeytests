<?php

  $importsServiceURL = "../GreasemonkeyImportsService/v2/greasemonkeyimports.php";

  function getDescription($userscript){
    if($meta = getMeta($userscript)){
       $pattern = '/\/{2} *(@description)\s*(.*)/';
       if(preg_match($pattern, $meta, $description)){
         return $description[2];
       };
    }
  }
  
  function getMeta($userscript){
    //Very big text crashes php - should probably find a better method to extract header
    $metaPattern = '/==UserScript==(.)*==\/UserScript==/ms';
    if( preg_match($metaPattern, $userscript, $metaSections)){ //$userscript
      return $metaSections[0];
    }
  }

$suite = $_GET["suite"];
if(!$suite){
  header('Location: '.$_SERVER[REQUEST_URI].'?suite=functional');
}
$useImportsService = $_GET["useImportsService"] ? true : false;
?>
<html>
<title>Greasemonkey Test Harness</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.3.0/build/reset/reset-min.css"> 
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.3.0/build/base/base-min.css">
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.3.0/build/fonts/fonts-min.css"> 

<link rel="stylesheet" type="text/css" href="style.css">

<body>
<h1>Greasemonkey Tests</h1>
<?php if($useImportsService){ ?>
<span>Using import service</span>
<?php } ?>

<div id="suites">
<span>Available suites: </span>
<ul>
<?php

$dir = "tests/";
if ($dh = opendir($dir)) {
 while (($file = readdir($dh)) !== false) {
   if(filetype($dir . $file) == "dir" && preg_match("/^\./", $file)==0){
?>
<li>
  <a href="index.php?suite=<?php echo $file ?>"  <?php  if(strcmp($file, $suite)==0){ echo "class='selected'"; } ?>  >
    <?php  echo $file  ?>
  </a>
</li>
<?php
   }
 }
}
?>
</ul>
<br/>
</div> 
<h2><?php echo ucfirst($suite); ?> Tests</h2>
<?php

$dir = "tests/".$suite."/"; 
if ($dh = opendir($dir)) {
  while (($file = readdir($dh)) !== false) {

    if(filetype($dir . $file) == "file" && preg_match("/.user.js$/", $file)==1){
     
      $camelName = str_replace(".user.js", "", $file);
      $name = preg_replace("/([a-z])([A-Z])/", "$1 $2", $camelName);
      //$userscript = file_get_contents($dir. $file);
      //$description = getDescription($userscript); FIXME: Causes segfault on Ubuntu Hardy 
?>

<div class="test notinstalled" id="<?php echo $camelName; ?>">
  <span class="name"><?php echo $name; ?></span>
  <span class="description"><?php echo $description ?></span>
  <span class="result msg_notinstalled">Not Run</span>
  <span class="result msg_passed">Passed</span>
  <span class="result msg_failure">Failure</span>
  <span class="result msg_error">Error</span>
  <?php if($useImportsService){ 
     $url = $importsServiceURL . "?url=http://localhost/eclipse/GreasemonkeyImports/" . $dir . $file . "&" . time() . ".user.js";
  ?>
    <a href='<?php echo $url; ?>' class="install">install</a>
    <a href="<?php echo $url; ?>#" class="viewsource">view source</a>
  <?php } else { ?>
    <a href="<?php echo $dir . $file . "?" . time() . '.user.js'; ?>" class="install">install</a>
    <a href="<?php echo $dir . $file; ?>#" class="viewsource">view source</a>
  <?php }  ?>
  
  <ul class="tests">
    
  </ul>

  <span class="logTitle">Log</span>  
  <div class="log">
  </div>
</div>

</body>
</html>


<?php    
    }
  }
  closedir($dh);
}
?>
