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
    
    const { user, product, category, brand } = useContext(Context)

    const history = useHistory()

    useEffect(() => {
    },[])

    useEffect(() => {
        if (product.allProducts.length) {
            product.setProducts(product.allProducts)
            product.setTotalCount(product.allProducts.length)
        }
    // eslint-disable-next-line
    },[product.allProducts])

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
                ????????????
            </Button>
            
            {user.user?.id === 1 && <hr/>}

            {user.user?.id === 1 
            ?
                <Button 
                    variant={"outline-dark"} 
                    className="m-3 p-2 Admin_button"
                    onClick={() => setUserVisible(true)}
                >
                    ???????????????? ??????????????????????????
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
                    ???????????????? ??????????????????
                </Button>
            : null}

            {user.user?.id === 1 
            ?
                <Button 
                    variant={"outline-dark"} 
                    className="m-3 p-2 Admin_button"
                    onClick={() => setCategoryVisible(true)}
                >
                    ???????????????? ??????????????????
                </Button>
            : null}

            {user.user?.id === 1 
            ?
                <Button 
                    variant={"outline-dark"} 
                    className="m-3 p-2 Admin_button"
                    onClick={() => setBrandVisible(true)}
                >
                    ???????????????? ??????????????
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
                    ????????????
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
                    ????????????
                </Button>
            : null}

            <hr/>

            <Button 
                variant={"outline-danger"} 
                className="m-3 p-2 Admin_button"
                onClick={() => setDeleteSiteVisible(true)}
            >
                ?????????????? ????????!!!
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
