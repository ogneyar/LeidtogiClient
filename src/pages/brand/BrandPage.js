import React from 'react'
import { useParams } from 'react-router-dom'

import ProductPage from '../product/ProductPage'
import ShopPage from '../shop/ShopPage'

import './BrandPage.css'


const BrandPage = () => {
    
    const { url } = useParams()

    if (url) return <ProductPage />

    return <ShopPage />
}

export default BrandPage
