import React, { useState, useContext, useEffect } from 'react'
import {  Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import star from '../../assets/star.png'
import { Card } from '../myBootstrap'
import { API_URL, ERROR_ROUTE } from '../../utils/consts'
import ButtonBuy from '../cart/ButtonBuy'
import RequestPrice from '../cart/RequestPrice'
import priceFormater from '../../utils/priceFormater'
import scrollUp from '../../utils/scrollUp'
import { Context } from '../..'
import './Product.css'


const ProductItem = ({product}) => {

    const history = useHistory()

    const { brand } = useContext(Context)

    const [ price, setPrice ] = useState(null)

    useEffect(() => {
        setPrice(priceFormater(product.price))
    },[product.price])


    return (
        <div
            className="ProductItem"
            onClick={() => {
                // history.push(PRODUCT_ROUTE + '/' + product.id)
                let url = ERROR_ROUTE
                let brandName = "milwaukee" // дефолтное состояние
                brand.allBrands.forEach(i => {
                    if (product.brandId === i.id) {
                        brand.setSelectedBrand(i)
                        brandName = i.name
                    }
                })
                if (brandName) url = brandName.toLowerCase() + '/' + product?.url
                
                history.push(url)
                scrollUp()
            }}
        >
            <Card 
                className="product-card"
            >

                <Image 
                    className="product-image" 
                    src={product.img && Array.isArray(product.img)  && product.img[0]?.big !== undefined
                        ? API_URL + product.img[0].big 
                        : API_URL + "unknown.jpg"} 
                />

                <div className="product-body">

                    <div className="product-name">
                        {product.name.length > 90
                        ?
                            <div title={product.name}>{product.name.slice(0, 80) + "..."}</div>
                        :
                            product.name
                        }

                        <p>артикул: {product.article}</p>
                        
                    </div> 
 
                    <div className="product-text">
                        
                        <div className="product-price">
                            {product.request || price === 0
                            ? `Цена по запросу` 
                            : <>{price}&nbsp;р.</>}
                        </div>

                        {product.rating 
                        ? 
                            <div className="product-rating">
                                <div>{product.rating}</div>
                                <Image className="mt-1 ml-1" width={15} height={15} src={star} />
                            </div>
                        : null}

                    </div>
                    
                    {product.request || price === 0
                    ? 
                    <RequestPrice product={product}>
                        ЗАПРОСИТЬ
                    </RequestPrice> 
                    : 
                    <ButtonBuy product={product}>
                        КУПИТЬ
                    </ButtonBuy>}
                    

                </div>

            </Card>
        </div>
    )
}

export default ProductItem
