var testy = require('./lib.js');
var curl = require ("../node_curl");

var request1 = new testy({
    expected : 3,
    name : 'Empty request'
});

var req = curl.request ({
    url: "http://localhost:9000"
});
var data = req.end ();

request1.assert.equal (data.data, "GET\n");
request1.assert.equal (data.statusCode, 200);
request1.assert.deepEqual (data.headers, { 'content-type': 'text/plain' });
request1.finish();

var request2 = new testy({
    expected : 3,
    name : 'request with GET'
});

var req = curl.request ({
    url: "http://localhost:9000",
    method: "GET"
});
var data = req.end ();

request2.assert.equal (data.data, "GET\n");
request2.assert.equal (data.statusCode, 200);
request2.assert.deepEqual (data.headers, { 'content-type': 'text/plain' });
request2.finish();

var request3 = new testy({
    expected : 3,
    name : 'request with GET with some data'
});

var req = curl.request ({
    url: "http://localhost:9000",
    method: "GET"
});
var data = req.end ("some data");

request3.assert.equal (data.data, "GET\n");
request3.assert.equal (data.statusCode, 200);
request3.assert.deepEqual (data.headers, { 'content-type': 'text/plain' });
request3.finish();

var request4 = new testy({
    expected : 3,
    name : 'request with POST'
});

var req = curl.request ({
    url: "http://localhost:9000",
    method: "POST"
});
var data = req.end ();

request4.assert.equal (data.data, "POST\n");
request4.assert.equal (data.statusCode, 200);
request4.assert.deepEqual (data.headers, { 'content-type': 'text/plain' });
request4.finish();

var request5 = new testy({
    expected : 3,
    name : 'request with POST with some data'
});

var req = curl.request ({
    url: "http://localhost:9000",
    method: "POST"
});
var data = req.end ("helloworld");

request5.assert.equal (data.data, "POST\nhelloworld");
request5.assert.equal (data.statusCode, 200);
request5.assert.deepEqual (data.headers, { 'content-type': 'text/plain' });
request5.finish();

var request6 = new testy({
    expected : 3,
    name : 'request with POST with many data'
});

var req = curl.request ({
    url: "http://localhost:9000",
    method: "POST"
});
req.write ("1 line\n");
req.write ("2 line\n");
req.write ("3 line\n");
var data = req.end ("helloworld");

request6.assert.equal (data.data, "POST\n1 line\n2 line\n3 line\nhelloworld");
request6.assert.equal (data.statusCode, 200);
request6.assert.deepEqual (data.headers, { 'content-type': 'text/plain' });
request6.finish();

var get1 = new testy({
    expected : 3,
    name : 'Empty get'
});

var req = curl.get ({
    url: "http://localhost:9000"
});
var data = req.end ();

get1.assert.equal (data.data, "GET\n");
get1.assert.equal (data.statusCode, 200);
get1.assert.deepEqual (data.headers, { 'content-type': 'text/plain' });
get1.finish ();

var get2 = new testy({
    expected : 3,
    name : 'get with string option'
});

var req = curl.get ("http://localhost:9000");
var data = req.end ();

get2.assert.equal (data.data, "GET\n");
get2.assert.equal (data.statusCode, 200);
get2.assert.deepEqual (data.headers, { 'content-type': 'text/plain' });
get2.finish ();

var error1 = new testy({
    expected : 1,
    name : 'should throw when reusing req after req.end'
});

error1.assert.throws (
    function () {
        var req = curl.get ("http://localhost:9000");
        req.end ();
        req.end ();
    },
    "Request is already sent"
);
error1.finish ();