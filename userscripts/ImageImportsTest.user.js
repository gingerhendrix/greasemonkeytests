// ==UserScript==
// @name          ImageInsertionExample
// @namespace     http://www.gandrew.com/projects/GreasemonkeyImports/
// @description  Demonstrates script inject via DOM
// @include      http://www.gandrew.com/projects/GreasemonkeyImports/test.html
// @import 	image image.jpg
// ==/UserScript==

document.body.innerHTML = "";
document.body.innerHTML += "Retrieving image<br/>";
var imp = GM_getImport("image");
var url = imp.getURI();
document.body.innerHTML += "Image src = <a href=\""+url +"\">" + url + "("+url.length+")</a><br/>";
document.body.innerHTML += "Adding image<br/>";
var image = document.createElement("img");
image.src = url;
image.width=221;
image.height=219;
document.body.appendChild(image);
