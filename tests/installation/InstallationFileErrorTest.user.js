<?php echo $header ?>
// ==UserScript==
// @name          InstallationFileErrorTest
// @description   This test should fail to install with a security exception
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/GMUnit.js
// @import test   file:///etc/passwd
// ==/UserScript==


new Test("InstallationChromeErrorTest", function(test){
  test.fail("This test should fail to install");
});