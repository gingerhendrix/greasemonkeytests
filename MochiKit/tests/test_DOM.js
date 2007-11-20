if (typeof(dojo) != 'undefined') { dojo.require('MochiKit.Logging'); }
if (typeof(JSAN) != 'undefined') { JSAN.use('MochiKit.Logging'); }
if (typeof(tests) == 'undefined') { tests = {}; }

tests.test_DOM = function (t) {
    var is = t.is;
    var ok = t.ok;
  
    lst = [];
    o = {"blah": function () { lst.push("original"); }};
    addToCallStack(o, "blah", function () { lst.push("new"); }, true);
    addToCallStack(o, "blah", function () { lst.push("stuff"); }, true);
    is( typeof(o.blah), 'function', 'addToCallStack has a function' );
    is( o.blah.callStack.length, 3, 'callStack length 3' );
    o.blah();
    is( lst.join(" "), "original new stuff", "callStack in correct order" );
    is( o.blah, null, "set to null" );
    lst = [];
    o = {"blah": function () { lst.push("original"); }};
    addToCallStack(o, "blah",
        function () { lst.push("new"); return false;}, false);
    addToCallStack(o, "blah", function () { lst.push("stuff"); }, false);
    o.blah();
    is( lst.join(" "), "original new", "callStack in correct order (abort)" );
    o.blah();
    is( lst.join(" "), "original new original new", "callStack in correct order (again)" );
    
    
    is( escapeHTML("<>\"&bar"), "&lt;&gt;&quot;&amp;bar", "escapeHTML" ); // for emacs highlighting: "

    var isDOM = function (value, expected, message) {
        is( escapeHTML(toHTML(value)), escapeHTML(expected), message );
    };

    var d = document.createElement('span');
    updateNodeAttributes(d, {"foo": "bar", "baz": "wibble"});
    isDOM( d, '<span baz="wibble" foo="bar"/>', "updateNodeAttributes" );

    var d = document.createElement('span');
    appendChildNodes(d, 'word up', [document.createElement('span')]);
    isDOM( d, '<span>word up<span/></span>', 'appendChildNodes' );

    replaceChildNodes(d, 'Think Different');
    isDOM( d, '<span>Think Different</span>', 'replaceChildNodes' );
    
    d = createDOM("span");
    isDOM( d, "<span/>", "createDOM empty" );


    d = createDOM("span", {"foo": "bar", "baz": "wibble"});
    isDOM( d, '<span baz="wibble" foo="bar"/>', "createDOM attributes" );

    d = createDOM("span", {"foo": "bar", "baz": "wibble"}, "one", "two", "three");
    toHTML(d);

    isDOM( d, '<span baz="wibble" foo="bar">onetwothree</span>', "createDOM contents" );

    var d = {"taco": "pork"};
    registerDOMConverter("taco",
        function (o) { return !isUndefinedOrNull(o.taco); },
        function (o) { return "Goddamn, I like " + o.taco + " tacos"; }
    );
    d = createDOM("span", null, d);
    // not yet public API
    domConverters.unregister("taco");

    isDOM( d, "<span>Goddamn, I like pork tacos</span>", "createDOM with custom converter" );
    
    is(
        escapeHTML(toHTML(SPAN(null))),
        escapeHTML(toHTML(createDOM("span", null))),
        "createDOMFunc vs createDOM"
    );

    is( scrapeText(d), "Goddamn, I like pork tacos", "scrape OK" );
    is( scrapeText(d, true).join(""), "Goddamn, I like pork tacos", "scrape Array OK" );

    var st = DIV(null, STRONG(null, "d"), "oor ", STRONG(null, "f", SPAN(null, "r"), "a"), "me");
    is( scrapeText(st), "door frame", "scrape in-order" );
    
    
    ok( !isUndefinedOrNull(getElement("test")), "getElement might work" );
    ok( !isUndefinedOrNull($("test")), "$alias$$ CASH MONEY alias might work" );

    d = createDOM("span", null, "one", "two");
    swapDOM(d.childNodes[0], document.createTextNode("uno"));
    isDOM( d, "<span>unotwo</span>", "swapDOM" );

    is( scrapeText(d, true).join(" "), "uno two", "multi-node scrapeText" );
    /*

        TODO:
            addLoadEvent (async test?)

    */

    d = createDOM("span", {"class": "foo"});
    setElementClass(d, "bar baz");
    ok( d.className == "bar baz", "setElementClass");
    toggleElementClass("bar", d);
    ok( d.className == "baz", "toggleElementClass: " + d.className);
    toggleElementClass("bar", d);
    ok( hasElementClass(d, "baz", "bar"), 
        "toggleElementClass 2: " + d.className);
    addElementClass(d, "bar");
    ok( hasElementClass(d, "baz", "bar"), 
        "toggleElementClass 3: " + d.className);
    ok( addElementClass(d, "blah"), "addElementClass return");
    ok( hasElementClass(d, "baz", "bar", "blah"), "addElementClass action");
    ok( !hasElementClass(d, "not"), "hasElementClass single");
    ok( !hasElementClass(d, "baz", "not"), "hasElementClass multiple");
    ok( removeElementClass(d, "blah"), "removeElementClass" );
    ok( !removeElementClass(d, "blah"), "removeElementClass again" );
    ok( !hasElementClass(d, "blah"), "removeElementClass again (hasElement)" );
    removeElementClass(d, "baz");
    ok( !swapElementClass(d, "blah", "baz"), "false swapElementClass" );
    ok( !hasElementClass(d, "baz"), "false swapElementClass from" );
    ok( !hasElementClass(d, "blah"), "false swapElementClass to" );
    addElementClass(d, "blah");
    ok( swapElementClass(d, "blah", "baz"), "swapElementClass" );
    ok( hasElementClass(d, "baz"), "swapElementClass has toClass" );
    ok( !hasElementClass(d, "blah"), "swapElementClass !has fromClass" );
    ok( !swapElementClass(d, "blah", "baz"), "swapElementClass twice" );
    ok( hasElementClass(d, "baz"), "swapElementClass has toClass" );
    ok( !hasElementClass(d, "blah"), "swapElementClass !has fromClass" );

    TABLE;
    TBODY;
    TR;
    var t = TABLE(null,
        TBODY({"class": "foo bar", "id":"tbody0"},
            TR({"class": "foo", "id":"tr0"}),
            TR({"class": "bar", "id":"tr1"})
        )
    );

    var matchElements = getElementsByTagAndClassName;
    is(
        map(itemgetter("id"), matchElements(null, "foo", t)).join(" "),
        "tbody0 tr0",
        "getElementsByTagAndClassName found all tags with foo class"
    );
    is(
        map(itemgetter("id"), matchElements("tr", "foo", t)).join(" "),
        "tr0",
        "getElementsByTagAndClassName found all tr tags with foo class"
    );
    is(
        map(itemgetter("id"), matchElements("tr", null, t)).join(" "),
        "tr0 tr1",
        "getElementsByTagAndClassName found all tr tags"
    );
        
    var oldDoc = document;
    var doc = MochiKit.MockDOM.createDocument();
    is( currentDocument(), document, "currentDocument() correct" );
    withDocument(doc, function () {
        ok( document != doc, "global doc unchanged" );
        is( currentDocument(), doc, "currentDocument() correct" );
        var h1 = H1();
        var span = SPAN(null, "foo", h1);
        appendChildNodes(currentDocument().body, span);
    });
    is( document, oldDoc, "doc restored" );
    is( doc.childNodes.length, 1, "doc has one child" );
    is( doc.body.childNodes.length, 1, "body has one child" );
    var sp = doc.body.childNodes[0];
    is( sp.nodeName, "SPAN", "only child is SPAN" );
    is( sp.childNodes.length, 2, "SPAN has two childNodes" );
    is( sp.childNodes[0].nodeValue, "foo", "first node is text" );
    is( sp.childNodes[1].nodeName, "H1", "second child is H1" );

    is( currentDocument(), document, "currentDocument() correct" );
    try {
        withDocument(doc, function () {
            ok( document != doc, "global doc unchanged" );
            is( currentDocument(), doc, "currentDocument() correct" );
            throw new Error("foo");
        });
        ok( false, "didn't throw" );
    } catch (e) {
        ok( true, "threw" );
    }

    doc = MochiKit.MockDOM.createDocument();
    var frm;
    withDocument(doc, function () {
        frm = FORM({name: "ignore"},
            INPUT({name:"foo", value:"bar"}),
            INPUT({name:"foo", value:"bar"}),
            INPUT({name:"baz", value:"bar"})
        );
    });
    var kv = formContents(frm);
    is( kv[0].join(","), "foo,foo,baz", "mock formContents names" );
    is( kv[1].join(","), "bar,bar,bar", "mock formContents values" );
    is( queryString(frm), "foo=bar&foo=bar&baz=bar", "mock queryString hook" );

    var kv = formContents("form_test");
    is( kv[0].join(","), "select,hidden,radio_on", "formContents names" );
    is( kv[1].join(","), "foo,test,2", "formContents values" );
    is( queryString("form_test"), "select=foo&hidden=test&radio_on=2", "queryString hook" );

    // initial
    var pos = elementPosition('posTest');
    is( pos.x, 400, 'initial x position' );
    is( pos.y, 100, 'initial y position' );
    
    // moved
    var newPos = new MochiKit.DOM.Coordinates(500, 200);
    setElementPosition('posTest', newPos);
    pos = elementPosition('posTest');
    is( pos.x, 500, 'updated x position' );
    is( pos.y, 200, 'updated y position' );

    // moved with relativeTo
    anotherPos = new MochiKit.DOM.Coordinates(100, 100);
    pos = elementPosition('posTest', anotherPos);
    is( pos.x, 400, 'updated x position (using relativeTo parameter)' );
    is( pos.y, 100, 'updated y position (using relativeTo parameter)' );
    
    pos = elementPosition('garbage'); 
    is( typeof(pos), 'undefined', // raise instead?
        'invalid element should return an undefined position' );
    
    ok( true, "test suite finished!");
    
}