import React from 'react'
import { useHistory } from 'react-router-dom'

import { Container } from '../myBootstrap'
import { 
    SHOP_ROUTE, DELIVERY_ROUTE, PAYMENT_ROUTE, 
    CONTACTS_ROUTE, SPECIALS_ROUTE, SUPPORT_ROUTE, SCROLL_TOP, SCROLL_TOP_MOBILE 
} from '../../utils/consts'

import './Top.css'
import Search from '../search/Search'
import scrollUp from '../../utils/scrollUp'


const Top = () => {
    
    const history = useHistory()

    const onClickBox = (route, scroll = 0) => {
        if (! scroll) {
            if (window.innerWidth > 575) scroll = SCROLL_TOP
            else scroll = SCROLL_TOP_MOBILE
        }
        history.push(route)
        scrollUp(scroll) 
    }
    

    return (
        <div id="top" className="Top">
            <Container className="TopContainer">
                <div className="TopRow">
                    <div 
                        className="TopCol TopColLink _hidden-mobile" 
                    >
                        <div className="TopDivLink">
                            <strong className="TopLinkStrong">
                                <div
                                    className="NavLink NavLink_Top_Shop"
                                    // to={ABOUT_US_ROUTE}
                                    // to={SHOP_ROUTE}
                                    onClick={()=>onClickBox(SHOP_ROUTE)}
                                >
                                    Магазин
                                </div>
                            </strong>
                            <strong className="TopLinkStrong">
                                <div
                                    className="NavLink NavLink_Top"
                                    // to={DELIVERY_ROUTE}
                                    onClick={()=>onClickBox(DELIVERY_ROUTE)}
                                >
                                    Доставка
                                </div>
                            </strong>
                            <strong className="TopLinkStrong">
                                <div
                                    className="NavLink NavLink_Top"
                                    // to={PAYMENT_ROUTE}
                                    onClick={()=>onClickBox(PAYMENT_ROUTE)}
                                >
                                    Оплата
                                </div>
                            </strong>
                            <strong className="TopLinkStrong">
                                <div
                                    className="NavLink NavLink_Top_Specials"
                                    // to={SPECIALS_ROUTE}
                                    onClick={()=>onClickBox(SPECIALS_ROUTE)}
                                >
                                    Акции
                                </div>
                            </strong>
                            <strong className="TopLinkStrong">
                                <div
                                    className="NavLink NavLink_Top"
                                    // to={CONTACTS_ROUTE}
                                    onClick={()=>onClickBox(CONTACTS_ROUTE)}
                                >
                                    Контакты
                                </div>
                            </strong>
                            <strong className="TopLinkStrong">
                                <div
                                    className="NavLink NavLink_Top_Support"
                                    // to={SUPPORT_ROUTE}
                                    onClick={()=>onClickBox(SUPPORT_ROUTE)}
                                >
                                    Тех. поддержка
                                </div>
                            </strong>
					    </div>
				    </div>

					<div 
                        className="TopCol TopColSearch" 
                    >
                        <Search />
			        </div>
		        </div>
	        </Container>
	    </div>
    )
}

export default Top
