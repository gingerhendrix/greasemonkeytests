
var MonkeyTest = {
  Version: '0.1.1',
};

function Test(name, body, addTest){
  this.ignoreError = false;
  this.waitForFinish = false;
  this.continuationTimeout = false;

  this.name = name;
  this.body = body;

  if(typeof(addTest)=="undefined" || addTest == true){
    TestManager.addTest(this);
  }

  this.assert = function(cond, msg){
    this.runner.testAssertion(this);
    if(!cond){
      throw new AssertionFailureError(msg);
    }

  }

  this.fail = function(msg){
     throw new AssertionFailureError(msg);
  }

  this.log = function(msg){
    this.runner.log(msg);
  }

  this.expectError = function(func){
    try{
      func();
      throw new AssertionFailureError("Expected Error");
    }catch(e){
    }
  }

  this.throwAndPass = function(e){
    this.ignoreError = true;
    throw e;
  }

  this.continueWithTimeout = function(continuation, timeout){
    this.waitForFinish = true;
    var test = this;

    var timer = window.setTimeout(function(){

      test.continuationTimeout = true;
      _run.apply(test, [function(test){
         test.fail("Continuation Timed out after: " + timeout);
      }])
    }, timeout);

    return function(){
      test.waitForFinish = false;
      window.clearTimeout(timer);

      if(!test.continuationTimeout){
        _run.apply(test, [continuation]);
      }
    }
  }

  function _run(fn){
    try{
      fn(this);
      if(!this.waitForFinish){
        this.runner.testSuccess(this);
      }
    }catch(e){
      if(e instanceof AssertionFailureError  ){
         this.runner.testFailure(this, e);
      }else if(JsUnitException && e instanceof JsUnitException){
          this.runner.testFailure(this, new AssertionFailureError(e.comment + " : " + e.jsUnitMessage));
      }else{
        if(!this.ignoreError){
          this.runner.testError(this, e);
          throw e;
        }else{
          this.ignoreError = false;
          this.log("Throwing and ignoring error " + e);
          this.runner.testSuccess(this);
          window.setTimeout(function(){
            throw e;
          }, 1);
        }
      }
    }

  }

  this.run = function(runner){
    this.runner = runner;
    this.runner.testInit(this);
    _run.apply(this,[this.body]);
  }
}

function AssertionFailureError(message){
   this.message = message;
   this.name = "AssertionFailureError";
}
AssertionFailureError.prototype = new Error();

if(typeof JsUnitException == "undefined"){
  JsUnitException = function(){};
}

if (typeof(GMTest) == "undefined") GMTest = {}
GMTest.Test = Test

function AbstractTestRunner(){
   this.initRun = function(){};
   this.finishRun = function(){};

   this.suiteInit = function(){};
   this.suiteFinish = function(){};

   this.testInit = function(){};
   this.testAssertion = function(){};
   this.testSuccess = function(){};
   this.testFailure = function(){};
   this.testError = function(){};

   this.log = function(msg){};
}

function BaseTestRunner(){

  this.initRun = function(){
    this.suites = 0;
    this.tests = 0;
    this.successes = 0;
    this.failures = 0;
    this.errors = 0;
    this.assertions = 0;
    this.passed = true;
  };
  this.finishRun = function(){};

  this.suiteInit = function(){
    this.suites++;
    this.suiteTests = 0;
    this.suiteSuccesses = 0;
    this.suiteErrors = 0;
    this.suiteFailures = 0;
    this.suitePassed = true;
  };
  this.suiteFinish = function(){};

  this.testInit = function(){
    this.assertions = 0;
    this.tests++;
    this.suiteTests++;
  };
  this.testAssertion = function(){
    this.assertions++;
  };
  this.testSuccess = function(){
    this.successes++;
    this.suiteSuccesses++;
  };
  this.testFailure = function(){
    this.failures++;
    this.suiteFailures++;
    this.passed = false;
    this.suitePassed = false;
  };
  this.testError = function(){
    this.errors++;
    this.suiteErrors++;
    this.passed = false;
    this.suitePassed = false;
  };
}

BaseTestRunner.prototype = new AbstractTestRunner();

