"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addKeyValueToObject = void 0;
const addKeyValueToObject = (object, keys, value) => {
  const [currentKey, ...remainingKeys] = keys;
  if (remainingKeys.length === 0) {
    object[currentKey] = value;
  } else {
    object[currentKey] = object[currentKey] || {};
    addKeyValueToObject(object[currentKey], remainingKeys, value);
  }
};
exports.addKeyValueToObject = addKeyValueToObject;