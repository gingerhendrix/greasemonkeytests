<?php echo $header ?>
// ==UserScript==
// @name          InstallationSanityTest
// @description   Tests that a simple userscript without imports still installs
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// ==/UserScript==

var testEl = document.getElementById("InstallationSanityTest");
var classes = testEl.getAttribute("class");
classes = "test passed"
testEl.setAttribute("class", classes);

