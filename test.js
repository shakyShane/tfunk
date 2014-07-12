var splitter   = require("./index").splitter;
var isNested   = require("./index").isNested;
var fixNested  = require("./index").fixNested;
var getParents = require("./index").getParents;
var assert     = require("chai").assert;

describe("isNested()", function () {

    var regex;
    beforeEach(function () {
        regex = /%C([a-z].+?):([\s\S]+?)+/g;
    });

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

    it("Returns Strings that do not have nested", function () {

        var string   = "%Cred:This has two nested%R %Ccyan:colours%R";
        var expected = "%Cred:This has two nested%R %Ccyan:colours%R";
        var actual   = fixNested(string);

        assert.deepEqual(actual, expected);
    });
    it("Returns Fixed Strings", function () {

        var string   = "%Cred:This has two %Ccyan:colours%R nested%R";
        var expected = "%Cred:This has two %Ccyan:colours%R%Cred: nested%R";
        var actual   = fixNested(string);

        assert.deepEqual(actual, expected);
    });
    it("Returns Fixed Strings (2)", function () {

        var string   = "%Cred:This has 3 %Ccyan:colours%R, two of them %Cgreen:nested%R%R";
        var expected = "%Cred:This has 3 %Ccyan:colours%R%Cred:, two of them %Cgreen:nested%R%R";
        var actual   = fixNested(string);

        assert.deepEqual(actual, expected);
    });
    it("Returns Fixed Strings with 3 nested levels", function () {

//        var string   = "%Cred:This has 3 %Ccyan:nested %Cgreen: levels%R end of second%R end of first%R";
//        var expected = "%Cred:This has 3 %Ccyan:nested %Cgreen: levels%R%Ccyan: end of second%R%Cred: end of first%R";
//        var actual   = fixNested(string);
//
//        assert.deepEqual(actual, expected);
    });
});