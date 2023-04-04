import { ObjectWithStringKeys } from "../types/types";

export const addKeyValueToObject = (
  object: ObjectWithStringKeys,
  keys: string[],
  value: string
) => {
  const [currentKey, ...remainingKeys] = keys;
  if (remainingKeys.length === 0) {
    object[currentKey] = value;
  } else {
    object[currentKey] = object[currentKey] || {};
    addKeyValueToObject(object[currentKey], remainingKeys, value);
  }
};
