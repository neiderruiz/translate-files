"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateFileCsv = void 0;
var fs = _interopRequireWildcard(require("fs"));
var _csvtojson = _interopRequireDefault(require("csvtojson"));
var _saveWithLevels = require("./save-with-levels");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const translateFileCsv = async (idDoc, folderSave, config) => {
  console.log('💊 start load data \n');
  console.log('🟡 loading... \n');
  try {
    // Fetch CSV data from Google Sheets
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${idDoc}/gviz/tq?tqx=out:csv`);
    console.log('✅ finish load data \n');
    if (response.status !== 200) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    // Process CSV data
    const data = await response.text();
    console.log('✅ start clear headers empty \n');
    let dataSave = '';
    let columnsNotEmpty = 0;
    data.split('\n').forEach(line => {
      const lineSplit = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
      if (!lineSplit) return;
      if (!columnsNotEmpty) {
        columnsNotEmpty = lineSplit.filter(column => column !== '""').length;
      }
      const firstFive = lineSplit.slice(0, columnsNotEmpty);
      const joinedFirstFive = firstFive.join(',');
      dataSave += `${joinedFirstFive}\n`;
    });
    console.log('✅ clear headers empty finish \n');

    // Create folder if it doesn't exist
    if (!fs.existsSync(folderSave)) {
      console.log('📦 create folder \n');
      fs.mkdirSync(folderSave, {
        recursive: true
      });
    }

    // Write processed data to a CSV file
    console.log(`🤓 write file ${folderSave}/translations-app.csv \n`);
    await fs.promises.writeFile(`${folderSave}/translations-app.csv`, dataSave);

    // Read the saved CSV file and process it further
    const readFile = await (0, _csvtojson.default)().fromFile(`${folderSave}/translations-app.csv`);
    if (readFile) {
      await (0, _saveWithLevels.saveWithLevels)(readFile, folderSave, config);
    }
  } catch (error) {
    console.error(`🛑 Error: ${error.message} \n`);
    // You may want to add additional error handling or logging here
  }
};
exports.translateFileCsv = translateFileCsv;