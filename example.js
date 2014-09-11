var compile   = require("./index");
var chalk     = require("chalk");
var multiline = require("multiline");
var compiler = require("./index").Compiler({
    prefix: "{blue:[}{magenta:tFunk}{cyan:]} ",
    custom: {
        "warn": "chalk.bgRed.white",
        "shane": function (string) {
            return string + "Oh ho";
        }
    }
});

console.log( compile("{red:This has a single colour") );

console.log( compile("This has a single colour {cyan:that begins mid-string") );

console.log( compile("{red:This has a single colour with }a reset") );

console.log( compile("{green:This has {cyan:two colours") );

console.log( compile("{green:This has a colour {cyan:nested inside} another colour") );

console.log( compile("{green:This has {cyan:THREE levels of {magenta:nested} colors that} can be reset") );

//console.log( compile("This has a custom {warn:'warn'} style", {
//    "warn": "chalk.bgRed.white"
//}));
//
console.log( compiler.compile("This has a cool {blue:Prefix") );
//
//console.log( compiler.compile("{blue:Prefix {cyan:with NESTED} styles and a custom {warn:'warn'") );

console.log( compile("{blue:Multiple {cyan:NESTED} {red:NESTED2} styles in {red:the same string} with an ending") );
//console.log( chalk.blue("Multiple " + chalk.cyan("NESTED "+ chalk.red("NESTED2")) + " styles in " + chalk.red("the same string") + " with an ending"));

console.log( compile("{blue.bgRed.bold:Chained Chalk methods}") );

console.log( compile("{warn:Methods", {
    "warn": function (string) {
        return this.compile("{red:Custom " + string);
    }
}));

var string = multiline(function () {/*
{cyan:This is a multi-line coloured string
With a single {yellow:yellow} word in the center of a line
Pretty cool huh?
*/});

console.log( compile(string) );
