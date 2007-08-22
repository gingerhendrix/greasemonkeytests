<?php echo $header ?>
// ==UserScript==
// @name          SanityTest
// @description   Tests that a simple userscript without imports still works
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// ==/UserScript==

var testEl = document.getElementById("SanityTest");
var classes = testEl.getAttribute("class");
classes = "test passed"
testEl.setAttribute("class", classes);


