//var compiler         = require("./../index").Compiler();
var tfunk       = require("./../index");
var assert           = require("chai").assert;
var stripColor       = require("chalk").stripColor;

describe("Adding Colors", function(){

    it("should strip all templating", function(){

        var string   = "{red: Shane {green: Alan }{red: Osbourne {blue: is MY Name }{red: sir }";
        var expected = " Shane  Alan  Osbourne  is MY Name  sir ";
        var actual = stripColor(tfunk(string));

        assert.equal(actual, expected);
    });
    it("should strip all templating (2)", function(){

        var string   = "{red:This has two non-nested} {cyan:colours}";
        var expected = "This has two non-nested colours";
        var actual = stripColor(tfunk(string));

        assert.equal(actual, expected);
    });
    it("should strip all templating (3)", function(){

        var string   = "OH yeah {red:This has two non-nested} {cyan:colours}";
        var expected = "OH yeah This has two non-nested colours";
        var actual = stripColor(tfunk(string));

        assert.equal(actual, expected);
    });
});

describe("Paths for chained CHALK methods", function(){
    it("", function(){
        var out = tfunk("{blue.bgRed.bold:This has two non-nested");
        assert.equal(out, "This has two non-nested");
    });
});

describe("Custom functions", function(){
    it("can use custom functions", function(){
        var out = tfunk("{shane:This has two non-nested", {
            "shane": function () {
                return "shane is awesome";
            }
        });
        assert.equal(out, "shane is awesome");
    });
    it("can use the compiler internally", function(){
        var out = tfunk("{shane:This has two non-nested", {
            "shane": function () {
                return this.compile("{red:shane is awesome");
            }
        });
        assert.equal(out, "shane is awesome");
    });
});

describe("Compiler instance", function(){
    it("Can create an instance", function(){
        var compiler = new tfunk.Compiler();
        var out = compiler.compile("shane");
        assert.equal(out, "shane");
    });
    it("Can use custom methods", function(){
        var compiler = new tfunk.Compiler({
            warn: function (string) {
                return string + " + JS";
            }
        });
        var out = compiler.compile("{warn:HTML");
        assert.equal(out, "HTML + JS");
    });
});