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
  fetch(`https://docs.google.com/spreadsheets/d/${idDoc}/gviz/tq?tqx=out:csv`).then(async response => {
    const data = await response.text();
    console.log('✅ finish load data \n');
    if (response.status === 200) {
      console.log('✅ start clear headers empty \n');
      let dataSave = '';
      let columnsNotEmpty = 0;
      data.split('\n').forEach(line => {
        const lineSplit = line.split(',');
        if (!columnsNotEmpty) {
          columnsNotEmpty = lineSplit.filter(column => column != '""').length;
        }
        const firstFive = lineSplit.slice(0, columnsNotEmpty);
        const joinedFirstFive = firstFive.join(',');
        dataSave += `${joinedFirstFive}\n`;
      });
      console.log('✅ clear headers empty finish \n');
      try {
        if (!fs.existsSync(folderSave)) {
          console.log('📦 create folder \n');
          fs.mkdirSync(folderSave, {
            recursive: true
          });
        }
        console.log(`🤓 write file ${folderSave}/translations-app.csv \n`);
        fs.writeFileSync(`${folderSave}/translations-app.csv`, dataSave);
      } catch (e) {
        console.error(`🛑 Error al escribir el archivo o crear el directorio: ${e.message} \n`);
        return;
      }
      (0, _csvtojson.default)().fromFile(`${folderSave}/translations-app.csv`).then(jsonObj => {
        (0, _saveWithLevels.saveWithLevels)(jsonObj, folderSave, config);
      });
    } else {
      console.log("🛑  error al obtener los datos \n");
    }
  });
};
exports.translateFileCsv = translateFileCsv;