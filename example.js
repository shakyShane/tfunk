var compile  = require("./index");
var chalk    = require("chalk");
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

console.log( compile("This has a custom %Cwarn:'warn'%R style", {
    "warn": "chalk.bgRed.white"
}));

console.log( compiler.compile("This has a cool %Cblue:Prefix") );

console.log( compiler.compile("%Cblue:Prefix %Ccyan:with NESTED%R styles and a custom %Cwarn:'warn'") );

console.log( chalk.blue("Multiple " + chalk.cyan("NESTED") + " styles in " + chalk.red("the same string") + " with an ending"));

console.log( compile("%Cblue:Multiple %Ccyan:NESTED%R styles in %Cred:the same string%R with an ending") );


console.log( chalk.green("This has a colour " + chalk.cyan("nested inside") + " another colour") );

//tFunk
console.log( compile("%Cgreen:This has a colour %Ccyan:nested inside%R another colour") );

compiler = require("./index").Compiler({
    prefix: "[%Cmagenta:tFunk%R]"
});

console.log( compiler.compile(" tFunk is awesome") );
console.log( compiler.compile(" don't you think?") );

