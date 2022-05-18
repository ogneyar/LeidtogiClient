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
import RequestPrice from '../../components/cart/RequestPrice'
import priceFormater from '../../utils/priceFormater'

import { Context } from '../..'
import './ProductPage.css'


const ProductPage =  observer((props) => {
    // eslint-disable-next-line
    const { rating, bread, brand } = useContext(Context)

    const { id, url } = useParams()

    const history = useHistory()

    const [widthHeightInt] = useState(
        window.innerWidth > "991" 
        ? 400 
        : window.innerWidth > "768" 
            ? 500 
            : window.innerWidth > "560" 
                ? 440 
                : window.innerWidth > "470" 
                    ? 350 
                    : window.innerWidth > "420" 
                        ? 300 
                        : window.innerWidth > "360" 
                            ? 250 
                            : 200
        )
    const [widthHeight] = useState(widthHeightInt + "px")

    const [image, setImage] = useState(API_URL + "unknown.jpg")

    const [propotionX, setPropotionX] = useState(null)
    const [propotionY, setPropotionY] = useState(null)

    const [price, setPrice] = useState(null)
    const [oldPrice, setOldPrice] = useState(null)
    
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
        if (product.promo && JSON.parse(product.promo)?.old_price !== undefined) {
            setOldPrice(priceFormater(Number(JSON.parse(product.promo)?.old_price.replace(",", "."))))
        }
        setPrice(priceFormater(product.price))
    },[product.price, product.promo])


    useEffect(() => {
        if (product.img && Array.isArray(product.img) && product.img[0]?.big !== undefined) {
            setImage(API_URL + product.img[0].big)
        }
    },[product.img])
    
    useEffect(() => {
        if (image !== API_URL + "unknown.jpg") {
            const img = document.createElement('img')
            img.onload = e => {
                // setPropotionX(Math.round(img.width / widthHeightInt - 1))
                // setPropotionY(Math.round(img.height / widthHeightInt - 1))
                setPropotionX(img.width / widthHeightInt - 1)
                setPropotionY(img.height / widthHeightInt - 1)
            }
            img.src = image
        }
    },[image, widthHeightInt])
    
    useEffect(() => {
        if (url) {
            fetchOneProductOnUrl(url)
                .then(data => {
                    if (!data?.id) history.push("/error")
                    
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
                                    onClick={(e) => {
                                        setImage(API_URL + i.big)
                                    }}
                                    src={API_URL + i.small} 
                                />
                            )
                        })
                        : null}
                    </div>

                    <div
                        className={"ProductImage_ImageBig"}
                        style={{background:`url(${image}) 50% 50% / ${widthHeight} auto no-repeat`,width:widthHeight,height:widthHeight}}
                        onMouseOver={(e) => {
                            if (propotionX > 0 && propotionY > 0) e.target.style.cursor = "zoom-in"
                            else e.target.style.cursor = "default"
                        }}
                        onMouseMove={e => {
                            if (propotionX > 0 && propotionY > 0) {
                                e.target.style.background = `url(${image}) -${(e.pageX - e.target.offsetLeft)*propotionX}px -${(e.pageY - e.target.offsetTop)*propotionY}px no-repeat`
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = `url(${image}) 50% 50% / ${widthHeight} auto no-repeat`
                        }}
                    />
                        
                </div>
                <div md={4}>
                    <Row className="ProductRating">
                        <Rating product={product} rating={rating.rate} />
                    </Row>
                </div>
                <div md={4} className="ProductColCard">
                    <Card className="ProductCard">
                        <div
                            className="ProductCard_Price"
                        >
                            {product.request || price === 0
                            ? <h3>Цена: По запросу</h3>
                            : oldPrice
                                ? <>
                                    <h3>Цена:&nbsp;<span className="ProductCard_Price_oldPrice">{oldPrice} руб.</span></h3>
                                    <h3 className="ProductCard_Price_redPrice">{price} руб.</h3>
                                </>
                                :<h3>Цена: {price} руб.</h3>
                            }
                        </div>
                        <div
                            className="ProductCardDivButtonBuy"
                        >
                            {product.request || price === 0
                            ?
                                <RequestPrice
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
