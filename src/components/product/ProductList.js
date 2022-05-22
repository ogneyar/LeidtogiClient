import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Context } from '../..'
import ProductItem from './ProductItem'
import './Product.css'


const ProductList = observer((props) => {

    const { product, brand } = useContext(Context)

    const [info, setInfo] = useState([])

    const [ arrayPromo ] = useState(props?.arrayPromo)
    
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
            let data = product.products

            if (arrayPromo[0] !== undefined) {
                // рандом от 0 до 2х
                let start = Math.floor( 0 + Math.random() * (2 + 1 - 0) )
                arrayPromo.forEach((i,idx) => {
                    [data[i], data[idx + start]] = [data[idx + start], data[i]]
                    if ((start+1) % 3 === 0) 
                        start += 1
                    else 
                        start += 3
                })
            }

            setInfo(data.filter((i,index) => {
                if (index + 1 > offset) {
                    limit += 1
                    if (limit <= product.limit) return true
                }
                return false
            }))
            
            product.setTotalCount(product.products.length)
        }

    },[product, product.products, product.page, product.limit, brand.selectedBrand, props?.search, arrayPromo]) 
    

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
