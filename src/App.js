//
import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5'
import { observer } from 'mobx-react-lite'
import { IntlProvider } from 'react-intl'

import { LOCALES } from './i18n/locales'
import { messages } from './i18n/messages'

import AppRouter from './components/AppRouter'

import Header from './components/header/Header'

import Footer from './components/footer/Footer'
import { Alert } from './components/myBootstrap'
import { getUserInfo } from './http/userAPI'
import { fetchBrands } from './http/brandAPI'
import { echo } from './http/testerAPI'
// import scrollUp from './utils/scrollUp'
import { leidtogiFirst, addedTmkBrands } from './service/app'
// import BrandStore from './store/BrandStore'

import isSSR from './utils/isSSR'
import { Context } from '.'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/App.css' 


export const App = observer((props) => { 

    let userStore = null, brandStore = null, cartStore = null, localeStore = null
    if ( ! isSSR ) {
        let context = useContext(Context)
        userStore = context.userStore
        brandStore = context.brandStore
        cartStore = context.cartStore
        localeStore = context.localeStore
    }else if (props.staticContext) {
        console.log(props.staticContext.brand_store[0].name)
        // let data = leidtogiFirst(props.staticContext.brand_store)
        // data = addedTmkBrands(data)
        // brandStore = new BrandStore(data)
    }

    const [ alertVisible, setAlertVisible ] = useState(false)
    const [ messageAlert, setMessageAlert ] = useState("")

    const getError = (text, error = null) => {
        if (error && typeof(error) === "string") setMessageAlert(`${text} Error: ${error}`)
        else if (error && typeof(error) === "object") setMessageAlert(`${text} Error: ${JSON.stringify(error.message)}`)
        else setMessageAlert(text)
        setAlertVisible(true)
    }

    useEffect(() => {        
        if (process.env.REACT_APP_ENV === 'production' && (! isSSR)) {
            if (window.location.hostname !== "leidtogi.ru" && window.location.hostname !== "www.leidtogi.ru") {
                document.getElementById("repair").style.display = "flex"
            }else {
                //document.getElementById("fundraising").style.display = "flex"
            }
        }
        echo()
			.then(data => {
				if (data?.ok !== true) 
                    getError(`Отсутствует связь с сервером!`)
			})
			.catch(() => getError(`Отсутствует связь с сервером!`))

        // if (localStorage.getItem("fundraising") !== "offf") {
        //     document.getElementById("fundraising").style.display = "flex"
        // }
    }, [])
    
    // if (props.staticContext) console.log(props.staticContext.brand_store[0].name)

    useEffect(() => {

        if (( ! isSSR ) && localStorage.getItem('token')) {
            getUserInfo()
                .then(
                    data => {
                        if (data?.id) {
                            userStore.setUser({ ...data, activationLink: null, password: null })
                            userStore.setIsAuth(true)
                        }else {
                            localStorage.removeItem('token')
                        }
                    },
                    error =>  getError(`Не удалось загрузить информацию о пользователях!`, error)
                )
                .catch(error => getError(`Не удалось загрузить данные о пользователях!`, error))
                .finally(() => userStore.setLoading(false))
        }else userStore.setLoading(false)
        
        // if (props.staticContex) {
        //     brandStore.setBrands(props.staticContex.brand_store)
        //     console.log(props.staticContex)
        // }else 
        if ( window.initial_state && window.initial_state.brand_store ) 
        {
            let data = leidtogiFirst(window.initial_state.brand_store)
            data = addedTmkBrands(data)
            brandStore.setBrands(data)
            // console.log("initial_brand_store")
        }
        else 
        {
            fetchBrands()
            .then(
                data => {
                    // устанавливаем бренд LeidTogi на первое место
                    data = leidtogiFirst(data)
                    data = addedTmkBrands(data)
                    // сохраняем бренды в сторе
                    brandStore.setBrands(data)
                    // brandStore.setSelectedBrand(data[0])
                    // console.log("fetchBrands")
                },
                error => getError(`Не удалось загрузить бренды!`, error)
            )
            .catch(error => getError(`Не удалось загрузить данные о брендах!`, error))
        }
        
        let basket = null
        if ( ! isSSR ) basket = localStorage.getItem('cart') 
        if (basket) {
            cartStore.setCart(JSON.parse(basket))
        }
        
        // scrollUp(0, 700)
        
    }, [ brandStore, userStore, cartStore ])


    const locale = LOCALES.RUSSIAN
    // const locale = LOCALES.TURKISH
    const [currentLocale, setCurrentLocale] = useState(locale)
    
    const jsx = (
        <QueryParamProvider adapter={ReactRouter5Adapter}>
            <Header />
                <AppRouter />
            <Footer />
        </QueryParamProvider>
    )


    if (alertVisible) return <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={messageAlert} />


    return (
    <div id="wait">
        <IntlProvider 
            messages={messages[isSSR ? currentLocale : localeStore.currentLocale]}
            locale={isSSR ? currentLocale : localeStore.currentLocale}
            defaultLocale={LOCALES.RUSSIAN}
        >
            {isSSR 
            ?
            <>
                {jsx}
            </>
            :
            <BrowserRouter>
                {jsx}
            </BrowserRouter>
            }
        </IntlProvider>
    </div>   
    )

})
