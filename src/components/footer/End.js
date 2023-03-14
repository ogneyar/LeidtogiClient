
import React from 'react'
import { FormattedMessage } from 'react-intl'

import { NavLink } from '../myBootstrap'
import { SHOP_ROUTE } from '../../utils/consts'
import scrollUp from '../../utils/scrollUp'

import './End.css'


const End = () => {
    return (
        <div
            className="End"
        >
            <NavLink 
                className="NavLink FooterEnd_NavLink"
                to={SHOP_ROUTE}
            >
                {/* © ООО "ЛеидТоги" {(new Date()).getFullYear()} */}
                <FormattedMessage id='footer_copyright' /> {(new Date()).getFullYear()}
            </NavLink>

            <div 
                className="EndDiv NavLink FooterEnd_NavLink"
                style={{cursor:"pointer"}}
                onClick={() => scrollUp()}
            >
                <i className="EndDivArrow fa fa-arrow-circle-up"></i>
            </div>
        </div>
    )
}

export default End
