import React, { useContext } from 'react'
import {  Image } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import $ from 'jquery'

import star from '../../assets/star.png'
import { Card } from '../myBootstrap'
// eslint-disable-next-line
import { PRODUCT_ROUTE, API_URL, ERROR_ROUTE } from '../../utils/consts'
import ButtonBuy from '../cart/ButtonBuy'
import { Context } from '../..'
import './Product.css'
import RequestPrice from '../cart/RequestPrice'


const ProductItem = ({product}) => {

    const history = useHistory()

    const { brand } = useContext(Context)


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
                // console.log("brand", brand);
                $('html, body').animate(
                    {
                        scrollTop: 0
                    }, 
                    700, 
                    function(){}
                )
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
                            {product.request 
                            ? `Цена по запросу` 
                            : <>{product.price}&nbsp;р.</>}
                        </div>

                        {product.rating 
                        ? 
                            <div className="product-rating">
                                <div>{product.rating}</div>
                                <Image className="mt-1 ml-1" width={15} height={15} src={star} />
                            </div>
                        : null}

                    </div>
                    
                    {product.request 
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
