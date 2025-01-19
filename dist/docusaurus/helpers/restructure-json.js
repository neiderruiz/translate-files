"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.restructureJson = void 0;
const restructureJson = (flattenedJson, originalJson, simpleKeys) => {
  const restructured = {};

  // Iterar sobre las claves del JSON plano
  for (const key in flattenedJson) {
    const originalKey = simpleKeys[key];
    if (flattenedJson.hasOwnProperty(key)) {
      if (typeof originalKey === 'object' || typeof flattenedJson[key] === 'object' || flattenedJson[key] === undefined) {
        continue;
      }
      restructured[originalKey] = {
        message: flattenedJson[key]
      };
      // Si hay una descripción previa, agregarla
      if (originalJson[originalKey] && originalJson[originalKey].description) {
        restructured[originalKey].description = originalJson[originalKey].description;
      }
    }
  }
  return restructured;
};
exports.restructureJson = restructureJson;