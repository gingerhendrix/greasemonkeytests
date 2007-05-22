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
// @name          CookiesTest
// @namespace     http://gandrew.com/projects/GreasemonkeyImports/
// @description   Tests if cookies are sent with import requests
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @import test getcookie.php
// ==/UserScript==

document.body.innerHTML = "";
GM_log("Testing cookies");
var imp = GM_getImport("test");
var contents = imp.getContents();
document.body.innerHTML += "GetCookie: <pre>"+contents+"</pre><br/>";

