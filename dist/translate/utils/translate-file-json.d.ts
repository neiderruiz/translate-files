import { TypeListLang } from '../types/langs';
export type ConfigOptions = {
    input: TypeListLang;
    outputs: TypeListLang[];
};
export declare const translateFileJson: (jsonBase: {
    [key: string]: string | object;
}, folderSave: string, config?: ConfigOptions) => Promise<void>;
