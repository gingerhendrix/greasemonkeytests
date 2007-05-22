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
// @name          URLsTest
// @namespace     http://gandrew.com/projects/GreasemonkeyImports/
// @description   Test different ways of writing a url
// @include       http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @import test1 test1.txt
// @import test2 http://localhost/eclipse/GreasemonkeyImports/userscripts/test1.txt
// @import test3 /eclipse/GreasemonkeyImports/userscripts/test1.txt
// @import test4 ../userscripts/test1.txt 
// ==/UserScript==

document.body.innerHTML = "";
GM_log("Testing import functionality");
for(var i=1; i<5; i++){
    var imp = GM_getImport("test"+i);
    var contents = imp.getContents();
    document.body.innerHTML += "Test contents: <pre>"+contents+"</pre><br/>";
}
