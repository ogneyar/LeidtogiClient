import React, { useState, useContext, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { authRoutes, publicRoutes } from '../utils/routes'
import ShopPage from '../pages/shop/ShopPage'
import BrandPage from '../pages/brand/BrandPage'
import { SHOP_ROUTE } from '../utils/consts'
import { Context } from '..'
import Loading from './Loading'
import { echo } from '../http/testerAPI'


const AppRouter = observer(() => {
    
    const { user, brand } = useContext(Context)

    const [ brandRoutes, setBrandRoutes ] = useState([])

    useEffect(() => {
        setBrandRoutes(brand.allBrands.map(i => {
            let brandName = i?.name.toLowerCase()
            return {
                path: '/' + brandName,
                Component: () => BrandPage({ brandName })
            }
        }))
    }, [brand.allBrands])
	
	useEffect(() => {
        echo()
			.then(data => {
				if (data?.ok !== true) alert("Отсутствует связь с сервером!")
			})
			.catch(() => alert("Отсутствует связь с сервером!"))
    }, [])

    if (brandRoutes[0]?.path === undefined) return <Loading />

    return (
        <Switch> 
            {/* роуты зарегистрированных пользователей */}
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}
            {/* общедоступные роуты */}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}

            {/* роуты брендов - /nazvanie-brenda */}
            {brandRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact />
            )}
            {brandRoutes.map(({path, Component}) => 
                <Route key={path + '/:url'} path={path + '/:url'} component={Component} />
            )}

            {/* роут категорий - /nazvanie-kategorii */}
            <Route key={'/:name'} path={'/:name'} component={ShopPage} exact />

            <Redirect to={SHOP_ROUTE} /> 
        </Switch>
    )
})

export default AppRouter
