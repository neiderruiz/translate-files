type TypeJson = {
    [key: string]: any;
};
export declare const createConversion: (jsonObj: TypeJson) => string;
export declare const convertJsonToCsv: (data: TypeJson, { nameFile }?: {
    nameFile?: string | undefined;
}) => void;
export {};
