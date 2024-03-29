
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
import { 
    IBrandStore, IBreadCrumbsStore, ICartStore, ICategoryStore,
    ILocaleStore, IProductStore,  IRatingStore, IUserStore 
} from './utils/types/stores'

import './styles/index.css'

interface IContext {
    userStore: IUserStore
    productStore: IProductStore
    categoryStore: ICategoryStore
    brandStore: IBrandStore
    ratingStore: IRatingStore
    breadStore: IBreadCrumbsStore
    cartStore: ICartStore
    localeStore: ILocaleStore
}

export const Context = React.createContext<IContext | null>(null)

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

let jsx = (
    <Context.Provider value={contextValue}>
        <App /> 
    </Context.Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))
