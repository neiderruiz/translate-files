import { TypeListLang } from "../../translate/types/langs";
type ConfigOptions = {
    locales: TypeListLang[];
    defaultLocale: TypeListLang;
    apiKey?: string;
};
export declare const generateWriteTranslations: ({ defaultLocale, locales, apiKey }: ConfigOptions) => Promise<void>;
export {};
