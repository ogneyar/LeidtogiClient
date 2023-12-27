import React, { useContext, useState, useEffect } from 'react'
import { Spinner, Navbar, Nav, Button, Container, Image } from 'react-bootstrap'
import HtmlReactParser from 'html-react-parser'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { FormattedMessage } from 'react-intl'

import { NavLink } from '../../myBootstrap'
import { 
    ADMIN_ROUTE, LOGIN_ROUTE, CART_ROUTE, LK_ROUTE, NAME, 
    ADDRESS, PHONE_ONE, MAIL, SCROLL_TOP, SCROLL_TOP_MOBILE, URL 
} from '../../../utils/consts'
// import logo from '../../../assets/logo.png'
// import basket from '../../../assets/cart.png'
import { logout } from '../../../http/userAPI'
import scrollUp from '../../../utils/scrollUp'

import isSSR from '../../../utils/isSSR'
import { Context } from '../../..'

import './NavBar.css'


const NavBar = observer(() => {

    // const { userStore, cartStore } = useContext(Context)
    let userStore = null, cartStore = null
    if ( ! isSSR ) {
        let context = useContext(Context)
        userStore = context.userStore
        cartStore = context.cartStore
    }

    const history = useHistory()

    const onClickLogoutButton = () => {
        userStore?.setUser({})
        userStore?.setIsAuth(false)
        // localStorage.removeItem('token') 
        logout()
        // history.push(LOGIN_ROUTE)
        onClickAndScroll(LOGIN_ROUTE)
    }

    const onClickAndScroll = (route, scroll = 0) => {
        if (! scroll) {
            if (( ! isSSR ) && window.innerWidth > 575) scroll = SCROLL_TOP
            else scroll = SCROLL_TOP_MOBILE
        }
        history.push(route)
        scrollUp(scroll) 
        // ЯндексМетрика
        ym(94727209,'reachGoal','testJs')
    }

    const [ quantity, setQuantity ] = useState(0)

    useEffect(() => {
        if (cartStore?.cart) {
            setQuantity(cartStore.cart?.length)
        }
    },[cartStore?.cart])


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
                            to="/"
                            // onClick={() => onClickAndScroll("/")}
                        >

                            {/* <Image src={logo} className="NavBar_Logo" />  */}
                            <Image 
                                className="NavBar_Logo" 
                                src={URL + "images/logo.png"} 
                            />   

                            <div 
                                className="hidden-mobile"
                            >
                                {/* Стройте с нами, экономьте время */}
                                    <FormattedMessage id='header_slogan' /> 
                            </div>
                            
                        </NavLink>
                    </div>

                    <div
                        className="NavBar_Col_Contacts"
                    >
                        {/* <label className="NavBar_Col_Contacts_Name">{NAME}</label> */}
                        <label className="NavBar_Col_Contacts_Name"><FormattedMessage id='consts_name' /></label>
                        {/* <label className="NavBar_Col_Contacts_Address">{ADDRESS}</label> */}
                        <label className="NavBar_Col_Contacts_Address"><FormattedMessage id='consts_address' /></label>
                        <label className="NavBar_Col_Contacts_Phone">{HtmlReactParser(PHONE_ONE)}</label>
                        <label className="NavBar_Col_Contacts_Mail">{HtmlReactParser(MAIL)}</label>
                    </div>

                    <div 
                        className="NavBar_Col_Buttons"
                    >
                        <NavLink className="NavLink NavBar_Cart"
                            to={CART_ROUTE}
                            // onClick={() => onClickAndScroll(CART_ROUTE)}
                        >
                            <div className="NavBar_Cart_Box">

                                {/* <Image className="NavBar_Cart_Image" src={basket} /> */}
                                <Image 
                                    className="NavBar_Cart_Image" 
                                    src={URL + "images/cart.png"} 
                                />
                                
                               {quantity !== 0 && <span>{quantity}</span>}

                            </div>
                        </NavLink>
                        <Nav>
                            {userStore?.loading
                            ?
                            <div className="NavBar_Spinner">
                                <Spinner animation="border" variant="light" />
                            </div>
                            :
                            
                                userStore?.isAuth && userStore.user?.role ?
                            
                                <>
                                    {userStore.user?.role === 'ADMIN' ? 
                                    <>
                                        <Button 
                                            variant={'outline-light'} 
                                            // onClick={() => history.push(ADMIN_ROUTE)}
                                            onClick={() => onClickAndScroll(ADMIN_ROUTE)}
                                        >
                                            {/* АП */}
                                            <FormattedMessage id='header_ap' />
                                        </Button>
                                        <Button 
                                            variant={'outline-light'} 
                                            // onClick={() => history.push(LK_ROUTE)}
                                            onClick={() => onClickAndScroll(LK_ROUTE)}
                                            className="ml-2"
                                        >
                                            {/* ЛК */}
                                            <FormattedMessage id='header_lk' />
                                        </Button>
                                    </>
                                    : 
                                        <Button 
                                            variant={'outline-light'} 
                                            // onClick={() => history.push(LK_ROUTE)}
                                            onClick={() => onClickAndScroll(LK_ROUTE)}
                                        >
                                            {/* Личный Кабинет */}
                                            <FormattedMessage id='header_pers_acc' />
                                        </Button>
                                    }
                                    
                                    <Button 
                                        variant={'outline-light'} 
                                        onClick={onClickLogoutButton} 
                                        className="ml-2"
                                    >
                                        {/* Выйти */}
                                        <FormattedMessage id='header_exit' />
                                    </Button>
                                </>
                            :
                            
                                
                                <Button 
                                    onClick={() => onClickAndScroll(LOGIN_ROUTE + "?returnUrl=" + history?.location?.pathname)}
                                    variant={'outline-light'}
                                >
                                    {/* <NavLink
                                        to={LOGIN_ROUTE + "?returnUrl=" + history?.location?.pathname}
                                    > */}
                                        {/* Авторизация */}
                                        <FormattedMessage id='header_auth' />
                                        
                                    {/* </NavLink> */}
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
