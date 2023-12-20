
import { 
    IBrandModel, 
    ICartModel, 
    ICategoryModel, 
    IProductFilterModel, 
    IProductModel, 
    IRatingModel, 
    IUserModel 
} from "./models"

export interface IUserStore {
    loading: boolean,
    isAuth: boolean,
    user: IUserModel | object // может быть пустым {}
}

export interface IProductStore {
    products: IProductModel[], // хоть так
    allProducts: Array<IProductModel>, // хоть так
    page: number,
    totalCount: number,
    limit: number,
    mixPromo: boolean,
    mixAll: boolean,
    mixNoImg: boolean,
    sort: string,
    filter: IProductFilterModel | object // может быть пустым {}
}

export interface ICategoryStore {
    categories: ICategoryModel[], // хоть так
    allCategories: Array<ICategoryModel>, // хоть так
    loading: boolean
}

export interface IBrandStore {
    brands: Array<IBrandModel>,
    selectedBrand: IBrandModel | object // может быть пустым {}
}

export interface IRatingStore {
    rate: Array<IRatingModel>
}

interface IBreadCrumbs {
    name: string,
    url: string
}

export interface IBreadCrumbsStore {
    crumbs: Array<IBreadCrumbs>
}

export interface ICartStore {
    cart: Array<ICartModel>,
    certificate: string
}

export interface ILocaleStore {
    currentLocale: string
}
