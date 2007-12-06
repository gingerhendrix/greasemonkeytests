<?php echo $header ?>
// ==UserScript==
// @name          ResourcesTest
// @description   Test resources 
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../../MonkeyTest/js/Test.js
// @require       ../../../MonkeyTest/js/AbstractTestRunner.js
// @require       ../../../MonkeyTest/js/BaseTestRunner.js
// @require       ../../../MonkeyTest/js/SimpleTestRunner.js
// @require       ../../../MonkeyTest/js/GreasemonkeyTestRunner.js
// @require       ../../../MonkeyTest/js/TestManager.js
// @resource test ../../lib/test1.txt
// @resource test2    ../../lib/test2.txt
// ==/UserScript==

new Test("ResourcesTest", function(test){
  var content = GM_getResourceText("test");
  test.log("Contents of test1.txt: "  + content);
  test.assert(content == "This is some test text", "Content not correct - '"+content+"'");
  
  content = GM_getResourceText("test2");
  test.log("Contents of test2.txt: "  + content);
  test.assert(content == "This is some more test text", "Content not correct - '"+content+"'");
  
});

TestManager.runner = new GreasemonkeyTestRunner("ResourcesTest");
TestManager.run();