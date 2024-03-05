
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { NavLink } from '../myBootstrap'
import {    
    ABOUT_US_ROUTE, DELIVERY_ROUTE, PAYMENT_ROUTE, PRIVACY_POLICY_ROUTE, RETURNS_POLICY_ROUTE,
    TERMS_OF_USE_ROUTE, WARRANTY_ROUTE, SPECIALS_ROUTE, SUPPORT_ROUTE, DEALER_ROUTE, NEWS_ROUTE, CATALOGS_ROUTE, CONTACTS_ROUTE, PRESENTATION_ROUTE
} from '../../utils/consts'

import './FooterInformation.css'

const FooterInformation = () => {
    return (
        <div
            className="FooterInformation"
        >
            <div className="footer-title">
				{/* <h3>Информация</h3> */}
				<h3>
                    <FormattedMessage id='footer_inform' />
                </h3>
			</div>
            <div className="footer-static-content">
                <ul className="togle-footer">
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={SPECIALS_ROUTE}
                        >
                            {/* Акции */}
                            <FormattedMessage id='page_specials' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={PAYMENT_ROUTE}
                        >
                            {/* Оплата */}
                            <FormattedMessage id='page_payment' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={NEWS_ROUTE}
                        >
                            {/* Новости */}
                            <FormattedMessage id='page_news' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={CATALOGS_ROUTE }
                        >
                            {/* Каталоги */}
                            <FormattedMessage id='page_catalogs' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={DELIVERY_ROUTE}
                        >
                            {/* Доставка */}
                            <FormattedMessage id='page_delivery' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={DEALER_ROUTE}
                        >
                            {/* Дилерам */}
                            <FormattedMessage id='page_dealer' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={CONTACTS_ROUTE}
                        >
                            {/* Контакты */}
                            <FormattedMessage id='page_contacts' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={ABOUT_US_ROUTE}
                        >
                            {/* О компании */}
                            <FormattedMessage id='page_about_us' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={PRESENTATION_ROUTE}
                        >
                            {/* Презентация */}
                            <FormattedMessage id='page_presentation' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={SUPPORT_ROUTE}
                        >
                            {/* Тех. поддержка */}
                            <FormattedMessage id='page_support' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={RETURNS_POLICY_ROUTE}
                        >
                            {/* Условия возврата */}
                            <FormattedMessage id='page_returns_policy' /> 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={WARRANTY_ROUTE}
                        >
                            {/* Гарантия и Сервис */}
                            <FormattedMessage id='page_warranty' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={PRIVACY_POLICY_ROUTE}
                        >
                            {/* Политика конфиденциальности */}
                            <FormattedMessage id='page_privacy_policy' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className="NavLink Footer_NavLink Footer_NavLink_Info"
                            to={TERMS_OF_USE_ROUTE}
                        >
                            {/* Пользовательское соглашение */}
                            <FormattedMessage id='page_terms_of_use' />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FooterInformation
