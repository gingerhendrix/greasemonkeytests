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
  
  testNegativeInteger : function(t){
    GM_setValue("testNegativeInteger", -4);
    var val = GM_getValue("testNegativeInteger");
    t.assert(val === -4, "Unexpected value " + val);
    t.assert(typeof(val) == "number", "Unexpected type " + typeof(val) + "");
  },
  
  testMaxInteger : function(t){
    GM_setValue("testMaxInteger", Math.pow(2,31)-1);
    var val = GM_getValue("testMaxInteger");
    t.assert(val === Math.pow(2,31)-1, "Unexpected value " + val);
    t.assert(typeof(val) == "number", "Unexpected type " + typeof(val) + "");
  },
  
  testMaxNegativeInteger : function(t){
    GM_setValue("testMaxNegativeInteger", -(Math.pow(2,31)-1));
    var val = GM_getValue("testMaxNegativeInteger");
    t.assert(val === -(Math.pow(2,31)-1), "Unexpected value " + val);
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
  
  testTypeChange : function(t){
    GM_setValue("testTypeChange", false);
    var val = GM_getValue("testTypeChange");
    t.assert(val === false, "Unexpected value " + val);
    t.assert(typeof(val) === "boolean", "Unexpected type " + typeof(val) + "");
    GM_setValue("testTypeChange", "test");
    val = GM_getValue("testTypeChange");
    t.assert(val === "test", "Unexpected value " + val);
    t.assert(typeof(val) == "string", "Unexpected type " + typeof(val) + "");
    t.assert(val.constructor == String, "Unexpected constructor " + val.constructor);
  }
  
});

new TestSuite("Persistence Test", {
  testPersistence : function(t){
    var val = GM_getValue("testPersistence", 0);
    GM_setValue("testPersistence", val+1);
    if(val==0){
      t.fail("This is the first time the test has been run, run the test again to make this test pass")
    }
    t.log("This test has been run " + (val+1) + " times")
  }
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
  },
  
  testIntegerOverflow : function(t){
    GM_setValue("testIntegerOverflow", Math.pow(2,32));
    var val = GM_getValue("testIntegerOverflow");
    t.assert(val !== Math.pow(2,32), "Unexpected assertion success")
    t.assert(val === 0, "Unexpected value " + val);
  },
  
  testDateOverflow : function(t){
    var d = new Date();
    GM_setValue("testDateOverflow", Number(d));
    var val = GM_getValue("testDateOverflow");
    t.assert(val !== Number(d), "Unexpected assertion success")
  }
  
});

TestManager.runner = new GreasemonkeyTestRunner("GetSetValueTest");
TestManager.run();