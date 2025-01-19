"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readJsonFile = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const readJsonFile = filePath => {
  try {
    const data = _fs.default.readFileSync(filePath, 'utf8'); // Lee el archivo JSON
    const jsonContent = JSON.parse(data); // Parse JSON content
    return jsonContent;
  } catch (error) {
    console.error(`Error reading JSON file: ${error}`);
    return null;
  }
};
exports.readJsonFile = readJsonFile;