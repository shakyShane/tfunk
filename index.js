function isNested(content, regex) {

    var match = regex.exec(content);

    if (match) {
        return /%C(.+?):(.+?)%CR/g.exec(match[2]) ? true : false;
    }

    return false;
}

function splitter(string) {

    var regex = /%C(.+?):([\s\S]+?)%CR(?!.*%CR)/g;
    var tailRegex = /%CR(.+?)$/;

    function matcher(regex, content, parts) {

        content.replace(regex, function() {
            var content = arguments[2];
            var color   = arguments[1];


            var obj = {
                color: arguments[1],
                content: content
            };

            var tail = null;

            if(content.match(tailRegex)) {
                content.replace(tailRegex, function() {

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

            if(tail !== null) {
                parts.push(tail);
            }
        });

        return parts;
    }

    if (isNested(string, regex)) {
        parts = matcher(regex, string, []);
    } else {
        parts = [];
        string.replace(/%C(.+?):(.+?)%CR/g, function() {
            parts.push({
                color: arguments[1],
                content: arguments[2]
            });
        });
    }

    return parts;
}

module.exports.splitter = splitter;
module.exports.isNested = isNested;