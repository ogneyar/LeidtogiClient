
export interface ICategoryModel {
    id: number,
    name: string,
    url: string,
    is_product: boolean | number,
    sub_category_id: number
}

export interface IProductModel {
    id: number,
    name: string,
    url: string,
    price: number, // float
    rating: number,
    img: string,
    have: boolean | number,
    article: string,
    promo: string,
    country: string,
    request: boolean | number,
    stock: number
}

export interface IBrandModel {
    id: number,
    name: string
}

export interface IUserModel {
    id: number,
    surname: string,
    name: string,
    patronymic: string,
    phone: number,
    email: string,
    address: string,
    password: string,
    role: string,
    isActivated: boolean,
    activationLink: string,
    companyName: string,
    INN: string,
    KPP: string,
    OGRN: string,
    OKVED: string,
    juridicalAddress: string,
    bank: string,
    BIK: string,
    corAccount: string,
    payAccount: string,
    post: string
}

export interface IProductFilterModel {
    id: number,
    name: string,
    value: string
}

export interface IRatingModel {
    id: number,
    rate: number
}

export interface ICartModel {
    id: number,
    value: string
}
