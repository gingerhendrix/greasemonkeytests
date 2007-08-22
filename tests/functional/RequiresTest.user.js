<?php echo $header ?>
// ==UserScript==
// @name          RequireTest
// @description   A series of tests for new gresemonkey import functionality
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/library.js
// ==/UserScript==

function Test(name, body){
  var testEl = document.getElementById(name);
  testEl.setAttribute("class", "test passed");
  var logEl = getSingleNode("id('"+name+"')//*[@class='log']");
  
  this.assert = function(cond, msg){
    if(!cond){
      throw new AssertionFailureError("Assertion Failed: " + msg);
    }
  }
  
  this.log = function(msg){
    logEl.innerHTML += msg + "\n"
  }
  
  try{
    body(this);
  }catch(e){
    if(e instanceof AssertionFailureError){
      testEl.setAttribute("class", "test failure");
      this.log("FAILURE: " +e.message);      
    }else{
      testEl.setAttribute("class", "test error");
      this.log("ERROR: " + e.message); 
      throw e;
    }
  }
}

function AssertionFailureError(message){
   this.message = message;
   this.name = "AssertionFailureError";
}
AssertionFailureError.prototype = new Error();

function getSingleNode(xpath, root){
        return document.evaluate(xpath,
                       document, 
                       null, 
                       XPathResult.FIRST_ORDERED_NODE_TYPE, 
                       null).singleNodeValue;
}

new Test("RequiresTest", function(test){
    test.assert(someFunc, "someFunc exists");
    test.assert(someFunc instanceof Function, "someFunc is instance of function");
    test.assert(someFunc(), "someFunc  returns true");
});

