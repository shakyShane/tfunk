var compile   = require("./index");
var chalk     = require("chalk");
var multiline = require("multiline");
var compiler = require("./index").Compiler({
    prefix: "%Cblue:[%R%Cmagenta:tFunk%R%Ccyan:]%R ",
    custom: {
        "warn": "chalk.bgRed.white",
        "shane": function (string) {
            return string + "Oh ho";
        }
    }
});

console.log( compile("%Cred:This has a single colour") );

console.log( compile("This has a single colour %Ccyan:that begins mid-string") );

console.log( compile("%Cred:This has a single colour with %Ra reset") );

console.log( compile("%Cgreen:This has %Ccyan:two colours") );

console.log( compile("%Cgreen:This has a colour %Ccyan:nested inside%R another colour") );

console.log( compile("%Cgreen:This has %Ccyan:THREE levels of %Cmagenta:nested%R colors that%R can be reset") );

//console.log( compile("This has a custom %Cwarn:'warn'%R style", {
//    "warn": "chalk.bgRed.white"
//}));
//
console.log( compiler.compile("This has a cool %Cblue:Prefix") );
//
//console.log( compiler.compile("%Cblue:Prefix %Ccyan:with NESTED%R styles and a custom %Cwarn:'warn'") );

console.log( compile("%Cblue:Multiple %Ccyan:NESTED%R %Cred:NESTED2%R styles in %Cred:the same string%R with an ending") );
//console.log( chalk.blue("Multiple " + chalk.cyan("NESTED "+ chalk.red("NESTED2")) + " styles in " + chalk.red("the same string") + " with an ending"));

console.log( compile("%Cblue.bgRed.bold:Chained Chalk methods%R") );

console.log( compile("%Cwarn:Methods", {
    "warn": function (string) {
        return this.compile("%Cred:Custom " + string);
    }
}));

var string = multiline(function () {/*
%Ccyan:This is a multi-line coloured string
With a single %Cyellow:yellow%R word in the center of a line
Pretty cool huh?
*/});

console.log( compile(string) );
