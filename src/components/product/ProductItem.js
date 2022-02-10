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


const ProductItem = ({product}) => {

    const history = useHistory()

    const { brand } = useContext(Context)

    // if (product.article === "4933459271") console.log(product.name.length)

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
                            <div title={product.name}>{product.name.slice(0, 90) + "..."}</div>
                        :
                            product.name
                        }

                        {/* {product.name.length < 100  */}
                        {/* &&  */}
                        <p>артикул: {product.article}</p>
                        {/* } */}
                        
                    </div> 
 
                    {/* <div className="product-article">
                        артикул: {product.article}
                    </div> */}

                    <div className="product-text">

                        {/* <div className="product-description">
                            Описание &#9734; товара
                        </div> */}

                        <div className="product-price">
                            {product.price}&nbsp;р.
                        </div>

                        {product.rating 
                        ? 
                            <div className="product-rating">
                                <div>{product.rating}</div>
                                <Image className="mt-1 ml-1" width={15} height={15} src={star} />
                            </div>
                        : null}

                    </div>
                    
                    <ButtonBuy product={product}>
                        КУПИТЬ
                    </ButtonBuy>

                </div>

            </Card>
        </div>
    )
}

export default ProductItem
