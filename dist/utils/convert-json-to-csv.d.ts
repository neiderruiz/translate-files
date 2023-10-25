import { TypeListLang } from "../types/langs";
type TypeJson = {
    [key: string]: any;
};
export type ConfigOptions = {
    separator?: string;
    nameFile?: string;
    entryLanguage?: string;
    langs?: TypeListLang[];
};
export declare const createConversion: (jsonObj: TypeJson, config?: ConfigOptions) => string;
export declare const convertJsonToCsv: (data: TypeJson, config?: ConfigOptions) => void;
export {};
