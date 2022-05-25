import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import ProductItem from './ProductItem'
import { Context } from '../..'
import './Product.css'


const ProductList = observer((props) => {

    const { product, brand } = useContext(Context)

    const [info, setInfo] = useState([])

    
    useEffect(() => {
        let offset = product.page * product.limit - product.limit // отступ
        let limit = 0
        
        if (brand.selectedBrand?.id !== undefined && ! props?.search) {
            let newArray = product.products.filter(k => k.brandId === brand.selectedBrand.id)
            setInfo(newArray.filter((i,index) => {
                if (index + 1 > offset) {
                    limit += 1
                    if (limit <= product.limit) return true
                }
                return false
            }))
            product.setTotalCount(newArray.length)
        }else {
            setInfo(product.products.filter((i,index) => {
                if (index + 1 > offset) {
                    limit += 1
                    if (limit <= product.limit) return true
                }
                return false
            }))
            
            product.setTotalCount(product.products.length)
        }

    },[product, product.products, product.page, product.limit, brand.selectedBrand, props?.search]) 
    

    return (
        <div className='ProductList'>

            {info && product.totalCount > 0 && Array.isArray(info)
            ?
                info.map(product => <ProductItem key={product.id} product={product}/>)
            :
                <div className="m-4 p-4">
                    {props?.search ? <p>Поиск не дал результатов.</p> : <p>Таких товаров ещё нет...</p>}
                </div>
            }

        </div>
    )
})

export default ProductList
