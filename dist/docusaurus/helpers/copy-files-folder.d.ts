import { TypeListLang } from 'src/translate/types/langs';
type Options = {
    locales: TypeListLang[];
    i18nDir: string;
    itemRelativePath: string;
    itemPath: string;
    item: string;
    defaultLocale: TypeListLang;
    defaultFolder: string;
    baseFolderSave: string;
};
export declare const copyFilesFolder: ({ locales, i18nDir, itemRelativePath, itemPath, item, defaultLocale, defaultFolder, baseFolderSave }: Options) => void;
export {};
