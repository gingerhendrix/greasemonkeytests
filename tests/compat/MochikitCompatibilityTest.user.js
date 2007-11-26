// ==UserScript==
// @name          MochikitCompatibilityTest
// @description   Runs MochiKit Tests in Greasemonkey Environment
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../../GMTest/js/Test.js
// @require       ../../../GMTest/js/AbstractTestRunner.js
// @require       ../../../GMTest/js/SimpleTestRunner.js
// @require       ../../../GMTest/js/GreasemonkeyTestRunner.js
// @require       ../../../GMTest/js/TestManager.js
// @require       ../../MochiKit/Base.js
// @require       ../../MochiKit/Iter.js
// @require       ../../MochiKit/DOM.js
// @require       ../../MochiKit/Color.js
// @require       ../../MochiKit/DateTime.js
// @require       ../../MochiKit/Format.js
// @require       ../../MochiKit/Logging.js
// @require       ../../MochiKit/Signal.js
// @require       ../../MochiKit/MockDOM.js
// @require       ../../MochiKit/tests/test_Base.js
// @require       ../../MochiKit/tests/test_Iter.js
// @require       ../../MochiKit/tests/test_Color.js
// @require       ../../MochiKit/tests/test_DateTime.js
// @require       ../../MochiKit/tests/test_Format.js
// @require       ../../MochiKit/tests/test_Logging.js
// @require       ../../MochiKit/tests/test_Signal.js
// @require       ../../MochiKit/tests/test_DOM.js
// ==/UserScript==

var simpleTest = function(test){
  return {
     is : function(actual, expected, msg){
        test.assert(actual == expected, "Expected: " + expected + " Got: " + actual + " : " + msg);
      },
      ok : function(cond, msg){
        test.assert(cond, "Not OK : " + msg);
      }
  };
}

new Test("BaseTest", 
  function(t){
    tests.test_Base(simpleTest(t));
  }
);

new Test("IterTest", 
  function(t){
    tests.test_Iter(simpleTest(t));
  }
);

new Test("ColorTest", 
  function(t){
    tests.test_Color(simpleTest(t));
  }
);

new Test("DateTimeTest", 
  function(t){
    tests.test_DateTime(simpleTest(t));
  }
);

new Test("FormatTest", 
  function(t){
    tests.test_Format(simpleTest(t));
  }
);

new Test("LoggingTest", 
  function(t){
    tests.test_Logging(simpleTest(t));
  }
);

new Test("SignalTest", 
  function(t){
    var mockInput = document.createElement("input");
    mockInput.setAttribute("type", "submit");
    mockInput.setAttribute("id", "submit");
    document.body.appendChild(mockInput);
    var continuation = t.continueWithTimeout(function(){
      tests.test_Signal(simpleTest(t));
      document.body.removeChild(mockInput);
    }, 500);
    window.setTimeout(continuation, 1);
  }
);

new Test("DOMTest", 
  function(t){
    var testHTML = 
      '<div id="posTest" style="position: absolute; left: 400px; top: 100px; width: 100px; height: 100px; background: red;">&nbsp;</div>'
    + '<div style="display: none;">'
    + '<form id="form_test">'
    + '<select name="select">'
    + '     <option value="foo" selected="selected">foo</option>'
    + '     <option value="bar">bar</option>'
    + '         <option value="baz">baz</option>'
    + '</select>'
    + '<input type="hidden" name="hidden" value="test" />'
    + '<input type="radio" name="radio_off" value="1" />'
    + '<input type="radio" name="radio_off" value="2" />'
    + '<input type="radio" name="radio_off" value="3" />'
    + '<input type="radio" name="radio_on" value="1" />'
    + '<input type="radio" name="radio_on" value="2" checked="checked" />'
    + '<input type="radio" name="radio_on" value="3" />'
    + '</form>'
    + '</div>'
    + '<pre id="test"></pre>';
    var testDiv = document.createElement("div");
    testDiv.innerHTML = testHTML;
    document.body.appendChild(testDiv);
    
    var continuation = t.continueWithTimeout(function(){
      tests.test_DOM(simpleTest(t));
      document.body.removeChild(testDiv);
    }, 500);
    window.setTimeout(continuation, 1);
  }
);

TestManager.runner = new GreasemonkeyTestRunner("MochikitCompatibilityTest");
TestManager.run();