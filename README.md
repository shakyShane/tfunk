##tfunk

Multi-Colors from [Chalk](https://github.com/sindresorhus/chalk#styles), 
but without the string concatenation. 

![tfunk](http://cl.ly/image/2H2e0e0B0v1k/Screen%20Shot%202014-07-13%20at%2001.56.26.png)

```js
console.log( compile("%Cred:This has a single colour") );

console.log( compile("This has a single colour %Ccyan:that begins mid-string") );

console.log( compile("%Cred:This has a single colour with %Ra reset") );

console.log( compile("%Cgreen:This has %Ccyan:two colours") );

console.log( compile("%Cgreen:This has a colour %Ccyan:nested inside%R another colour") );

console.log( compile("This has a custom %Cwarn:'warn'%R style", {
    "warn": "chalk.bgRed.white"
}));

console.log( compiler.compile("This has a cool %Cblue:Prefix") );

console.log( compiler.compile("%Cblue:Prefix with %Ccyan:NESTED%R styles and a custom %Cwarn:'warn'") );

```