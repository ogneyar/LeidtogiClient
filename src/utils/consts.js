export const LIMIT = 12

export const ADMIN_ROUTE = '/admin' // администрация
export const LOGIN_ROUTE = '/login' // вход
export const REGISTRATION_ROUTE = '/registration' // регистрация
export const SHOP_ROUTE = '/' // главная
export const CART_ROUTE = '/cart' // корзина
export const CREATE_ORDER_ROUTE = '/create_order' // оформление заказа
export const PRODUCT_ROUTE = '/product' // товар
export const LK_ROUTE = '/lk' // личный кабинет
export const SEARCH_ROUTE = '/search' // поиск
export const PAY_ROUTE = '/pay' // оплата (редирект на платёжную страницу Альфа банка)
export const SUCCESS_ROUTE = '/success' // успех
export const CONGRATULATION_ROUTE = '/congratulation' // поздравления в случае успешной оплаты
export const ERROR_ROUTE = '/error' // ошибка
export const PARSER_ROUTE = '/parser' // парсер HTML
export const TESTER_ROUTE = '/tester' // парсер HTML
export const CONFIRM_ROUTE = '/confirmation' // подтверждение почты пользователя
export const SUPPORT_ROUTE = '/support' // тех.поддержка
export const MESSAGE_ROUTE = '/message' // страница для сообщений

// отдел Информация
export const ABOUT_US_ROUTE = '/about_us' // о нас
export const DELIVERY_ROUTE = '/delivery' // доставка
export const PAYMENT_ROUTE = '/payment' // оплата
export const PRIVACY_POLICY_ROUTE = '/privacy_policy' // политика конфиденциальности
export const RETURNS_POLICY_ROUTE = '/returns_policy' // условия возврата
export const TERMS_OF_USE_ROUTE = '/terms_of_use' // пользовательское соглашение
export const WARRANTY_ROUTE = '/warranty' // гарантия и сервис
export const CONTACTS_ROUTE = '/contacts' // контакты
export const SPECIALS_ROUTE = '/specials' // акции

// странный юмор программиста
export const DELETE_ROUTE = '/delete' // удаление сайта

const URL_PRODUCTION  = process.env.REACT_APP_URL_PRODUCTION || "https://leidtogi.ru/"
const URL_TEST  = process.env.REACT_APP_URL_TEST || "https://leidtogi.site/"
const URL_DEVELOPMENT  = process.env.REACT_APP_URL_DEVELOPMENT || "http://localhost:3000/"

const API_URL_PRODUCTION = process.env.REACT_APP_API_URL_PRODUCTION || "https://server.leidtogi.ru/"
const API_URL_TEST = process.env.REACT_APP_API_URL_TEST || "https://api.leidtogi.site/"
const API_URL_DEVELOPMENT = process.env.REACT_APP_API_URL_DEVELOPMENT || "http://localhost:5000/"

export const URL = 
    process.env.REACT_APP_ENV === 'production' 
    ? 
        window.location.hostname === "leidtogi.ru"
        ?
            URL_PRODUCTION
        :
            URL_TEST
    :
        URL_DEVELOPMENT

export const API_URL = 
    process.env.REACT_APP_ENV === 'production' 
    ? 
        window.location.hostname === "leidtogi.ru"
        ?
            API_URL_PRODUCTION
        :
            API_URL_TEST
    : 
        API_URL_DEVELOPMENT
        


// прокрутка страницы при нажатии на категорию
export const SCROLL_TOP = 200 // до aside
export const SCROLL_TOP_MOBILE = 160 // для мобильной версии сайта


export const NAME = `ООО "ЛЕИДТОГИ"` // название фирмы
export const CITY = "г. Курск" // город нахождения офиса
export const ADDRESS = "г.Курск, ул.Соловьиная, д.51, оф.2" // адресс нахождения офиса
export const ADDRESS_FULL = "305044, г.Курск, ул.Соловьиная, д.51, оф.2" // адресс нахождения офиса
export const PHONE_ONE = `<a href="tel:+79312607792">+7 (931) 260-77-92</a>` // основной телефон
export const MAIL = `<a href="mailto:info@leidtogi.ru">info@leidtogi.ru</a>` // основной почтовый ящик
export const TIME_TO_WORK = `<div><p>пн - пт: 09:00 - 18:00</p><p>сб - вс: выходной</p></div>` // время работы


// индекс, от куда идёт доставка товаров
export const DELIVERY_INDEX_FROM = 140055 // - г. Котельники // 101000 - г. Москва // 305044 - г. Курск

export const DELIVERY_BOXBERRY_CURIER_PRICE = 250  // по г. Москва 

export const DELIVERY_DL_DERIVAL_CITY = "5000003200000000000000000"  // - г. Котельники


// телеграм
export const TELEGRAM_CHAT_ID_ADMIN = 1038937592 // 


// Яндекс.Метрика
export const PURCHASE_GOAL_ID = 226560302 // номер цели "успешная оплата"