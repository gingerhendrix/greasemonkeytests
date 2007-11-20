<?php echo $header ?>
// ==UserScript==
// @name          InstallationErrorTest
// @description   This test should fail to install with a 404 error.
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/GMUnit.js
// @import test   ../../lib/error.php
// ==/UserScript==


new Test("InstallationErrorTest", function(test){
  test.fail("This test should fail to install");
});