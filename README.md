##tfunk [![Build Status](https://travis-ci.org/shakyShane/tfunk.svg)](https://travis-ci.org/shakyShane/tfunk)

Multi-colour console output from [Chalk](https://github.com/sindresorhus/chalk#styles) but with added awesome.

![tfunk](http://cl.ly/image/2H2e0e0B0v1k/Screen%20Shot%202014-07-13%20at%2001.56.26.png)

##Install

```bash
npm install tFunk
```

##Usage

```js
var tFunk = require("tfunk");

console.log( tfunk("%Ccyan:tFunk terminal colours") )
```

##Examples
The following comparisons to Chalk are provided to help explain how to use tFunk.

###Single Colours

```js
// chalk
console.log( chalk.red("This has a single colour") );

// tFunk
console.log( compile("%Cred:This has a single colour") );
```

###Single Colour, mid string

```js
// chalk
console.log( "This has a single colour " + chalk.cyan("that begins mid-string") );

// tFunck
 console.log( compile("This has a single colour %Ccyan:that begins mid-string") );
```

###Single Colour with end point

```js
// chalk
console.log( chalk.red("This has a single colour with ") + "an endpoint");

// tFunk
console.log( compile("%Cred:This has a single colour with %Ran endpoint") );
```

###Two Colours

```js
// chalk
console.log( chalk.green("This has ") + chalk.cyan("two colours") );

// tFunk
console.log( compile("%Cgreen:This has %Ccyan:two colours") );
```

###Nested Colours

```js
// chalk
console.log( chalk.green("This has a colour " + chalk.cyan("nested inside") + " another colour") );

//tFunk
console.log( compile("%Cgreen:This has a colour %Ccyan:nested inside%R another colour") );
```

###Multiple Nested

```js
// chalk
console.log( chalk.blue("Multiple " + chalk.cyan("NESTED") + " styles in " + chalk.red("the same string") + " with an ending") );

// tFunk
console.log( compile("%Cblue:Multiple %Ccyan:NESTED%R styles in %Cred:the same string%R with an ending") );
```
