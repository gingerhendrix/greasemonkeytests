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
// @name          MultipleImportsTest
// @namespace     http://gandrew.com/projects/GreasemonkeyImports/
// @description   A series of tests for new gresemonkey import functionality
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @import test1 test1.txt
// @import test2 test2.txt
// ==/UserScript==

document.body.innerHTML = "";
GM_log("Testing import functionality");

var imp = GM_getImport("test1");
var contents = imp.getContents();
document.body.innerHTML += "Test1 contents: <pre>"+contents+"</pre><br/>";

imp = GM_getImport("test2");
contents = imp.getContents();
document.body.innerHTML += "Test2 contents: <pre>"+contents+"</pre><br/>";

