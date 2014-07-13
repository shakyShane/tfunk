##tfunk [![Build Status](https://travis-ci.org/shakyShane/tfunk.svg)](https://travis-ci.org/shakyShane/tfunk)

Multi-colour console output from [Chalk](https://github.com/sindresorhus/chalk#styles) with added awesome.

by [@shakyshane](https://github.com/shakyShane) & [@AydinHassan](https://github.com/AydinHassan)

![tfunk](http://cl.ly/image/2H2e0e0B0v1k/Screen%20Shot%202014-07-13%20at%2001.56.26.png)

Probably not the fastest thing in the world, but if you ever wanted a cool way of doing console colours - without 
all the string concatenation, then you might just love this tool :)

##WARNING: Experimental phase!

Some things may not work as expected yet - but we have colours, nested colours, custom styles & prefixes already nailed.

##Install

```bash
npm install tfunk
```

##Usage

**Use the module directly for simple styling**
 
```js
var tFunk = require("tfunk");

console.log( tfunk("%Ccyan:tFunk terminal colours") )

// => tFunk terminal colours
```

Or get a custom compiler with a set prefix:

```js
var compiler = require("tfunk").Compiler({
    prefix: "[%Cmagenta:tFunk%R]"
});

console.log( compiler.compile(" tFunk is awesome") );
console.log( compiler.compile(" don't you think?") );

// => [tFunk] tFunk is awesome
// => [tFunk] don't you think?
```

**Define your own syntax**

You can also utilise the chain-able features of chalk by specifying your own syntax like this.

```js
var compiler = require("tfunk").Compiler({
    custom: {
        "warn": "chalk.bgRed.white"
    }
});
```

Now you can use `warn` anywhere you like.

```js
console.log( compiler.compile("Oh no! There was an %Cwarn:Error") );

// => Oh no! There was an Error
```

##Examples

Here are some comparisons to chalk, to help you understand how to use tFunk.

###Single Colours

```js
// chalk
console.log( chalk.red("This has a single colour") );

// tFunk
console.log( tFunk("%Cred:This has a single colour") );
```

###Single Colour mid string

```js
// chalk
console.log( "This has a single colour " + chalk.cyan("that begins mid-string") );

// tFunck
console.log( tFunk("This has a single colour %Ccyan:that begins mid-string") );
```

###Single Colour with end point

```js
// chalk
console.log( chalk.red("This has a single colour with ") + "an endpoint");

// tFunk
console.log( tFunk("%Cred:This has a single colour with %Ran endpoint") );
```

###Two Colours

```js
// chalk
console.log( chalk.green("This has ") + chalk.cyan("two colours") );

// tFunk
console.log( tFunk("%Cgreen:This has %Ccyan:two colours") );
```

###Nested Colours

```js
// chalk
console.log( chalk.green("This has a colour " + chalk.cyan("nested inside") + " another colour") );

//tFunk
console.log( tFunk("%Cgreen:This has a colour %Ccyan:nested inside%R another colour") );
```

###Multiple Nested

```js
// chalk
console.log( chalk.blue("Multiple " + chalk.cyan("NESTED") + " styles in " + chalk.red("the same string") + " with an ending") );

// tFunk
console.log( tFunk("%Cblue:Multiple %Ccyan:NESTED%R styles in %Cred:the same string%R with an ending") );
```

##TODO
- [x] Colours
- [x] Nested Colours
- [x] Custom syntax
- [x] Prefixed compiler
- [ ] Make the chain-able API work like this `"%Cwhite.bgRed: White text, red BG"`
- [ ] Offer a way of escaping. Right now, ALL instances of `%R` will be lost