"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addKeyValueToObject = void 0;
var addKeyValueToObject = function (object, keys, value) {
    var currentKey = keys[0], remainingKeys = keys.slice(1);
    if (remainingKeys.length === 0) {
        object[currentKey] = value;
    }
    else {
        object[currentKey] = object[currentKey] || {};
        (0, exports.addKeyValueToObject)(object[currentKey], remainingKeys, value);
    }
};
exports.addKeyValueToObject = addKeyValueToObject;
