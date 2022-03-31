import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { SHOP_ROUTE, MILWAUKEE_ROUTE, HUSQVARNA_ROUTE, RGK_ROUTE, KVT_ROUTE, API_URL } from '../../utils/consts'
import scrollUp from '../../utils/scrollUp'
import './MainPage.css'


const MainPage = () => {

    const history = useHistory()

    const [ info, setInfo ] = useState([])

    const [ quantity, setQuantity ] = useState(0)

    const onClickBox = (route, scroll = 200) => {
        history.push(route)
        scrollUp(scroll)
    }

    useEffect(() => {
        let array = []

        array.push({
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/elektroinstrument.jpg"
        })
        array.push({
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/elektroinstrument.jpg"
        })
        array.push({
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/elektroinstrument.jpg"
        })
        array.push({
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/elektroinstrument.jpg"
        })
        array.push({
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/elektroinstrument.jpg"
        })
        array.push({
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/elektroinstrument.jpg"
        })
        array.push({
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/elektroinstrument.jpg"
        })
        array.push({
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/elektroinstrument.jpg"
        })
        array.push({
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/elektroinstrument.jpg"
        })

        let minimal
        if (window.innerWidth > 991) minimal = 4
        else if (window.innerWidth > 490) minimal = 3
        else minimal = 2

        setQuantity(Math.trunc(array.length / minimal) * minimal)

        setInfo(array)
    },[])

    return (
    <div
        className="MainPage"
    >
        <div
            className="MainPage_box"
        >
            <div
                className="MainPage_box_header"
                onClick={() => onClickBox(SHOP_ROUTE)}
            >
                Посетите наш магазин
            </div>

            <div className="MainPage_box_body">

                {info && Array.isArray(info) && info.map((i, idx) => {
                    // let quantity
                    
                    if (idx >= quantity) return null//<div key={idx + i.title}/>
                    return <div key={idx + i.title} className="MainPage_box_body_item">
                        <span>{i.title}</span>
                        {i.body.map((j, index) => {
                            return <p key={index + j}>{j}</p>
                        })}
                        <img src={i.image} alt={i.title} width="200px" />
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

        </div>
    </div>
    )
}

export default MainPage