/* Register for key press. */
window.addEventListener("keypress", onKeyPress, true);

function onKeyPress(event) {
    chrome.runtime.sendMessage({message: "enabled"}, function(response) {
        // Only remap key when in enabled mode and input is alphabet.
        if (response.enabled && isConvertible(event.which)) {
            //alert("triggered");
            var target = event.target;
            var currentVal = $(target).getString();
            var posRes = $(target).getPosition();
            var position = posRes.htmlPos;
            var res = toMongolianCyrillic(event.which, currentVal.slice(position - 2, position - 1));
            if (!res.removePrev) {
                $(target).setString(currentVal.slice(0, position - 1) + res.converted + currentVal.slice(position));
                $(target).setPosition(posRes.pos);
            } else {
                $(target).setString(currentVal.slice(0, position - 2) + res.converted + currentVal.slice(position));
                $(target).setPosition(posRes.pos - 1);
            }
        }
    });
};

function positionInHtml(textPos, html) {
    var pos = 0; // position in html str
    var charCount = 0; // number of text chars we encountered
    var openedTags = 0;
    var openedSpecialChars = 0;
    while (true) {
        switch (html.charAt(pos)) {
        case "<":
            openedTags += 1;
            break;
        case ">":
            openedTags -= 1;
            break;
        case "&":
            openedSpecialChars += 1;
            break;
        case ";":
            openedSpecialChars -= 1;
            charCount += 1;
            break;
        default:
            if (openedTags <= 0 && openedSpecialChars <= 0) {
                charCount += 1;
                if (charCount >= textPos) {
                    return pos + 1;
                }
            }
        }
        pos += 1;
    }
}

$.fn.extend({
    getString: function() {
        var target = this[0];
        var isContentEditable = target.contentEditable === "true";
        return this[isContentEditable? 'html' : 'val']();
    },

    setString: function(str) {
        var target = this[0];
        var isContentEditable = target.contentEditable === "true";
        this[isContentEditable? 'html' : 'val'](str);
    },

    /* Gets cursor position of target, ref: jquery/caret */
    getPosition: function() {
        var target = this[0];
        if (target.selectionStart) {
            //textArea
            return {
                pos: target.selectionStart,
                htmlPos: target.selectionStart
            };
        } else {
            //contentEditable
            target.focus();
            var range1 = window.getSelection().getRangeAt(0),
                range2 = range1.cloneRange();
            range2.selectNodeContents(target);
            range2.setEnd(range1.endContainer, range1.endOffset);
            return {
                pos: range2.toString().length,
                htmlPos: positionInHtml(range2.toString().length, this.getString())
            };
        }
    },

    /* Sets cursor position of target */
    setPosition: function(pos) {
        var target = this[0];
        target.focus();
        if (target.setSelectionRange) {
            //textArea
            target.setSelectionRange(pos, pos);
        } else {
            //contentEditable
            setPositionRecursive(target, pos);
        }
    }
});

/* A hacky method for setting cursor position correctly. */
function setPositionRecursive(node, pos) {
    if (node.wholeText) {
        if (node.wholeText.length >= pos) {
            window.getSelection().collapse(node, pos);
        }
    } else {
        for (var i = 0; i < node.childNodes.length; i++) {
            var len = 0;
            if (node.childNodes[i].wholeText) {
                len = node.childNodes[i].wholeText.length;
            } else if (node.childNodes[i].textContent) {
                len = node.childNodes[i].textContent.length;
            }
            if (len < pos) {
                pos -= len;
            } else {
                setPositionRecursive(node.childNodes[i], pos);
                return;
            }
        }
    }
}

function isConvertible(c) {
    var isLowerLetter = "a".charCodeAt(0) <= c && "z".charCodeAt(0) >= c;
    var isUpperLetter = "A".charCodeAt(0) <= c && "Z".charCodeAt(0) >= c;
    var isSpecialLetter = ("\'".charCodeAt(0) == c || "\"".charCodeAt(0) == c);
    return isLowerLetter || isUpperLetter || isSpecialLetter;
}

function isVowel(c) {
    if (c == "") return false;
    return "аоуиэөүАОУИЭӨҮ".indexOf(c) > -1;
}

