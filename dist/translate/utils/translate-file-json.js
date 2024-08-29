"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateFileJson = void 0;
var _eventsource = _interopRequireDefault(require("eventsource"));
var fs = _interopRequireWildcard(require("fs"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const countTranslations = obj => {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      count += countTranslations(obj[key]);
    } else {
      count += 1;
    }
  }
  return count;
};
const translateFileJson = async (jsonBase, folderSave, config) => {
  console.log('💊 start load data \n');
  try {
    const totalTranslations = config?.outputs?.length || 0;
    console.log(`🔄 Total translations to perform: ${totalTranslations} \n`);
    const totalEntries = countTranslations(jsonBase);
    console.log(`🔄 Total entries to translate in ${config?.input}.json: ${totalEntries} \n`);
    for (const output of config?.outputs || []) {
      console.log(`✅ running translations ${output} ... \n`);
      const eventSource = new _eventsource.default(`https://translate-files-api-production.up.railway.app/progress`);
      eventSource.onmessage = function (event) {
        console.log(`${event.data} \n`);
      };
      eventSource.onerror = function (event) {
        console.error("Error receiving updates.", event);
        eventSource.close();
      };
      const response = await fetch(`https://translate-files-api-production.up.railway.app/traducir?source_lang=${config?.input}&target_lang=${output}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBase)
      });
      eventSource.close();
      if (response.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const data = await response.json();
      if (!fs.existsSync(folderSave)) {
        console.log('📦 create folder \n');
        fs.mkdirSync(folderSave, {
          recursive: true
        });
      }
      fs.writeFileSync(`${folderSave}/${output}.json`, JSON.stringify(data, null, 4));
      console.log(`📦  Finish success ${output.toUpperCase()}  ${folderSave}/${output}.json \n`);
    }
  } catch (error) {
    console.log(`${error.message} \n`);
    console.error("🛑 Timeout error occurred. We are aware of the issue and are working to resolve it. Please try again later... \n");
  }
};
exports.translateFileJson = translateFileJson;