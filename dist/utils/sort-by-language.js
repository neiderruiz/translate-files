"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByLanguage = void 0;
const sortByLanguage = (jsonObj) => {
    let n = [];
    jsonObj.map((row) => {
        // filas
        Object.keys(row).map((fila) => {
            const exists = n.find((val) => val[fila]);
            if (exists) {
                exists[fila] = Object.assign(Object.assign({}, exists[fila]), { [row["key"]]: row[fila] });
            }
            else {
                n.push({
                    [fila]: {
                        [row["key"]]: row[fila],
                    },
                });
            }
        });
    });
    return n;
};
exports.sortByLanguage = sortByLanguage;