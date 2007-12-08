<?php echo $header ?>
// ==UserScript==
// @name          DelayedInstallationErrorTest
// @description   This test should fail to install with a 404 error after 10 seconds
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @resource test   ../../lib/delay.php?timeout=10&content=error.php
// ==/UserScript==

