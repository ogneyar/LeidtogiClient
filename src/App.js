import { useContext, useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { observer } from 'mobx-react-lite'

import AppRouter from './components/AppRouter'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Loading from './components/Loading'
import { getUserInfo } from './http/userAPI'
import { fetchAllProducts } from './http/productAPI'
import { fetchAllCategories } from './http/categoryAPI'
import { fetchBrands } from './http/brandAPI'
import { Context } from '.'
import scrollUp from './utils/scrollUp'
import { mixPromo, sortAllProducts, leidtogiFirst, productsWithOutImageRemoveInEnd } from './service/app'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/App.css'


const App = observer(() => { 

    const { user, product, category, brand, cart } = useContext(Context)

    const [loading, setLoading] = useState(false)


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
            setLoading(true)
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
                    err => console.log(err))
                .finally(() => user.setLoading(false))
        }else user.setLoading(false)

        fetchAllCategories()
            .then(
                data => category.setAllCategories(data),
                err => {
                    console.log("Не удалось загрузить категории",err)
                    category.setAllCategories([{}])
                })
            .finally(() => setLoading(false))

        fetchAllProducts()
            .then(
                data => {
                    // перемешать?
                    if (product.sort) sortAllProducts(data)
                    // добавление товаров без изображений в конец списка
                    if (product.mixNoImg) data = productsWithOutImageRemoveInEnd(data) 
                    // cмешиваем акционные товары с остальными
                    mixPromo(data) 
                    if ( ! prod ) product.setAllProducts(data) // if NOT production
                    else product.setAllProducts(data.filter(i => i.have === 1 && i.brandId !== 10)) // if production mode and NOT LeidTogi brand
                },
                err => console.log(err))
        
        fetchBrands()
            .then(
                data => {
                    // устанавливаем бренд LeidTogi на первое место
                    data = leidtogiFirst(data)

                    brand.setAllBrands(data)
                    brand.setSelectedBrand(data[0])
                },
                err => console.log(err))
        
        let basket = localStorage.getItem('cart')
        if (basket) {
            cart.setCart(JSON.parse(basket))
        }
        
        scrollUp(0)
    
    }, [brand, category, product, user, cart])

  
  if (loading) return <Loading />
  

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
