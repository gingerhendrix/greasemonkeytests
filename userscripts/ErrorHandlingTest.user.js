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
// @name          ErrorTest
// @namespace     http://freegarethandrew.org/projects/GreasemonkeyImports/
// @description   A series of tests for new gresemonkey import functionality
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @require       library.js
// @require       error.js
// ==/UserScript==

GM_log("Testing error functionality");
document.body.innerHTML = "Calling test() (should create error in console pointing to error.js)<br/>";
test();

