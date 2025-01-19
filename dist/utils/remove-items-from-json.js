"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeItemsFromJson = void 0;
const removeItemsFromJson = (jsonData, itemsDelete) => {
  const filteredData = {};
  for (const key in jsonData) {
    if (!itemsDelete.includes(key)) {
      filteredData[key] = jsonData[key];
    }
  }
  return filteredData;
};
exports.removeItemsFromJson = removeItemsFromJson;