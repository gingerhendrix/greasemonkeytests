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
    $metaPattern = '/==UserScript==(.)*==\/UserScript==/ms';
	  if( preg_match($metaPattern, $userscript, $metaSections)){
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
<script src="MochiKit/MochiKit.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.3.0/build/reset/reset-min.css"> 
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.3.0/build/base/base-min.css">
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.3.0/build/fonts/fonts-min.css"> 

<style>
body{
  padding: 20px;
}
.test{
  width: 100%;
  max-width: 960px;
  border: 1px solid #666666;
  background-color: #ffffff;
  margin: 1em;
  padding-bottom: 1em;
}
.test .name{
  font-size: 1.2em;
  font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
  display: block;
}

.test .description{
  padding-left: 2em;
  display: block;
}

.test .result{
  display: none;
  padding-left: 2em;
  font-weight: bold;
  color: #aa0000;
}

.test .msg_failure{
  color: #aa0000;
}

.test .msg_passed{
  color: #006600;
}
.test .install{
  padding-left: 2em;
  padding-right: 1em;
}

.test .logTitle{
  padding-left: 2em;
  text-decoration: underline;
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
}

.test .log{
  border: 1px solid #666666;
  background-color: #ffffff;
  
  margin-right: 2em;
  margin-left: 2em;
  min-height: 2em;
}

.test.notinstalled{
  background-color: #ffffaa;
}

.test.notinstalled .msg_notinstalled{
  display: block;
}

.test.passed{
  background-color: #aaffaa;
}

.test.passed .msg_passed{
  display: block;
}

.test.failure {
  background-color: #ffaaaa;
}

.test.failure .msg_failure{
  display: block;
}

.test.error {
  background-color: #ffaaaa;
}

.test.error .msg_error {
  display: block;
}

ul.tests {
 margin-left: 4em;
}

.tests li.success {
  color: #006600;
  font-weight: bold;
}

.tests li.failure, .tests li.error {
  color: #660000;
  font-weight: bold;
}


#suites ul{
  
}

#suites li{
  float: left;
  list-style-type: none;
  margin-right: 2em;
}

#suites a.selected{
  font-weight: bold;
  text-decoration: none;
}

#suites span{
  float: left;
  font-weight: bold;
  margin-right: 2em;
}

</style>

<body>
<h1>Greasemonkey Tests</h1>
<?php if($useImportsService){ ?>
<span>Using import service</span>
<?php } else { ?>
<span>Not using import service</span>
<?php }?>
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
  <a href="test.php?suite=<?php echo $file ?>" 
     <?php if(strcmp($file, $suite)==0){ echo "class='selected'"; } ?>
  >
    <?php echo $file ?>
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
    if(filetype($dir . $file) == "file"){
      $camelName = str_replace(".user.js", "", $file);
      $name = preg_replace("/([a-z])([A-Z])/", "$1 $2", $camelName);
      $userscript = file_get_contents($dir. $file);
      $description = getDescription($userscript);
?>

<div class="test notinstalled" id="<?php echo $camelName; ?>">
  <span class="name"><?php echo $name; ?></span>
  <span class="description"><?php echo $description ?></span>
  <span class="result msg_notinstalled">Not installed</span>
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
