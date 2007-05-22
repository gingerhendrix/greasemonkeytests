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
// @name          LongLoadTest20
// @namespace     http://gandrew.com/projects/GreasemonkeyImports/
// @description   A userscript with a dependency that takes 20 seconds to load
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @import test TimeoutTest.php?timeout=20
// ==/UserScript==

document.body.innerHTML = "";
GM_log("Testing import functionality");
var imp = GM_getImport("test");
var contents = imp.getContents();
document.body.innerHTML += "Test contents: <pre>"+contents+"</pre><br/>";

