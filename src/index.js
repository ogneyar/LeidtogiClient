
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

import UserStore from './store/UserStore'
import ProductStore from './store/ProductStore'
import CategoryStore from './store/CategoryStore'
import BrandStore from './store/BrandStore'
import RatingStore from './store/RatingStore'
import BreadCrumbsStore from './store/BreadCrumbsStore'
import CartStore from './store/CartStore'
import LocaleStore from './store/LocaleStore'

import isSSR from './utils/isSSR'

import './styles/index.css'


export const Context = React.createContext(null)

let contextValue = {
    userStore: new UserStore(),
    productStore: new ProductStore(),
    categoryStore: new CategoryStore(),
    brandStore: new BrandStore(),
    ratingStore: new RatingStore(),
    breadStore: new BreadCrumbsStore(),
    cartStore: new CartStore(),
    localeStore: new LocaleStore(),
}

if ( ! isSSR ) {
    let jsx = (
        <Context.Provider value={contextValue}>
            <App /> 
        </Context.Provider>
    )
    // if (process.env.REACT_APP_ENV === 'production') 
    //     ReactDOM.hydrate(jsx, document.getElementById('root'))
    // else
        ReactDOM.render(jsx, document.getElementById('root'))
}
