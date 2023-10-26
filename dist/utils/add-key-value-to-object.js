export const addKeyValueToObject = (object, keys, value) => {
    const [currentKey, ...remainingKeys] = keys;
    if (remainingKeys.length === 0) {
        object[currentKey] = value;
    }
    else {
        object[currentKey] = object[currentKey] || {};
        addKeyValueToObject(object[currentKey], remainingKeys, value);
    }
};
