import React, { useState, useContext, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { authRoutes, publicRoutes } from '../utils/routes'
import ShopPage from '../pages/shop/ShopPage'
import BrandPage from '../pages/brand/BrandPage'
// eslint-disable-next-line
import { SHOP_ROUTE, ERROR_ROUTE } from '../utils/consts'
// import { echo } from '../http/testerAPI'
import Loading from './Loading'
import { Context } from '..'


const AppRouter = observer(() => {
    
    const { user, brand } = useContext(Context)

    const [ brandRoutes, setBrandRoutes ] = useState([])

    
    useEffect(() => {
        setBrandRoutes(brand.allBrands.map(i => {
            let brandName = i?.name.toLowerCase()
            return {
                path: '/' + brandName,
                component: () => BrandPage({ brandName })
            }
        }))
    }, [brand.allBrands])
	
	// useEffect(() => {
    //     echo()
	// 		.then(data => {
	// 			if (data?.ok !== true) alert("Отсутствует связь с сервером!")
	// 		})
	// 		.catch(() => alert("Отсутствует связь с сервером!"))
    // }, [])

    // ожидание загрузки роутов брендов (Этот лоадинг на оранжевом фоне)
    if (brandRoutes[0]?.path === undefined) return <Loading />

    return (
        <Switch> 
            {/* роуты зарегистрированных пользователей */}
            {user.isAuth && authRoutes.map(({ path, component, status }) => 
                <Route key={path} path={path} component={component} status={status || 200} exact />
            )}

            {/* общедоступные роуты */}
            {publicRoutes.map(({ path, component, status }) => 
                <Route key={path} path={path} component={component} status={status || 200} exact />
            )}

            {/* роуты брендов - /nazvanie-brenda */}
            {brandRoutes.map(({ path, component, status }) => 
                <Route key={path} path={path} component={component} status={status || 200} exact />
            )}

            {/* роуты товаров, начинаются с имени бренда - /nazvanie-brenda/nazvanie-tovara */}
            {brandRoutes.map(({ path, component, status }) => 
                <Route key={path + '/:url'} path={path + '/:url'} component={component} status={status || 200} />
            )}

            {/* роут категорий - /nazvanie-kategorii */}
            <Route key={'/:name'} path={'/:name'} component={ShopPage} status={200} exact />

            {/* <Redirect to={SHOP_ROUTE} />  */}
            <Redirect to={ERROR_ROUTE} /> 
        </Switch>
    )
})

export default AppRouter
