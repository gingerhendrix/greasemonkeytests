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
// @name          ErrorTest2
// @namespace     http://freegarethandrew.org/projects/GreasemonkeyImports/
// @description   A series of tests for new gresemonkey import functionality
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @require       library.js
// ==/UserScript==

GM_log("Testing error functionality");
document.body.innerHTML = "Error in console pointing to ErrorHandlingTest2.user.js<br/>";
error;

