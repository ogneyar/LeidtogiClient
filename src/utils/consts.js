
export const LIMIT = 12

export const MAIN_ROUTE = '/' // главная страница

export const ADMIN_ROUTE = '/admin' // администрация
export const LOGIN_ROUTE = '/login' // вход
export const REGISTRATION_ROUTE = '/registration' // регистрация
export const SHOP_ROUTE = '/shop' // магазин
export const CART_ROUTE = '/cart' // корзина
export const CREATE_ORDER_ROUTE = '/create_order' // оформление заказа
export const PRODUCT_ROUTE = '/product' // товар
export const LK_ROUTE = '/lk' // личный кабинет
export const FORGOT_PASSWORD_ROUTE = '/forgot_password' // забыл пароль
export const CHANGE_PASSWORD_ROUTE = '/change_password' // смена пароля
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

// страницы брендов
export const MILWAUKEE_ROUTE = '/milwaukee' // milwaukee brand
export const HUSQVARNA_ROUTE = '/husqvarna' // husqvarna brand
export const RGK_ROUTE = '/rgk' // РусГеоКом бренд
export const KVT_ROUTE = '/kvt' // КВТ бренд
export const GEDORE_ROUTE = '/gedore' // Gedore бренд

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
    ? window.location.hostname === "leidtogi.ru"
        ? URL_PRODUCTION
        : URL_TEST
    : URL_DEVELOPMENT

export const API_URL = 
    process.env.REACT_APP_ENV === 'production' 
    ? window.location.hostname === "leidtogi.ru"
        ? API_URL_PRODUCTION
        : API_URL_TEST
    : API_URL_DEVELOPMENT
        

// прокрутка страницы при нажатии на категорию
export const SCROLL_TOP = 200 // до aside
export const SCROLL_TOP_MOBILE = 180 // для мобильной версии сайта


export const NAME = `ООО "ЛЕИДТОГИ"` // название фирмы
export const CITY = "г. Курск" // город нахождения офиса
export const ADDRESS = "г.Курск, ул.Соловьиная, д.51, оф.25" // адресс нахождения офиса
export const ADDRESS_FULL = "305044, г.Курск, ул.Соловьиная, д.51, оф.25" // адресс нахождения офиса
export const PHONE_ONE = `<a href="tel:+79312607792">+7 (931) 260-77-92</a>` // основной телефон
export const MAIL = `<a href="mailto:info@leidtogi.ru">info@leidtogi.ru</a>` // основной почтовый ящик
export const TIME_TO_WORK = `<div><p>пн - пт: 09:00 - 18:00</p><p>сб - вс: выходной</p></div>` // время работы


// индекс, от куда идёт доставка товаров
export const DELIVERY_INDEX_FROM = 140055 // - г. Котельники // 101000 - г. Москва // 305044 - г. Курск

// надбавка в % на расчёт доставки (если не нужна надбавка, поставь 1)
export const DELIVERY_EXTRA_CHARGE = 1.3 // 30%

// стоимость доставки курьером по г. Москва 
export const DELIVERY_BOXBERRY_CURIER_PRICE = 250 // в рублях

// необходимы в файле service/delivery/dl/getDerivalCity.js
export const DELIVERY_DL_DERIVAL_CITY_MILWAUKEE = "5000003200000000000000000"   // Milwaukee    - г. Котельники
export const DELIVERY_DL_DERIVAL_CITY_RGK = "5000006619300000000000000"         // RGK          - г. Москва, ул. Коминтерна, д. 7, кор. 2
export const DELIVERY_DL_DERIVAL_CITY_HUSQVARNA = "5000003000000000000000000"   // Husqvarna    - г. Химки
export const DELIVERY_DL_DERIVAL_CITY_GEDORE = "5000002804500000000000000"      // Gedore       - г. Москва, 2-й Лихачевский переулок, д. 7
export const DELIVERY_DL_DERIVAL_CITY_KVT = "4000000100000000000000000"         // KVT          - г. Калуга, ул. 1я Академическая, д. 27


// телеграм
export const TELEGRAM_CHAT_ID_ADMIN = 1038937592 // 


// Яндекс.Метрика
export const PURCHASE_GOAL_ID = 226560302 // номер цели "успешная оплата"



export const PRICE_SEPARATOR = " " // разделитель тысячных значений цены (пример: 1 345 678)