function toMongolianCyrillic(c, prev) {
    // Rules for merging special characters:
    // Both are lowercase -> merged lowercase letter (ya -> я)
    // At least one character is uppercase -> merged uppercase letter (Ya, yA, YA -> Я)

    switch (String.fromCharCode(c)) {
        // Lowercase letters starts here.
    case "a":
        if (prev == "ы") {
            return {converted: "я", removePrev: true};
        } else if (prev == "Ы") {
            return {converted: "Я", removePrev: true};
        } else {
            return {converted: "а", removePrev: false};
        }
    case "b":
        return {converted: "б", removePrev: false};
    case "c":
        return {converted: "ц", removePrev: false};
    case "d":
        return {converted: "д", removePrev: false};
    case "e":
        if (prev == "ы") {
            return {converted: "е", removePrev: true};
        } else if (prev == "Ы") {
            return {converted: "Е", removePrev: true};
        } else {
            return {converted: "э", removePrev: false};
        }
    case "f":
        return {converted: "ф", removePrev: false};
    case "g":
        return {converted: "г", removePrev: false};
    case "h":
        if (prev == "с") {
            return {converted: "ш", removePrev: true};
        } else if (prev == "С") {
            return {converted: "Ш", removePrev: true};
        } else if (prev == "ц") {
            return {converted: "ч", removePrev: true};
        } else if (prev == "Ц") {
            return {converted: "Ч", removePrev: true};
        } else {
            return {converted: "х", removePrev: false};
        }
    case "i":
        if (!isVowel(prev)) {
            return {converted: "и", removePrev: false};
        } else {
            return {converted: "й", removePrev: false};
        }
    case "j":
        return {converted: "ж", removePrev: false};
    case "k":
        return {converted: "к", removePrev: false};
    case "l":
        return {converted: "л", removePrev: false};
    case "m":
        return {converted: "м", removePrev: false};
    case "n":
        return {converted: "н", removePrev: false};
    case "o":
        if (prev == "ы") {
            return {converted: "ё", removePrev: true};
        } else {
            return {converted: "о", removePrev: false};
        }
    case "p":
        return {converted: "п", removePrev: false};
    case "q":
        return {converted: "ө", removePrev: false};
    case "r":
        return {converted: "р", removePrev: false};
    case "s":
        if (prev == "т") {
            return {converted: "ц", removePrev: true};
        } else {
            return {converted: "с", removePrev: false};
        }
    case "t":
        return {converted: "т", removePrev: false};
    case "u":
        if (prev == "ы") {
            return {converted: "ю", removePrev: true};
        } else if (prev == "Ы") {
            return {converted: "Ю", removePrev: true};
        } else {
            return {converted: "у", removePrev: false};
        }
    case "v":
        return {converted: "в", removePrev: false};
    case "w":
        return {converted: "ү", removePrev: false};
    case "x":
        return {converted: "х", removePrev: false};
    case "y":
        return {converted: "ы", removePrev: false};
    case "z":
        return {converted: "з", removePrev: false};

        // Uppercase letters starts here.
    case "A":
        if (prev == "ы" || prev == "Ы") {
            return {converted: "Я", removePrev: true};
        } else {
            return {converted: "А", removePrev: false};
        }
    case "B":
        return {converted: "Б", removePrev: false};
    case "C":
        return {converted: "Ц", removePrev: false};
    case "D":
        return {converted: "Д", removePrev: false};
    case "E":
        if (prev == "ы" || prev == "Ы") {
            return {converted: "Е", removePrev: true};
        } else {
            return {converted: "Э", removePrev: false};
        }
    case "F":
        return {converted: "Ф", removePrev: false};
    case "G":
        return {converted: "Г", removePrev: false};
    case "H":
        if (prev == "с" || prev == "С") {
            return {converted: "Ш", removePrev: true};
        } else if (prev == "ц" || prev == "Ц") {
            return {converted: "Ч", removePrev: true};
        } else {
            return {converted: "Х", removePrev: false};
        }
    case "I":
        if (!isVowel(prev)) {
            return {converted: "И", removePrev: false};
        } else {
            return {converted: "Й", removePrev: false};
        }
    case "J":
        return {converted: "Ж", removePrev: false};
    case "K":
        return {converted: "К", removePrev: false};
    case "L":
        return {converted: "Л", removePrev: false};
    case "M":
        return {converted: "М", removePrev: false};
    case "N":
        return {converted: "Н", removePrev: false};
    case "O":
        if (prev == "ы" || prev == "Ы") {
            return {converted: "Ё", removePrev: true};
        } else {
            return {converted: "О", removePrev: false};
        }
    case "P":
        return {converted: "П", removePrev: false};
    case "Q":
        return {converted: "Ө", removePrev: false};
    case "R":
        return {converted: "Р", removePrev: false};
    case "S":
        if (prev == "т" || prev == "Т") {
            return {converted: "Ц", removePrev: true};
        } else {
            return {converted: "С", removePrev: false};
        }
    case "T":
        return {converted: "Т", removePrev: false};
    case "U":
        if (prev == "ы" || prev == "Ы") {
            return {converted: "Ю", removePrev: true};
        } else {
            return {converted: "У", removePrev: false};
        }
    case "V":
        return {converted: "В", removePrev: false};
    case "W":
        return {converted: "Ү", removePrev: false};
    case "X":
        return {converted: "Х", removePrev: false};
    case "Y":
        return {converted: "Ы", removePrev: false};
    case "Z":
        return {converted: "З", removePrev: false};

    case "\'":
        if (prev != "ь") {
            return {converted: "ь", removePrev: false};
        } else {
            return {converted: "Ь", removePrev: true};
        }
    case "\"":
        if (prev != "ъ") {
            return {converted: "ъ", removePrev: false};
        } else {
            return {converted: "Ъ", removePrev: true};
        }
    default:
        return {converted: "", removePrev: false};
    }
}

/* Alerts contents of an object for debugging. */
function printObject(o) {
    var LIMIT = 20;
    var out = "";
    var count = 0;
    for (var p in o) {
        out += p + ": " + o[p] + "\n";
        if (++count % LIMIT == 0) {
            alert(out);
            out = "";
        }
    }
    alert(out);
}
