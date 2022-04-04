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
            id: 1,
            title: "Электроинструмент и расходники",
            body: [
                'Дрели',
                'Перфораторы',
                'УШМ',
                'Шуруповёрты',
                'Сабельные пилы',
                'Лобзики',
            ],
            image: API_URL + "main/1_elektro_instrument.jpg"
        })
        array.push({
            id: 2,
            title: "Строительная техника и оборудование",
            body: [
                'Бензорезы',
                'Виброплиты',
                'Затирочные машины',
                'Нарезчики швов',
                'Промышленные пылесосы',
                'Стенорезные машины',
            ],
            image: API_URL + "main/2_stroitelnaya_tehnika.jpg"
        })
        array.push({
            id: 3,
            title: "Алмазный инструмент и оснастка",
            body: [
                'Алмазные коронки и сверла',
                'Алмазные отрезные диски',
                'Алмазные шлифовальные круги',
                'Алмазные головки',
                'Бруски с алмазным слоем',
                'Шлифпорошки',
            ],
            image: API_URL + "main/3_almaznij_instrument.jpg"
        })
        array.push({
            id: 4,
            title: "Металлообработка",
            body: [
                'Магнитные сверлильные станки',
                'Кольцевые фрезы',
                'Инструменты для сверления',
                'Инструменты для нарезки резьбы',
                'Фаскосъёмные машины',
                'Пилы',
            ],
            image: API_URL + "main/4_metalloobrabotka.jpg"
        })
        array.push({
            id: 5,
            title: "Слесарный и сантехнический инструмент",
            body: [
                'Искробезопасный инструмент',
                'Наборы инструментов',
                'Динамометрический инструмент',
                'Кузнечный инструмент',
                'Измерительный инструмент',
                'Автомобильный инструмент',
            ],
            image: API_URL + "main/5_slesarnij_instrument.jpg"
        })
        array.push({
            id: 6,
            title: "Такелажное оборудование",
            body: [
                'Стяжные ремни',
                'Буксиры',
                'Лебёдки',
                'Домкраты',
                'Крюки',
                'Скобы',
            ],
            image: API_URL + "main/6_takelajnoe_oborudovanie.jpg"
        })
        array.push({
            id: 7,
            title: "Тепловое оборудование",
            body: [
                'Тепловые пушки',
                'Инфракрасные нагреватели',
                'Осушители и вентиляторы',
                'Кондиционеры и охладители',
                'Электрические нагреватели',
                'Жидкотопливные горелки',
            ],
            image: API_URL + "main/7_teplovoe_oborudovanie.jpg"
        })
        array.push({
            id: 8,
            title: "Сварочное оборудование",
            body: [
                'Промышленное оборудование',
                'Профессиональное оборудование',
                'Комплектующие и аксессуары',
                'Средства защиты сварщика',
                'Расходные сварочные материалы',
                'Газосварочное оборудование',
            ],
            image: API_URL + "main/8_svarochnoe_oborudovanie.jpg"
        })
        array.push({
            id: 9,
            title: "Крепёж",
            body: [
                'Распорные анкеры',
                'Химические анкеры',
                'Анкерные шурупы',
                'Дюбеля и дюбель-гвозди',
                'Электромонтажный крепёж',
                'Хомуты',
            ],
            image: API_URL + "main/9_krepej.jpg"
        })
        array.push({
            id: 10,
            title: "Кабель и кабельная арматура",
            body: [
                'Кабельные муфты',
                'Коннекторы',
                'Кабель монтажный',
                'Кабель силовой',
                'Провода заземления',
                'Противопожарные кабели',
            ],
            image: API_URL + "main/10_kabel.jpg"
        })
        array.push({
            id: 11,
            title: "Противопожарное оборудование и СИЗ",
            body: [
                'Огнетушители',
                'Противопожарный инвентарь',
                'Средства индивидуальной защиты',
                'Противогазы',
                'Шкафы пожарные',
                'Аптечки',
            ],
            image: API_URL + "main/11_protivopojarnoe_oborudovanie.jpg"
        })
        array.push({
            id: 12,
            title: "Техника прямого монтажа",
            body: [
                'Монтажные пистолеты',
                'Монтажные патроны',
                'Дюбель-гвозди и крепёж',
                'Патрон монтажный МПУ',
                'ЗИП к пистолетам',
                'Крепёж для утепления',
            ],
            image: API_URL + "main/12_tehnika_pryamogo_montaja.jpg"
        })
        array.push({
            id: 13,
            title: "Гидравлическое оборудование",
            body: [
                'Гидравлические станции',
                'Гидравлический инструмент',
                'Пневматический инструмент',
                'Гидравлические погружные помпы',
                'Оборудование для подводно-технических работ',
                // 'Материалы для подводно-технических работ',
                'Расходные материалы',
            ],
            image: API_URL + "main/13_gidravlicheskoe_oborudovanie.jpg"
        })
        array.push({
            id: 14,
            title: "Строительные и ремонтные смеси",
            body: [
                // 'Гидроизоляция',
                'Гидроизоляция проникающая',
                'Гидроизоляция обмазочная',
                'Гидроизоляция шовная',
                'Ремонтные составы',
                'Промышленые полы',
                'Инъекционные составы',
            ],
            image: API_URL + "main/14_stroitelnie_smesi.jpg"
        })
        array.push({
            id: 15,
            title: "Техника для сада",
            body: [
                'Культиваторы',
                'Воздуходувы',
                'Газонокосилки',
                'Кусторезы',
                'Садовые тракторы',
                'Генераторы',
                // 'Мотопомпы',
            ],
            image: API_URL + "main/15_tehnika_dlya_sada.jpg"
        })
        array.push({
            id: 16,
            title: "Геодезическое оборудование",
            body: [
                'Тахеометры',
                'Нивелиры',
                'Теодолиты',
                'Георадары',
                'Беспилотные летательные аппараты',
                'Металлоискатели',
            ],
            image: API_URL + "main/16_geodezicheskoe_oborudovanie.jpg"
        })
        // array.push({
        //     title: "Электроинструмент и расходники",
        //     body: [
        //         'Дрели',
        //         'Перфораторы',
        //         'УШМ',
        //         'Шуруповёрты',
        //         'Сабельные пилы',
        //         'Лобзики',
        //     ],
        //     image: API_URL + "main/elektroinstrument.jpg"
        // })

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
                НАЖМИТЕ, чтобы посетить наш магазин
            </div>

            <div className="MainPage_box_body">

                {info && Array.isArray(info) && info.map((i, idx) => {
                    // let quantity
                    
                    if (idx >= quantity) return null//<div key={idx + i.title}/>
                    return <div key={idx + i.title} className="MainPage_box_body_item">
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


            <div
                className="MainPage_box_header"
                onClick={() => onClickBox(SHOP_ROUTE)}
            >
                НАЖМИТЕ, чтобы посетить наш магазин
            </div>

        </div>
    </div>
    )
}

export default MainPage