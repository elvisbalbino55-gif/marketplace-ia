export function translate(text, lang){

const dictionary = {
"pt-BR": text,
"en-US": "[EN] " + text,
"es-ES": "[ES] " + text
};

return dictionary[lang] || text;
}