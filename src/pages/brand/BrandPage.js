import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import ProductPage from '../product/ProductPage'
import ShopPage from '../shop/ShopPage'

import { Context } from '../..'
import './BrandPage.css'
import { API_URL } from '../../utils/consts'
import { Container } from 'react-bootstrap'


const BrandPage = (props) => {
    
    const { url } = useParams()
    
    const { brand } = useContext(Context)
    
    // const [ info, setInfo ] = useState([])
    // console.log("jhjgjghjghj");
    
    useEffect(() => {
        // setInfo(brand.brands)
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
                <div>
                    {/* Milwaukee */}
                    <img src={API_URL + "/milwaukee/Milwaukee_logo_middle.jpg"}  alt="logo_milwaukee" />
                </div>
                :
                props?.brandName === "husqvarna"
                ? 
                <div>
                    {/* Husqvarna */}
                    <img src={API_URL + "/husqvarna/Husqvarna_logo_mini.jpg"}  alt="logo_husqvarna" />
                </div>
                :
                props?.brandName === "rgk" 
                ?
                <div>
                    {/* РусГеоКом */}
                    <img src={API_URL + "/rgk/RGK_logo_middle.jpg"}  alt="logo_rgk" />
                </div>
                : 
                props?.brandName === "kvt" 
                ?
                <div>
                    {/* К В Т */}
                    <img src={API_URL + "/kvt/KVT_logo_middle.jpg"}  alt="logo_kvt" />
                </div>
                : 
                props?.brandName === "gedore" 
                ?
                <div>
                    {/* Gedore */}
                    <img src={API_URL + "/gedore/Gedore_logo_middle.jpg"}  alt="logo_gedore" />
                </div>
                : 
                props?.brandName.replace(props?.brandName[0], props?.brandName[0].toUpperCase())
            }
        </Container>

        <ShopPage brandName={props?.brandName} />

    </>)
}

export default BrandPage
