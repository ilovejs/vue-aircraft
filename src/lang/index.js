import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en_us from './locale/en-US'
import axios from 'axios'

Vue.use(VueI18n)

const messages = {
  'en-US': {
    ...en_us
  }
}

const defaultLanguage = 'en-US'

const i18n = new VueI18n({
  locale: defaultLanguage,
  fallbackLocale: defaultLanguage,
  messages
})

export default i18n

const loadedLanguages = [defaultLanguage]

// use cached language setting
if (defaultLanguage !== localStorage.lang) {
  loadLanguageAsync(localStorage.lang)
}

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang = defaultLanguage) {
  return new Promise(resolve => {
    // cache language setting
    localStorage.lang = lang
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./locale/${lang}`).then(msgs => {
          i18n.setLocaleMessage(lang, msgs.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}