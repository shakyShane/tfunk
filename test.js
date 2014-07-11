var splitter = require("./index").splitter;
var isNested = require("./index").isNested;
var assert   = require("chai").assert;

describe("yo", function () {

    it("can do single colours", function () {

        var string = '%Cgreen:Shane is ace %CR';

        var expected = [
            {
                color: "green",
                content: "Shane is ace "
            }
        ];

        var actual = splitter(string);

        assert.deepEqual(actual, expected);
    });

    it("can smash nested", function () {

        var nestedString = '%Cgreen:Shane %Cred:Osbourne%CR is ace %CR';

        var expected = [
            {
                color: "green",
                content: "Shane "
            },
            {
                color: "red",
                content: "Osbourne"
            },
            {
                color: "green",
                content: " is ace "
            }
        ];

        var actual = splitter(nestedString);

        assert.deepEqual(actual, expected);
    });

    it("triple nested", function () {

        var nestedString = '%Cgreen:Shane %Cred:Osbourne%Corange: Aydin is the king!%CR%CR is ace %CR';

        var expected = [
            {
                color: "green",
                content: "Shane "
            },
            {
                color: "red",
                content: "Osbourne"
            },
            {
                color: "orange",
                content: " Aydin is the king!"
            },
            {
                color: "green",
                content: " is ace "
            }
        ];

        var actual = splitter(nestedString);

        assert.deepEqual(actual, expected);
    });

    it("double nested, twice", function () {

        var nestedString = '%Cgreen:Shane %Cred:Osbourne%CR%CR %Cblue: is ace%CR' ;

        var expected = [
            {
                color: "green",
                content: "Shane "
            },
            {
                color: "red",
                content: "Osbourne"
            },
            {
                color: "blue",
                content: " is ace"
            }
        ];

        var actual = splitter(nestedString);

        assert.deepEqual(actual, expected);
    });

    it("simple colours", function () {

        var nestedString = '%Cgreen:Shane %CR%Cred:Osbourne%CR';

        var expected = [
            {
                color: "green",
                content: "Shane "
            },
            {

                color: "red",
                content: "Osbourne"
            }
        ];

        var actual = splitter(nestedString);

        assert.deepEqual(actual, expected);
    });


});

describe("isNested", function () {

    var regex;
    beforeEach(function () {
        regex = /%C(.+?):([\s\S]+?)%CR(?!.*%CR)/g;
    });

    it("isNested with non nested string", function() {

        var nonNestedString = '%Cgreen:Shane %CR%Cred:Osbourne%CR';
        var actual = isNested(nonNestedString, regex);
        assert.equal(actual, false);
    });


    it("isNested with nested string", function() {

        var nestedString = '%Cgreen:Shane %Cred:Osbourne%Corange: Aydin is the king!%CR%CR is ace %CR';
        var actual = isNested(nestedString, regex);
        assert.equal(actual, true);
    });

    it("isNested with string with no colours", function() {

        var nestedString = 'No gay colours here';
        var actual = isNested(nestedString, regex);
        assert.equal(actual, false);
    });
});