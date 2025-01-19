import { TypeListLang } from "src/translate/types/langs"
import { TypeProject } from "src/translate/types/type-project"
import { JsonBase } from "src/translate/utils/translate-file-json"

type TranslationApiConfig = {
    sourceLang: TypeListLang
    targetLang: TypeListLang
    data: JsonBase,
    apiKey?: string
    typeProject: TypeProject
    route_file?: string
}
async function getTranslationsFromAPI({ sourceLang, targetLang, data, apiKey, typeProject, route_file }: TranslationApiConfig): Promise<JsonBase> {

    let url_api = `https://translate-files.neiderruiz.com/api/general_translations/?source_lang=${sourceLang}&target_lang=${targetLang}`;

    if (typeProject) {
        url_api += `&type_project=${typeProject}`
    }

    if (route_file) {
        url_api += `&route_file=${route_file}`
    }

    const response = await fetch(url_api, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': apiKey ? `Token ${apiKey}` : ''
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Error al obtener traducciones: ${response.statusText}`);
    }

    const translations = await response.json();
    return translations;
}
export { getTranslationsFromAPI }

