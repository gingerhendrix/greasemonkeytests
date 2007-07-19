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
// @name          CollidingUserscriptNameTest
// @namespace     http://gandrew.com/projects/GreasemonkeyImports/
// @description   Tests two userscripts with same name but different namespaces don't collide 
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @import test1 test1.txt
// @import test2 somefolder/test1.txt
// ==/UserScript==

document.body.innerHTML = "";
GM_log("Testing import functionality");
var imp1 = GM_getImport("test1");
var contents1 = imp.getContents();
document.body.innerHTML += "Test1 contents: <pre>"+contents1+"</pre><br/>";

var imp2 = GM_getImport("test2");
var contents2 = imp.getContents();
document.body.innerHTML += "Test2 contents: <pre>"+contents2+"</pre><br/>";

