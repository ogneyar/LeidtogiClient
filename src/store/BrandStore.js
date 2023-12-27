
import { runInAction, makeAutoObservable } from 'mobx' 


class BrandStore {
    constructor(brands = [], selectedBrand = {}) {
        this._brands = brands
        this._selectedBrand = selectedBrand
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands = brands
    }
    setSelectedBrand(brand) {
        runInAction(() => {
            this._selectedBrand = brand
        })
    }

    get brands() {
        return this._brands
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}

export default BrandStore