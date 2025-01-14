"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranslationsFromAPI = getTranslationsFromAPI;
async function getTranslationsFromAPI({
  sourceLang,
  targetLang,
  data,
  apiKey,
  typeProject
}) {
  let url_api = `https://translate-files.neiderruiz.com/api/general_translations/?source_lang=${sourceLang}&target_lang=${targetLang}`;
  if (typeProject) {
    url_api += `&${typeProject}`;
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