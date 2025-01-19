export type TypeSimpleJson = {
    [key: string]: string;
};
export type TranslationsOrder = {
    [key: string]: {
        [key: string]: string;
    };
};
export type ObjectWithStringKeys = {
    [key: string]: any;
};
export type FlattenWriteTranslationJson = {
    [key: string]: {
        message: string;
        description?: string;
    };
};
