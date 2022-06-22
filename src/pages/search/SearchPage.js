import React, { useEffect, useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useQueryParam, StringParam } from 'use-query-params';

import CategoryBar from '../../components/category/CategoryBar'
import ProductList from '../../components/product/ProductList'
import Filter from '../../components/filter/Filter'
import Loading from '../../components/Loading'
import deleteAbbreviation from '../../utils/deleteAbbreviation';

import { Context } from '../..'
import './SearchPage.css'


const SearchPage = observer(() => {
    const { product, category } = useContext(Context)
    
    const [ loadingCategory, setLoadingCategory ] = useState(true)
    const [ loadingProduct, setLoadingProduct ] = useState(true)
    
    const [ value ] = useQueryParam('value', StringParam)

    function isNumber(n){
        // eslint-disable-next-line
        return Number(n) == n;
    }


    useEffect(() => {
        if (product.allProducts.length) {
            product.setPage(1)
            let length = 0
            product.setProducts(product.allProducts.filter(i => {
                if (value) {
                    // функция deleteAbbreviation убирает сокращённые названия бренда (hqv, rgk, kvt)
                    let valueNumber = deleteAbbreviation(value)
                    if ( isNumber( valueNumber ) ) {
                        if (i.article.includes( valueNumber )) {
                            length++
                            return true
                        }
                    }else {
                        if (i.name.toLowerCase().includes(value.toLowerCase())) {
                            length++
                            return true
                        }
                    }
                }
                return false
            }))
            product.setTotalCount(length)
            setLoadingProduct(false)
        }
        // eslint-disable-next-line
    },[product.allProducts, value])

    useEffect(() => {
        if (category.allCategories.length) {
            category.setCategories(category.allCategories)
            category.setSelectedCategory({})
            setLoadingCategory(false)
        }
        // eslint-disable-next-line
    },[category.allCategories])


    return (
        <Container
            className="ShopPage Mobile"
        >
        <div className="ShopRow">
            <div className="ShopColCategory">
                {loadingCategory ? <Loading /> : <CategoryBar search />}
            </div>
            <div className="ShopColContent">
                <Filter />
                {loadingProduct ? <Loading />
                : <>
                    <h3>Поиск - {value}</h3>
                    
                    <h5>Товары, соответствующие критериям поиска</h5>

                    <ProductList search />
                </>}
                
            </div>
        </div>
        </Container>
    )
})

export default SearchPage;
