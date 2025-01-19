import { FlattenWriteTranslationJson } from "../../translate/types/types";
import { JsonBase } from "../../translate/utils/translate-file-json";

export const restructureJson = (flattenedJson: JsonBase, originalJson: FlattenWriteTranslationJson, simpleKeys: JsonBase) => {
    const restructured: FlattenWriteTranslationJson = {};

    // Iterar sobre las claves del JSON plano
    for (const key in flattenedJson) {
        const originalKey = simpleKeys[key];
        if (flattenedJson.hasOwnProperty(key)) {
            if (typeof originalKey === 'object' || typeof flattenedJson[key] === 'object' || flattenedJson[key] === undefined) {
                continue;
            }

            restructured[originalKey] = {
                message: flattenedJson[key] as string
            };
            // Si hay una descripción previa, agregarla
            if (originalJson[originalKey] && originalJson[originalKey].description) {
                restructured[originalKey].description = originalJson[originalKey].description;
            }
        }
    }

    return restructured;
}