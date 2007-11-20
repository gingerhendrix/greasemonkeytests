<?php echo $header ?>
// ==UserScript==
// @name          TextImportsTest
// @description   Test importing a text file
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/GMUnit.js
// @import test   ../../lib/test1.txt
// @import ../../lib/test2.txt
// ==/UserScript==

new Test("TextImportsTest", function(test){
  var content = GM_getImportText("test");
  test.log("Contents of test1.txt: "  + content);
  test.assert(content == "This is some test text", "Content not correct - '"+content+"'");
  
  content = GM_getImportText("test2.txt");
  test.log("Contents of test2.txt: "  + content);
  test.assert(content == "This is some more test text", "Content not correct - '"+content+"'");
  
});

