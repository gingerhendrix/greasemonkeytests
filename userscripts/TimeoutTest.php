<?php
$timeout = $_GET['timeout'] ? $_GET['timeout'] : 30;
set_time_limit($timeout + 5);
sleep($timeout);

?>
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
// @name          LongUserscriptLoadTest
// @namespace     http://gandrew.com/projects/GreasemonkeyImports/
// @description   A userscript that takes a long time to load
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @import test TimeoutTest.php?timeout=5
// ==/UserScript==

document.body.innerHTML = "";
GM_log("Testing import functionality");
var imp = GM_getImport("test");
var contents = imp.getContents();
document.body.innerHTML += "Test contents: <pre>"+contents+"</pre><br/>";

