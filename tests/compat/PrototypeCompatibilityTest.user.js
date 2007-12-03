// ==UserScript==
// @name          PrototypeCompatibilityTest
// @description   Runs MochiKit Tests in Greasemonkey Environment
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../../MonkeyTest/js/Test.js
// @require       ../../../MonkeyTest/js/TestSuite.js
// @require       ../../../MonkeyTest/js/BaseTestRunner.js
// @require       ../../../MonkeyTest/js/AbstractTestRunner.js
// @require       ../../../MonkeyTest/js/SimpleTestRunner.js
// @require       ../../../MonkeyTest/js/GreasemonkeyTestRunner.js
// @require       ../../../MonkeyTest/js/TestManager.js
//
// @require       ../../lib/prototypeCompat.js
//
// @require       ../../lib/prototype/src/base.js
// @require       ../../lib/prototype/src/string.js
// @require       ../../lib/prototype/src/enumerable.js
// @require       ../../lib/prototype/src/array.js
// @require       ../../lib/prototype/src/number.js
// @require       ../../lib/prototype/src/hash.js
// @require       ../../lib/prototype/src/range.js
// @require       ../../lib/prototype/src/ajax.js
// @require       ../../lib/prototype/src/dom.js
// @require       ../../lib/prototype/src/selector.js
// @require       ../../lib/prototype/src/form.js
// @require       ../../lib/prototype/src/event.js
// require       ../../lib/prototype/src/deprecated.js
//
// @require       ../../lib/prototype/test/lib/unittest.js
// @require       ../../lib/prototypeTestAdapter.js
//
// @import       base ../../lib/prototype/test/unit/base.html
// @import       array ../../lib/prototype/test/unit/array.html
// @import       string ../../lib/prototype/test/unit/string.html
// @import       enumerable ../../lib/prototype/test/unit/enumerable.html
// @import       number ../../lib/prototype/test/unit/number.html
// @import       hash ../../lib/prototype/test/unit/hash.html
// @import       range ../../lib/prototype/test/unit/range.html
// @import       ajax ../../lib/prototype/test/unit/ajax.html
// @import       dom ../../lib/prototype/test/unit/dom.html
// @import       selector ../../lib/prototype/test/unit/selector.html
// @import       form ../../lib/prototype/test/unit/form.html
// ==/UserScript==


var testSuites = {};
["base", "array", "string",  "enumerable",  "number",  "range",  "ajax",   "dom",  "selector", "form"].forEach(function(test){
  testSuites[test] =  addPrototypeTestSourceAsSuite(test, extractPrototypeTestSource(GM_getImportText(test)));
});

testSuites["array"].setUp = function(t){
  var testNode = document.createElement("div");
  testNode.setAttribute("id", "test_node");
  testNode.innerHTML = '22<span id="span_1"></span><span id="span_2"></span>' 
  document.body.appendChild(testNode);
}

testSuites["array"].tests[1].body  = function(t){
    t.fail("Fails due to element.update not being defined - revisit once DOM is working");
    $(element).update('22<span></span><span></span');
}
testSuites["array"].tearDown = function(t){
  var testNode = document.getElementById("test_node");
  document.body.removeChild(testNode);
}
//testSuites["array"].asynchronous = true;


testSuites["string"].tests[17].body = function(t){
  t.fail("Failure Expected: Can't work since it relies on inserted <script> elements sharing the same global scope as the test");
}

testSuites["string"].tests[39].body = function(t){
  t.fail("Failure Expected: Can't work since it relies on inserted <script> elements sharing the same global scope as the test");
}

testSuites["enumerable"].setUp = function(t){
    var testNode = document.createElement("div");
    testNode.setAttribute("id", "test_node");
    testNode.innerHTML = '<table id="grepTable"><tbody id="grepTBody"><tr id="grepRow"><th id="grepHeader" class="cell"></th><td id="grepCell" class="cell"></td>  </tr></tbody></table>'
    document.body.appendChild(testNode);
}

testSuites["enumerable"].tearDown = function(t){
  var testNode = document.getElementById("test_node");
  document.body.removeChild(testNode);
}



testSuites["ajax"].setUp = function(t){
  var testNode = document.createElement("div");
  testNode.setAttribute("id", "test_node");
  testNode.innerHTML = '<div id="testlog"> </div><div id="content"></div><div id="content2" style="color:red"></div>'
  document.body.appendChild(testNode);
}

testSuites["ajax"].tearDown = function(t){
  var testNode = document.getElementById("test_node");
  document.body.removeChild(testNode);
}


TestManager.runner = new GreasemonkeyTestRunner("PrototypeCompatibilityTest");
TestManager.asynchronous = true;
TestManager.run();