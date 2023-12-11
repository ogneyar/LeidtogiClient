
const MAIN_ROUTE = '/' // главная страница

const ADMIN_ROUTE = '/admin' // администрация
const LOGIN_ROUTE = '/login' // вход
const REGISTRATION_ROUTE = '/registration' // регистрация

const SHOP_ROUTE = '/shop' // магазин

const CART_ROUTE = '/cart' // корзина
const CREATE_ORDER_ROUTE = '/create_order' // оформление заказа
const PRODUCT_ROUTE = '/product' // товар
const LK_ROUTE = '/lk' // личный кабинет
const FORGOT_PASSWORD_ROUTE = '/forgot_password' // забыл пароль
const CHANGE_PASSWORD_ROUTE = '/change_password' // смена пароля
const SEARCH_ROUTE = '/search' // поиск
const PAYMENT_ORDER_ROUTE = '/payment_order' // страница оплаты заказа
const PAY_ROUTE = '/pay' // страница с которой идёт редирект на платёжную страницу Альфа банка
const SUCCESS_ROUTE = '/success' // успех
const CONGRATULATION_ROUTE = '/congratulation' // поздравления в случае успешной оплаты
const ERROR_ROUTE = '/error' // ошибка
const PARSER_ROUTE = '/parser' // парсер HTML
const TESTER_ROUTE = '/tester' // парсер HTML
const CONFIRM_ROUTE = '/confirmation' // подтверждение почты пользователя
const CONFIRM_AVAILABILITY_ROUTE = '/confirm_availability' // подтверждение наличия заказа
const MESSAGE_ROUTE = '/message' // страница для сообщений

// отдел Информация
const ABOUT_US_ROUTE = '/about_us' // о нас
const DELIVERY_ROUTE = '/delivery' // информация о доставке
const PAYMENT_ROUTE = '/payment' // информация об оплате
const PRIVACY_POLICY_ROUTE = '/privacy_policy' // политика конфиденциальности
const RETURNS_POLICY_ROUTE = '/returns_policy' // условия возврата
const TERMS_OF_USE_ROUTE = '/terms_of_use' // пользовательское соглашение
const WARRANTY_ROUTE = '/warranty' // гарантия и сервис
const CONTACTS_ROUTE = '/contacts' // контакты
const SPECIALS_ROUTE = '/specials' // акции
const DEALER_ROUTE = '/dealers' // дилерам
const NEWS_ROUTE = '/news' // новости
const CATALOGS_ROUTE = '/catalogs' // каталоги
const SUPPORT_ROUTE = '/support' // тех.поддержка

// страницы брендов (в порядке добавления продукции на сайт)
const MILWAUKEE_ROUTE = '/milwaukee' // milwaukee brand
const RGK_ROUTE = '/rgk' // РусГеоКом бренд
const HUSQVARNA_ROUTE = '/husqvarna' // husqvarna brand
const KVT_ROUTE = '/kvt' // КВТ бренд
const GEDORE_ROUTE = '/gedore' // Gedore бренд
const TMK_ROUTE = '/tmk' // TMK бренд
const REDVERG_ROUTE = '/redverg' // суббренд TMK
const CONCORDE_ROUTE = '/concorde' // суббренд TMK
const KVALITET_ROUTE = '/kvalitet' // суббренд TMK
const LEIDTOGI_ROUTE = '/leidtogi' // LeidTogi бренд
const ADVANTA_ROUTE = '/advanta' // Advanta бренд
const EUROBOOR_ROUTE = '/euroboor' // Euroboor бренд
const TOR_ROUTE = '/tor' // Tor бренд
const KRAUSE_ROUTE = '/krause' // Krause бренд
const KEDR_ROUTE = '/kedr' // Kedr бренд
const BYCON_ROUTE = '/bycon' // Bycon бренд
const GEFEST_ROUTE = '/gefest' // Gefest бренд
const CLEANVAC_ROUTE = '/cleanvac' // Cleanvac бренд
// Esab - не заводил
// AEG - в ручную заводил несколько штук
// Leon - в ручную заводил несколько штук 

const TESTFORM_ROUTE = '/test' // тест гугл формы

// странный юмор программиста
const DELETE_ROUTE = '/delete' // удаление сайта


module.exports = [
    { path: MAIN_ROUTE },

    { path: ADMIN_ROUTE },
    { path: LOGIN_ROUTE },
    { path: REGISTRATION_ROUTE },

    { path: SHOP_ROUTE },

    { path: CART_ROUTE },
    { path: CREATE_ORDER_ROUTE },
    { path: PRODUCT_ROUTE },
    { path: LK_ROUTE },
    { path: FORGOT_PASSWORD_ROUTE },
    { path: CHANGE_PASSWORD_ROUTE },
    { path: SEARCH_ROUTE },
    { path: PAYMENT_ORDER_ROUTE },
    { path: PAY_ROUTE },
    { path: SUCCESS_ROUTE },
    { path: CONGRATULATION_ROUTE },
    { path: PARSER_ROUTE },
    { path: TESTER_ROUTE },
    { path: CONFIRM_ROUTE },
    { path: CONFIRM_AVAILABILITY_ROUTE },
    { path: SUPPORT_ROUTE },
    { path: MESSAGE_ROUTE },

    { path: ABOUT_US_ROUTE },
    { path: DELIVERY_ROUTE },
    { path: PAYMENT_ROUTE },
    { path: PRIVACY_POLICY_ROUTE },
    { path: RETURNS_POLICY_ROUTE },
    { path: TERMS_OF_USE_ROUTE },
    { path: WARRANTY_ROUTE },
    { path: CONTACTS_ROUTE },
    { path: SPECIALS_ROUTE },
    { path: DEALER_ROUTE },
    { path: NEWS_ROUTE },
    { path: CATALOGS_ROUTE },

    { path: MILWAUKEE_ROUTE },
    { path: RGK_ROUTE },
    { path: HUSQVARNA_ROUTE },
    { path: KVT_ROUTE },
    { path: GEDORE_ROUTE },
    { path: TMK_ROUTE },
    { path: REDVERG_ROUTE },
    { path: CONCORDE_ROUTE },
    { path: KVALITET_ROUTE },
    { path: LEIDTOGI_ROUTE },
    { path: ADVANTA_ROUTE },
    { path: EUROBOOR_ROUTE },
    { path: TOR_ROUTE },
    { path: KRAUSE_ROUTE },
    { path: KEDR_ROUTE },
    { path: BYCON_ROUTE },
    { path: GEFEST_ROUTE },
    { path: CLEANVAC_ROUTE },

    { path: TESTFORM_ROUTE },
    { path: DELETE_ROUTE },
]

