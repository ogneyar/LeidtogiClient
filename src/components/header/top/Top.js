
import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { LOCALES } from '../../../i18n/locales'
import { Container, NavLink } from '../../myBootstrap'
import { 
    SHOP_ROUTE, CATALOGS_ROUTE, PAYMENT_ROUTE, DEALER_ROUTE,
    SPECIALS_ROUTE, SUPPORT_ROUTE, SCROLL_TOP, SCROLL_TOP_MOBILE 
} from '../../../utils/consts'
import scrollUp from '../../../utils/scrollUp'
import Search from '../../search/Search'

import isSSR from '../../../utils/isSSR'
import { Context } from '../../../'

import './Top.css'


const Top = () => {
    
    // const { localeStore } = useContext(Context)
    let localeStore = null
    if ( ! isSSR ) {
        let context = useContext(Context)
        localeStore = context.localeStore
    }
    
    const history = useHistory()

    // const onClickBox = (route, scroll = 0) => {
    //     if (! scroll) {
    //         if (( ! isSSR ) && window.innerWidth > 575) scroll = SCROLL_TOP
    //         else scroll = SCROLL_TOP_MOBILE
    //     }
    //     history.push(route)
    //     scrollUp(scroll) 
    // }

    const languages = [
        { name: 'Русский', code: LOCALES.RUSSIAN },
        { name: 'Türkçe', code: LOCALES.TURKISH },
        { name: '中国语文科', code: LOCALES.CHINESE },
        { name: 'English', code: LOCALES.ENGLISH },
      ]
    
    useEffect(() => {        
        if (process.env.REACT_APP_ENV === 'production' && ( ! isSSR )) {
            if (window.location.hostname === "leidtogi.ru" || window.location.hostname === "www.leidtogi.ru") {
                document.getElementById("languages_switcher").style.display = "none"
            }
        }
        // document.getElementById("languages_switcher").style.display = "none"
    }, [])

    const changeLocale = ({ target: { value } }) => {
        localeStore?.setCurrentLocale(value)
        // сохраняем локацию в хранилище
        if ( ! isSSR ) localStorage.setItem('locale', value)
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
                                <NavLink
                                    className="NavLink NavLink_Top_Shop"
                                    // onClick={()=>onClickBox(SHOP_ROUTE)}
                                    to={SHOP_ROUTE}
                                >
                                    {/* Продукция */}
                                    <FormattedMessage id='page_shop' />
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top_Dealer"
                                    // onClick={()=>onClickBox(DEALER_ROUTE)}
                                    to={DEALER_ROUTE}
                                >
                                    {/* Дилерам */}
                                    <FormattedMessage id='page_dealer' />
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    // onClick={()=>onClickBox(PAYMENT_ROUTE)}
                                    to={PAYMENT_ROUTE}
                                >
                                    {/* Оплата */}
                                    <FormattedMessage id='page_payment' />
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top_Specials"
                                    // onClick={()=>onClickBox(SPECIALS_ROUTE)}
                                    to={SPECIALS_ROUTE}
                                >
                                    {/* Акции */}
                                    <FormattedMessage id='page_specials' />
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top"
                                    // onClick={()=>onClickBox(CATALOGS_ROUTE)}
                                    to={CATALOGS_ROUTE}
                                >
                                    {/* Каталоги */}
                                    <FormattedMessage id='page_catalogs' />
                                </NavLink>
                            </strong>
                            <strong className="TopLinkStrong">
                                <NavLink
                                    className="NavLink NavLink_Top_Support"
                                    // onClick={()=>onClickBox(SUPPORT_ROUTE)}
                                    to={SUPPORT_ROUTE}
                                >
                                    {/* Тех.поддержка */}
                                    <FormattedMessage id='page_support' />
                                </NavLink>
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

            {/* Выпадающий список для выбора языка */}
            { (! isSSR) && <div className='switcher' id='languages_switcher'>
                <div className='switcher-box'>
                    <select 
                        onChange={changeLocale} 
                        value={localeStore?.currentLocale}
                    >
                        {languages.map(({ name, code }) => (
                        <option key={code} value={code}>
                            {name}
                        </option>
                        ))}
                    </select>
                </div>
            </div> }

        </div>
    )
}

export default Top
