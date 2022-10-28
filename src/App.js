import { useContext, useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { observer } from 'mobx-react-lite'

import AppRouter from './components/AppRouter'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Alert } from './components/myBootstrap'
// import Loading from './components/Loading'
import { getUserInfo } from './http/userAPI'
import { fetchAllProducts } from './http/productAPI'
import { fetchAllCategories } from './http/categoryAPI'
import { fetchBrands } from './http/brandAPI'
import { echo } from './http/testerAPI'
import scrollUp from './utils/scrollUp'
import { 
    mixPromo, mixAllProducts, leidtogiFirst, 
    productsWithOutImageRemoveInEnd, addedTmkBrands 
} from './service/app'
import { Context } from '.'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/App.css'


const App = observer(() => { 

    const { user, productStore, category, brand, cart } = useContext(Context)

    // const [ loading, setLoading ] = useState(false)
    const [ alertVisible, setAlertVisible ] = useState(false)
    const [ messageAlert, setMessageAlert ] = useState("")

    const getError = (text, error) => {
        if (error && typeof(error) === "string") setMessageAlert(`${text} Error: ${error}`)
        else if (error && typeof(error) === "object") setMessageAlert(`${text} Error: ${JSON.stringify(error.message)}`)
        else setMessageAlert(text)
        setAlertVisible(true)
    }

    useEffect(() => {
        echo()
			.then(data => {
				if (data?.ok !== true) getError(`Отсутствует связь с сервером!`)// alert("Отсутствует связь с сервером!")
			})
			.catch(() => getError(`Отсутствует связь с сервером!`))
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let prod = false
        if (process.env.REACT_APP_ENV === 'production') {
            if (window.location.hostname !== "leidtogi.ru" && window.location.hostname !== "www.leidtogi.ru") {
                document.getElementById("repair").style.display = "flex"
            }else {
                prod = true
            }
        }

        if (localStorage.getItem('token')) {
            // setLoading(true)
            getUserInfo()
                .then(
                    data => {
                        if (data?.id) {
                            user.setUser({...data,activationLink:null,password:null})
                            user.setIsAuth(true)
                        }else {
                            localStorage.removeItem('token')
                        }
                    },
                    error =>  getError(`Не удалось загрузить информацию о пользователях!`, error)
                )
                .catch(error => getError(`Не удалось загрузить данные о пользователях!`, error))
                .finally(() => user.setLoading(false))
        }else user.setLoading(false)

        fetchAllCategories()
            .then(
                data => category.setAllCategories(data),
                error => {
                    getError(`Не удалось загрузить категории!`, error)
                    category.setAllCategories([{}])
                }
            )
            .catch(error => getError( `Не удалось загрузить данные о категориях!`, error))
            // .finally(() => setLoading(false))
        
        fetchBrands()
            .then(
                data => {
                    // устанавливаем бренд LeidTogi на первое место
                    data = leidtogiFirst(data)
                    data = addedTmkBrands(data)
                    // сохраняем бренды в сторе
                    brand.setAllBrands(data)
                    // brand.setSelectedBrand(data[0])
                },
                error => getError(`Не удалось загрузить бренды!`, error)
            )
            .catch(error => getError(`Не удалось загрузить данные о брендах!`, error))

        fetchAllProducts()
            .then(
                data => {
                    // перемешать?
                    if (productStore.mixAll) mixAllProducts(data)
                    // добавление товаров без изображений в конец списка
                    if (productStore.mixNoImg) data = productsWithOutImageRemoveInEnd(data) 
                    // cмешиваем акционные товары с остальными
                    mixPromo(data) 
                    if ( ! prod ) productStore.setAllProducts(data) // if NOT production 
                    else productStore.setAllProducts(data.filter(i => i.have === 1)) // && i.brandId !== 10)) // if production mode and NOT LeidTogi brand
                },
                error => getError(`Не удалось загрузить товары!`, error)
            )
            .catch(error => getError(`Не удалось загрузить данные о товарах!`, error))
        
        let basket = localStorage.getItem('cart')
        if (basket) {
            cart.setCart(JSON.parse(basket))
        }
        
        scrollUp(0)
        
    }, [ brand, category, productStore, user, cart ])


//   if (loading) return <Loading />

    if (alertVisible) return <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={messageAlert} />


    return (
        <BrowserRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
                <Header />

                <AppRouter />

                <Footer />
            </QueryParamProvider>
        </BrowserRouter>
    )
})

export default App
