
import React from 'react'
import { FormattedMessage } from 'react-intl'

import './FooterSocialNetwork.css'

const FooterSocialNetwork = () => {
    return (
        <div
            className="FooterSocialNetwork"
        >
            <div className="footer-title">
				{/* <h3>Мы в сети</h3> */}
				<h3>
                    <FormattedMessage id='footer_web' />
                </h3>
			</div>
            <div className="footer-static-content">
                <ul className="togle-footer">
                    <li>   
                        <a
                            className="NavLink Footer_NavLink Footer_NavLink_SocialNetwork"
                            href="https://t.me/leidtogi_ru"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {/* Мы в Telegram */}
                            <FormattedMessage id='footer_web_tg' />
                        </a>
                    </li>
                    <li>   
                        <a
                            className="NavLink Footer_NavLink Footer_NavLink_SocialNetwork"
                            href="https://vk.com/leidtogi"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {/* Мы в ВК */}
                            <FormattedMessage id='footer_web_vk' />
                        </a>
                    </li>
                    {/* <li>
                        <a
                            className="NavLink Footer_NavLink Footer_NavLink_SocialNetwork"
                            href="https://ok.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Мы в ОК
                        </a>
                    </li> */}
                    {/* <li>
                        <a
                            className="NavLink Footer_NavLink Footer_NavLink_SocialNetwork"
                            href="https://youtube.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Мы на YouTube
                        </a>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

export default FooterSocialNetwork
