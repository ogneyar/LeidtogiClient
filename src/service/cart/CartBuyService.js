// import Notification from "../../components/myBootstrap/Notification"
import { fetchProductSizes } from "../../http/productAPI"

export const onClickButtonBuy = async (e, product, type = "add") => {
    e.stopPropagation()
    e.preventDefault()

    let size 

    let cart = localStorage.getItem('cart')
    if (cart) {
        cart = JSON.parse(cart)

        if (type === "add" || type === "remove") {
            let yes 
            cart = cart.map(i => {
                if (i.id === product.id) {
                    yes = "yes"
                    let newValue
                    if (type === "add") {newValue = i.value + 1}
                    if (type === "remove") {
                        if (i.value > 1) {
                            newValue = i.value - 1
                        }else {
                            newValue = i.value
                        }
                    }
                    
                    return {...i, value: newValue, total: i.price * newValue}
                } else return i
            })
            if (!yes && type === "add") {
                size = await fetchProductSizes(product.id)
                cart = [...cart, {
                    id: product.id,
                    value: 1,
                    name: product.name,
                    article: product.article,
                    price: product.price,
                    img: product.img[0].small,
                    total: product.price,
                    size
                }]
            }
        }else if (type === "delete") {
            cart = cart.filter(i => {
                if (i.id !== product.id) return true
                return false
            })
        }
        
    }else {

        if (type === "add") {
            size = await fetchProductSizes(product.id)
            cart = [{
                id:product.id,
                value:1,
                name:product.name,
                article:product.article,
                price:product.price,
                img:product.img[0].small,
                total: product.price,
                size
            }]
        }

    }
    localStorage.setItem('cart', JSON.stringify(cart))
    // alert("Товар добавлен в корзину.")

    return cart
}