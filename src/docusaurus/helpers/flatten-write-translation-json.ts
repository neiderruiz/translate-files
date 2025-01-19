import { FlattenWriteTranslationJson, TypeSimpleJson } from "../../translate/types/types";
import { simpleHashText } from "../../utils/simple-hash-text";

export const flattenWriteTranslationJson = (inputJson: FlattenWriteTranslationJson) => {
    const flattened: TypeSimpleJson = {};
    const simpleKeys: TypeSimpleJson = {};

    for (const key in inputJson) {
        if (inputJson.hasOwnProperty(key)) {
            const messageObj = inputJson[key];
            const simpleKey = simpleHashText(key);
            simpleKeys[simpleKey] = key;
            flattened[simpleKey] = messageObj.message;
        }
    }

    return {
        simpleKeys,
        flattenedJson: flattened
    };
}