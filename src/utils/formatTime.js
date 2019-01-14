"use strict";
exports.__esModule = true;
function formatTime(timeInSeconds) {
    var hours = Math.floor(timeInSeconds / (60 * 60));
    timeInSeconds -= hours * 60 * 60;
    var minutes = Math.floor(timeInSeconds / 60);
    timeInSeconds -= minutes * 60;
    // left pad number with 0
    var leftPad = function (num) { return ("" + num).padStart(2, '0'); };
    var str = (hours ? leftPad(hours) + ":" : '') +
        (minutes ? leftPad(minutes) + ":" : '') +
        leftPad(timeInSeconds);
    return str;
}
exports.formatTime = formatTime;
