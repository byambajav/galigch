/* Register for key press. */
$(document).on("keypress", function(e) {
    if (isAlphabet(e.which)) {
        $(e.target).val($(e.target).val() + toCyrillic(e.which));
        e.preventDefault();
    }
});

function isAlphabet(c) {
    var isLowerLetter = "a".charCodeAt(0) <= c && "z".charCodeAt(0) >= c;
    var isUpperLetter = "A".charCodeAt(0) <= c && "Z".charCodeAt(0) >= c;
    return isLowerLetter || isUpperLetter;
}

function toCyrillic(c) {
    return "lol"; // TODO
}

/* Alerts contents of an object for debugging. */
function printObject(o) {
    var out = '';
    for (var p in o) {
        out += p + ': ' + o[p] + '\n';
    }
    alert(out);
}
