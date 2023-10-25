export type ConfigOptions = {
    separator?: string;
};
export declare const translateFileCsv: (idDoc: string, folderSave: string, config?: ConfigOptions) => Promise<void>;
