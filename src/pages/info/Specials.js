import React, { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'

import InfoPage from './InfoPage'
import { getPromo } from '../../http/productAPI'
import Loading from '../../components/Loading'
import { API_URL, ERROR_ROUTE } from '../../utils/consts'
import priceFormater from '../../utils/priceFormater'
import ButtonBuy from '../../components/cart/ButtonBuy'
import scrollUp from '../../utils/scrollUp'

import { Context } from '../..'
import './Specials.css'


const Specials = () => {

    const history = useHistory()

    const { brand } = useContext(Context)

    const [ loading, setLoading ] = useState(true)
    
    const [ promo, setPromo ] = useState([])

    useEffect(() => {
        setLoading(true)
        getPromo()
            .then(data => {
                setPromo(data)
            })
            .finally(() => setLoading(false))
    }, [])

    const onClickProduct = (product) => {
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
    }

    return (
        <InfoPage>
            <div className="Specials">
                <header>Акции!</header>
                
                <p>&nbsp;&nbsp;&nbsp;&nbsp;Уважаемые посетители сайта, на этой странице будут размещаться акционные товары, скидки и акционные предложения.</p>
                          

                {loading ? <Loading />

                : promo && Array.isArray(promo) && promo.map(i => {
                    // alert(JSON.stringify(i.img))
                    let img = JSON.parse(i.img)
                    let price = priceFormater(i.price)
                    let oldPrice
                    if (i.promo && JSON.parse(i.promo)?.old_price !== undefined) {
                        oldPrice = priceFormater(Number(JSON.parse(i.promo)?.old_price.replace(",", ".")))
                    }

                    return (
                        <div 
                            key={i.id} 
                            onClick={() => onClickProduct(i)}
                            className="Specials_PromoItem"
                        >
                            <img 
                                src={API_URL + img[0]?.big} 
                                alt={`Изображение товара с артикулом ${i.article}`} 
                                width="150px"
                            />
                            <div className="Specials_PromoItem_Body">
                                <span className="Specials_PromoItem_Body_name">
                                    {i.name}
                                </span>
                                <p className="Specials_PromoItem_Body_article">
                                    артикул:&nbsp;{i.article}
                                </p>
                                <div className="Specials_PromoItem_Body_price">
                                    <span>Цена:&nbsp;</span>
                                    {oldPrice &&
                                    <span className="Specials_PromoItem_Body_price_old">
                                        {oldPrice}
                                    </span>}
                                    <span className="Specials_PromoItem_Body_price_red">
                                        {price}
                                    </span>
                                    <span>&nbsp;руб.</span>
                                </div>
                                <div className="Specials_PromoItem_Body_ButtonBuy">
                                    <ButtonBuy 
                                        product={i}
                                    >
                                        Купить
                                    </ButtonBuy>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </InfoPage>
    )
}

export default observer(Specials)

