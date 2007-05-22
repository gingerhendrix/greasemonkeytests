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
// @name          404ImportTest
// @namespace     http://gandrew.com/projects/GreasemonkeyImports/
// @description   Test behaviour when a dependency 404's
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @import test 404.txt
// ==/UserScript==

document.body.innerHTML = "";
GM_log("Testing import functionality");
var imp = GM_getImport("test");
var contents = imp.getContents();
document.body.innerHTML += "Test contents: <pre>"+contents+"</pre><br/>";

