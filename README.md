tfunk

Multi-Colors from [Chalk](https://github.com/sindresorhus/chalk#styles), 
but without the string concatenation. 

```js
var compile  = require("./index").compile;
var compiler = require("./index").Compiler({prefix: "%Cblue:[%R%Cmagenta:tFunk%R%Ccyan:]%R "});

console.log( compile("%Cred:This has a single colour") );

console.log( compile("This has a single colour %Ccyan:that begins mid-string") );

console.log( compile("%Cred:This has a single colour with %Ra reset") );

console.log( compile("%Cgreen:This has %Ccyan:two colours") );

console.log( compile("%Cgreen:This has a colour %Ccyan:nested inside%R another colour") );

console.log( compiler.compile("This has a cool %Cblue:Prefix") );
```