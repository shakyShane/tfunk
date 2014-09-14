var sinon  = require("sinon");
var assert = require("chai").assert;
var tfunk  = require("../index").Logger({
    prefix: "{blue:[}{magenta:tFunk}{cyan:] }",
    prefixes: {
        debug: "DEBUG",
        info:  "INFO",
        warn:  "WARN",
        error: "ERROR"
    }
});

describe.only("Logging", function(){
    var spy;
    before(function () {
        spy = sinon.spy(console, "log");
    });
    after(function () {
        spy.restore();
    });
    afterEach(function () {
        spy.reset();
    });
    it("can do console.log on info", function(){
        tfunk.log("info", "Running!");
        sinon.assert.calledWith(spy, "[tFunk] Running!");
    });
    it("Does not log when level = info", function(){
        tfunk.log("warn", "Not found");
        sinon.assert.notCalled(spy);
    });
    it("Can remove the prefix", function(){
        tfunk.unprefixed("info", "<script></script>");
        sinon.assert.calledWithExactly(spy, "<script></script>");
    });
});