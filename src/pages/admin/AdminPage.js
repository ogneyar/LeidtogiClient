import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

import Order from '../../components/admin/OrderAdmin'
import User from '../../components/admin/UserAdmin'

import Category from '../../components/admin/Category'
import Brand from '../../components/admin/Brand'
import Product from '../../components/admin/Product'
import DeleteSite from '../../components/admin/DeleteSite'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'

import './AdminPage.css';
import scrollUp from '../../utils/scrollUp'


const Admin = observer(() => {
    
    const { user, productStore, category, brand } = useContext(Context)

    const history = useHistory()

    useEffect(() => {
    },[])

    useEffect(() => {
        if (productStore.allProducts.length) {
            productStore.setProducts(productStore.allProducts)
            productStore.setTotalCount(productStore.allProducts.length)
        }
    // eslint-disable-next-line
    },[productStore.allProducts])

    useEffect(() => {
        if (category.allCategories.length) {
            category.setCategories(category.allCategories)
            category.setSelectedCategory({})
        }
    // eslint-disable-next-line
    },[category.allCategories])

    useEffect(() => {
        if (brand.allBrands.length) {
            brand.setBrands(brand.allBrands)
            brand.setSelectedBrand({})
        }
    // eslint-disable-next-line
    },[brand.allBrands])

    const [orderVisible, setOrderVisible] = useState(false)
    const [userVisible, setUserVisible] = useState(false)
    
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [brandVisible, setBrandVisible] =  useState(false)
    const [productVisible, setProductVisible] = useState(false)
    
    const [deleteSiteVisible, setDeleteSiteVisible] = useState(false)

    return (
        <Container className="Content d-flex flex-column Admin Mobile">
            
            <Button 
                variant={"outline-dark"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setOrderVisible(true)}
            >
                Заказы
            </Button>
            
            {user.user?.id === 1 && <hr/>}

            {user.user?.id === 1 
            ?
                <Button 
                    variant={"outline-dark"} 
                    className="m-3 p-2 Admin_button"
                    onClick={() => setUserVisible(true)}
                >
                    Редактор пользователей
                </Button>
            : null}

            {user.user?.id === 1 && <hr/>}

            {user.user?.id === 1 
            ?
                <Button 
                    variant={"outline-dark"} 
                    className="m-3 p-2 Admin_button"
                    onClick={() => setProductVisible(true)}
                >
                    Редактор продукции
                </Button>
            : null}

            {user.user?.id === 1 
            ?
                <Button 
                    variant={"outline-dark"} 
                    className="m-3 p-2 Admin_button"
                    onClick={() => setCategoryVisible(true)}
                >
                    Редактор категорий
                </Button>
            : null}

            {user.user?.id === 1 
            ?
                <Button 
                    variant={"outline-dark"} 
                    className="m-3 p-2 Admin_button"
                    onClick={() => setBrandVisible(true)}
                >
                    Редактор брендов
                </Button>
            : null}

            {user.user?.id === 1 && <hr/>}
            
            {user.user?.id === 1 
            ?
                <Button 
                    variant={"outline-dark"} 
                    className="m-3 p-2 Admin_button"
                    onClick={() => {
                        scrollUp()
                        history.push("/parser")
                    }} 
                >
                    Парсер
                </Button>
            : null}

            {user.user?.id === 1 && <hr/>}

            {user.user?.id === 1 
            ?
                <Button 
                    variant={"outline-dark"} 
                    className="m-3 p-2 Admin_button"
                    onClick={() => {
                        scrollUp()
                        history.push("/tester")
                    }}
                >
                    Тестер
                </Button>
            : null}

            <hr/>

            <Button 
                variant={"outline-danger"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setDeleteSiteVisible(true)}
            >
                Удалить САЙТ!!!
            </Button>
            
            <Order show={orderVisible} onHide={() => setOrderVisible(false)}/>
            <User show={userVisible} onHide={() => setUserVisible(false)}/>

            <Product show={productVisible} onHide={() => setProductVisible(false)}/>
            <Category show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <Brand show={brandVisible} onHide={() => setBrandVisible(false)}/>

            <DeleteSite show={deleteSiteVisible} onHide={() => setDeleteSiteVisible(false)}/>
            
        </Container>
    )
})

export default Admin
