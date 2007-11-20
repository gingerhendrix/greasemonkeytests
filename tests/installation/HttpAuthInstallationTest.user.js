<?php echo $header ?>
// ==UserScript==
// @name          HttpAuthInstallationTest
// @description   This script should show an http auth prompt. (<a href="lib/auth.php?force">logout</a>)
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/GMUnit.js
// @import test   ../../lib/auth.php
// ==/UserScript==


new Test("HttpAuthInstallationTest", function(test){
  var content = GM_getImportText("test");
  test.assert(content == "User: test Password: test", "Content not correct - '"+content+"'");
});