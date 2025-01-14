import { TypeListLang } from "src/translate/types/langs";
import { JsonBase } from "src/translate/utils/translate-file-json";
export type Typeproject = 'docusaurus' | 'next.js' | 'astro' | 'react';
type TranslationApiConfig = {
    sourceLang: TypeListLang;
    targetLang: TypeListLang;
    data: JsonBase;
    apiKey?: string;
    typeProject: Typeproject;
};
declare function getTranslationsFromAPI({ sourceLang, targetLang, data, apiKey, typeProject }: TranslationApiConfig): Promise<JsonBase>;
export { getTranslationsFromAPI };
