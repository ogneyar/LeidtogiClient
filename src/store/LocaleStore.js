
import { makeAutoObservable } from 'mobx' 

import { LOCALES } from '../i18n/locales'

// const locale = LOCALES.RUSSIAN

function getInitialLocale() {
    // получаем сохраненные данные
    const savedLocale = localStorage.getItem('locale')
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