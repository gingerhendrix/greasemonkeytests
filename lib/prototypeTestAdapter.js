
Test.Unit.Runner = function(tests, ignore){
  for(var test in tests){
    if(tests.hasOwnProperty(test)){
      tests[test] = testAdapter(test, tests[test]);
    }
  }
  
  var testSuite = new TestSuite(suiteName, tests);
  //alert("Suite " + testSuite.name +  " : " + testSuite.tests.length);  
}

function testAdapter(name, body){
    return function(t){
        var assertions = new Test.Unit.Assertions();
        assertions.pass = function(){
          t.assert(true);
        }
        assertions.fail = function(message){
          t.fail(message);
        }
        assertions.error = function(error, test){
          t.fail("ERROR " + error.name  + " : " + error.message);
        }
        body.apply(assertions)          
      };
}