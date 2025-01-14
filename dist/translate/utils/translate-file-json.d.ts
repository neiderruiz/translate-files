import { Typeproject } from 'src/translate/utils/get-translations-api';
import { TypeListLang } from '../types/langs';
export type ConfigOptions = {
    input: TypeListLang;
    target_langs: TypeListLang[];
    api_key?: string;
    typeProject: Typeproject;
};
export type JsonBase = {
    [key: string]: string | object;
};
export declare const translateFileJson: (jsonBase: JsonBase, folderSave: string, config: ConfigOptions) => Promise<void>;
