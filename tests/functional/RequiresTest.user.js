// <?php echo $header ?>
// ==UserScript==
// @name          RequireTest
// @description   A series of tests for new gresemonkey import functionality
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/MonkeyTest.js
// @require       ../../lib/GreasemonkeyTestRunner.js
// @require       ../../lib/library.js
// @require       ../../lib/error.js
// ==/UserScript==



new Test("RequiresTest", function(test){
    test.assert(someFunc, "someFunc does not exist");
    test.log("Library function body: " + someFunc.toSource());
    test.assert(someFunc instanceof Function, "someFunc is not a function");
    test.assert(someFunc(), "someFunc does not return true");
});
/* Won't work - test library throws errors in a new call stack - greasemonkey can't
 * intercept errors outside its own call stack
 */
/*new TestSuite("ErrorHandling Tests", {
  testCodeError : function(test){
    try{
      codeError();
      test.fail("Error not thrown");
    }catch(e){
      test.log("Error should be thrown in console, from error.js line 6")
      test.throwAndPass(e);
    }
  },
  testThrownError : function(test){
    try{
      thrownError();
      test.fail("Error not thrown");
    }catch(e){
      test.log("Error should be thrown in console, from error.js line 6")
      test.throwAndPass(e);
    }
  },
  testCustomThrownError : function(test){
    try{
      customThrownError();
      test.fail("Error not thrown");
    }catch(e){
      test.log("Error should be thrown in console, from error.js line 6")
      test.throwAndPass(e);
    }
  } 
});*/


TestManager.runner = new GreasemonkeyTestRunner("RequiresTest");
TestManager.run();