function SimpleTestRunner(){
  this.window;
  this.testListEl;
  this.overviewEl;
  this.progressBar;

  this.base = new BaseTestRunner();

  function makeWindow(){
    var window = window.open("", "functional_test_runner", "width=600, height=600, location=no, toolbar=no, menubar=no, resizable=yes");
    window.document.body.innerHTML = "<h1>Functional Test Runner</h1>";
    return window;
  }

  function listTests(tests){
    this.testListEl = makeList(tests)
    this.window.document.body.appendChild(this.testListEl);
  }

  function makeList(tests){
    var testList = document.createElement("ul");
    tests.forEach(function(test){
      var testEl = document.createElement("li");
      var testNameEl = document.createElement("span");
      testNameEl.innerHTML = test.name;
      testEl.appendChild(testNameEl);

      if(test.constructor == TestSuite){
        var subList = makeList(test.tests);
        testEl.appendChild(subList);
      }

      testList.appendChild(testEl);
      test.element = testNameEl;
    });
    return testList;
  }

  function countTests(tests){
    var count = 0;
    tests.forEach(function(test){
      if(test.constructor == TestSuite){
        count += countTests(test.tests);
      }else{
        count += 1;
      }
    });
    return count;
  }

  this.initRun = function(tests){
    this.base.initRun(tests);
    if(SimpleTestRunner.testInNewWindow){
      this.window = makeWindow();
    }else{
      this.window = window;
    }
    var numTests = countTests(tests)
    this.progressBar = new ProgressBar(numTests);
    this.window.document.body.appendChild(this.progressBar.element);
    this.overviewEl = this.window.document.createElement("div");
    this.overviewEl.innerHTML = numTests + " tests";
    this.window.document.body.appendChild(this.overviewEl);
    listTests(tests);
  }

  this.finishRun = function(){
    this.base.finishRun();
  }

  this.suiteInit = function(suite){
    this.base.suiteInit(suite);
    suite.element.style.color = "#0000ff";
  }

  this.suiteFinish = function(suite){
    this.base.suiteFinish(suite);
    var msg = " (" + this.base.suiteTests + " tests";
    if(this.base.suiteFailures > 0){
      msg += ", "  + this.base.suiteFailures + " failures";
    }
    if(this.base.suiteErrors > 0){
      msg += ", "  + this.base.suiteErrors + " errors";
    }
    msg += ")";
    suite.element.innerHTML += msg;
    if(this.base.suitePassed){
      suite.element.style.color = "#00ff00";
    }else{
      suite.element.style.color = "#ff0000";
    }
  }

  this.testInit = function(test){
    this.base.testInit(test);
    test.element.style.color = "#0000ff";
  }

  this.testAssertion = function(test){
    this.base.testAssertion(test);
  }

  this.testSuccess = function(test){
    this.base.testSuccess(test);
    test.element.style.color = "#00ff00";
    test.element.innerHTML += " (" + this.base.assertions + " assertions)"
    this.progressBar.increment();
  }

  this.testFailure = function(test, e){
    this.base.testFailure(test);
    _failure.call(this, test, "Failure: " + e.message)
  }

  this.testError = function(test, e){
     this.base.testError(test);
    _failure.call(this, test, "Error: " + e.message)

  }

  function _failure(test, message){
    test.element.style.color = "#ff0000";
    var msg = document.createElement("div");
    msg.innerHTML = message;
    test.element.appendChild(msg);
    this.progressBar.increment();
    this.progressBar.fail();
    suitePassed = false;
  }

  function ProgressBar(numTests){
    this.element;
    var bar;
    var testsRan = 0;

    function init(){
      this.element = document.createElement("div");

      var barContainer = document.createElement("div");
      this.element.appendChild(barContainer);
      barContainer.style.width = "200px";
      barContainer.style.height = "40px";
      barContainer.style.border = "1px solid black";

      bar = document.createElement("div");
      barContainer.appendChild(bar);
      bar.style.width = "1px";
      bar.style.height = "40px";
      bar.style.backgroundColor = "#00ff00";
    }
    init.apply(this, []);

    this.increment = function(){
      testsRan+=1.0;
      bar.style.width = Math.ceil((testsRan/numTests)*200)+"px";
    }

    this.fail = function(){
      bar.style.backgroundColor = "#ff0000";
    }
  }
}

SimpleTestRunner.prototype = new AbstractTestRunner();

SimpleTestRunner.testInNewWindow = false;


