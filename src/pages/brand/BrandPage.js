import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import ProductPage from '../product/ProductPage'
import ShopPage from '../shop/ShopPage'
// eslint-disable-next-line
import { API_URL } from '../../utils/consts'
import { Container } from 'react-bootstrap'

import { Context } from '../..'
import './BrandPage.css'


const BrandPage = (props) => {
    
    const { url } = useParams()
    
    const { brand } = useContext(Context)
        
    const [ images ] = useState(document.getElementsByClassName("BrandPage_image"))
    
    useEffect(() => {
        // console.log(images)
        // alert(Math.round(window.innerWidth * 0.173))
        if (window.innerWidth < 576) images[0].style.height = Math.round(window.innerWidth * 0.173) - 20 + "px"
    },[images])
    
    useEffect(() => {
        brand.brands.forEach(i => {
            if (i.name.toLowerCase() === props?.brandName) brand.setSelectedBrand(i)
        })
    },[brand, props?.brandName])
    
    if (url) return <ProductPage brandName={props?.brandName} />

    return (<>
        <Container
            className="BrandPage"
        >
            {
                props?.brandName === "milwaukee" 
                ? 
                <div className="BrandPage_image">
                    {/* <img src={API_URL + "/milwaukee/Milwaukee_logo_middle.jpg"}  alt="logo_milwaukee" /> */}
                    <img src={"images/brands/milwaukee/Milwaukee_logo.jpg"}  alt="logo_milwaukee" />
                </div>
                :
                props?.brandName === "husqvarna"
                ? 
                <div className="BrandPage_image">
                    {/* <img src={API_URL + "/husqvarna/Husqvarna_logo_mini.jpg"}  alt="logo_husqvarna" /> */}
                    <img src={"images/brands/husqvarna/Husqvarna_logo.jpg"}  alt="logo_husqvarna" />
                </div>
                :
                props?.brandName === "gedore" 
                ?
                <div className="BrandPage_image">
                    {/* <img src={API_URL + "/gedore/Gedore_logo_middle.jpg"}  alt="logo_gedore" /> */}
                    <img src={"images/brands/gedore/Gedore_logo.jpg"}  alt="logo_gedore" />
                </div>
                : 
                props?.brandName === "rgk" 
                ?
                <div className="BrandPage_image">
                    {/* <img src={API_URL + "/rgk/RGK_logo_middle.jpg"}  alt="logo_rgk" /> */}
                    <img src={"images/brands/rgk/RGK_logo.jpg"}  alt="logo_rgk" />
                </div>
                : 
                props?.brandName === "kvt" 
                ?
                <div className="BrandPage_image">
                    {/* <img src={API_URL + "/kvt/KVT_logo_middle.jpg"}  alt="logo_kvt" /> */}
                    <img src={"images/brands/kvt/KVT_logo.jpg"}  alt="logo_kvt" />
                </div>
                : 
                props?.brandName.replace(props?.brandName[0], props?.brandName[0].toUpperCase())
            }
        </Container>

        <ShopPage brandName={props?.brandName} />

    </>)
}

export default BrandPage
