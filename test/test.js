//var compiler         = require("./../index").Compiler();
var compilerFn       = require("./../index");
var assert           = require("chai").assert;
var stripColor       = require("chalk").stripColor;

describe("Adding Colors", function(){

    it("should strip all templating", function(){

        var string   = "%Cred: Shane %Cgreen: Alan %R%Cred: Osbourne %Cblue: is MY Name %R%Cred: sir %R";
        var expected = " Shane  Alan  Osbourne  is MY Name  sir ";
        var actual = stripColor(compilerFn(string));

        assert.equal(actual, expected);
    });
    it("should strip all templating (2)", function(){

        var string   = "%Cred:This has two non-nested%R %Ccyan:colours%R";
        var expected = "This has two non-nested colours";
        var actual = stripColor(compilerFn(string));

        assert.equal(actual, expected);
    });
    it("should strip all templating (3)", function(){

        var string   = "OH yeah %Cred:This has two non-nested%R %Ccyan:colours%R";
        var expected = "OH yeah This has two non-nested colours";
        var actual = stripColor(compilerFn(string));

        assert.equal(actual, expected);
    });
});

describe("Paths for chained CHALK methods", function(){
    it("", function(){
        var out = compilerFn("%Cblue.bgRed.bold:This has two non-nested");
        assert.equal(out, "\u001b[1m\u001b[41m\u001b[34mThis has two non-nested\u001b[39m\u001b[49m\u001b[22m");
    });
});

describe("Custom functions", function(){
    it("can use custom functions", function(){
        var out = compilerFn("%Cshane:This has two non-nested", {
            "shane": function () {
                return "shane is awesome";
            }
        });
        assert.equal(out, "shane is awesome");
    });
    it("can use the compiler internally", function(){
        var out = compilerFn("%Cshane:This has two non-nested", {
            "shane": function () {
                return this.compile("%Cred:shane is awesome");
            }
        });
        assert.equal(out, "\u001b[31mshane is awesome\u001b[39m");
    });
});