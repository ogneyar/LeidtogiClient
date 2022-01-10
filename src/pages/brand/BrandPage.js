import React from 'react'
import { useParams } from 'react-router-dom'

import ProductPage from '../product/ProductPage'
import ShopPage from '../shop/ShopPage'

import './BrandPage.css'


const BrandPage = (props) => {
    
    const { url } = useParams()
    
    if (url) return <ProductPage brandName={props?.brandName} />

    return <ShopPage brandName={props?.brandName} />
}

export default BrandPage
