// ==UserScript==
// @name          PrototypeCompatibilityTest
// @description   Runs MochiKit Tests in Greasemonkey Environment
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../../GMTest/js/Test.js
// @require       ../../../GMTest/js/TestSuite.js
// @require       ../../../GMTest/js/TestRunner.js
// @require       ../../../GMTest/js/AbstractTestRunner.js
// @require       ../../../GMTest/js/SimpleTestRunner.js
// @require       ../../../GMTest/js/GreasemonkeyTestRunner.js
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
// require       ../../lib/prototype/src/event.js  #FAILS
// require       ../../lib/prototype/src/deprecated.js
//
// @require       ../../lib/prototype/test/lib/unittest.js
// @require       ../../lib/prototypeTestAdapter.js
//
// require      ../../lib/prototype/test/unit/base_test.js
// @import       base ../../lib/prototype/test/unit/base.html
// @import       array ../../lib/prototype/test/unit/array.html
// @import       string ../../lib/prototype/test/unit/string.html
// @import       enumerable ../../lib/prototype/test/unit/enumerable.html
// @import       number ../../lib/prototype/test/unit/number.html
// ==/UserScript==

function extractTestSource(file){
  var testFileContents = GM_getImportText(file);
  
  var testStart = testFileContents.indexOf('<!-- Tests follow -->');
  testStart = testFileContents.indexOf('\n', testStart+1); //ignore newline
  testStart = testFileContents.indexOf('\n', testStart+1); //ignore second newline
  testStart = testFileContents.indexOf('\n', testStart+1); //ignore third newline
  
  var testEnd = '// ]]>\n'
               +'</script>'

  var s = testStart                   
  var e = testFileContents.lastIndexOf(testEnd);
  return testFileContents.substring(s,e)
}
var suiteName;
["base", "array", "string", "enumerable", "number"].forEach(function(test){
  suiteName = test;
  eval(extractTestSource(test))
});


TestRunner.runner = new GreasemonkeyTestRunner("PrototypeCompatibilityTest");
TestRunner.run();