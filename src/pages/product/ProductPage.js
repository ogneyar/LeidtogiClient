import React, { useEffect, useState, useContext } from 'react'
import { Card, Container, Image, Row } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import ReactHtmlParser from 'react-html-parser'

import { fetchOneProduct, fetchOneProductOnUrl } from '../../http/productAPI'

import { API_URL } from '../../utils/consts'
import Error from '../error/ErrorPage'
import Loading from '../../components/Loading'
import ButtonBuy from '../../components/cart/ButtonBuy'
import Rating from '../../components/rating/Rating'
import detailDataLayer from '../../service/dataLayer/detail'
import { Context } from '../..'
import './ProductPage.css'
import RequestPrice from '../../components/cart/RequestPrice'


const ProductPage =  observer((props) => {
    // eslint-disable-next-line
    const { rating, bread, brand } = useContext(Context)

    const { id, url } = useParams()

    const history = useHistory()
    
    const [product, setProduct] = useState({name: "", article: "", img: "", price: "", info: [], size: [], have: 1, request: 0})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        if (id) {
            fetchOneProduct(id)
                .then(data => {
                    if (!data?.id) history.push("/error")

                    setProduct(data)
                    
                    rating.setRate(data.rating)
                },err => {
                    setError(true)
                })
                .finally(() => setLoading(false))
        }
    // eslint-disable-next-line
    },[id])
    
    
    useEffect(() => {
        if (url) {
            fetchOneProductOnUrl(url)
                .then(data => {
                    if (!data?.id) history.push("/error")

                    
                    // console.log(data?.brandId);
                    brand.allBrands.forEach(i => {
                        if (data?.brandId === i?.id) 
                            if (i?.name.toLowerCase() !== props?.brandName) history.push("/" + props?.brandName)
                    })
                    
                    setProduct(data)

                    rating.setRate(data.rating)
                },err => {
                    setError(true)
                })
                .finally(() => setLoading(false))
        }
    // eslint-disable-next-line
    },[url])

    if (loading) return <Loading />

    if (error) return <Error />

    if (!loading && !error) {
        detailDataLayer({ // Яндекс.Метрика
            article: product?.article,
            name: product?.name,
            price: product?.price,
        })
    }


    return ( 
        <Container className="ProductPage">
            <div className="ProductName">
                <h3>{product.name}</h3> 
                <p>Артикул: {product.article}</p> 
            </div>
            <div className="ProductMainBox">
                <div md={4} className="ProductImage">
                    {/* <Image width={300} height={300} src={API_URL + product.img} /> */}
                    <Image 
                        width={300} 
                        src={product.img && Array.isArray(product.img) && product.img[0]?.big !== undefined
                            ? API_URL + product.img[0].big 
                            : API_URL + "unknown.jpg"} 
                    />
                    <div
                        className="ProductImageDiv" 
                    >
                        {product.img && Array.isArray(product.img) && product.img[0]?.big !== undefined
                        ? product.img.map(i => {
                            return (
                                <Image 
                                    key={i.small + new Date()}
                                    className="ProductImageSmall" 
                                    width={80} 
                                    src={API_URL + i.small} 
                                />
                            )
                        })
                        : null}
                    </div>
                </div>
                <div md={4}>
                    <Row className="ProductRating">
                        <Rating product={product} rating={rating.rate} />
                    </Row>
                </div>
                <div md={4} className="ProductColCard">
                    <Card className="ProductCard">
                        {product.request ? 
                            <h3>Цена: По запросу</h3>
                        :
                            <h3>Цена: {product.price} руб.</h3>
                        }
                        <div
                            className="ProductCardDivButtonBuy"
                        >
                            {product.request ? 
                                <RequestPrice
                                    // className="ProductCardButtonBuy" 
                                    product={product}
                                >
                                    Запросить цену
                                </RequestPrice>
                            : 
                                <ButtonBuy 
                                    className="ProductCardButtonBuy" 
                                    product={product}
                                >
                                    Добавить в корзину
                                </ButtonBuy>
                            }
                        </div>
                    </Card>
                </div>
            </div>
            
            {product?.info && Array.isArray(product.info) && product.info[0]?.title !== undefined
            ?
                product.info.map((info, index) =>
                    <div 
                        className="ProductInfo"
                        key={info?.id}
                    >
                        {info?.title === "characteristics" || info?.title === "Характеристики"
                        ?
                        <>
                        <h2>Характеристики</h2>
                        <table>
                        { 
                            ReactHtmlParser(info?.body)
                        }
                        </table>    
                        </>
                        : info?.title === "description" 
                            ? 
                            <>
                            <h2>Описание</h2>
                            <div>
                            {
                                ReactHtmlParser(info?.body)
                            }
                            </div>    
                            </>
                            : info?.title === "equipment" 
                                ? 
                                <>
                                <h2>Комплектация</h2>
                                <table 
                                    // className={index % 2 === 0 ? "ProductInfoRowLight" : "ProductInfoRowTansparent"}
                                >
                                    
                                    {
                                    ReactHtmlParser(info?.body)
                                    }
                                </table>
                                </> 
                                : null
                        }
                            
                    </div>
                )
            : null}
           
            {product.size && product.size.length > 0
            ?
            <div className="ProductSize">
                <h2>Габариты</h2>
                <div className={"ProductInfoRowLight"}>Вес: {product.size[0].weight} кг</div>
                <div className={"ProductInfoRowTansparent"}>Объём: {product.size[0].volume} м.куб</div>
                <div className={"ProductInfoRowLight"}>Ширина: {product.size[0].width} мм</div>
                <div className={"ProductInfoRowTansparent"}>Высота: {product.size[0].height} мм</div>
                <div className={"ProductInfoRowLight"}>Длина: {product.size[0].length} мм</div>
            </div>
            : null}
            
        </Container>
    )
})

export default ProductPage
