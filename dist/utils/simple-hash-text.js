"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simpleHashText = void 0;
const simpleHashText = text => {
  let hash1 = 0,
    hash2 = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash1 = (hash1 << 5) - hash1 + char;
    hash1 |= 0;
    hash2 = (hash2 << 7) - hash2 + char;
    hash2 |= 0;
  }
  // combine bits
  const combinedHash = Math.abs(hash1 + hash2).toString(36);
  return combinedHash;
};
exports.simpleHashText = simpleHashText;