"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenWriteTranslationJson = void 0;
var _simpleHashText = require("../../utils/simple-hash-text");
const flattenWriteTranslationJson = inputJson => {
  const flattened = {};
  const simpleKeys = {};
  for (const key in inputJson) {
    if (inputJson.hasOwnProperty(key)) {
      const messageObj = inputJson[key];
      const simpleKey = (0, _simpleHashText.simpleHashText)(key);
      simpleKeys[simpleKey] = key;
      flattened[simpleKey] = messageObj.message;
    }
  }
  return {
    simpleKeys,
    flattenedJson: flattened
  };
};
exports.flattenWriteTranslationJson = flattenWriteTranslationJson;