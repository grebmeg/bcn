"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CN_SETTINGS = {
    elementDelimiter: '__',
    modificatorDelimiter: '_',
    insideModificatorsDelimiter: '_',
};
var generateElement = function (block, elementName) {
    return [block, elementName].join(CN_SETTINGS.elementDelimiter);
};
var generateModifactor = function (block, element, modifictorName, modicatorValue) {
    var modifcatorDefinitins = [modifictorName, modicatorValue];
    if (typeof modicatorValue === 'boolean') {
        modifcatorDefinitins.pop();
    }
    var modifcatorDefinitin = modifcatorDefinitins.join(CN_SETTINGS.insideModificatorsDelimiter);
    if (element) {
        return [element, modifcatorDefinitin].join(CN_SETTINGS.modificatorDelimiter);
    }
    else {
        return [block, modifcatorDefinitin].join(CN_SETTINGS.modificatorDelimiter);
    }
};
var generateClassName = function (block) {
    var e_1, _a;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var classNames = [block];
    var element;
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (typeof arg === 'string') {
            if (i > 0) {
                classNames.push(arg);
            }
            else {
                element = generateElement(block, arg);
                classNames.push(element);
            }
        }
        else if (typeof arg === 'object' && arg !== null) {
            try {
                for (var _b = (e_1 = void 0, __values(Object.entries(arg))), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), modicatorName = _d[0], modicatorValue = _d[1];
                    var modificator = generateModifactor(block, element, modicatorName, modicatorValue);
                    classNames.push(modificator);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    return classNames.join(' ');
};
var cn = function (block) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return generateClassName.apply(void 0, __spread([block], args));
}; };
exports.default = cn;
