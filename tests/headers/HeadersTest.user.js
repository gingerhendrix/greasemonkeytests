<?php echo $header ?>
// ==UserScript==
// @name          HeadersTest
// @description   Tests the new headers functionality
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// ==/UserScript==

var testEl = document.getElementById("HeadersTest");
var classes = testEl.getAttribute("class");

//var greasemonkey = {};
//greasemonkey.__defineGetter__("headers", function(){return GM_getHeaders()});
//delete GM_getHeaders;

try{
   alert(greasemonkey);
   alert(greasemonkey.headers);
   alert(greasemonkey.headers.toSource());
}catch (e){
  alert("Exception " + e);
}

classes = "test passed";
testEl.setAttribute("class", classes);