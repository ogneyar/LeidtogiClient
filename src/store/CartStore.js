import { makeAutoObservable } from 'mobx'

export default class CartStore {
    constructor() {
        this._cart = []
        this._certificate = ""
        makeAutoObservable(this)
    }

    setCart(cart) {
        this._cart = cart
    }

    get cart() {
        return this._cart
    }

    setCertificate(certificate) {
        this._certificate = certificate
    }

    get certificate() {
        return this._certificate
    }
}