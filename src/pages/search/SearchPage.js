import React, { useEffect, useContext, useState } from 'react'
import { useQueryParam, StringParam } from 'use-query-params'
import { Container } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'

import deleteAbbreviation from '../../utils/deleteAbbreviation'
import CategoryBar from '../../components/category/CategoryBar'
import ProductList from '../../components/product/ProductList'
import Filter from '../../components/filter/Filter'
import isNumber from '../../utils/types/isNumber'
import Loading from '../../components/Loading'

import { Context } from '../..'
import './SearchPage.css'


const SearchPage = observer(() => {
    const { productStore, category } = useContext(Context)
    
    const [ loadingCategory, setLoadingCategory ] = useState(true)
    const [ loadingProduct, setLoadingProduct ] = useState(true)
    
    const [ value ] = useQueryParam('value', StringParam)


    useEffect(() => {
        if (productStore.allProducts.length) {
            productStore.setPage(1)
            let length = 0

            let allSearch = value ? value.split(" ") : []
            // search = allSearch[0]
            let arraySearch = []

            allSearch.forEach(async(searched) => {
                arraySearch = [...arraySearch, ...productStore.allProducts.filter(i => {
                    // функция deleteAbbreviation убирает сокращённые названия бренда (hqv, rgk, kvt)
                    let valueNumber = deleteAbbreviation(searched)
                    if ( isNumber( valueNumber ) ) {
                        if (i.article.includes( valueNumber )) {
                            length++
                            return true
                        }
                    }else {
                        if (i.name.toLowerCase().includes(searched.toLowerCase())) {
                            length++
                            return true
                        }
                    }
                    return false
                })]
            })

            // new Set(arraySearch) - создание массива с уникальными значениями
            productStore.setProducts([...new Set(arraySearch)])
            productStore.setTotalCount(length)
            setLoadingProduct(false)
        }
        // eslint-disable-next-line
    },[productStore.allProducts, value])

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
