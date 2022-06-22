import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
// eslint-disable-next-line
import { fetchProducts } from '../../http/productAPI'
import ProductItem from './ProductItem'
import Pagination from '../pagination/Pagination'
import Loading from '../Loading'

import { Context } from '../..'
import './Product.css'


const ProductList = observer((props) => {

    const { product, brand, category } = useContext(Context)

    const [ info, setInfo ] = useState(null)
    // eslint-disable-next-line
    const [ loading, setLoading ] = useState(true)
    const [ fetchTimeOut, setFetchTimeOut ] = useState(null)

    
    useEffect(() => {
        let offset = product.page * product.limit - product.limit // отступ
        let limit = 0
        
        if (brand.selectedBrand?.id !== undefined && ! props?.search) { // срабатывает при выборе бренда
            
            if ( ! props?.loading ) {
                // alert("props?.loading")
                let newArray = product.products.filter(k => k.brandId === brand.selectedBrand.id)
                setInfo(newArray.filter((i,index) => {
                    if (index + 1 > offset) {
                        limit += 1
                        if (limit <= product.limit) return true
                    }
                    return false
                }))
                product.setTotalCount(newArray.length)
                setLoading(false) 
                
            }else {

                if (fetchTimeOut !== null) {
                    clearTimeout(fetchTimeOut)
                }
                setFetchTimeOut(setTimeout(() => {
                    // alert("! props?.loading")
                    fetchProducts({page: product.page, limit: product.limit, brandId: brand.selectedBrand.id})
                        .then(data => {
                            setInfo(data.rows)
                            product.setTotalCount(data.count)
                            setLoading(false)
                        })
                        // .finally(() => setLoading(false))
                }, 500))
                
            }
       
        // }else  if (category.selectedCategory?.id !== undefined && ! props?.search) {

        //     if (product.products && Array.isArray(product.products) && product.products[0] !== undefined) {
        //         setInfo(product.products)
        //         product.setTotalCount(product.products.length)
        //     }else {
        //         setInfo([])
        //         product.setTotalCount(0)
        //     }
       
        }else {
            
            if ( ! props?.loading ) {
                // alert("else")
                setInfo(product.products.filter((i,index) => {
                    if (index + 1 > offset) {
                        limit += 1
                        if (limit <= product.limit) return true
                    }
                    return false
                }))
                
                product.setTotalCount(product.products.length)
                setLoading(false)

            }
            /* если тут закомментитьб то... */
            else { // загрузка товаров по роуту /shop - пока грузится весь контент

                if (fetchTimeOut !== null) {
                    clearTimeout(fetchTimeOut)
                }
                setFetchTimeOut(setTimeout(() => {
                    // alert("else else")
                    fetchProducts({page: product.page, limit: product.limit, sort: product.sort})
                        .then(data => {
                            setInfo(data.rows)
                            product.setTotalCount(data.count)
                            setLoading(false)
                        })
                        // .finally(() => setLoading(false))
                }, 500))
                
            }
             /* если тут закомментить, то в зависимости (ниже) добавить - props?.loading */

        }

    // eslint-disable-next-line
    }, [ product.page, product.limit, brand.selectedBrand, category.selectedCategory ]) // , props?.loading
    // }, [ product, product.products, product.page, product.limit, 
    //     brand.selectedBrand, props?.search, props?.loading, props, 
    //     category.selectedCategory, loading ]) 
    


    if (loading || info === null) return <Loading variant="warning" />


    return (
        <>
            <Pagination />

            <div className='ProductList'>

                {info && Array.isArray(info) && info[0] !== undefined
                ?
                    info.map(product => <ProductItem key={product.id} product={product}/>)
                :
                    <div className="ProductList_noProducts">
                        {props?.search ? <p>Поиск не дал результатов.</p> : <p>Таких товаров ещё нет...</p>}
                    </div>
                }

            </div>
            
            {info[0] !== undefined && <Pagination />}
        </>
    )
})

export default ProductList
