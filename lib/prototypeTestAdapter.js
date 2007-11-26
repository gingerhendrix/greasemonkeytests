
function extractPrototypeTestSource(testFileContents){
  
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


function addPrototypeTestSourceAsSuite(name, source){
  var testSuite;
  Test.Unit.Runner = function(tests, ignore){
    for(var test in tests){
      if(tests.hasOwnProperty(test)){
        tests[test] = testAdapter(test, tests[test]);
      }
    }
    
    testSuite = new TestSuite(name, tests);
    //alert("Suite " + testSuite.name +  " : " + testSuite.tests.length);  
  }

  eval(source);

  return testSuite;
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

}
  
TestSuite.setUpProperty = "setup";
TestSuite.tearDownProperty = "teardown";

