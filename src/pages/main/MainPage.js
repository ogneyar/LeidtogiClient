
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { 
    MILWAUKEE_ROUTE, HUSQVARNA_ROUTE, GEDORE_ROUTE, RGK_ROUTE, KVT_ROUTE, 
    SCROLL_TOP, SCROLL_TOP_MOBILE, SHOP_ROUTE
} from '../../utils/consts'
import scrollUp from '../../utils/scrollUp'
import ShopButton from './ShopButton'
import array from './mainData'

import './MainPage.css'
import Banner from '../../components/header/banner/Banner'


const MainPage = () => {

    const history = useHistory()

    const [ info, setInfo ] = useState([])

    const [ quantity, setQuantity ] = useState(0)

    const onClickBox = (route, scroll = 0) => {
        if (! scroll) {
            if (window.innerWidth > 575) scroll = SCROLL_TOP
            else scroll = SCROLL_TOP_MOBILE
        }
        if ( ! route) history.push(SHOP_ROUTE)
        else history.push(route)
        scrollUp(scroll) 
    }

    useEffect(() => {
        let minimal
        if (window.innerWidth > 991) minimal = 4
        else if (window.innerWidth > 490) minimal = 3
        else minimal = 2

        setQuantity(Math.trunc(array.length / minimal) * minimal)

        array.sort(() => Math.random() - 0.5)

        setInfo(array)
    },[])

    return (
    <>
    <Banner padding="bottom"/>
    <div
        className="MainPage"
    >
        <div
            className="MainPage_box"
        >
            <ShopButton />

            <div className="MainPage_box_body">

                {info && Array.isArray(info) && info.map((i, idx) => {
                    // let quantity
                    
                    if (idx >= quantity) return null//<div key={idx + i.title}/>
                    return <div 
                        key={idx + i.title} 
                        className="MainPage_box_body_item"
                        onClick={() => onClickBox(i.url)}
                    >
                        <div className="MainPage_box_body_item_title">
                            <span>{i.title}</span>
                        </div>
                        <div className="MainPage_box_body_item_examples">
                            {i.body.map((j, index) => {
                                return <p key={index + j}>{j}</p>
                            })}
                        </div>
                        <div className="MainPage_box_body_item_image">
                            <img src={i.image} alt={i.title} /*width="200px"*/ />
                        </div>
                    </div>
                })}

            </div>
            
            
            {!true ?
            <div className="MainPage_box_body_brand">
                <div
                    className="MainPage_box_body_brand_item"
                    onClick={() => onClickBox(MILWAUKEE_ROUTE)}
                >
                    Milwaukee
                </div>
                <div
                    className="MainPage_box_body_brand_item"
                    onClick={() => onClickBox(HUSQVARNA_ROUTE)}
                >
                    Husqvarna
                </div>
                <div
                    className="MainPage_box_body_brand_item"
                    onClick={() => onClickBox(GEDORE_ROUTE)}
                >
                    Gedore
                </div>
                <div
                    className="MainPage_box_body_brand_item"
                    onClick={() => onClickBox(RGK_ROUTE)}
                >
                    РусГеоКом
                </div>
                <div
                    className="MainPage_box_body_brand_item"
                    onClick={() => onClickBox(KVT_ROUTE)}
                >
                    К В Т
                </div>
            </div>
            : null}


            {info[0] !== undefined && <ShopButton />}

        </div>
    </div>
    </>
    )
}

export default MainPage