// <?php echo $header ?>
// ==UserScript==
// @name          GetSetValueTest
// @description   A series of tests for new gresemonkey import functionality
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../../MonkeyTest/js/Test.js
// @require       ../../../MonkeyTest/js/TestSuite.js
// @require       ../../../MonkeyTest/js/AbstractTestRunner.js
// @require       ../../../MonkeyTest/js/BaseTestRunner.js
// @require       ../../../MonkeyTest/js/SimpleTestRunner.js
// @require       ../../../MonkeyTest/js/GreasemonkeyTestRunner.js
// @require       ../../../MonkeyTest/js/TestManager.js
// ==/UserScript==

new TestSuite("getValue Tests", {
  testSimple : function(t){
    GM_setValue("testSimple", "aString");
    var val = GM_getValue("testSimple");
    t.assert(val === "aString", "Unexpected value " + val);
    t.assert(typeof(val) == "string", "Unexpected type " + typeof(val) + "");
    t.assert(val.constructor == String, "Unexpected constructor " + val.constructor);
  },
  
  testDefault : function(t){
    var val = GM_getValue("testDefault", "default");
    t.assert(val === "default", "Unexpected value " + val);
    t.assert(typeof(val) == "string", "Unexpected type " + typeof(val) + "");
    t.assert(val.constructor == String, "Unexpected constructor " + val.constructor);
  },
  
  testMissing : function(t){
    var val = GM_getValue("testMissing");
    t.assert(val === undefined, "Unexpected value " + val);
    t.assert(typeof(val) == "undefined", "Unexpected type " + typeof(val) + "");
  },
});

new TestSuite("setValue Tests", {
  testString : function(t){
    GM_setValue("testString", "aString");
    var val = GM_getValue("testString");
    t.assert(val === "aString", "Unexpected value " + val);
    t.assert(typeof(val) == "string", "Unexpected type " + typeof(val) + "");
    t.assert(val.constructor == String, "Unexpected constructor " + val.constructor);
  },
  
  testInteger : function(t){
    GM_setValue("testInteger", 4);
    var val = GM_getValue("testInteger");
    t.assert(val === 4, "Unexpected value " + val);
    t.assert(typeof(val) == "number", "Unexpected type " + typeof(val) + "");
  },
  
  testBooleanTrue : function(t){
    GM_setValue("testBooleanTrue", true);
    var val = GM_getValue("testBooleanTrue");
    t.assert(val === true, "Unexpected value " + val);
    t.assert(typeof(val) == "boolean", "Unexpected type " + typeof(val) + "");
  },
  
  testBooleanFalse : function(t){
    GM_setValue("testBooleanFalse", false);
    var val = GM_getValue("testBooleanFalse");
    t.assert(val === false, "Unexpected value " + val);
    t.assert(typeof(val) === "boolean", "Unexpected type " + typeof(val) + "");
  },
  
});

new TestSuite("Persistence Test", {
  //TODO: Not sure how to test persistence?
});

new TestSuite("setValue error tests", {
  testFloat : function(t){
    try{
      GM_setValue("testFloat", 4.2);
      fail("Error expected");
    }catch(e){
      t.assert(true, "An error should be thrown") 
    }
  },
  
  testObject : function(t){
    try{
      GM_setValue("testObject", new Object());
      fail("Error expected");
    }catch(e){
      t.assert(true, "An error should be thrown") 
    }
  },
  
  testArray : function(t){
    try{
      GM_setValue("testObject", new Array());
      fail("Error expected");
    }catch(e){
      t.assert(true, "An error should be thrown") 
    }
  },
  
  testUndefined : function(t){
    try{
      GM_setValue("testUndefined", undefined);
    }catch(e){
      t.assert(true, "An error should be thrown") 
    }
  }
  
});

TestManager.runner = new GreasemonkeyTestRunner("GetSetValueTest");
TestManager.run();