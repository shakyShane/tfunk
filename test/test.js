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

describe("E2E", function(){
    it("", function(){
        compilerFn("%Cred:This has two non-nested%R %Ccyan:colours%R");
    });
    it("", function(){
        compilerFn("%Cred:This has two non-nested%R %Ccyan:colours%R");
    });
});