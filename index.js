"use strict";

var chalk  = require("chalk");
var parser = require("./lib/parser");

/**
 * Stateless compiler.
 * @param {String} string
 * @param {Object} [custom] - Any custom methods
 * @returns {String}
 */
var chalkError = "'%s' not supported. See https://github.com/sindresorhus/chalk#styles for supported styles.";

function compile(string, custom) {
    var res;
    try {
        res = parseAst(createAst(parser, string));
    } catch (e) {
        var color = /Property '(.+?)'/.exec(e.message);

        if (color) {
            throw Error(chalkError.replace("%s", color[1]));
        } else {
            throw Error(e.message);
        }
    }
    return res;
}

/**
 * @param parser
 * @param string
 * @returns {*}
 */
function createAst(parser, string) {
    return parser.parse(string);
}

/**
 * @param ast
 */
function parseAst(ast) {

    var color  = null;
    var colors = [];

    return ast.reduce(function (joined, item) {

        if (item.color && item.text) {
            color = item.color;
            colors.push(item.color);
            return joined + chalk[item.color](item.text);
        }

        if (item.buffer) {

            if (item.buffer === "%R") {
                return joined;
            }
            if (colors.length) {
                return joined + chalk[colors[colors.length-1]](item.buffer);
            } else {
                return joined + item.buffer;
            }
        }

        if (item.reset) {

            colors.pop();

            if (item.text) {
                if (colors.length) {
                    return joined + chalk[colors[colors.length-1]](item.text);
                } else {
                    return joined + item.text;
                }
            }
        }

        return joined;

    }, "");
}

///**
// * @param {Object} opts
// * @returns {Compiler}
// */
//function Compiler(opts) {
//
//    opts = opts || {};
//
//    if (opts.prefix) {
//        this.prefix = compile(opts.prefix, opts.custom);
//    }
//
//    this.compile = function (string) {
//
//        return this.prefix + compile(string, opts.custom);
//
//    }.bind(this);
//
//    return this;
//}

module.exports = compile;
//module.exports.fixEnding = fixEnding;
//module.exports.Compiler = Compiler;