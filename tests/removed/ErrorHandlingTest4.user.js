// Test for greasemonkey imports.
// version 0.1
// 2005-09-08
// Copyright (c) 2005, Gareth Andrew
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ErrorTest4
// @namespace     http://freegarethandrew.org/projects/GreasemonkeyImports/
// @description   A series of tests for new gresemonkey import functionality
// @include       http://localhost/eclipse/GreasemonkeyImports/test.php
// @require       ../../lib/GMUnit.js
// @require       ../../lib/error.js
// ==/UserScript==

new Test("ErrorHandlingTest4", function(test){
  test.log("There should be an error in the console pointing to ErrorHandlingTest4.user.js");
  try{
    throw new Error("Test Error")
  }catch(e){
    test.throwAndPass(e); 
  }
});
