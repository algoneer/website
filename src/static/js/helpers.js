
String.prototype.format = function () {
    "use strict";
    var str = this.toString();

    var t = typeof arguments[0];
    var args
    if (arguments.length == 0)
        args = {}
    else
        args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];

    var splits = []

    var s = str
    while(s.length > 0){    
        var m = s.match(/\{(?!\{)([\w\d]+)\}(?!\})/)
        if (m !== null){
            var left = s.substr(0, m.index)
            var sep = s.substr(m.index, m[0].length)
            s = s.substr(m.index+m[0].length)
            var n = parseInt(m[1])
            splits.push(left)
            if (n != n){ // not a number
                splits.push(args[m[1]])
            } else { // a numbered argument
                splits.push(args[n])
           }
        } else {
            splits.push(s)
            s = ""
        }    
    }
    return splits
};

function t(key){
    var str = translations[window.language][key]
    if (str === undefined)
        return "[no translation available for key "+key+"]"
    var formattedStr = str.format(...Array.prototype.slice.call(arguments, 1))
    return formattedStr
}