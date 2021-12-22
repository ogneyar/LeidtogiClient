import React, { useContext, useState, useEffect } from 'react'
import { Spinner, Navbar, Nav, Button, Container, Image } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { NavLink } from '../myBootstrap'
import { Context } from '../..'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE, LK_ROUTE, NAME, ADDRESS, PHONE_ONE, MAIL } from '../../utils/consts'
import logo from '../../assets/logo.png'
import basket from '../../assets/cart.png'
import { logout } from '../../http/userAPI'

import './NavBar.css';


const NavBar = observer(() => {

    const { user, cart } = useContext(Context)
    const history = useHistory()

    const onClickLogoutButton = () => {
        user.setUser({})
        user.setIsAuth(false)
        // localStorage.removeItem('token') 
        logout()
        history.push(LOGIN_ROUTE)
    }

    const [ quantity, setQuantity ] = useState(0)

    useEffect(() => {
        if (cart?.cart) {
            setQuantity(cart?.cart?.length)
        }
    },[cart?.cart])


    return (
        <Navbar 
            bg="secondary" 
            variant="secondary" 
            className="NavBar"
        >
            <Container 
                className="NavBar_Container"
            >
                <div
                    className="NavBar_Row"
                >
                    <div 
                        className="NavBar_Col_Logo"
                    >
                        <NavLink className="NavLink NavBar_NavLink"
                            to={SHOP_ROUTE}
                        >

                            <Image src={logo} className="NavBar_Logo" />

                            <div 
                                className="hidden-mobile"
                            >
                                Стройте с нами, экономьте время
                            </div>
                            
                        </NavLink>
                    </div>

                    <div
                        className="NavBar_Col_Contacts"
                    >
                        <label className="NavBar_Col_Contacts_Name">{NAME}</label>
                        <label className="NavBar_Col_Contacts_Address">{ADDRESS}</label>
                        <label className="NavBar_Col_Contacts_Phone">{ReactHtmlParser(PHONE_ONE)}</label>
                        <label className="NavBar_Col_Contacts_Mail">{ReactHtmlParser(MAIL)}</label>
                    </div>

                    <div 
                        className="NavBar_Col_Buttons"
                    >
                            <NavLink className="NavLink NavBar_Cart"
                                to={CART_ROUTE}
                            >
                                <div className="NavBar_Cart_Box">

                                    <Image className="NavBar_Cart_Image" src={basket} />
                                    
                                   {quantity !== 0 && <span>{quantity}</span>}

                                </div>
                            </NavLink>
                        <Nav>
                            {user.loading
                            ?
                            <div className="NavBar_Spinner">
                                <Spinner animation="border" variant="light" />
                            </div>
                            :
                            
                                user.isAuth && user.user?.role ?
                            
                                <>
                                    {user.user?.role === 'ADMIN' ?
                                    <>
                                        <Button 
                                            variant={'outline-light'} 
                                            onClick={() => history.push(ADMIN_ROUTE)}
                                        >
                                            АП
                                        </Button>
                                        <Button 
                                            variant={'outline-light'} 
                                            onClick={() => history.push(LK_ROUTE)}
                                            className="ml-2"
                                        >
                                            ЛК
                                        </Button>
                                    </>
                                    : 
                                        <Button 
                                            variant={'outline-light'} 
                                            onClick={() => history.push(LK_ROUTE)}
                                        >
                                            Личный Кабинет
                                        </Button>
                                    }
                                    
                                    <Button 
                                        variant={'outline-light'} 
                                        onClick={onClickLogoutButton} 
                                        className="ml-2"
                                    >
                                        Выйти
                                    </Button>
                                </>
                            :
                            

                                <Button 
                                    onClick={() => history.push(LOGIN_ROUTE)}
                                    variant={'outline-light'}
                                >
                                    Авторизация
                                </Button>
                            
                            }

                        </Nav>
                    </div>
                </div>
            </Container>
        </Navbar>
    )
})

export default NavBar
