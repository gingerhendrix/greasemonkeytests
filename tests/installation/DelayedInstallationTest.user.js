<?php echo $header ?>
// ==UserScript==
// @name          DelayedInstallationTest
// @description   This script should install after 10 seconds
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/GMUnit.js
// @import test   ../../lib/delay.php?timeout=10&content=test1.txt
// ==/UserScript==


new Test("DelayedInstallationTest", function(test){
  var content = GM_getImportText("test");
  test.assert(content == "This is some test text", "Content not correct - '"+content+"'");
});