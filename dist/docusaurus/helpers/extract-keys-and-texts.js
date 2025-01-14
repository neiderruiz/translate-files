"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractKeysAndTexts = void 0;
const extractKeysAndTexts = content => {
  const regex = /{{(.*?)(?:\|)(.*?)}}/g;
  let match;
  const result = {};
  while ((match = regex.exec(content)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
};
exports.extractKeysAndTexts = extractKeysAndTexts;