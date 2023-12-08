export type ConfigOptionsAstro = {
    separator?: string;
};
declare const makeTranslations: (idDoc: string, config?: ConfigOptionsAstro) => Promise<void>;
export { makeTranslations };
