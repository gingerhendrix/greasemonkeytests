<?php echo $header ?>
// ==UserScript==
// @name          XHRTest
// @description   Tests the GM_xmlhttprequest method
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @require       ../../lib/monkeytest.js
// @require       ../../lib/GreasemonkeyTestRunner.js
// #require       ../../../GreasemonkeyRepl/repl.js
// @resource      dialog ../../../GreasemonkeyRepl/dialog.html
// ==/UserScript==

new TestSuite("XHRTests", (function(){
  var testScriptUrl = "<?php echo $libUrl ?>xhr.php";
  
  function assertResponseOk(t, response){
     t.assert(response.status == 200, "Expected response.status==200 got " +  response.status);
     t.assert(response.statusText == "OK", "Expected response.statusTest=='OK' got " +  response.statusText);
  }
  
  function parseResponseHeaders(headersText){
    var headerArray = headersText.split("\n");
    var headers = {};
    headerArray.forEach(function(header){
      var delim = header.indexOf(":");
      if(delim > 0){
        var key = header.substring(0, delim);
        var value = header.substring(delim+2);
        headers[key] = value
      }
    });
    return headers;
  }
  
  var parseRequestHeaders = parseResponseHeaders;
  
  return {
    getRequest : function(t){
      var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        t.assert(response.responseText == "GET OK", "Expected response.responseText=='GET OK' got " +  response.responseText);
        t.assert(response.finalUrl == testScriptUrl, "Expected response.finalUrl=='"+testScriptUrl+"' got " + response.finalUrl);
      }, 5000);
      var xhr = GM_xmlhttpRequest({
        method : "GET",
        url : testScriptUrl,
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) }
      });
    },
    
    postRequest : function(t){
     var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        t.assert(response.responseText == "POST OK", "Expected response.responseText=='POST OK' got " +  response.responseText);
        t.assert(response.finalUrl == testScriptUrl, "Expected response.finalUrl=='"+testScriptUrl+"' got " + response.finalUrl);
      }, 5000);
      var xhr = GM_xmlhttpRequest({
        method : "POST",
        url : testScriptUrl,
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) }
      });
    },
    
    putRequest : function(t){
     var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        t.assert(response.responseText == "PUT OK", "Expected response.responseText=='PUT OK' got " +  response.responseText);
        t.assert(response.finalUrl == testScriptUrl, "Expected response.finalUrl=='"+testScriptUrl+"' got " + response.finalUrl);
      }, 5000);
      var xhr = GM_xmlhttpRequest({
        method : "PUT",
        url : testScriptUrl,
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) }
      });
    },
    
    headRequest : function(t){
     var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        t.assert(response.responseText == "", "Expected response.responseText=='' got " +  response.responseText);
        t.assert(response.finalUrl == testScriptUrl, "Expected response.finalUrl=='"+testScriptUrl+"' got " + response.finalUrl);
      }, 5000);
      var xhr = GM_xmlhttpRequest({
        method : "HEAD",
        url : testScriptUrl,
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) }
      });
    },
    
    deleteRequest : function(t){
     var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        t.assert(response.responseText == "DELETE OK", "Expected response.responseText=='' got " +  response.responseText);
        t.assert(response.finalUrl == testScriptUrl, "Expected response.finalUrl=='"+testScriptUrl+"' got " + response.finalUrl);
      }, 5000);
      var xhr = GM_xmlhttpRequest({
        method : "DELETE",
        url : testScriptUrl,
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) }
      });
    },
    
    customRequest : function(t){
     var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        t.assert(response.responseText == "CUSTOM OK", "Expected response.responseText=='' got " +  response.responseText);
        t.assert(response.finalUrl == testScriptUrl, "Expected response.finalUrl=='"+testScriptUrl+"' got " + response.finalUrl);
      }, 5000);
      var xhr = GM_xmlhttpRequest({
        method : "CUSTOM",
        url : testScriptUrl,
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) }
      });
    },
    
    postRequestWithData : function(t){
     var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        t.assert(response.responseText == "TEST_DATA", "Expected response.responseText=='TEST_DATA' got " +  response.responseText);
      }, 5000);
       var xhr = GM_xmlhttpRequest({
        method : "POST",
        url : testScriptUrl+"?echo-data=true",
        data : "TEST_DATA",        
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) }
      });
    },
   
  // Don't know how to force an error
  /*  errorTest : function(t){
     var continuation = t.continueWithTimeout(function(t, error){
        
      }, 5000);
      var xhr = GM_xmlhttpRequest({
        method : "GET",
        url : "",
        onload : function(response){ t.fail("onload callback!") },
        onerror :  continuation
      });
    },*/
    
    disallowFileUrls : function(t){
      t.expectError(function(){
        var xhr = GM_xmlhttpRequest({
          method : "GET",
          url : "file:///etc/passwd",
          onload : function(response){ t.fail("onload callback!") },
          onerror :  function(response){ t.fail("onerror callback!") }
        });
      });
    },
    
    disallowChromeUrls : function(t){
      t.expectError(function(){
        var xhr = GM_xmlhttpRequest({
          method : "GET",
          url : "chrome://greasemonkey/content/browser.xul",
          onload : function(response){ t.fail("onload callback!") },
          onerror :  function(response){ t.fail("onerror callback!") }
        });
      });
    },
    
    finalUrlChange : function(t){
      var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        var redirectedUrl = testScriptUrl + "?redirected=true";
        t.assert(response.finalUrl ==  redirectedUrl, "Expected response.finalUrl=='"+redirectedUrl+"' got " + response.finalUrl);
      }, 5000);
      var xhr = GM_xmlhttpRequest({
        method : "GET",
        url : testScriptUrl + "?redirect=true",
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) }
      });
    },
    
    responseHeaders : function(t){
      var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        headers = parseResponseHeaders(response.responseHeaders);
        t.assert(headers['Content-Type'] == "text/html", "Expected header Content-Type == text/html got " + headers['Content-Type']);
        t.assert(headers['Content-Length'] == "6", "Expected header Content-Length == 2 got " + headers['Content-Length']);
        t.assert(headers['Custom-Header'] == "blah", "Expected header Custom-Header == blah got " + headers['Custom-Header']);
      }, 5000);
      var xhr = GM_xmlhttpRequest({
        method : "GET",
        url : testScriptUrl + "?custom-header=blah",
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) }
      });
    },
    
    requestHeaders : function(t){
      var testHeaders = {
          'Accept' : 'test/greasemonkey',
          'Accept-Charset' : 'gm',
          'Accept-Language' : 'en-gm',
          'Accept-Encoding' : 'test',
          'User-Agent' : "greasemonkey",
          'Connection' : "conn",
          'Host' : "example.org",
          'Referer' : "http://www.google.com"
        } 
        
      var continuation = t.continueWithTimeout(function(t, response){
        assertResponseOk(t, response);
        headers = parseRequestHeaders(response.responseText);
        for (var header in testHeaders) {
          if(header == "Referer"){
            t.assert(headers["Referer"] == "", "Referer should not be set, but was set to "  + headers["Referer"]);          
            continue;
          }
          t.assert(headers[header] == testHeaders[header], "Expected header " + header + " to be " + testHeaders[header] + " got " + headers[header]);
        }
      }, 5000);
      t.log("<a href='"+testScriptUrl + "?show-headers=true'>Test Script</a>");
      var xhr = GM_xmlhttpRequest({
        method : "GET",
        url : testScriptUrl + "?show-headers=true",
        onload : continuation,
        onerror : function(response){ t.fail("onerror callback : " + response.status + ":" + response.statusText) },
        headers : testHeaders
      });
    
    }     
  }
})());



TestManager.runner = new GreasemonkeyTestRunner("XHRTest");
TestManager.run();
