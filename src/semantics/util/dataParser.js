import { isEmpty } from './commonUtils'

const languageProps = [
  'titles',
  'descriptions',
  'publishedBy',
  'creators',
  'owners',
  // 'license',
  // 'version.comment',
  'tags' //,
  // 'themes',
  // 'subthemes'
]

const defaultLanguage = lang => {
  switch (lang) {
    case 'it':
      return [{ lang: lang, value: 'Non disponibile in italiano' }]
    case 'en':
      return [{ lang: lang, value: 'Not available for english' }]
    default:
      return [{ lang: lang, value: `Not available for ${lang}` }]
  }
}

const languagePropertyFilter = languageProperty =>
  languageProps.includes(languageProperty)

const fixLanguageProperty = ([languagePropKey, languagePropValue]) =>
  isEmpty(languagePropValue) || languagePropValue === {}
    ? [languagePropKey, []]
    : [languagePropKey, languagePropValue]

const languagePropertyMap = ([languagePropKey, languagePropValue], lang) => {
  const filteredProp = languagePropValue.filter(value => value.lang === lang)
  return isEmpty(filteredProp)
    ? [languagePropKey, defaultLanguage(lang)]
    : [languagePropKey, filteredProp]
}

export const dataParser = (data, lang) =>
  Object.entries(data)
    .filter(([key, val]) => languagePropertyFilter(key))
    .map(keyValPair =>
      languagePropertyMap(fixLanguageProperty(keyValPair), lang)
    )
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), data)

export const arrDataParser = (arr, lang) =>
  arr.map(props => dataParser(props, lang))
