var dropNoneNested   = require("./../index").dropNoneNested;
var isNested         = require("./../index").isNested;
var fixNested        = require("./../index").fixNested;
var addColors        = require("./../index").addColors;
var fixEnding        = require("./../index").fixEnding;
var compiler         = require("./../index").Compiler();
var compilerFn       = require("./../index").compile;
var fixNestedIndexes = require("./../index").fixNestedIndexes;
var assert           = require("chai").assert;
var stripColor       = require("chalk").stripColor;

describe("isNested()", function () {

    it("returns true for nested", function () {

        var string   = "String: %Cred:This %Cgreen: has %R nested %R %Cred: colours %R";
        assert.isTrue(isNested(string));
    });
    it("returns false for none nested", function () {

        var string   = "String: %Cred:This has two colours %R %Cred: But they are not nested %R";
        assert.isFalse(isNested(string));
    });
});

describe("fix nested", function () {

    it("ignore none-nested", function () {

        var starts = [0, 10, 35];
        var ends   = [20, 30, 45];

        var actual = dropNoneNested(starts, ends);

        assert.deepEqual(actual.starts, [0, 10]);
        assert.deepEqual(actual.ends, [20, 30]);
    });
    it("ignore none-nested multiples", function () {

        var starts = [0, 10, 35, 100];
        var ends   = [20, 30, 45, 150];

        var actual = dropNoneNested(starts, ends);

        assert.deepEqual(actual.starts, [0, 10]);
        assert.deepEqual(actual.ends, [20, 30]);
    });
});

describe("Fix indexes", function(){
    it("Returns Strings that do not have nested", function () {

        var string   = "%Cred:This has two non-nested%R %Ccyan:colours%R";
        var expected = "%Cred:This has two non-nested%R %Ccyan:colours%R";
        var actual   = fixNested(string);

        assert.deepEqual(actual, expected);
    });
    it("fixes indexes", function () {

        var string   = "%Cred: Shane %Cgreen: Osbourne%R%R";
        var expected = "%Cred: Shane %Cgreen: Osbourne%R%Cred:%R";

        var actual = fixNestedIndexes(string);
        assert.equal(actual, expected);
    });
    it("fixes indexes", function () {

        var string   = "%Cred: Shane %Cgreen: Alan %R Osbourne %R";
        var expected = "%Cred: Shane %Cgreen: Alan %R%Cred: Osbourne %R";

        var actual = fixNestedIndexes(string);
        assert.equal(actual, expected);
    });
    it("fixes indexes", function () {

        var string   = "%Cred: Shane %Cgreen: Alan %R Osbourne %Cblue: is MY Name %R%R";
        var expected = "%Cred: Shane %Cgreen: Alan %R%Cred: Osbourne %Cblue: is MY Name %R%Cred:%R";

        var actual = fixNestedIndexes(string);
        assert.equal(actual, expected);
    });
    it("fixes indexes", function () {

        var string   = "%Cred: Shane %Cgreen: Alan %R Osbourne %Cblue: is MY Name %R sir %R";
        var expected = "%Cred: Shane %Cgreen: Alan %R%Cred: Osbourne %Cblue: is MY Name %R%Cred: sir %R";

        var actual = fixNestedIndexes(string);
        assert.equal(actual, expected);
    });
    it("fixes indexes", function () {

        var string   = "Start %Cred: Shane %Cgreen: Alan %R Osbourne %Cblue: is MY Name %R sir %R";
        var expected = "Start %Cred: Shane %Cgreen: Alan %R%Cred: Osbourne %Cblue: is MY Name %R%Cred: sir %R";

        var actual = fixNestedIndexes(string);
        assert.equal(actual, expected);
    });
});
describe("missing ending %R", function(){
    it("adds missing final %R", function () {
        var string   = "%Cred:SHANE";
        var expected = "%Cred:SHANE%R";

        var actual = fixEnding(string);
        assert.equal(actual, expected);
    });
    it("adds missing final %R", function () {
        var string   = "%Cred:SHANE%Cblue: hi there";
        var expected = "%Cred:SHANE%Cblue: hi there%R%R";

        var actual = fixEnding(string);
        assert.equal(actual, expected);
    });
});

describe("Adding Colors", function(){

    it("should strip all templating", function(){

        var string   = "%Cred: Shane %Cgreen: Alan %R%Cred: Osbourne %Cblue: is MY Name %R%Cred: sir %R";
        var expected = " Shane  Alan  Osbourne  is MY Name  sir ";
        var actual = stripColor(addColors(string));

        assert.equal(actual, expected);
    });
    it("should strip all templating (2)", function(){

        var string   = "%Cred:This has two non-nested%R %Ccyan:colours%R";
        var expected = "This has two non-nested colours";
        var actual = stripColor(addColors(string));

        assert.equal(actual, expected);
    });
    it("should strip all templating (3)", function(){

        var string   = "OH yeah %Cred:This has two non-nested%R %Ccyan:colours%R";
        var expected = "OH yeah This has two non-nested colours";
        var actual = stripColor(addColors(string));

        assert.equal(actual, expected);
    });
});

describe("Valid chalk methods", function(){

});

describe("E2E", function(){
    it("", function(){
        compiler.compile("%Cred:This has two non-nested%R %Ccyan:colours%R");
    });
    it("", function(){
        compilerFn("%Cred:This has two non-nested%R %Ccyan:colours%R");
    });
});