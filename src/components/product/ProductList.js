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
        
        if ( ! props?.loading || product.allProducts.length ) { // если уже подгружены товары
            // alert("setInfo")
            let newArray
            if (brand.selectedBrand?.id !== undefined) newArray = product.products.filter(k => k.brandId === brand.selectedBrand.id)
            else newArray = product.products
            setInfo(newArray.filter((i,index) => {
                if (index + 1 > offset) {
                    limit += 1
                    if (limit <= product.limit) return true
                }
                return false
            }))
            product.setTotalCount(newArray.length)
            setLoading(false) 
            
        }else {//if (!props?.categoryUrl) {  // если ещё не подгружены товары, загружаем с сервера одну страничку
            
            // если есть пропс categoryUrl, то ждём подгрузки selectedCategory.id
            if ((props?.categoryUrl && category.selectedCategory?.id) || !props?.categoryUrl) {

                if (fetchTimeOut !== null) {
                    clearTimeout(fetchTimeOut)
                }
                setFetchTimeOut(setTimeout(() => {
                    // alert("fetchProducts")
                    let body = { page: product.page, limit: product.limit }
                    if (brand.selectedBrand?.id !== undefined) body = { ...body, brandId: brand.selectedBrand.id }
                    if (category.selectedCategory?.id !== undefined) body = { ...body, categoryId: category.selectedCategory.id }
                    if (product.sort) body = { ...body, sort: product.sort }
                    if (product.mixNoImg) body = { ...body, mix_no_img: product.mixNoImg }
                    fetchProducts(body)
                        .then(data => {
                            setInfo(data.rows)
                            product.setTotalCount(data.count)
                            setLoading(false)
                        })
                        // .finally(() => setLoading(false))
                }, 500))

            }

        }
       
    // eslint-disable-next-line
    }, [ product.page, product.limit, brand.selectedBrand, category.selectedCategory ])
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
