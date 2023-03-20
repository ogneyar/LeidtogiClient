
import React, { useContext, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import { useQueryParam, StringParam } from 'use-query-params'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { FormattedMessage } from 'react-intl' 

import { REGISTRATION_ROUTE, LK_ROUTE, CONFIRM_ROUTE, FORGOT_PASSWORD_ROUTE, SCROLL_TOP, SCROLL_TOP_MOBILE } from '../../utils/consts'
import { login, getUserInfo } from '../../http/userAPI'
import { Alert, Input, Button } from '../../components/myBootstrap'
import scrollUp from '../../utils/scrollUp'
import { Context } from '../..'

import './LoginPage.css'


const LoginPage = observer((props) => {

    const { userStore } = useContext(Context)

    const history = useHistory()
    
    const [ returnUrl ] = useQueryParam('returnUrl', StringParam)

    const [ alertVisible, setAlertVisible ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState('')

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const click = async () => {
        try {
            let data
            // eslint-disable-next-line
            data = await login(email, password)
            getUserInfo().then(dat => userStore.setUser(dat)) 
            userStore.setIsAuth(true)
            if (props?.confirm) {
                history.push(CONFIRM_ROUTE + "/" + props?.url)
            }else {
                if (returnUrl) history.push(returnUrl)
                else history.push(LK_ROUTE)
            }
            scrollUp(window.innerWidth > 700 ? SCROLL_TOP : SCROLL_TOP_MOBILE)
            
        }catch(e) {
            setAlertVisible(true)
            setAlertMessage(e.response?.data?.message)
        }
    }

    const onClickScrollUp = () => {
        scrollUp(window.innerWidth > 700 ? SCROLL_TOP : SCROLL_TOP_MOBILE)
    }


    return (
        <div 
            className="LoginPage"
        >
            <Card className="LoginPage_Card">
                <h2 className="LoginPage_Card_header">
                    {/* Авторизация */}
                    <FormattedMessage id='login_title' />
                </h2>
                <div className="LoginPage_Card_Form">

                    <label>
                        {/* Email или Логин: */}
                        <FormattedMessage id='login_email' />
                    </label>
                    <Input 
                        placeholder="Введите Ваш email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>
                        {/* Пароль: */}
                        <FormattedMessage id='login_password' />
                    </label>
                    <Input
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <div className="LoginPage_changePassword">
                        <NavLink onClick={onClickScrollUp} to={FORGOT_PASSWORD_ROUTE}>
                            {/* Забыли пароль?! */}
                            <FormattedMessage id='login_forgot_password' />
                        </NavLink>
                    </div>

                    <Row className="LoginPage_Card_Form_Row">
                        {props?.confirm 
                        ? 
                            // 'Войдите, для подтверждения.'
                            <FormattedMessage id='login_confirm' />
                        :
                            <div>
                                {/* Нет аккаунта? */}
                                <FormattedMessage id='login_no_accaunt' />
                                &nbsp;
                                <NavLink onClick={onClickScrollUp} to={REGISTRATION_ROUTE}>
                                    {/* Зарегистрируйтесь! */}
                                    <FormattedMessage id='login_register' />
                                </NavLink>
                            </div>
                        }
                        <Button 
                            variant={"outline-success"} 
                            onClick={click}
                        >
                            {/* Войти */}
                            <FormattedMessage id='login_enter' />
                        </Button>
                    </Row>
                    
                </div>
            </Card>

            <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={alertMessage} />

        </div>
    )
})

export default LoginPage;
