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
// @name          LongLoadTest300
// @namespace     http://gandrew.com/projects/GreasemonkeyImports/
// @description   A series of tests for new gresemonkey import functionality
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @import test TimeoutTest.php?timeout=300
// ==/UserScript==

document.body.innerHTML = "";
GM_log("Testing import functionality");
var imp = GM_getImport("test");
var contents = imp.getContents();
document.body.innerHTML += "Test contents: <pre>"+contents+"</pre><br/>";

