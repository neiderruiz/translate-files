import { FlattenKeys } from '.';
export declare function useTypedTranslation<T>(): {
    t: (key: FlattenKeys<T>, args?: string[]) => string | import("i18next/typescript/helpers").$SpecialObject | import("i18next").TFunctionDetailedResult<string | import("i18next/typescript/helpers").$SpecialObject, any>;
    i18n: import("i18next").i18n;
};
