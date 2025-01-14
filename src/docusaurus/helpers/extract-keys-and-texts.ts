export const extractKeysAndTexts = (content: string): Record<string, string> => {
    const regex = /{{(.*?)(?:\|)(.*?)}}/g;
    let match;
    const result: Record<string, string> = {};

    while ((match = regex.exec(content)) !== null) {
        result[match[1]] = match[2];
    }

    return result;
}