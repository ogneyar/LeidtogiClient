// eslint-disable-next-line
import MainPage from '../pages/main/MainPage'

import AdminPage from '../pages/admin/AdminPage'
import ParserPage from '../pages/parser/ParserPage'
import TesterPage from '../pages/tester/TesterPage'
import LkPage from '../pages/lk/LkPage'

import LoginPage from '../pages/login/LoginPage'
import RegistrationPage from '../pages/registration/RegistrationPage'
import ConfirmPage from '../pages/confirm/ConfirmPage'
import ForgotPasswordPage from '../pages/password/ForgotPasswordPage'
import ChangePasswordPage from '../pages/password/ChangePasswordPage'
import ShopPage from '../pages/shop/ShopPage'
import ProductPage from '../pages/product/ProductPage'
import CartPage from '../pages/cart/CartPage'
import PayPage from '../pages/pay/PayPage' // redirect on bank
import CreateOrderPage from '../pages/createOrder/CreateOrderPage'
import SearchPage from '../pages/search/SearchPage'
import SuccessPage from '../pages/success/SuccessPage'
import CongratulationPage from '../pages/congratulation/CongratulationPage'
import ErrorPage from '../pages/error/ErrorPage'
import SupportPage from '../pages/support/SupportPage'
import MessagePage from '../pages/message/MessagePage'

import AboutUs from '../pages/info/AboutUs'
import Delivery from '../pages/info/Delivery'
import Payment from '../pages/info/Payment'
import PrivacyPolicy from '../pages/info/PrivacyPolicy'
import ReturnsPolicy from '../pages/info/ReturnsPolicy'
import TermsOfUse from '../pages/info/TermsOfUse'
import Warranty from '../pages/info/Warranty'
import Contacts from '../pages/info/Contacts'
import Specials from '../pages/info/Specials'

import DeletePage from '../pages/site/DeletePage'

import {
    MAIN_ROUTE, ADMIN_ROUTE, PARSER_ROUTE, TESTER_ROUTE, CART_ROUTE, PAY_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, 
    PRODUCT_ROUTE, LK_ROUTE, CONFIRM_ROUTE, SEARCH_ROUTE, SUCCESS_ROUTE, ERROR_ROUTE, ABOUT_US_ROUTE, 
    DELIVERY_ROUTE, PAYMENT_ROUTE, PRIVACY_POLICY_ROUTE, RETURNS_POLICY_ROUTE, CREATE_ORDER_ROUTE,
    TERMS_OF_USE_ROUTE, WARRANTY_ROUTE, CONTACTS_ROUTE, SPECIALS_ROUTE, DELETE_ROUTE, CONGRATULATION_ROUTE,
    SUPPORT_ROUTE, MESSAGE_ROUTE, FORGOT_PASSWORD_ROUTE, CHANGE_PASSWORD_ROUTE
} from './consts'

// brandRoutes находится в src/components/AppRouter.js

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: PARSER_ROUTE,
        Component: ParserPage
    },
    {
        path: TESTER_ROUTE,
        Component: TesterPage
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        // Component: ShopPage
        Component: MainPage
    },
    {
        path: SHOP_ROUTE,
        Component: ShopPage
    },
    {
        path: LK_ROUTE,
        Component: LkPage
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        Component: ForgotPasswordPage
    },
    {
        path: CHANGE_PASSWORD_ROUTE + '/:url',
        Component: ChangePasswordPage
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    },
    {
        path: PAY_ROUTE,
        Component: PayPage
    },
    {
        path: CREATE_ORDER_ROUTE,
        Component: CreateOrderPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage
    },
    {
        path: CONFIRM_ROUTE + '/:url',
        Component: ConfirmPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: SEARCH_ROUTE, // поиск
        Component: SearchPage
    },
    {
        path: SUPPORT_ROUTE, // тех. поддержка
        Component: SupportPage
    },
    {
        path: MESSAGE_ROUTE, // 
        Component: MessagePage
    },
    // {
    //     path: SUCCESS_ROUTE + '/:uuid/:id',
    //     Component: SuccessPage
    // },
    {
        path: SUCCESS_ROUTE, // успешная оплата
        Component: SuccessPage
    },
    {
        path: CONGRATULATION_ROUTE, // поздравления
        Component: CongratulationPage
    },
    {
        path: ERROR_ROUTE, // ошибка
        Component: ErrorPage
    },
    
    // отдел Информация
    {
        path: ABOUT_US_ROUTE, // о нас
        Component: AboutUs
    },
    {
        path: DELIVERY_ROUTE, // о доставке
        Component: Delivery
    },
    {
        path: PAYMENT_ROUTE, // об оплате
        Component: Payment
    },
    {
        path: PRIVACY_POLICY_ROUTE, // политика конфиденциальности
        Component: PrivacyPolicy
    },
    {
        path: RETURNS_POLICY_ROUTE, // условия возврата
        Component: ReturnsPolicy
    },
    {
        path: TERMS_OF_USE_ROUTE, // пользовательское соглашение
        Component: TermsOfUse
    },
    {
        path: WARRANTY_ROUTE, // о гарантии
        Component: Warranty
    },
    {
        path: CONTACTS_ROUTE, // контакты
        Component: Contacts
    },
    {
        path: SPECIALS_ROUTE, // акции
        Component: Specials
    },

     // юмор It отдела
    {
        path: DELETE_ROUTE, // удаление сайта
        Component: DeletePage
    }
]
