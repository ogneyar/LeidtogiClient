
import { makeAutoObservable } from 'mobx' 

import { LOCALES } from '../i18n/locales'
import isSSR from '../utils/isSSR'

// const locale = LOCALES.RUSSIAN

function getInitialLocale() {
    // получаем сохраненные данные
    const savedLocale = ! isSSR ? localStorage.getItem('locale') : null 
    return savedLocale || LOCALES.RUSSIAN
  }

class LocaleStore {
    constructor() {
        this._currentLocale = getInitialLocale()
        makeAutoObservable(this)
    }

    setCurrentLocale(locale) {
        this._currentLocale = locale
    }

    get currentLocale() {
        return this._currentLocale
    }
}

export default LocaleStore