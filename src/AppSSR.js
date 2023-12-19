//
import React from 'react'
// import { useContext, useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { QueryParamProvider } from 'use-query-params'
// import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
// import { observer } from 'mobx-react-lite'
// import { IntlProvider } from 'react-intl'

// import { LOCALES } from './i18n/locales'
// import { messages } from './i18n/messages'

// import AppRouter from './components/AppRouter'

import Header from './components/header/HeaderSSR'
// import Header from './components/header/Header'
import isSSR from './utils/isSSR'

// import Footer from './components/footer/Footer'
// import { Alert } from './components/myBootstrap'
// import { getUserInfo } from './http/userAPI'
// import { fetchBrands } from './http/brandAPI'
// import { echo } from './http/testerAPI'
// import scrollUp from './utils/scrollUp'
// import { leidtogiFirst, addedTmkBrands } from './service/app'
// import { Context } from '.'

// import 'bootstrap/dist/css/bootstrap.css'
import './styles/App.css' 


// const App = observer(() => { 
export const App = () => { 
// export const App = observer(() => { 

    // const { userStore, brandStore, cartStore, localeStore } = useContext(Context)

    // const [ alertVisible, setAlertVisible ] = useState(false)
    // const [ messageAlert, setMessageAlert ] = useState("")

    // const getError = (text, error) => {
    //     if (error && typeof(error) === "string") setMessageAlert(`${text} Error: ${error}`)
    //     else if (error && typeof(error) === "object") setMessageAlert(`${text} Error: ${JSON.stringify(error.message)}`)
    //     else setMessageAlert(text)
    //     setAlertVisible(true)
    // }

    // useEffect(() => {        
    //     if (process.env.REACT_APP_ENV === 'production') {
    //         if (window.location.hostname !== "leidtogi.ru" && window.location.hostname !== "www.leidtogi.ru") {
    //             document.getElementById("repair").style.display = "flex"
    //         }else {
    //             //document.getElementById("fundraising").style.display = "flex"
    //         }
    //     }
    //     echo()
	// 		.then(data => {
	// 			if (data?.ok !== true) 
    //                 getError(`Отсутствует связь с сервером!`)
	// 		})
	// 		.catch(() => getError(`Отсутствует связь с сервером!`))

    //     // if (localStorage.getItem("fundraising") !== "offf") {
    //     //     document.getElementById("fundraising").style.display = "flex"
    //     // }
    // }, [])

    // useEffect(() => {

    //     if (localStorage.getItem('token')) {
    //         getUserInfo()
    //             .then(
    //                 data => {
    //                     if (data?.id) {
    //                         userStore.setUser({ ...data, activationLink: null, password: null })
    //                         userStore.setIsAuth(true)
    //                     }else {
    //                         localStorage.removeItem('token')
    //                     }
    //                 },
    //                 error =>  getError(`Не удалось загрузить информацию о пользователях!`, error)
    //             )
    //             .catch(error => getError(`Не удалось загрузить данные о пользователях!`, error))
    //             .finally(() => userStore.setLoading(false))
    //     }else userStore.setLoading(false)
        
    //     fetchBrands()
    //         .then(
    //             data => {
    //                 // устанавливаем бренд LeidTogi на первое место
    //                 data = leidtogiFirst(data)
    //                 data = addedTmkBrands(data)
    //                 // сохраняем бренды в сторе
    //                 brandStore.setBrands(data)
    //                 // brandStore.setSelectedBrand(data[0])
    //             },
    //             error => getError(`Не удалось загрузить бренды!`, error)
    //         )
    //         .catch(error => getError(`Не удалось загрузить данные о брендах!`, error))
        
    //     let basket = localStorage.getItem('cart')
    //     if (basket) {
    //         cartStore.setCart(JSON.parse(basket))
    //     }
        
    //     scrollUp(0)
        
    // }, [ brandStore, userStore, cartStore ])


    // if (alertVisible) return <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={messageAlert} />

    // const locale = LOCALES.RUSSIAN
    // // const locale = LOCALES.TURKISH
    // const [currentLocale, setCurrentLocale] = useState(locale)
    

    return (
    <>
        { ! isSSR ?
            <BrowserRouter> 
                <Header />
                {/* <AppRouter /> */}
            </BrowserRouter>
        :
            <Header />
        }
        
        {/* <IntlProvider 
            messages={messages[localeStore.currentLocale]}
            locale={localeStore.currentLocale}
            defaultLocale={LOCALES.RUSSIAN}
        >
            <BrowserRouter>
                <QueryParamProvider adapter={ReactRouter5Adapter}>
                    <Header />

                    <AppRouter />

                    <Footer />
                </QueryParamProvider>
            </BrowserRouter>
        </IntlProvider> */}
    </>        
    )
// })
}

// export default App
