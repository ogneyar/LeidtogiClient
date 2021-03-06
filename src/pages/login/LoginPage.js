import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { useQueryParam, StringParam } from 'use-query-params'
import { NavLink, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
// import $ from 'jquery'

import { REGISTRATION_ROUTE, LK_ROUTE, CONFIRM_ROUTE, FORGOT_PASSWORD_ROUTE } from '../../utils/consts'
import { login, getUserInfo } from '../../http/userAPI'
import { Alert } from '../../components/myBootstrap'
import scrollUp from '../../utils/scrollUp'
import { Context } from '../..'
import './LoginPage.css'


const LoginPage = observer((props) => {

    const { user } = useContext(Context)

    const history = useHistory()
    
    // eslint-disable-next-line
    const [returnUrl, setReturnUrl] = useQueryParam('returnUrl', StringParam)

    const [ alertVisible, setAlertVisible ] = useState(false)
    const [ alertMessage, setAlertMessage ] = useState('')
   
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const click = async () => {
        try {
            let data
            // eslint-disable-next-line
            data = await login(email, password)
            getUserInfo().then(dat => user.setUser(dat))
            user.setIsAuth(true)
            if (props?.confirm) {
                history.push(CONFIRM_ROUTE + "/" + props?.url)
            }else {
                if (returnUrl) history.push(returnUrl)
                else history.push(LK_ROUTE)
            }
            scrollUp()
            
        }catch(e) {
            setAlertVisible(true)
            setAlertMessage(e.response?.data?.message)
        }
    }

    return (
        <Container 
            className="LoginPage"
        >
            <Card className="LoginPage_Card">
                <h2 className="LoginPage_Card_header">
                    Авторизация
                </h2>
                <Form className="LoginPage_Card_Form">

                    <label>Email:</label>
                    <Form.Control 
                        placeholder="Введите Ваш email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label>Пароль:</label>
                    <Form.Control 
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />

                    <div className="LoginPage_changePassword">
                        <NavLink onClick={scrollUp} to={FORGOT_PASSWORD_ROUTE}>Забыли пароль?!</NavLink>
                    </div>

                    <Row className="LoginPage_Card_Form_Row">
                        {props?.confirm 
                        ? 'Войдите, для подтверждения.'
                        :
                            <div>
                                Нет аккаунта? <NavLink onClick={scrollUp} to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                        }
                        <Button 
                            variant={"outline-success"} 
                            onClick={click}
                        >
                            Войти
                        </Button>
                    </Row>
                    
                </Form>
            </Card>

            <Alert show={alertVisible} onHide={() => setAlertVisible(false)} message={alertMessage} />

        </Container>
    )
})

export default LoginPage;
