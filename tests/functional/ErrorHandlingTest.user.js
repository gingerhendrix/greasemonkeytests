<?php echo $header ?>
// ==UserScript==
// @name          ErrorTest
// @description   Tests if an error in an external library is correctly referenced in the error console
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/GMUnit.js
// @require       ../../lib/error.js
// ==/UserScript==

new Test("ErrorHandlingTest", 
  function(test){
    test.log("There should be an error in the console pointing to error.js line 6");
    try{
      codeError();
      test.fail("Error not thrown");
    }catch(e){
      test.throwAndPass(e);
    }
  }
);

