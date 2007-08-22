<?php echo $header ?>
// ==UserScript==
// @name          TextImportsTest
// @description   Test importing a text file
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/GMUnit.js
// @import test   ../../lib/test1.txt
// @import test2   ../../lib/test2.txt
// ==/UserScript==

new Test("TextImportsTest", function(test){
  var content = GM_getImportContent("test");
  test.assert(content == "This is some test text", "Content not correct - '"+content+"'");
  
  content = GM_getImportContent("test2");
  test.assert(content == "This is some more test text", "Content not correct - '"+content+"'");
});

