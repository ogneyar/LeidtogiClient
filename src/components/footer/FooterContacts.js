
import React from 'react'
import HtmlReactParser from 'html-react-parser'
import { FormattedMessage } from 'react-intl'

import { MAIL, ADDRESS_FULL, PHONE_ONE, PHONE_TWO, TIME_TO_WORK, TIME_TO_WEEKEND } from '../../utils/consts'
import './FooterContacts.css'


const FooterContacts = () => {
    return (
        <div
            className="FooterContacts"
        >
            <div className="footer-title">
				{/* <h3>Контакты</h3> */}
				<h3>
                    <FormattedMessage id='footer_contacts' />
                </h3>
			</div>
            <div className="footer-static-content">
                <ul className="FooterContactsUl">
                    <li>
                        <span className="fa fa-map-marker">&nbsp;</span>
                        <div className="media-body">
                            <p>{ADDRESS_FULL}</p>
                        </div>
                    </li>
                    <li>
                        <span className="fa fa-mobile">&nbsp;</span>
                        <div className="media-body">
                            <p>{HtmlReactParser(PHONE_ONE)}</p>
                        </div>
                    </li>
                    <li>
                        <span className="fa fa-mobile">&nbsp;</span>
                        <div className="media-body">
                            <p>{HtmlReactParser(PHONE_TWO)}</p>
                        </div>
                    </li>
                    <li>
                        <span className="fa fa-envelope-o">&nbsp;</span>
                        <div className="media-body">
                            <address>
                                {HtmlReactParser(MAIL)}
                            </address>
                        </div>
                    </li>
                    <li className="last">
                        <span className="fa fa-clock-o">&nbsp;</span>
                        <div className="media-body">
                            <div>
                                <p>{TIME_TO_WORK}</p>
                                <p>{TIME_TO_WEEKEND}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FooterContacts
