"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.translateFileCsv=void 0;var fs=_interopRequireWildcard(require("fs")),_csvtojson=_interopRequireDefault(require("csvtojson")),_saveWithLevels=require("./save-with-levels");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(_getRequireWildcardCache=function(a){return a?c:b})(a)}function _interopRequireWildcard(b,c){if(!c&&b&&b.__esModule)return b;if(null===b||"object"!=typeof b&&"function"!=typeof b)return{default:b};var d=_getRequireWildcardCache(c);if(d&&d.has(b))return d.get(b);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in b)if("default"!=a&&Object.prototype.hasOwnProperty.call(b,a)){var g=f?Object.getOwnPropertyDescriptor(b,a):null;g&&(g.get||g.set)?Object.defineProperty(e,a,g):e[a]=b[a]}return e.default=b,d&&d.set(b,e),e}const translateFileCsv=async(a,b,c)=>{console.log("\uD83D\uDC8A start load data \n"),console.log("\uD83D\uDFE1 loading... \n"),fetch(`https://docs.google.com/spreadsheets/d/${a}/gviz/tq?tqx=out:csv`).then(async a=>{const d=await a.text();if(console.log("\u2705 finish load data \n"),200===a.status){console.log("\u2705 start clear headers empty \n");let a="",e=0;d.split("\n").forEach(b=>{const c=b.split(",");e||(e=c.filter(a=>"\"\""!=a).length);const d=c.slice(0,e),f=d.join(",");a+=`${f}\n`}),console.log("\u2705 clear headers empty finish \n");try{fs.existsSync(b)||(console.log("\uD83D\uDCE6 create folder \n"),fs.mkdirSync(b,{recursive:!0})),console.log(`🤓 write file ${b}/translations-app.csv \n`),fs.writeFileSync(`${b}/translations-app.csv`,a)}catch(a){return void console.error(`🛑 Error al escribir el archivo o crear el directorio: ${a.message} \n`)}(0,_csvtojson.default)().fromFile(`${b}/translations-app.csv`).then(a=>{(0,_saveWithLevels.saveWithLevels)(a,b,c)})}else console.log("\uD83D\uDED1  error al obtener los datos \n")})};exports.translateFileCsv=translateFileCsv;