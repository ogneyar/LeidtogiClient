
import { useHistory } from 'react-router-dom'

import { SHOP_ROUTE, MILWAUKEE_ROUTE, HUSQVARNA_ROUTE, RGK_ROUTE, KVT_ROUTE } from '../../utils/consts'
import scrollUp from '../../utils/scrollUp'
import './MainPage.css'


const MainPage = () => {

    const history = useHistory()

    const onClickBox = (route, scroll = 200) => {
        history.push(route)
        scrollUp(scroll)
    }

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
            <div
                className="MainPage_box_body"
                onClick={() => onClickBox(MILWAUKEE_ROUTE)}
            >
                Milwaukee
            </div>
            <div
                className="MainPage_box_body"
                onClick={() => onClickBox(HUSQVARNA_ROUTE)}
            >
                Husqvarna
            </div>
            <div
                className="MainPage_box_body"
                onClick={() => onClickBox(RGK_ROUTE)}
            >
                РусГеоКом
            </div>
            <div
                className="MainPage_box_body"
                onClick={() => onClickBox(KVT_ROUTE)}
            >
                К В Т
            </div>
        </div>
    </div>
    )
}

export default MainPage