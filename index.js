/**
 * Get the indexes of matches
 * @param string
 * @returns {{starts: Array, ends: Array}}
 */
function getIndexes(string) {

    var starts = [];
    var ends = [];

    string.replace(/%C/g, function () {
        starts.push(arguments[1]);
    });

    string.replace(/%R/g, function () {
        ends.push(arguments[1]);
    });

    return {
        starts: starts,
        ends: ends
    }
}

/**
 * @param string
 */
function getParents(string) {

    var indexes = getIndexes(string);
    var starts  = indexes.starts;
    var ends    = indexes.ends;

    var parents = [];

    if (starts.length) {
        if (starts.length === 1 && ends.length === 1) {
            parents.push(getSlice(0));
        }
    }

    return parents;

    function getSlice(index) {
        return string.slice(starts[index], ends[index] + 2);
    }
}

/**
 * Add the missing colour starts
 * @param string
 */
function fixNested (string) {

    var indexes = getIndexes(string);
    var starts  = indexes.starts;
    var ends    = indexes.ends;

    if (!isNested(string)) {
        return string;
    }

    var color = string.match(/^%C(.+?):/);

    return spliceSlice(string, ends[0]+2, string.length, color[0]);
}

/**
 * Check if there's a nested group
 * @param string
 * @returns {boolean}
 */
function isNested(string) {

    var indexes = getIndexes(string);
    var starts  = indexes.starts;
    var ends    = indexes.ends;

    var nested  = false;

//    console.log("\nstarts: %s", starts.join("|"));
//    console.log("end:    %s \n", ends.join("|"));

    for (var i = 0, n = starts.length; i < n; i += 1) {

        var nextStart;
        var nextEnd;
        var currentStart = starts[i];
        var currentEnd   = ends[i];

        if ( i !== (starts.length -1) ) {

            nextStart = starts[i + 1];
            nextEnd = ends[i + 1];

            if (nextStart < currentEnd) {
                nested = true;
                return true;
            }
        }
    }

    return nested;
}


function splitter(string) {

    var regex = /%C(.+?):([\s\S]+?)%CR(?!.*%CR)/g;
    var tailRegex = /%CR(.+?)$/;

    function matcher(regex, content, parts) {

        content.replace(regex, function () {

            var content = arguments[2];
            var color = arguments[1];

            var obj = {
                color: arguments[1],
                content: content
            };

            var tail = null;

            if (content.match(tailRegex)) {
                content.replace(tailRegex, function () {

                    var content = arguments[1];
                    match = tailRegex.exec(content);
                    if (null !== match) {
                        content = match[1];
                    }

                    tail = {
                        color: obj.color,
                        content: content
                    };
                });
            }

            parts.push(obj);

            match = /^(.+?)%C[a-z]/.exec(content);
            if (null !== match) {
                obj.content = match[1];
            } else {
                obj.content = content;
            }

            if (content.match(regex)) {
                parts = matcher(regex, content, parts);
            }

            if (tail !== null) {
                parts.push(tail);
            }
        });

        return parts;
    }

    if (isNested(string, regex)) {
        parts = matcher(regex, string, []);
    } else {
        parts = [];
        string.replace(/%C(.+?):(.+?)%CR/g, function () {
            parts.push({
                color: arguments[1],
                content: arguments[2]
            });
        });
    }

    return parts;
}

function spliceSlice(str, index, count, add) {
    var before = str.slice(0, index);
    var after = str.slice(index);
    return [before, add, after].join("");
}

module.exports.splitter   = splitter;
module.exports.isNested   = isNested;
module.exports.getParents = getParents;
module.exports.fixNested  = fixNested;