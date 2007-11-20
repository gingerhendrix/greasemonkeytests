<?php echo $header ?>
// ==UserScript==
// @name          GettersSettersTest
// @description   Tests using JS1.5 getters and setters in a userscript
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/GMUnit.js
// ==/UserScript==

new Test("GettersSettersTest", function(test){
 
  setUp();
  testObjectGetter();
  testDefineGetter();
  testProto();
  testPrototype();
  testDefineGetterReference();
  
  function setUp(){
    GM_setValue("test", "Test Successful")
  }
  
  function testObjectGetter(){
    var obj = {
      get test(){
        GM_log("ObjectGett: In Getter");
        return GM_getValue("test")
      }
    }
    test.log("Object Getter: obj.test='"+ obj.test + "'");
    test.assert(obj.test == "Test Successful");
  };
  
  function testDefineGetter(){
    var obj = {};
    obj.__defineGetter__("test", 
      function(){ 
        GM_log("DefineGetter: In Getter");
        return GM_getValue("test")
      });
    test.log("Define Getter: obj.test='"+ obj.test + "'");
    test.assert(obj.test == "Test Successful");
  }
  
  function testDefineGetterReference(){
    var obj = {};
    obj.__defineGetter__("test",  GM_getHeaders);
    
    try{  
      test.log("Define Getter: obj.test='"+ obj.test + "'");
      test.assert(obj.test == GM_getHeaders());
    }catch(e){
      alert(e);
      throw e;
    }
    
  }
  
  function testProto(){
    var obj = {};
    obj.__proto__ = {
      get test(){
        GM_log("Proto: In Getter");
        return GM_getValue("test")
      }
    }
    test.log("Proto: obj.test='"+ obj.test + "'");
    test.assert(obj.test == "Test Successful");
  }
  
  function testPrototype(){
    function TestObj(){};
    TestObj.prototype = {
      get test(){
        GM_log("Prototype: In Getter");
        return GM_getValue("test")
      }
    }
    var obj = new TestObj();
    test.log("Prototype: obj.test='"+ obj.test + "'");
    test.assert(obj.test == "Test Successful");
  }
});