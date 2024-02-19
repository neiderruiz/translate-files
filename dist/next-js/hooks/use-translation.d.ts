export type FlattenKeys<T> = T extends object ? {
    [K in keyof T & string]: T[K] extends string ? K : `${K}.${FlattenKeys<T[K]>}`;
}[keyof T & string] : '';
export declare function useTranslation<T>(): {
    t: (key: FlattenKeys<T>, args?: string[]) => string | import("i18next/typescript/helpers").$SpecialObject | import("i18next").TFunctionDetailedResult<string | import("i18next/typescript/helpers").$SpecialObject, any>;
    i18n: import("i18next").i18n;
};
