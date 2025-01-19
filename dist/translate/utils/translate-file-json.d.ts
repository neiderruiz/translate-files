import { TypeListLang } from '../types/langs';
import { TypeProject } from "../types/type-project";
export type ConfigOptions = {
    input: TypeListLang;
    target_langs: TypeListLang[];
    api_key?: string;
    typeProject: TypeProject;
};
export type JsonBase = {
    [key: string]: string | object;
};
export declare const translateFileJson: (jsonBase: JsonBase, folderSave: string, config: ConfigOptions) => Promise<void>;
