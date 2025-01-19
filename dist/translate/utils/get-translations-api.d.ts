import { TypeListLang } from "src/translate/types/langs";
import { TypeProject } from "src/translate/types/type-project";
import { JsonBase } from "src/translate/utils/translate-file-json";
type TranslationApiConfig = {
    sourceLang: TypeListLang;
    targetLang: TypeListLang;
    data: JsonBase;
    apiKey?: string;
    typeProject: TypeProject;
    route_file?: string;
};
declare function getTranslationsFromAPI({ sourceLang, targetLang, data, apiKey, typeProject, route_file }: TranslationApiConfig): Promise<JsonBase>;
export { getTranslationsFromAPI };
