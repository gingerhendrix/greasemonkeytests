<?php echo $header ?>
// ==UserScript==
// @name          InvalidResourceSyntaxTest
// @description   This test should fail to install with duplicate resource name error
// @namespace     <?php echo $namespace ?> 
// @include       <?php echo $testHarness ?> 
// @resource test ../../lib/test1.txt
// @resource test ../../lib/test2.txt
// ==/UserScript==