function GreasemonkeyTestRunner(name){
  this.testEl;
  this.logEl;
  this.base = new BaseTestRunner();

  this.initRun = function(tests){
    this.base.initRun(tests);
    this.testEl = document.getElementById(name);
    this.logEl = document.evaluate("id('"+name+"')//*[@class='log']",
                       document,
                       null,
                       XPathResult.FIRST_ORDERED_NODE_TYPE,
                       null).singleNodeValue;
    this.testsEl = document.evaluate("id('"+name+"')//*[@class='tests']",
                       document,
                       null,
                       XPathResult.FIRST_ORDERED_NODE_TYPE,
                       null).singleNodeValue;
    makeList(this.testsEl, tests);
    this.testEl.setAttribute("class", "test running");
  }

  function makeList(testsEl, tests){
    for(var i=0; i<tests.length; i++){
      var testLi = document.createElement("li");

      var testNameEl = document.createElement("span");
      testNameEl.innerHTML = tests[i].name;

      tests[i].element = testNameEl;
      testLi.appendChild(testNameEl);

       if(tests[i].tests){
         var subList =document.createElement("ul");
         makeList(subList, tests[i].tests);
         testLi.appendChild(subList);
      }

      testsEl.appendChild(testLi);
    }
  }

  this.log = function(msg){
    var msgNode = document.createElement("div");
    msgNode.innerHTML = msg;
    this.logEl.appendChild(msgNode);
  }

  this.finishRun = function(){
    this.base.finishRun();
    if(this.base.passed){
      this.testEl.setAttribute("class", "test passed");
    }else{
      this.testEl.setAttribute("class", "test failure");
    }
  }

  this.suiteInit = function(suite){
    this.base.suiteInit(suite);
    suite.element.setAttribute("class", "suite running")
  }

  this.suiteFinish = function(suite){
    this.base.suiteFinish(suite);
    var msg = " (" + this.base.suiteTests + " tests";
    if(this.base.suiteFailures > 0){
      msg += ", "  + this.base.suiteFailures + " failures";
    }
    if(this.base.suiteErrors > 0){
      msg += ", "  + this.base.suiteErrors + " errors";
    }
    msg += ")";
    suite.element.innerHTML += msg;
    if(this.base.suitePassed){
      suite.element.setAttribute("class", "suite success")
    }else{
      suite.element.setAttribute("class", "suite failure")
    }
  }

  this.testInit = function(test){
    this.base.testInit(test);
    test.element.setAttribute("class", "running")
  }

  this.testAssertion = function(test){
    this.base.testAssertion(test);
  }

  this.testSuccess = function(test){
    this.base.testSuccess(test);
    test.element.setAttribute("class", "success")
    test.element.innerHTML += " (" + this.base.assertions + " assertions)"
  }

  this.testFailure = function(test, e){
    this.base.testFailure(test, e);
    test.element.setAttribute("class", "failure")
    test.element.innerHTML += " FAILED"
    this.log("FAILURE: "+ test.name + " : " + e.message);
  }

  this.testError = function(test, e){
     this.base.testError(test, e);
     test.element.setAttribute("class", "error")
     test.element.innerHTML += " ERROR"
     this.log("ERROR: " + test.name + " : " + e.message);
  }
}

GreasemonkeyTestRunner.prototype = new AbstractTestRunner();

var TestManager = new function(){
  this.runner = new SimpleTestRunner();
  this.asynchronous = false;
  var tests = [];

  this.addTest = function(test){
    tests.push(test);
  }

  this.run = function(){
    var queue = new RunQueue();
    var runner = this.runner;
    var self = this;
    queue.add(runner, runner.initRun, [tests]);
    tests.forEach(function(test){
      if(test.constructor == TestSuite){
        self.runSuite(queue, test);
      }else{
        self.runTest(queue, test);
      }
    });
    queue.add(runner, runner.finishRun);

    queue.start();
  }

  this.runSuite = function(queue, suite){
   var runner = this.runner;
   queue.add(runner, runner.suiteInit, [suite]);
   suite.tests.forEach(function(test){
     queue.add(runner, runner.testInit, [test]);
     queue.add(test, suite.setUp, [test]);
     queue.add(test, test.run, [runner]);
     queue.add(test, suite.tearDown, [test]);
   });
   queue.add(runner, runner.suiteFinish, [suite]);
  }

  this.runTest = function(queue, test){
    var runner = this.runner;
    queue.add(runner, runner.testInit, [test]);
    queue.add(test, test.run, [runner]);
  }

}();

var RunQueue = function(){
  var runnables = [];
  var currentRunnable = 0;
  var timer;

  this.add = function(self, func, args){
    if(!self || !func){
      throw new Error("Cannot create runnable " + self + ", " + func + ", " + args);
    }
    runnables.push({self : self, func : func, args : args});
  }

  this.start = function(){
    currentRunnable = 0;
    timer = window.setInterval(next, 10);
  }

  function next(){
    if(currentRunnable >= runnables.length){
      window.clearInterval(timer);
      return;
    }
    var runnable = runnables[currentRunnable++];
    runnable.func.apply(runnable.self, runnable.args || []);
  }
};

function TestSuite(name, tests){
  this.name = name;
  this.tests = [];
  this.setUp = function(){};
  this.tearDown = function(){};
  this.asynchronous = false;

  TestManager.addTest(this);

  function init(){
    for(var test in tests){
      if(isTestMethod(tests, test)){
        this.tests.push(new GMTest.Test(test, tests[test], false));
      }
    }
    if(typeof(tests[TestSuite.setUpProperty]) == 'function'){
      this.setUp = tests[TestSuite.setUpProperty];
    }
    if(typeof(tests[TestSuite.tearDownProperty]) == 'function'){
      this.tearDown = tests[TestSuite.tearDownProperty];
    }
  }

  function isTestMethod(obj, prop){
    return obj.hasOwnProperty(prop)
      && typeof(obj[prop])=="function"
      && prop != TestSuite.setUpProperty
      && prop != TestSuite.tearDownProperty
      && prop.indexOf("_") != 0;
  }

  init.apply(this);
}

TestSuite.setUpProperty = "setUp"
TestSuite.tearDownProperty = "tearDown"