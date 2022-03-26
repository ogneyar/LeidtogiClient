import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import ProductPage from '../product/ProductPage'
import ShopPage from '../shop/ShopPage'

import { Context } from '../..'
import './BrandPage.css'


const BrandPage = (props) => {
    
    const { url } = useParams()
    
    const { brand } = useContext(Context)
    
    // const [ info, setInfo ] = useState([])
    
    useEffect(() => {
        // setInfo(brand.brands)
        brand.brands.forEach(i => {
            if (i.name.toLowerCase() === props?.brandName) brand.setSelectedBrand(i)
        })
    },[brand, props?.brandName])
    
    if (url) return <ProductPage brandName={props?.brandName} />

    return (<>
        <div
            className="BrandPage"
        >
            {
                props?.brandName === "milwaukee" 
                ? <>Milwaukee - бренд высокого уровня полёта (:</>
                :
                props?.brandName === "husqvarna"
                ? <>Husqvarna - бренд средего уровня полёта (:</>
                :
                props?.brandName === "rgk" 
                ? <>РусГеоКом - бренд низкого уровня полёта (:</>
                : 
                props?.brandName === "kvt" 
                ? <>К В Т - бренд совсем не летает (:</>
                : 
                props?.brandName.replace(props?.brandName[0], props?.brandName[0].toUpperCase())
            }
        </div>

        <ShopPage brandName={props?.brandName} />

    </>)
}

export default BrandPage
